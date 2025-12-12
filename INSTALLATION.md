# 🚀 Guia de Instalação e Execução - ContaWave Frontend

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 20.x ou superior ([Download](https://nodejs.org/))
- **npm** 10.x ou superior (vem com Node.js)
- **Git** ([Download](https://git-scm.com/))
- **VS Code** (recomendado) ([Download](https://code.visualstudio.com/))

### Verificar Instalações

```bash
node --version    # Deve mostrar v20.x.x ou superior
npm --version     # Deve mostrar 10.x.x ou superior
git --version     # Qualquer versão recente
```

---

## 📥 Instalação

### 1. Clone o Repositório (ou use o diretório existente)

```bash
# Se ainda não clonou
git clone <repository-url>
cd ContaWave-Frontend

# Ou navegue até o diretório existente
cd c:\2025\Projetos\ContaWave-Frontend
```

### 2. Instale as Dependências

```bash
npm install
```

**Tempo estimado**: 2-3 minutos

### 3. Configure as Variáveis de Ambiente

```bash
# Windows
copy .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

Edite o arquivo `.env.local` conforme necessário:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5136/api

# Application
NEXT_PUBLIC_APP_NAME=ContaWave
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em: **http://localhost:3000**

**Saída esperada:**
```
  ▲ Next.js 15.1.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Modo Produção

```bash
# Build
npm run build

# Start
npm run start
```

---

## 🧪 Executando Testes

### Testes Unitários (Vitest)

```bash
# Executar todos os testes
npm run test

# Modo watch (desenvolvimento)
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

### Testes E2E (Playwright)

```bash
# Primeiro, certifique-se de que o dev server está rodando
npm run dev

# Em outro terminal, execute os testes E2E
npm run test:e2e

# Modo UI interativo
npm run test:e2e -- --ui
```

---

## 🔍 Verificação de Qualidade

### ESLint

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### Problema: "Module not found"

**Solução:**
```bash
# Limpe o cache e reinstale
rm -rf node_modules .next
npm install
```

### Problema: Porta 3000 já está em uso

**Solução:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Ou use outra porta
PORT=3001 npm run dev
```

### Problema: Erros de TypeScript após instalar

**Solução:**
```bash
# Limpe o cache do TypeScript
rm -rf .next tsconfig.tsbuildinfo
npm run dev
```

### Problema: TailwindCSS não funciona

**Solução:**
1. Verifique se `tailwindcss-animate` está instalado:
   ```bash
   npm install tailwindcss-animate
   ```

2. Limpe o cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Problema: Dependências com vulnerabilidades

**Solução:**
```bash
# Audit
npm audit

# Fix automático (cuidado com breaking changes)
npm audit fix

# Verificar outdated packages
npm outdated
```

---

## 📦 Build para Produção

### Build Local

```bash
npm run build
```

**Saída esperada:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                   5.2 kB         90.1 kB
├ ○ /(dashboard)/dashboard              8.4 kB         95.3 kB
├ ○ /(dashboard)/expenses               7.1 kB         94.0 kB
└ ○ /(dashboard)/revenues               6.8 kB         93.7 kB
```

### Testar Build de Produção

```bash
npm run build
npm run start
```

Acesse: http://localhost:3000

---

## 🐳 Docker

### Build da Imagem

```bash
docker build -t contawave-frontend .
```

### Executar Container

```bash
docker run -p 3000:3000 contawave-frontend
```

### Docker Compose (se houver backend)

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001/api
    depends_on:
      - backend
```

```bash
docker-compose up
```

---

## 🌐 Deploy

### Vercel (Recomendado)

1. **Via Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via GitHub:**
   - Push para GitHub
   - Conecte no [Vercel Dashboard](https://vercel.com)
   - Importe o repositório
   - Deploy automático!

3. **Variáveis de Ambiente na Vercel:**
   - Settings → Environment Variables
   - Adicione `NEXT_PUBLIC_API_URL`

### Netlify

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Servidor Próprio (VPS)

```bash
# No servidor
git clone <repo>
cd ContaWave-Frontend
npm install
npm run build

# Com PM2
npm i -g pm2
pm2 start npm --name "contawave" -- start
pm2 save
pm2 startup
```

---

## 🛠️ Extensões VS Code Recomendadas

Ao abrir o projeto no VS Code, será sugerido instalar:

1. **ES7+ React/Redux/React-Native snippets**
2. **ESLint**
3. **Prettier - Code formatter**
4. **Tailwind CSS IntelliSense**
5. **Playwright Test**
6. **Vitest Explorer**

Clique em "Install All" quando solicitado.

---

## 📊 Scripts NPM Disponíveis

```json
{
  "dev": "next dev",                  // Servidor de desenvolvimento
  "build": "next build",              // Build de produção
  "start": "next start",              // Servidor de produção
  "lint": "next lint",                // Verificar código com ESLint
  "test": "vitest",                   // Testes unitários
  "test:e2e": "playwright test"       // Testes E2E
}
```

---

## 🎯 Próximos Passos Após Instalação

### 1. Explore o Projeto
```bash
# Abra no VS Code
code .
```

### 2. Leia a Documentação
- [`README.md`](./README.md) - Overview
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Arquitetura
- [`USAGE.md`](./USAGE.md) - Exemplos

### 3. Execute os Testes
```bash
npm run test
npm run test:e2e
```

### 4. Comece a Desenvolver
- Crie um novo componente
- Adicione uma nova feature
- Modifique o tema

---

## 📞 Suporte

### Documentação Completa
- [README.md](./README.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DEVELOPMENT.md](./DEVELOPMENT.md)
- [USAGE.md](./USAGE.md)
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### Recursos Online
- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)

### Issues Comuns
Consulte a seção [Troubleshooting](#-troubleshooting) acima.

---

## ✅ Checklist de Instalação

- [ ] Node.js 20+ instalado
- [ ] npm 10+ instalado
- [ ] Repositório clonado/acessado
- [ ] `npm install` executado com sucesso
- [ ] `.env.local` configurado
- [ ] `npm run dev` funcionando
- [ ] Aplicação acessível em http://localhost:3000
- [ ] Sem erros no console
- [ ] Extensões VS Code instaladas (opcional)

---

## 🎉 Sucesso!

Se você chegou até aqui, o projeto está rodando! 🚀

Agora você pode:
- ✅ Desenvolver novas features
- ✅ Customizar o design
- ✅ Integrar com backend
- ✅ Fazer deploy em produção

**Bom desenvolvimento!** 💻
