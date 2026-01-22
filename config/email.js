const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Common sender (must be verified in Resend)
// Use environment variable for production - MUST be a verified domain in Resend
// Example: "ShopEase <noreply@yourdomain.com>"
const FROM_EMAIL = "ShopEase <onboarding@resend.dev>";

console.log('📧 Email service configured with sender:', FROM_EMAIL);

// ===============================
// WELCOME EMAIL
// ===============================
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: "Welcome to ShopEase!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to ShopEase!</h1>
          <p>Hi ${userName},</p>
          <p>Thank you for creating an account with us. We're excited to have you!</p>
          <p>Start exploring our wide range of products and enjoy exclusive deals.</p>
          <a href="https://your-frontend-domain.com/products"
             style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
             Browse Products
          </a>
          <p>Happy Shopping!<br/>The ShopEase Team</p>
        </div>
      `,
    });

    console.log("✅ Welcome email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

// ===============================
// ORDER CONFIRMATION EMAIL
// ===============================
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: "Order Confirmation - ShopEase",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Order Confirmed!</h1>
          <p>Hi ${userName},</p>
          <p>Your order has been successfully placed.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> #${orderDetails.orderId}</p>
            <p><strong>Total Amount:</strong> ₹${orderDetails.totalAmount}</p>
            <p><strong>Items:</strong> ${orderDetails.itemCount} item(s)</p>
          </div>

          <a href="https://your-frontend-domain.com/orders"
             style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">
             View Order
          </a>

          <p>Thank you for shopping with us!<br/>The ShopEase Team</p>
        </div>
      `,
    });

    console.log("✅ Order confirmation email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Error sending order confirmation email:", error);
  }
};

// ===============================
// PASSWORD RESET EMAIL
// ===============================
const sendPasswordResetEmail = async (userEmail, userName, code) => {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: "Password Reset Code - ShopEase",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Password Reset</h1>
          <p>Hi ${userName},</p>
          <p>Use the code below to reset your password:</p>

          <div style="background-color: #f3f4f6; padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h2 style="color: #2563eb; font-size: 36px; letter-spacing: 8px;">
              ${code}
            </h2>
          </div>

          <p><strong>This code expires in 15 minutes.</strong></p>
          <p>If you did not request this, please ignore this email.</p>

          <p>— The ShopEase Team</p>
        </div>
      `,
    });

    console.log("✅ Password reset email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendPasswordResetEmail,
};
