// Products Page Script
let allProducts = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    await loadCategories();
    setupEventListeners();
});

async function loadProducts() {
    try {
        allProducts = await productAPI.getAll();
        filteredProducts = allProducts;
        displayProducts(filteredProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-grid').innerHTML = 
            '<p>Error loading products. Please try again later.</p>';
    }
}

async function loadCategories() {
    try {
        const categories = await categoryAPI.getAll();
        const categoryFilter = document.getElementById('category-filter');
        
        if (categoryFilter) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categoryFilter.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const vehicleFilter = document.getElementById('vehicle-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilter);
    }
    
    if (vehicleFilter) {
        vehicleFilter.addEventListener('change', handleFilter);
    }
    
    // Check for category parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    if (categoryId && categoryFilter) {
        categoryFilter.value = categoryId;
        handleFilter();
    }
}

function handleSearch() {
    const keyword = document.getElementById('search-input').value.toLowerCase();
    
    if (keyword) {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(keyword) ||
            (product.description && product.description.toLowerCase().includes(keyword))
        );
    } else {
        applyFilters();
        return;
    }
    
    displayProducts(filteredProducts);
}

function handleFilter() {
    applyFilters();
    displayProducts(filteredProducts);
}

function applyFilters() {
    const categoryId = document.getElementById('category-filter')?.value;
    const vehicleType = document.getElementById('vehicle-filter')?.value;
    
    filteredProducts = allProducts.filter(product => {
        const matchesCategory = !categoryId || product.category?.id == categoryId;
        const matchesVehicle = !vehicleType || product.vehicleType === vehicleType;
        return matchesCategory && matchesVehicle;
    });
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" 
                 alt="${product.name}" 
                 class="product-image"
                 onerror="this.src='https://via.placeholder.com/300'">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <div style="margin: 0.5rem 0; color: #666; font-size: 0.9rem;">
                    <span>Brand: ${product.brand || 'N/A'}</span> | 
                    <span>Type: ${product.vehicleType || 'N/A'}</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div style="margin-bottom: 1rem; color: ${product.stockQuantity > 0 ? '#2ed573' : '#ff4757'};">
                    ${product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" 
                            onclick="addToCart(${product.id})"
                            ${product.stockQuantity === 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

async function addToCart(productId) {
    if (!Auth.isLoggedIn()) {
        alert('Please login to add items to cart');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        await cartAPI.addToCart(Auth.getUser().id, productId, 1);
        alert('Product added to cart!');
        Auth.updateCartCount();
    } catch (error) {
        alert('Error adding product to cart: ' + error.message);
    }
}

