import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from 'axios';

/**
 * Standardized HTTP Client configured according to enterprise architectural standards:
 * - Bearer Token authorization interceptor
 * - Base URL configuration
 * - Offline network status awareness
 * - Normalized error handling & user-friendly messages
 */

// Offline state tracker
let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    isOnline = true;
    console.info('[Network] Back online.');
  });
  window.addEventListener('offline', () => {
    isOnline = false;
    console.warn('[Network] Device is offline.');
  });
}

export const getNetworkStatus = () => isOnline;

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

class HttpClient {
  private client: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: '/api/v1',
      timeout: 12000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private setupInterceptors() {
    // Request Interceptor: Attach bearer token & check offline state
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!getNetworkStatus()) {
          return Promise.reject(new Error('Network offline: Please check your internet connection before submitting.'));
        }

        if (this.authToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        // Add client tracking headers
        config.headers['X-Client-App'] = 'FlooringCompany-Web';
        config.headers['X-Request-Timestamp'] = new Date().toISOString();

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response Interceptor: Standardize API responses & errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        let message = 'An unexpected error occurred. Please try again.';

        if (!getNetworkStatus() || error.code === 'ERR_NETWORK') {
          message = 'You appear to be offline. Please verify your internet connection.';
        } else if (error.response) {
          const status = error.response.status;
          const serverData = error.response.data as any;
          if (serverData && serverData.message) {
            message = serverData.message;
          } else if (status === 400) {
            message = 'Invalid request parameters. Please check your form input.';
          } else if (status === 401) {
            message = 'Authentication required. Please sign in or refresh.';
          } else if (status === 404) {
            message = 'The requested resource was not found.';
          } else if (status >= 500) {
            message = 'Flooring service is momentarily busy. Please try again in a few moments.';
          }
        } else if (error.request) {
          message = 'Server response timed out. Please verify your connection.';
        }

        return Promise.reject(new Error(message));
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  }
}

export const httpClient = new HttpClient();
