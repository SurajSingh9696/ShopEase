import apiClient from '../utils/axios';

// Authentication APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
};

// User APIs
export const userAPI = {
  getCurrentUser: () => apiClient.get('/user/me'),
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data) => apiClient.put('/user/profile', data),
  getAddresses: () => apiClient.get('/user/addresses'),
  addAddress: (data) => apiClient.post('/user/addresses', data),
  updateAddress: (id, data) => apiClient.put(`/user/addresses/${id}`, data),
  deleteAddress: (id) => apiClient.delete(`/user/addresses/${id}`),
};

// Product APIs
export const productAPI = {
  getAllProducts: (params) => apiClient.get('/product', { params }),
  getProductById: (id) => apiClient.get(`/product/${id}`),
  createProduct: (data) => apiClient.post('/product', data),
  updateProduct: (id, data) => apiClient.put(`/product/${id}`, data),
  deleteProduct: (id) => apiClient.delete(`/product/${id}`),
};

// Category APIs
export const categoryAPI = {
  getAllCategories: () => apiClient.get('/category'),
  createCategory: (data) => apiClient.post('/category', data),
  updateCategory: (id, data) => apiClient.put(`/category/${id}`, data),
  deleteCategory: (id) => apiClient.delete(`/category/${id}`),
};

// Cart APIs
export const cartAPI = {
  getCart: () => apiClient.get('/cart'),
  addToCart: (data) => apiClient.post('/cart/add', data),
  updateCartItem: (itemId, data) => apiClient.put(`/cart/update/${itemId}`, data),
  removeFromCart: (itemId) => apiClient.delete(`/cart/remove/${itemId}`),
  clearCart: () => apiClient.delete('/cart/clear'),
};

// Order APIs
export const orderAPI = {
  createOrder: (data) => apiClient.post('/order', data),
  getOrderById: (id) => apiClient.get(`/order/${id}`),
  getUserOrders: (userId) => apiClient.get(`/order/user/${userId}`),
  updateOrderStatus: (id, data) => apiClient.put(`/order/${id}/status`, data),
};

// Payment APIs
export const paymentAPI = {
  createPayment: (data) => apiClient.post('/payment', data),
  getPaymentById: (id) => apiClient.get(`/payment/${id}`),
  getUserPayments: (userId) => apiClient.get(`/payment/user/${userId}`),
  updatePaymentStatus: (id, data) => apiClient.put(`/payment/${id}/status`, data),
};

// Review APIs
export const reviewAPI = {
  addReview: (productId, data) => apiClient.post(`/review/${productId}`, data),
  getProductReviews: (productId) => apiClient.get(`/review/product/${productId}`),
  deleteReview: (id) => apiClient.delete(`/review/${id}`),
};

// Admin APIs
export const adminAPI = {
  getAllUsers: () => apiClient.get('/admin/users'),
  getAllOrders: () => apiClient.get('/admin/orders'),
  blockUser: (id, data) => apiClient.post(`/admin/users/${id}/block`, data),
  unblockUser: (id) => apiClient.post(`/admin/users/${id}/unblock`),
  updateOrderStatus: (id, data) => apiClient.put(`/admin/orders/${id}/status`, data),
};
