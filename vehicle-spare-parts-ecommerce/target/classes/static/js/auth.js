// Authentication Management
const Auth = {
    currentUser: null,
    
    init() {
        // Load user from localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    },
    
    setUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateUI();
    },
    
    getUser() {
        return this.currentUser;
    },
    
    isLoggedIn() {
        return this.currentUser !== null;
    },
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        window.location.href = 'index.html';
    },
    
    updateUI() {
        const loginMenu = document.getElementById('login-menu');
        const userMenu = document.getElementById('user-menu');
        const userName = document.getElementById('user-name');
        
        if (this.isLoggedIn()) {
            if (loginMenu) loginMenu.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userName) userName.textContent = this.currentUser.username || this.currentUser.fullName;
        } else {
            if (loginMenu) loginMenu.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
        
        // Update cart count
        this.updateCartCount();
    },
    
    async updateCartCount() {
        if (!this.isLoggedIn()) {
            const cartCount = document.getElementById('cart-count');
            if (cartCount) cartCount.textContent = '0';
            return;
        }
        
        try {
            const cartItems = await cartAPI.getCart(this.currentUser.id);
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const cartCount = document.getElementById('cart-count');
            if (cartCount) cartCount.textContent = totalItems;
        } catch (error) {
            console.error('Error updating cart count:', error);
        }
    }
};

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
    
    // Logout button handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });
    }
});

