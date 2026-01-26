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
    process.env.FRONTEND_URL || 'https://shopease-the-ecomm-site.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'
].filter(Boolean);

console.log('🌐 Allowed CORS origins:', allowedOrigins);

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            // In development, allow local network origins (for mobile testing)
            if (process.env.NODE_ENV !== 'production' && origin) {
                // Allow any localhost or local IP addresses (192.168.x.x, 10.x.x.x, etc.)
                const isLocalNetwork = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/.test(origin);
                if (isLocalNetwork) {
                    return callback(null, true);
                }
            }
            
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.warn('⚠️  CORS blocked origin:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        exposedHeaders: ['set-cookie'],
        preflightContinue: false,
        optionsSuccessStatus: 204
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

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port: ${port}`);
    console.log(`📱 For mobile testing, use your local IP address (e.g., http://192.168.x.x:${port})`);
    console.log(`💻 Local: http://localhost:${port}`);
});
