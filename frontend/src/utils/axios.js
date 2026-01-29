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

// Response interceptor - simplified like CrackIt
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // On 401 Unauthorized, clear storage and redirect to login
    if (error.response?.status === 401) {
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

      // Clear all auth data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      // Redirect to login if not on public page
      if (!isPublicPage) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
