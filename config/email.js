const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/\s+/g, '') // Remove all spaces from password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter configuration on startup
transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ Email configuration error:', error.message);
        console.log('\n📧 To fix email sending:');
        console.log('1. Go to https://myaccount.google.com/apppasswords');
        console.log('2. Generate a new App Password for "Mail"');
        console.log('3. Update EMAIL_PASS in your .env file (remove all spaces)');
        console.log('4. Restart the server\n');
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
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
        from: process.env.EMAIL_USER,
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

// Send password reset email with 6-digit code
const sendPasswordResetEmail = async (userEmail, userName, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Password Reset Code - ShopEase',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">Password Reset Request</h1>
                <p>Hi ${userName},</p>
                <p>We received a request to reset your password. Use the code below to verify your identity:</p>
                <div style="background-color: #f3f4f6; padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <h2 style="color: #2563eb; font-size: 36px; margin: 0; letter-spacing: 8px;">${code}</h2>
                </div>
                <p><strong>This code will expire in 15 minutes.</strong></p>
                <p>If you didn't request a password reset, please ignore this email or contact our support team if you're concerned about your account security.</p>
                <p>Best regards,<br>The ShopEase Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset code sent to:', userEmail);
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
