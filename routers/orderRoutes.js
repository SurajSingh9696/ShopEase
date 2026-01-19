const router = require('express').Router();
const authenticateUser = require('../middlewares/userMiddleware');
const adminOnly = require('../middlewares/roleMiddleware');
const {createOrder,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus} = require('../controllers/orderController');

router.post('/', authenticateUser, createOrder);
router.get('/:id', authenticateUser, getOrderById);
router.get('/user/:userId', authenticateUser, getOrdersByUser);
router.put('/:id/status', authenticateUser, adminOnly, updateOrderStatus);

module.exports = router;