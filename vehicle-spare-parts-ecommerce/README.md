# Vehicle Spare Parts E-Commerce Website

A full-stack e-commerce application for vehicle spare parts built with Spring Boot, MySQL, HTML, CSS, and JavaScript.

## Technologies Used

- **Backend**: Java Spring Boot 3.1.0
- **Database**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Build Tool**: Maven
- **IDE**: Eclipse (compatible)

## Features

- User authentication (Login/Register)
- Product browsing and search
- Category filtering
- Shopping cart management
- Order placement
- Responsive design
- Modern UI/UX

## Database Setup

1. Install MySQL and MySQL Workbench
2. Open MySQL Workbench and create a new connection
3. Run the SQL script located at:
   ```
   src/main/resources/database/schema.sql
   ```
   This will create the database and tables with sample data.

## Configuration

1. Update `src/main/resources/application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. Make sure MySQL is running on port 3306 (default)

## Running the Application

### Using Eclipse:

1. Import the project into Eclipse:
   - File → Import → Existing Maven Projects
   - Select the `vehicle-spare-parts-ecommerce` folder
   - Click Finish

2. Wait for Maven to download dependencies

3. Run the application:
   - Right-click on `EcommerceApplication.java`
   - Run As → Java Application

4. The application will start on `http://localhost:8080`

### Using Command Line:

```bash
cd vehicle-spare-parts-ecommerce
mvn spring-boot:run
```

## Accessing the Application

Once the server is running, open your browser and navigate to:
```
http://localhost:8080
```

## Default Admin Account

- Username: `admin`
- Password: `admin123`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{categoryId}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products

### Categories
- `GET /api/categories` - Get all categories

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Cart
- `GET /api/cart/{userId}` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/{cartId}` - Update cart item quantity
- `DELETE /api/cart/{cartId}` - Remove item from cart

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/user/{userId}` - Get user's orders

## Project Structure

```
vehicle-spare-parts-ecommerce/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/vehicleparts/ecommerce/
│   │   │       ├── config/          # Configuration classes
│   │   │       ├── controller/      # REST controllers
│   │   │       ├── model/           # Entity classes
│   │   │       ├── repository/      # Data access layer
│   │   │       ├── service/         # Business logic
│   │   │       └── EcommerceApplication.java
│   │   └── resources/
│   │       ├── static/              # Frontend files
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── *.html
│   │       ├── database/
│   │       │   └── schema.sql       # Database schema
│   │       └── application.properties
│   └── test/
└── pom.xml                          # Maven configuration
```

## Features in Detail

### User Features
- Browse products by category
- Search products
- Add products to cart
- View and manage cart
- Place orders
- User registration and login

### Admin Features
- Manage products (via API)
- View orders (via API)

## Notes

- The application uses in-memory session management (localStorage) for simplicity
- Password encryption should be implemented for production use
- CORS is enabled for all origins (adjust for production)
- The database will auto-create tables on first run if `spring.jpa.hibernate.ddl-auto=update`

## Troubleshooting

1. **Port 8080 already in use**: Change the port in `application.properties`
2. **Database connection error**: Verify MySQL is running and credentials are correct
3. **Maven dependencies not downloading**: Check internet connection and Maven settings

## Future Enhancements

- Payment gateway integration
- Email notifications
- Order tracking
- Product reviews and ratings
- Admin dashboard
- Password encryption (BCrypt)
- JWT authentication
- Image upload functionality

