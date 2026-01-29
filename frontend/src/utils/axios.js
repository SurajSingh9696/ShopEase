import axios from 'axios';

// Backend is deployed separately on Render
const API_BASE_URL = 'https://shopease-backend-02.onrender.com';

console.log('🌐 API Base URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const publicEndpoints = [
          '/auth/login',
          '/auth/register',
          '/product',
          '/category',
          '/review'
        ];

        const url = originalRequest.url || '';

        const isPublicEndpoint = publicEndpoints.some(endpoint =>
          url.startsWith(endpoint)
        );

        if (isPublicEndpoint) {
          return Promise.reject(error);
        }

        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              }
            }
          );

          if (response.data.success) {
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
          }
        }

        // If refresh fails, clear storage and redirect
        throw error;
      } catch (refreshError) {
        // Clear tokens and user data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

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
