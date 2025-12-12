// ============================================
// API CLIENT - CONFIGURAÇÃO BASE
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5136/api';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: 'Erro na requisição',
        statusCode: response.status,
      };

      try {
        const errorData = await response.json();
        error.message = errorData.message || error.message;
        error.errors = errorData.errors;
      } catch {
        error.message = response.statusText;
      }

      throw error;
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    // Debug: Log da requisição
    if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
      console.log('🌐 [API] GET:', `${this.baseURL}${endpoint}`);
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Debug: Log da resposta
    if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
      console.log('✅ [API] Response:', response.status, response.statusText);
    }

    return this.handleResponse<T>(response);
  }

  async post<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.handleResponse<T>(response);
  }

  async patch<T, D = unknown>(endpoint: string, data?: D): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export type { ApiError };
