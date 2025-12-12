import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ContaWave
          </h1>
          <p className="text-xl text-muted-foreground">
            Dashboard Financeiro Pessoal
          </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Gerencie suas finanças de forma inteligente com relatórios detalhados,
          controle de despesas e análises em tempo real.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="group">
              Acessar Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="pt-8 text-sm text-muted-foreground">
          <p>Next.js 14+ · TypeScript · TailwindCSS · Zustand</p>
        </div>
      </div>
    </div>
  );
}

