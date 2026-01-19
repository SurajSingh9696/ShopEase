const { accessCookieOptions, refreshCookieOptions } = require('../config/cookie');
const router = require('express').Router();

router.post('/login', require("../middlewares/authMiddleware").login, require('../controllers/authController').login);
router.post('/register', require("../middlewares/authMiddleware").register, require('../controllers/authController').register);
router.post('/refresh', require('../controllers/authController').refresh);
router.post('/logout', (req, res) => {
    res.clearCookie('accessToken', accessCookieOptions);
    res.clearCookie('refreshToken', refreshCookieOptions);
    return res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = router;