const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const bcrypt = require('bcryptjs');
const { sendPasswordResetEmail } = require('../config/email');

// Generate 6-digit code
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password reset - send code to email
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'No account found with this email address' 
            });
        }

        // Generate 6-digit code
        const code = generateCode();

        // Delete any existing reset codes for this email
        await PasswordReset.deleteMany({ email: email.toLowerCase() });

        // Save new reset code
        await PasswordReset.create({
            email: email.toLowerCase(),
            code: code,
        });

        // Send email with code (non-blocking)
        sendPasswordResetEmail(email, user.name, code)
            .catch(err => console.error('Email error:', err));

        return res.status(200).json({ 
            success: true, 
            message: 'Password reset code has been sent to your email' 
        });
    } catch (error) {
        console.error('Password reset request error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

// Verify reset code
const verifyResetCode = async (req, res) => {
    try {
        const { email, code } = req.body;

        // Find the reset code
        const resetEntry = await PasswordReset.findOne({ 
            email: email.toLowerCase(),
            code: code 
        });

        if (!resetEntry) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid or expired code' 
            });
        }

        // Check if code has expired
        if (new Date() > resetEntry.expiresAt) {
            await PasswordReset.deleteOne({ _id: resetEntry._id });
            return res.status(400).json({ 
                success: false, 
                message: 'Code has expired. Please request a new one' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Code verified successfully' 
        });
    } catch (error) {
        console.error('Verify code error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

// Reset password with verified code
const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        // Verify the code again
        const resetEntry = await PasswordReset.findOne({ 
            email: email.toLowerCase(),
            code: code 
        });

        if (!resetEntry) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid or expired code' 
            });
        }

        // Check if code has expired
        if (new Date() > resetEntry.expiresAt) {
            await PasswordReset.deleteOne({ _id: resetEntry._id });
            return res.status(400).json({ 
                success: false, 
                message: 'Code has expired. Please request a new one' 
            });
        }

        // Find user and update password
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Delete the reset code
        await PasswordReset.deleteOne({ _id: resetEntry._id });

        return res.status(200).json({ 
            success: true, 
            message: 'Password has been reset successfully. You can now login with your new password' 
        });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

module.exports = {
    requestPasswordReset,
    verifyResetCode,
    resetPassword,
};
