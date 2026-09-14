const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper for HTTP requests
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error(`API error at ${endpoint}:`, error.message);
    throw error;
  }
};

export const api = {
  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    if (params.featured) query.append('featured', 'true');
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/products${queryString}`);
  },

  getProductById: async (id) => {
    return request(`/products/${id}`);
  },

  createProduct: async (productData, token) => {
    return request('/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id, productData, token) => {
    return request(`/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id, token) => {
    return request(`/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Categories
  getCategories: async () => {
    return request('/categories');
  },

  createCategory: async (categoryData, token) => {
    return request('/categories', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(categoryData),
    });
  },

  updateCategory: async (id, categoryData, token) => {
    return request(`/categories/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (id, token) => {
    return request(`/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Gallery
  getGallery: async (category = '') => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/gallery${query}`);
  },

  createGalleryItem: async (itemData, token) => {
    return request('/gallery', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(itemData),
    });
  },

  deleteGalleryItem: async (id, token) => {
    return request(`/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Inquiries
  submitInquiry: async (inquiryData) => {
    return request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  },

  getInquiries: async (token, status = '') => {
    const query = status && status !== 'All' ? `?status=${encodeURIComponent(status)}` : '';
    return request(`/inquiries${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateInquiryStatus: async (id, status, token) => {
    return request(`/inquiries/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
  },

  deleteInquiry: async (id, token) => {
    return request(`/inquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Auth
  login: async (credentials) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getProfile: async (token) => {
    return request('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Business Info
  getBusinessInfo: async () => {
    return request('/business-info');
  },
};

export default api;
