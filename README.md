# 🛍️ ShopEase - Modern E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. ShopEase provides a complete online shopping experience with user authentication, product management, shopping cart, wishlist, order processing, and an admin dashboard.

![ShopEase](https://img.shields.io/badge/ShopEase-E--Commerce-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🌟 Features

### Customer Features
- 🔐 **User Authentication**: Secure registration, login, and JWT-based authentication
- 🔑 **Password Reset**: Email-based password recovery with verification codes
- 🛒 **Shopping Cart**: Add, update, and remove items from cart
- ❤️ **Wishlist**: Save favorite products for later
- 🔍 **Product Search & Filter**: Browse and filter products by categories
- 📦 **Order Management**: Place orders and track order history
- ⭐ **Product Reviews**: Rate and review purchased products
- 👤 **User Profile**: Manage personal information and addresses
- 💳 **Secure Checkout**: Streamlined checkout process

### Admin Features
- 📊 **Admin Dashboard**: Overview of sales, orders, and users
- 📦 **Product Management**: Create, update, and delete products
- 🏷️ **Category Management**: Organize products into categories
- 👥 **User Management**: View and manage user accounts
- 📋 **Order Management**: View and update order statuses
- 💰 **Coupon System**: Create and manage discount coupons

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router DOM 6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - MongoDB ODM
- **JWT** - Token-based authentication
- **Bcrypt.js** - Password hashing
- **Nodemailer/Resend** - Email service
- **Joi** - Data validation
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas account)
- **npm** or **yarn**

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shopease.git
cd shopease
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Create .env file in root directory
cp .env.example .env
```

Configure your `.env` file:
```env
# Database
MONGODB_URL=your_mongodb_connection_string

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cookie
COOKIE_EXPIRE=7

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email (Nodemailer/Resend)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
# OR use Resend
RESEND_API_KEY=your_resend_api_key
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Create .env file in frontend directory
cp .env.example .env
```

Configure frontend `.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Seed Database (Optional)

To populate the database with sample data:
```bash
# From root directory
npm run seed
```

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Backend
```bash
# From root directory
npm run dev
```
Backend runs on `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
# From frontend directory
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Mode

#### Backend
```bash
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
ShopEase/
├── config/              # Configuration files (DB, email, cookies)
├── controllers/         # Request handlers
├── middlewares/         # Custom middleware (auth, roles)
├── models/             # Mongoose schemas
├── routers/            # API routes
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React Context (Auth, Cart, Wishlist)
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── utils/      # Utility functions
│   └── public/         # Static assets
├── server.js           # Express server entry point
├── seedData.js         # Database seeding script
└── package.json        # Backend dependencies
```

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

### Password Reset
- `POST /password-reset/request` - Request password reset
- `POST /password-reset/verify-code` - Verify reset code
- `POST /password-reset/reset` - Reset password

### Products
- `GET /product` - Get all products
- `GET /product/:id` - Get product by ID
- `POST /product` - Create product (Admin)
- `PUT /product/:id` - Update product (Admin)
- `DELETE /product/:id` - Delete product (Admin)

### Categories
- `GET /category` - Get all categories
- `POST /category` - Create category (Admin)
- `PUT /category/:id` - Update category (Admin)
- `DELETE /category/:id` - Delete category (Admin)

### Cart
- `GET /cart` - Get user cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item
- `DELETE /cart/remove/:productId` - Remove item from cart

### Wishlist
- `GET /wishlist` - Get user wishlist
- `POST /wishlist/add` - Add to wishlist
- `DELETE /wishlist/remove/:productId` - Remove from wishlist

### Orders
- `GET /order` - Get user orders
- `GET /order/:id` - Get order details
- `POST /order` - Create new order
- `PUT /order/:id` - Update order status (Admin)

### Reviews
- `GET /review/product/:productId` - Get product reviews
- `POST /review` - Create review
- `PUT /review/:id` - Update review
- `DELETE /review/:id` - Delete review

### Admin
- `GET /admin/users` - Get all users
- `GET /admin/orders` - Get all orders
- `GET /admin/stats` - Get dashboard statistics

## 👤 Default Admin Credentials (After Seeding)

```
Email: admin@shopease.com
Password: Admin123!
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookies for token storage
- CORS protection
- Input validation with Joi
- Role-based access control (Admin/Customer)
- Secure password reset flow

## 🎨 UI Features

- Responsive design (mobile, tablet, desktop)
- Modern and clean interface
- Loading states and spinners
- Toast notifications for user feedback
- Protected routes
- Smooth scrolling and navigation

## 📦 Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables in hosting platform
2. Deploy from GitHub repository
3. Ensure MongoDB Atlas is configured

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables
4. Update backend CORS settings with production URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Suraj Singh**

## 🐛 Known Issues

None at the moment. Please report any issues in the Issues section.

## 📧 Support

For support, email support@shopease.com or open an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing library
- Express team for the robust framework
- MongoDB for the flexible database
- Tailwind CSS for the utility-first styling approach
- All open-source contributors

---

⭐ If you find this project useful, please consider giving it a star!
