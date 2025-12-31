// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// API Helper Functions
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'An error occurred');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Product API
const productAPI = {
    getAll: () => apiCall('/products'),
    getById: (id) => apiCall(`/products/${id}`),
    getByCategory: (categoryId) => apiCall(`/products/category/${categoryId}`),
    search: (keyword) => apiCall(`/products/search?keyword=${encodeURIComponent(keyword)}`),
    getByVehicleType: (vehicleType) => apiCall(`/products/vehicle/${vehicleType}`)
};

// Category API
const categoryAPI = {
    getAll: () => apiCall('/categories'),
    getById: (id) => apiCall(`/categories/${id}`)
};

// User API
const userAPI = {
    register: (userData) => apiCall('/users/register', 'POST', userData),
    login: (credentials) => apiCall('/users/login', 'POST', credentials),
    getById: (id) => apiCall(`/users/${id}`)
};

// Cart API
const cartAPI = {
    getCart: (userId) => apiCall(`/cart/${userId}`),
    addToCart: (userId, productId, quantity) => 
        apiCall('/cart/add', 'POST', { userId, productId, quantity }),
    updateQuantity: (cartId, quantity) => 
        apiCall(`/cart/${cartId}`, 'PUT', { quantity }),
    removeFromCart: (cartId) => apiCall(`/cart/${cartId}`, 'DELETE'),
    clearCart: (userId) => apiCall(`/cart/clear/${userId}`, 'DELETE')
};

// Order API
const orderAPI = {
    createOrder: (orderData) => apiCall('/orders/create', 'POST', orderData),
    getByUser: (userId) => apiCall(`/orders/user/${userId}`),
    getById: (id) => apiCall(`/orders/${id}`)
};

