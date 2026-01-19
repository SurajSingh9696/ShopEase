const router = require('express').Router();
const authenticateUser = require('../middlewares/userMiddleware');
const adminOnly = require('../middlewares/roleMiddleware');
const { getAllUsers,
    getAllOrders,
    blockUser,
    unblockUser,
    updateOrderStatus } = require('../controllers/adminController');

router.get('/users', authenticateUser, adminOnly, getAllUsers);
router.get('/orders', authenticateUser, adminOnly, getAllOrders);
router.post('/users/:id/block', authenticateUser, adminOnly, blockUser);
router.post('/users/:id/unblock', authenticateUser, adminOnly, unblockUser);
router.put('/orders/:id/status', authenticateUser, adminOnly, updateOrderStatus);

module.exports = router;