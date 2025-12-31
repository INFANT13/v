package com.vehicleparts.ecommerce.service;

import com.vehicleparts.ecommerce.model.Cart;
import com.vehicleparts.ecommerce.model.Product;
import com.vehicleparts.ecommerce.model.User;
import com.vehicleparts.ecommerce.repository.CartRepository;
import com.vehicleparts.ecommerce.repository.ProductRepository;
import com.vehicleparts.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }
    
    public Cart addToCart(Long userId, Long productId, Integer quantity) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Product> productOpt = productRepository.findById(productId);
        
        if (userOpt.isEmpty() || productOpt.isEmpty()) {
            throw new RuntimeException("User or Product not found");
        }
        
        Optional<Cart> existingCart = cartRepository.findByUserIdAndProductId(userId, productId);
        
        if (existingCart.isPresent()) {
            Cart cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + quantity);
            return cartRepository.save(cart);
        } else {
            Cart cart = new Cart();
            cart.setUser(userOpt.get());
            cart.setProduct(productOpt.get());
            cart.setQuantity(quantity);
            return cartRepository.save(cart);
        }
    }
    
    public void updateCartQuantity(Long cartId, Integer quantity) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            cart.setQuantity(quantity);
            cartRepository.save(cart);
        }
    }
    
    @Transactional
    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }
    
    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }
}

