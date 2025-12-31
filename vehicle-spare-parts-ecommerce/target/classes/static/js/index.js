// Home Page Script
document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories();
    await loadFeaturedProducts();
});

async function loadCategories() {
    try {
        const categories = await categoryAPI.getAll();
        const categoriesGrid = document.getElementById('categories-grid');
        
        if (categoriesGrid) {
            categoriesGrid.innerHTML = categories.slice(0, 8).map(category => `
                <div class="category-card" onclick="window.location.href='products.html?category=${category.id}'">
                    <h3>${category.name}</h3>
                    <p>${category.description || ''}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function loadFeaturedProducts() {
    try {
        const products = await productAPI.getAll();
        const productsGrid = document.getElementById('products-grid');
        
        if (productsGrid) {
            // Show first 6 products as featured
            const featuredProducts = products.slice(0, 6);
            productsGrid.innerHTML = featuredProducts.map(product => `
                <div class="product-card">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" 
                         alt="${product.name}" 
                         class="product-image"
                         onerror="this.src='https://via.placeholder.com/300'">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description || ''}</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
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

