const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { sendWelcomeEmail } = require('../config/email');

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
}
const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isAlreadyUser = await User.findOne({ email: email });
        if (!isAlreadyUser) {
            return res.status(400).json({ success: false, message: "User not found, Do register first" });
        }
        if (isAlreadyUser.isBlocked) {
            return res.status(403).json({ success: false, message: "User is blocked, contact admin" });
        } else {
            if (await bcrypt.compare(password, isAlreadyUser.password)) {
                const accessToken = generateAccessToken({ id: isAlreadyUser._id, email: isAlreadyUser.email });
                const refreshToken = generateRefreshToken({ id: isAlreadyUser._id, email: isAlreadyUser.email });
                
                console.log('✅ Login successful for user:', email);
                
                // Return tokens in response body for localStorage storage
                return res.status(200).json({ 
                    success: true, 
                    message: "Login successful",
                    accessToken,
                    refreshToken,
                    user: {
                        _id: isAlreadyUser._id,
                        name: isAlreadyUser.name,
                        email: isAlreadyUser.email,
                        age: isAlreadyUser.age,
                        phone: isAlreadyUser.phone,
                        role: isAlreadyUser.role
                    }
                });
            }
            else {
                return res.status(400).json({ success: false, message: "Invalid Password" });
            }
        }
    } catch (error) {
        console.error('❌ Login error:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const registerController = async (req, res) => {
    try {
        const { name, age, email, password, phone } = req.body;
        const isAlreadyUser = await User.findOne({ email: email });
        if (isAlreadyUser) {
            return res.status(400).json({ success: false, message: "User already exists, Please login" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, age, email, password: hashedPassword, phone });
        const user = await User.findOne({ email: email });
        const accessToken = generateAccessToken({ id: user._id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email });
        
        // Send welcome email (non-blocking)
        sendWelcomeEmail(email, name).catch(err => console.error('Email error:', err));
        
        // Return tokens in response body for localStorage storage
        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully",
            accessToken,
            refreshToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                phone: user.phone,
                role: user.role
            }
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const refreshController = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const refreshToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
        
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "Refresh token not found" });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Invalid refresh token" });
            }
            const newAccessToken = generateAccessToken({ id: user.id, email: user.email });
            return res.status(200).json({ 
                success: true, 
                message: "Access token refreshed successfully",
                accessToken: newAccessToken
            });
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = {
    login: loginController,
    register: registerController,
    refresh: refreshController
};
