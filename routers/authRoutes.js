const router = require('express').Router();

router.post('/login', require("../middlewares/authMiddleware").login, require('../controllers/authController').login);
router.post('/register', require("../middlewares/authMiddleware").register, require('../controllers/authController').register);
router.post('/refresh', require('../controllers/authController').refresh);
router.post('/logout', (req, res) => {
    // No need to clear cookies anymore, client handles token removal
    return res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = router;