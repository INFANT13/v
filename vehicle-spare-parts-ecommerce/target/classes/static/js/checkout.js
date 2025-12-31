// Checkout Page Script
let cartItems = [];

document.addEventListener('DOMContentLoaded', async () => {
    if (!Auth.isLoggedIn()) {
        alert('Please login to checkout');
        window.location.href = 'login.html';
        return;
    }
    
    await loadCartItems();
    setupCheckoutForm();
});

async function loadCartItems() {
    try {
        cartItems = await cartAPI.getCart(Auth.getUser().id);
        
        if (cartItems.length === 0) {
            alert('Your cart is empty');
            window.location.href = 'cart.html';
            return;
        }
        
        displayOrderSummary();
    } catch (error) {
        console.error('Error loading cart:', error);
        alert('Error loading cart items');
    }
}

function displayOrderSummary() {
    const orderItemsDiv = document.getElementById('order-items');
    const orderTotalEl = document.getElementById('order-total');
    
    if (orderItemsDiv) {
        orderItemsDiv.innerHTML = cartItems.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
                <div>
                    <strong>${item.product.name}</strong>
                    <div style="color: #666; font-size: 0.9rem;">Qty: ${item.quantity}</div>
                </div>
                <div>$${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }
    
    const total = cartItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);
    
    if (orderTotalEl) {
        orderTotalEl.textContent = `$${total.toFixed(2)}`;
    }
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    const user = Auth.getUser();
    
    // Pre-fill user data if available
    if (user.address) {
        const addressField = document.getElementById('shipping-address');
        if (addressField) addressField.value = user.address;
    }
    
    if (user.phone) {
        const phoneField = document.getElementById('phone');
        if (phoneField) phoneField.value = user.phone;
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const shippingAddress = document.getElementById('shipping-address').value;
            const phone = document.getElementById('phone').value;
            
            if (!shippingAddress || !phone) {
                alert('Please fill in all required fields');
                return;
            }
            
            try {
                const order = await orderAPI.createOrder({
                    userId: user.id,
                    shippingAddress,
                    phone
                });
                
                alert('Order placed successfully! Order ID: ' + order.id);
                window.location.href = 'index.html';
            } catch (error) {
                alert('Error placing order: ' + error.message);
            }
        });
    }
}

