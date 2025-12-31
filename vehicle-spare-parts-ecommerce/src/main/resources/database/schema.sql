-- Vehicle Spare Parts E-Commerce Database Schema

CREATE DATABASE IF NOT EXISTS vehicle_parts_db;
USE vehicle_parts_db;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    category_id BIGINT,
    image_url VARCHAR(500),
    vehicle_type VARCHAR(50),
    brand VARCHAR(100),
    part_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_vehicle_type (vehicle_type),
    INDEX idx_brand (brand)
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    role VARCHAR(20) DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Table
CREATE TABLE IF NOT EXISTS cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    shipping_address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert Sample Categories
INSERT INTO categories (name, description) VALUES
('Engine Parts', 'Engine components and accessories'),
('Brake System', 'Brake pads, discs, and related parts'),
('Suspension', 'Shock absorbers, springs, and suspension parts'),
('Electrical', 'Batteries, alternators, and electrical components'),
('Body Parts', 'Bumpers, mirrors, and body panels'),
('Filters', 'Oil, air, and fuel filters'),
('Tires & Wheels', 'Tires, rims, and wheel accessories'),
('Lighting', 'Headlights, taillights, and bulbs');

-- Insert Sample Products
INSERT INTO products (name, description, price, stock_quantity, category_id, vehicle_type, brand, part_number, image_url) VALUES
('Engine Oil Filter', 'High-quality engine oil filter for all vehicle types', 15.99, 50, 6, 'Universal', 'Premium', 'OF-001', 'https://via.placeholder.com/300'),
('Brake Pad Set (Front)', 'Ceramic brake pads for front wheels', 45.99, 30, 2, 'Sedan', 'BrakePro', 'BP-F-001', 'https://via.placeholder.com/300'),
('Shock Absorber', 'Heavy-duty shock absorber for smooth ride', 89.99, 20, 3, 'SUV', 'SmoothRide', 'SA-001', 'https://via.placeholder.com/300'),
('Car Battery 12V', '12V car battery with 3-year warranty', 129.99, 15, 4, 'Universal', 'PowerMax', 'BAT-12V', 'https://via.placeholder.com/300'),
('Headlight Bulb H4', 'LED headlight bulb H4 type', 24.99, 40, 8, 'Universal', 'BrightLight', 'HL-H4', 'https://via.placeholder.com/300'),
('Air Filter', 'High-performance air filter', 12.99, 60, 6, 'Universal', 'AirMax', 'AF-001', 'https://via.placeholder.com/300'),
('Spark Plug Set', 'Iridium spark plugs set of 4', 32.99, 35, 1, 'Universal', 'SparkPro', 'SP-001', 'https://via.placeholder.com/300'),
('Windshield Wiper', 'Premium windshield wiper blades pair', 18.99, 45, 5, 'Universal', 'ClearView', 'WW-001', 'https://via.placeholder.com/300');

-- Insert Sample Admin User (password: admin123)
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@vehicleparts.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwy7p8K5O', 'Admin User', 'ADMIN');

