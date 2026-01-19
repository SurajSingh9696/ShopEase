const User = require('../models/User');

const adminOnly = (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
        }
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
}

module.exports = adminOnly;