const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || "otheruse998877@gmail.com",
        pass: process.env.EMAIL_PASS || "donw omsn wemc qvzk"
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || "otheruse998877@gmail.com",
        to: userEmail,
        subject: 'Welcome to ShopEase!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">Welcome to ShopEase!</h1>
                <p>Hi ${userName},</p>
                <p>Thank you for creating an account with us. We're excited to have you as part of our community!</p>
                <p>Start exploring our wide range of products and enjoy shopping with exclusive deals.</p>
                <a href="http://localhost:5174/products" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Browse Products</a>
                <p>If you have any questions, feel free to contact our support team.</p>
                <p>Happy Shopping!<br>The ShopEase Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER || "otheruse998877@gmail.com",
        to: userEmail,
        subject: 'Order Confirmation - ShopEase',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">Order Confirmed!</h1>
                <p>Hi ${userName},</p>
                <p>Thank you for your order! Your order has been confirmed and is being processed.</p>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Order Details:</h3>
                    <p><strong>Order ID:</strong> #${orderDetails.orderId}</p>
                    <p><strong>Total Amount:</strong> ₹${orderDetails.totalAmount}</p>
                    <p><strong>Items:</strong> ${orderDetails.itemCount} item(s)</p>
                </div>
                <p>You can track your order status from your account.</p>
                <a href="http://localhost:5174/orders" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">View Order</a>
                <p>Thank you for shopping with us!<br>The ShopEase Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
    const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER || "otheruse998877@gmail.com",
        to: userEmail,
        subject: 'Password Reset Request - ShopEase',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">Password Reset Request</h1>
                <p>Hi ${userName},</p>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request a password reset, please ignore this email.</p>
                <p>Best regards,<br>The ShopEase Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};

module.exports = {
    transporter,
    sendWelcomeEmail,
    sendOrderConfirmationEmail,
    sendPasswordResetEmail
};
