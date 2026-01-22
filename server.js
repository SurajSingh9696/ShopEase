const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

// CORS configuration for both localhost and production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://shopease-the-ecomm-site.onrender.com'
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.warn('⚠️  CORS blocked origin:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['set-cookie']
    })
);
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5000;

app.use('/auth', require('./routers/authRoutes'));
app.use('/user', require('./routers/userRoutes'));
app.use('/category', require('./routers/categoryRoutes'));
app.use('/product', require('./routers/productRoutes'));
app.use('/payment', require('./routers/paymentRoutes'));
app.use('/order', require('./routers/orderRoutes'));
app.use('/admin', require('./routers/adminRoutes'));
app.use('/review', require('./routers/reviewRoutes'));
app.use('/cart', require('./routers/cartRoutes'));
app.use('/wishlist', require('./routers/wishlistRoutes'));
app.use('/coupon', require('./routers/couponRoutes'));
app.use('/password-reset', require('./routers/passwordResetRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
