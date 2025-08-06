# Backend TypeScript E-commerce API

A complete e-commerce backend API built with TypeScript, Express.js, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**
  - User registration with email verification
  - JWT-based authentication
  - Password reset functionality
  - Role-based access control (user, admin, seller)

- **Product Management**
  - Full CRUD operations for products
  - Category management with hierarchical structure
  - Product search and filtering
  - Image upload and management
  - Inventory tracking

- **Shopping Cart & Orders**
  - Shopping cart functionality
  - Order management system
  - Order status tracking
  - Payment integration (Stripe)

- **Reviews & Ratings**
  - Product reviews and ratings
  - Review verification system
  - Helpful review tracking

- **Admin Features**
  - Dashboard analytics
  - User management
  - Order management
  - Product moderation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **File Upload**: Multer + Cloudinary
- **Email**: NodeMailer
- **Payment**: Stripe
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shutthefupmeh/backend-ts-ecommerce2.git
   cd backend-ts-ecommerce2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=http://localhost:3000
   # ... other variables
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or start your local MongoDB service
   mongod
   ```

5. **Build and Run**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 📚 API Documentation

### Authentication Endpoints

```bash
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/me          # Get current user
POST /api/auth/verify-email # Verify email
POST /api/auth/forgot-password # Request password reset
POST /api/auth/reset-password  # Reset password
POST /api/auth/change-password # Change password (authenticated)
```

### Product Endpoints

```bash
GET    /api/products        # Get all products (with filters)
GET    /api/products/:id    # Get single product
POST   /api/products        # Create product (admin/seller)
PUT    /api/products/:id    # Update product (admin/seller)
DELETE /api/products/:id    # Delete product (admin)
POST   /api/products/:id/upload # Upload product images
```

### Order Endpoints

```bash
GET    /api/orders          # Get user orders
GET    /api/orders/:id      # Get single order
POST   /api/orders          # Create order
PUT    /api/orders/:id      # Update order status (admin)
POST   /api/orders/:id/cancel # Cancel order
```

### Cart Endpoints

```bash
GET    /api/cart           # Get user cart
POST   /api/cart/add       # Add item to cart
PUT    /api/cart/update    # Update cart item
DELETE /api/cart/remove    # Remove item from cart
DELETE /api/cart/clear     # Clear cart
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | localhost:27017/ecommerce |
| `JWT_SECRET` | JWT secret key | required |
| `JWT_EXPIRES_IN` | JWT expiration | 30d |
| `CORS_ORIGIN` | Allowed origin | http://localhost:3000 |
| `EMAIL_HOST` | SMTP host | smtp.gmail.com |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | SMTP username | required |
| `EMAIL_PASS` | SMTP password | required |
| `STRIPE_SECRET_KEY` | Stripe secret key | required |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | required |
| `CLOUDINARY_API_KEY` | Cloudinary API key | required |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | required |

## 🏗️ Project Structure

```
src/
├── config/          # Configuration files
│   └── database.ts  # Database connection
├── controllers/     # Route controllers
│   ├── authController.ts
│   ├── productController.ts
│   ├── orderController.ts
│   └── ...
├── middleware/      # Custom middleware
│   ├── auth.ts      # Authentication middleware
│   ├── errorHandler.ts
│   └── ...
├── models/          # Mongoose models
│   ├── User.ts
│   ├── Product.ts
│   ├── Order.ts
│   └── ...
├── routes/          # Route definitions
│   ├── authRoutes.ts
│   ├── productRoutes.ts
│   └── ...
├── services/        # Business logic services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
│   ├── emailService.ts
│   └── ...
└── server.ts        # Application entry point
```

## 🔒 Security Features

- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **JWT**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Express validator for input sanitization
- **Error Handling**: Comprehensive error handling middleware

## 🚀 Deployment

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Build the project
npm run build

# Start with PM2
pm2 start dist/server.js --name "ecommerce-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### Environment-specific Configurations

- **Development**: Hot reload with nodemon
- **Production**: Optimized build with error logging
- **Testing**: Isolated test database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email your-email@example.com or join our Discord channel.

## 🔄 Version History

- **v1.0.0** - Initial release with core e-commerce features
- **v1.1.0** - Added payment integration and order tracking
- **v1.2.0** - Enhanced admin dashboard and analytics