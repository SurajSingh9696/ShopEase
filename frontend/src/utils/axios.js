import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Don't retry if this is a public endpoint or auth request
        const publicEndpoints = [
          '/auth/login',
          '/auth/register',
          '/auth/refresh',
          '/product',
          '/category',
          '/review',
          '/user/me'
        ];
        
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
          originalRequest.url?.includes(endpoint)
        );
        
        if (isPublicEndpoint) {
          return Promise.reject(error);
        }
        
        await apiClient.post('/auth/refresh');
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Define public pages that don't require authentication
        const publicPages = [
          '/',
          '/login',
          '/register',
          '/products',
          '/product/',
          '/about',
          '/contact',
          '/faq',
          '/terms',
          '/privacy',
          '/forgot-password',
          '/verify-reset-code',
          '/reset-password'
        ];
        
        const isPublicPage = publicPages.some(page => 
          window.location.pathname === page || window.location.pathname.startsWith(page)
        );
        
        // If refresh fails, redirect to login only if not on a public page
        if (!isPublicPage) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
