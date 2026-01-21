const router = require('express').Router();
const { 
    requestPasswordReset, 
    verifyResetCode, 
    resetPassword 
} = require('../controllers/passwordResetController');

// Request password reset - send code
router.post('/request', requestPasswordReset);

// Verify reset code
router.post('/verify', verifyResetCode);

// Reset password with code
router.post('/reset', resetPassword);

module.exports = router;
