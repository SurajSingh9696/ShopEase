const router = require('express').Router();
const authenticateUser = require('../middlewares/userMiddleware');
const {getProfile,
    updateProfile,
    addAddress,
    getAddresses,
    updateAddress,
    getMe,
    deleteAddress} = require('../controllers/userController');

router.get('/profile', authenticateUser, getProfile);
router.get('/me', authenticateUser, getMe);
router.put('/profile', authenticateUser, updateProfile);
router.post('/addresses', authenticateUser, addAddress);
router.get('/addresses', authenticateUser, getAddresses);
router.put('/addresses/:id', authenticateUser, updateAddress);
router.delete('/addresses/:id', authenticateUser, deleteAddress);

module.exports = router;