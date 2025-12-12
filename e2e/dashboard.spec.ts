// ============================================
// EXAMPLE E2E TEST
// ============================================

import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('should display dashboard title', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should display KPI cards', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('Total Despesas')).toBeVisible();
    await expect(page.getByText('Total Receitas')).toBeVisible();
    await expect(page.getByText('Saldo do Mês')).toBeVisible();
  });

  test('should navigate to expenses page', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Despesas' }).click();
    await expect(page).toHaveURL('/expenses');
    await expect(page.getByRole('heading', { name: 'Despesas' })).toBeVisible();
  });
});
