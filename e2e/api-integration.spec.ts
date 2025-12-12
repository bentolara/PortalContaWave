// ============================================
// E2E TEST - API INTEGRATION
// ============================================

import { test, expect } from '@playwright/test';

// Mocking API responses for E2E tests
test.describe('API Integration E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses
    await page.route('**/api/accounts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Conta Corrente',
            type: 'asset',
            subtype: 'Corrente',
            balance: 5000,
            currency: 'BRL',
            isActive: true,
            createdAt: '2025-01-01T00:00:00Z',
            updatedAt: '2025-01-01T00:00:00Z',
          },
          {
            id: '2',
            name: 'Poupança',
            type: 'asset',
            subtype: 'Poupança',
            balance: 10000,
            currency: 'BRL',
            isActive: true,
            createdAt: '2025-01-01T00:00:00Z',
            updatedAt: '2025-01-01T00:00:00Z',
          },
        ]),
      });
    });

    await page.route('**/api/expenses*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            description: 'Aluguel',
            value: 1500,
            categoryId: '1',
            accountId: '1',
            date: '2025-12-05',
            isPaid: true,
            isRecurring: true,
            createdAt: '2025-12-01T00:00:00Z',
            updatedAt: '2025-12-01T00:00:00Z',
          },
        ]),
      });
    });
  });

  test('should display accounts list', async ({ page }) => {
    await page.goto('/dashboard/accounts');

    // Wait for data to load
    await page.waitForSelector('text=Conta Corrente');
    
    // Check if accounts are displayed
    await expect(page.locator('text=Conta Corrente')).toBeVisible();
    await expect(page.locator('text=Poupança')).toBeVisible();
    
    // Check balance formatting
    await expect(page.locator('text=R$ 5.000,00')).toBeVisible();
  });

  test('should display expenses list', async ({ page }) => {
    await page.goto('/dashboard/expenses');

    // Wait for data to load
    await page.waitForSelector('text=Aluguel');
    
    // Check if expense is displayed
    await expect(page.locator('text=Aluguel')).toBeVisible();
    
    // Check if paid badge is shown
    await expect(page.locator('[data-testid="paid-badge"]')).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock error response
    await page.route('**/api/accounts', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Internal server error',
        }),
      });
    });

    await page.goto('/dashboard/accounts');

    // Check if error message is displayed
    await expect(page.locator('text=Erro ao carregar contas')).toBeVisible();
  });

  test('should filter expenses by date range', async ({ page }) => {
    await page.goto('/dashboard/expenses');

    // Set date filters
    await page.fill('[name="startDate"]', '2025-12-01');
    await page.fill('[name="endDate"]', '2025-12-31');
    
    // Click filter button
    await page.click('button:has-text("Filtrar")');

    // Verify API was called with correct parameters
    await page.waitForRequest((request) => {
      return (
        request.url().includes('/api/expenses') &&
        request.url().includes('startDate=2025-12-01') &&
        request.url().includes('endDate=2025-12-31')
      );
    });
  });

  test('should create new expense', async ({ page }) => {
    await page.route('**/api/expenses', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: '2',
            description: 'Nova Despesa',
            value: 200,
            categoryId: '1',
            accountId: '1',
            date: '2025-12-11',
            isPaid: false,
            isRecurring: false,
            createdAt: '2025-12-11T00:00:00Z',
            updatedAt: '2025-12-11T00:00:00Z',
          }),
        });
      }
    });

    await page.goto('/dashboard/expenses');
    
    // Click "Nova Despesa" button
    await page.click('button:has-text("Nova Despesa")');
    
    // Fill form
    await page.fill('[name="description"]', 'Nova Despesa');
    await page.fill('[name="value"]', '200');
    await page.selectOption('[name="categoryId"]', '1');
    await page.fill('[name="date"]', '2025-12-11');
    
    // Submit form
    await page.click('button:has-text("Salvar")');
    
    // Verify success message
    await expect(page.locator('text=Despesa criada com sucesso')).toBeVisible();
  });
});
