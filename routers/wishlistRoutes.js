const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/userMiddleware');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

router.get('/', authenticateUser, getWishlist);
router.post('/add', authenticateUser, addToWishlist);
router.delete('/remove/:productId', authenticateUser, removeFromWishlist);

module.exports = router;
