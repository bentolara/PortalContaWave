# 📘 Guia de Uso - ContaWave Frontend

## 🚀 Quick Start

### 1. Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd ContaWave-Frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor
npm run dev
```

Acesse: http://localhost:3000

### 2. Estrutura Inicial

O projeto já vem com:
- ✅ Rotas configuradas
- ✅ Componentes base
- ✅ Services para API
- ✅ Estado global (Zustand)
- ✅ Tema claro/escuro
- ✅ Testes configurados

## 🎯 Exemplos de Uso

### Criar um Novo Componente Atom

```typescript
// components/atoms/NewAtom.tsx
import React from 'react';
import { cn } from '@/utils/cn';

interface NewAtomProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'custom';
}

export const NewAtom: React.FC<NewAtomProps> = ({ 
  variant = 'default',
  className,
  children,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'base-classes',
        variant === 'custom' && 'custom-classes',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Criar um Novo Módulo

```typescript
// modules/new-feature/components/NewFeatureList.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { useEffect, useState } from 'react';

export const NewFeatureList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Feature</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
    </Card>
  );
};
```

### Criar um Novo Service

```typescript
// services/new-feature.service.ts
import { apiClient } from './api-client';
import type { ApiResponse } from '@/types';

interface NewFeature {
  id: string;
  name: string;
}

export const newFeatureService = {
  async getAll(): Promise<NewFeature[]> {
    const response = await apiClient.get<ApiResponse<NewFeature[]>>('/new-feature');
    return response.data.data;
  },

  async create(data: Omit<NewFeature, 'id'>): Promise<NewFeature> {
    const response = await apiClient.post<ApiResponse<NewFeature>>('/new-feature', data);
    return response.data.data;
  },
};
```

### Adicionar uma Nova Rota

```typescript
// app/(dashboard)/new-route/page.tsx
import { NewFeatureList } from '@/modules/new-feature/components/NewFeatureList';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';

export default function NewRoutePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">New Feature</h1>
          <p className="text-muted-foreground">Description</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <NewFeatureList />
    </div>
  );
}
```

### Criar um Hook Customizado

```typescript
// hooks/useNewFeature.ts
import { useState, useEffect } from 'react';
import { newFeatureService } from '@/services/new-feature.service';

export const useNewFeature = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await newFeatureService.getAll();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Uso no componente
const { data, loading, error } = useNewFeature();
```

### Adicionar Estado Global

```typescript
// store/index.ts
interface NewStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useNewStore = create<NewStore>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Uso no componente
const { count, increment } = useNewStore();
```

### Criar Formulário

```typescript
// components/forms/NewForm.tsx
'use client';

import { useState } from 'react';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';

export const NewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};
```

### Adicionar Gráfico

```typescript
// components/charts/NewChart.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const NewChart = () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Title</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

### Testar Componente

```typescript
// __tests__/components/NewComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewComponent } from '@/components/NewComponent';

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles click events', () => {
    render(<NewComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // Assert expected behavior
  });
});
```

### Teste E2E

```typescript
// e2e/new-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('New Feature', () => {
  test('should display feature list', async ({ page }) => {
    await page.goto('/new-feature');
    await expect(page.getByRole('heading', { name: 'New Feature' })).toBeVisible();
  });

  test('should create new item', async ({ page }) => {
    await page.goto('/new-feature');
    await page.click('text=Add New');
    await page.fill('[name="name"]', 'Test Item');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Test Item')).toBeVisible();
  });
});
```

## 🎨 Customização

### Adicionar Nova Cor ao Tema

```css
/* app/globals.css */
:root {
  --your-color: 210 100% 50%;
}

.dark {
  --your-color: 210 100% 60%;
}
```

```typescript
// tailwind.config.ts
colors: {
  yourColor: "hsl(var(--your-color))",
}
```

### Adicionar Nova Fonte

```typescript
// app/layout.tsx
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
```

## 🔧 Ferramentas de Desenvolvimento

### Debug

```typescript
// Adicione console.log estratégicos
console.log('[Component] State:', state);

// Use React DevTools
// Chrome Extension: React Developer Tools
```

### Performance

```typescript
// Meça performance com React Profiler
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={(id, phase, actualDuration) => {
  console.log(`${id} rendered in ${actualDuration}ms`);
}}>
  <MyComponent />
</Profiler>
```

## 📚 Recursos Úteis

### Componentes Prontos
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

### Bibliotecas
- [Date-fns](https://date-fns.org/)
- [Recharts](https://recharts.org/)
- [Axios](https://axios-http.com/)

### Aprendizado
- [Next.js Learn](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## ❓ Troubleshooting

### Erro: "Module not found"
```bash
# Limpe o cache e reinstale
rm -rf node_modules .next
npm install
```

### Erro: Tailwind não funcionando
```bash
# Verifique o tailwind.config.ts
# Certifique-se que o content inclui todos os arquivos
```

### Erro: TypeScript
```bash
# Limpe o cache do TypeScript
rm -rf .next tsconfig.tsbuildinfo
```

## 🎓 Próximos Passos

1. ✅ Instalar e rodar o projeto
2. ✅ Explorar a estrutura
3. ✅ Criar primeiro componente
4. ✅ Adicionar nova rota
5. ✅ Integrar com API
6. ✅ Escrever testes
7. ✅ Deploy em produção

---

**Dúvidas?** Consulte a [documentação completa](./README.md) ou [arquitetura](./ARCHITECTURE.md).
