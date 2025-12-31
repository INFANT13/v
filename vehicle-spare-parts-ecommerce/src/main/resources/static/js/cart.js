// Cart Page Script
let cartItems = [];

document.addEventListener('DOMContentLoaded', async () => {
    if (!Auth.isLoggedIn()) {
        alert('Please login to view your cart');
        window.location.href = 'login.html';
        return;
    }
    
    await loadCart();
});

async function loadCart() {
    try {
        cartItems = await cartAPI.getCart(Auth.getUser().id);
        displayCart();
        updateSummary();
    } catch (error) {
        console.error('Error loading cart:', error);
        document.getElementById('cart-container').innerHTML = 
            '<p>Error loading cart. Please try again later.</p>';
    }
}

async function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const emptyCartDiv = document.getElementById('empty-cart');
    const cartContainer = document.getElementById('cart-container');
    
    if (cartItems.length === 0) {
        if (cartItemsDiv) cartItemsDiv.style.display = 'none';
        if (cartContainer) cartContainer.style.display = 'none';
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
        return;
    }
    
    if (emptyCartDiv) emptyCartDiv.style.display = 'none';
    if (cartContainer) cartContainer.style.display = 'grid';
    
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.product.imageUrl || 'https://via.placeholder.com/300'}" 
                     alt="${item.product.name}" 
                     class="cart-item-image"
                     onerror="this.src='https://via.placeholder.com/300'">
                <div class="cart-item-info">
                    <h4>${item.product.name}</h4>
                    <p>${item.product.description || ''}</p>
                    <div class="product-price">$${item.product.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            window.location.href = 'checkout.html';
        };
    }
}

function updateSummary() {
    const subtotal = cartItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);
    
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

async function updateQuantity(cartId, newQuantity) {
    if (newQuantity < 1) {
        await removeFromCart(cartId);
        return;
    }
    
    try {
        await cartAPI.updateQuantity(cartId, newQuantity);
        await loadCart();
        Auth.updateCartCount();
    } catch (error) {
        alert('Error updating quantity: ' + error.message);
    }
}

async function removeFromCart(cartId) {
    if (!confirm('Are you sure you want to remove this item from cart?')) {
        return;
    }
    
    try {
        await cartAPI.removeFromCart(cartId);
        await loadCart();
        Auth.updateCartCount();
    } catch (error) {
        alert('Error removing item: ' + error.message);
    }
}

