# ContaWave Frontend - Guia de Desenvolvimento

## 📚 Índice

1. [Convenções de Código](#convenções-de-código)
2. [Estrutura de Componentes](#estrutura-de-componentes)
3. [Gerenciamento de Estado](#gerenciamento-de-estado)
4. [Integração com API](#integração-com-api)
5. [Testes](#testes)
6. [Performance](#performance)

## Convenções de Código

### Nomenclatura

- **Componentes**: PascalCase (`Button.tsx`, `KPICard.tsx`)
- **Funções**: camelCase (`formatCurrency`, `validateEmail`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces/Types**: PascalCase (`Transaction`, `ApiResponse`)

### Estrutura de Arquivos

```typescript
// ============================================
// COMPONENT NAME - DESCRIPTION
// ============================================

import statements...

interface Props {
  // Props definition
}

export const ComponentName: React.FC<Props> = ({ props }) => {
  // Component logic
  
  return (
    // JSX
  );
};
```

### TypeScript

- Use interfaces para props de componentes
- Use types para unions e intersections
- Sempre defina tipos de retorno em funções
- Evite `any`, prefira `unknown`

## Estrutura de Componentes

### Atomic Design Hierarchy

```
Atoms (básicos)
  ↓
Molecules (compostos)
  ↓
Organisms (complexos)
  ↓
Templates (layouts)
  ↓
Pages (rotas)
```

### Exemplo de Componente

```typescript
// Atom
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

// Molecule
export const FormField: React.FC<FormFieldProps> = ({ label, ...props }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
};

// Organism
export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions 
}) => {
  return (
    <Card>
      {transactions.map(tx => (
        <TransactionItem key={tx.id} transaction={tx} />
      ))}
    </Card>
  );
};
```

## Gerenciamento de Estado

### Zustand Store

```typescript
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Uso no componente
const { count, increment } = useStore();
```

### Estado Local vs Global

- **Local**: UI state, form state
- **Global**: User data, theme, sidebar state

## Integração com API

### Services Pattern

```typescript
// service
export const transactionService = {
  async getAll(params) {
    const response = await apiClient.get('/transactions', { params });
    return response.data;
  },
};

// component
const fetchTransactions = async () => {
  try {
    const data = await transactionService.getAll({ type: 'expense' });
    setTransactions(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};
```

### Error Handling

```typescript
try {
  const data = await service.fetch();
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      // Handle not found
    }
  }
}
```

## Testes

### Unit Tests (Vitest)

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('user can create expense', async ({ page }) => {
  await page.goto('/expenses');
  await page.click('text=Nova Despesa');
  await page.fill('[name="description"]', 'Supermercado');
  await page.fill('[name="amount"]', '350.50');
  await page.click('button[type="submit"]');
  await expect(page.getByText('Supermercado')).toBeVisible();
});
```

## Performance

### Code Splitting

```typescript
// Lazy loading de componentes
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
});
```

### Memoization

```typescript
// useMemo para cálculos pesados
const total = useMemo(() => {
  return transactions.reduce((sum, tx) => sum + tx.amount, 0);
}, [transactions]);

// useCallback para funções
const handleSubmit = useCallback(() => {
  // submit logic
}, [dependencies]);
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
/>
```

## Boas Práticas

### 1. Componentes Pequenos
- Máximo 50 linhas quando possível
- Uma responsabilidade por componente

### 2. DRY (Don't Repeat Yourself)
- Extrair lógica repetida em hooks customizados
- Reutilizar componentes

### 3. Acessibilidade
- Sempre usar labels em inputs
- ARIA attributes quando necessário
- Keyboard navigation

### 4. Performance
- Lazy loading de rotas
- Otimização de imagens
- Memoization estratégica

### 5. Type Safety
- Tipagem completa
- Evitar type assertions
- Usar generics quando apropriado

## Fluxo de Trabalho

### 1. Nova Feature

```bash
# 1. Criar branch
git checkout -b feature/nova-feature

# 2. Implementar
# - Criar tipos em /types
# - Criar service em /services
# - Criar componentes em /components ou /modules
# - Adicionar testes

# 3. Testar
npm run test
npm run test:e2e

# 4. Commit e push
git add .
git commit -m "feat: adiciona nova feature"
git push origin feature/nova-feature
```

### 2. Bug Fix

```bash
git checkout -b fix/bug-description
# Implementar fix + testes
git commit -m "fix: corrige bug X"
```

## Recursos Adicionais

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
