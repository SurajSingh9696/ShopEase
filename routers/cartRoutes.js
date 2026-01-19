const router = require('express').Router();
const {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');
const authenticateUser = require('../middlewares/userMiddleware');

router.get('/', authenticateUser, getCart);
router.post('/add', authenticateUser, addToCart);
router.put('/update/:itemId', authenticateUser, updateQuantity);
router.delete('/remove/:itemId', authenticateUser, removeFromCart);
router.delete('/clear', authenticateUser, clearCart);

module.exports = router;