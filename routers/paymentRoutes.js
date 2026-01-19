const router = require('express').Router();
const authenticateUser = require('../middlewares/userMiddleware');
const adminOnly = require('../middlewares/roleMiddleware');
const {createPayment,
    getPaymentById,
    getPaymentsByUser,
    verifyPayment,
    updatePaymentStatus} = require('../controllers/paymentController');

router.post('/', authenticateUser, createPayment);
router.get('/:id', authenticateUser, getPaymentById);
router.get('/user/:userId', authenticateUser, getPaymentsByUser);
router.post('/:id/verify', authenticateUser, verifyPayment);
router.put('/:id/status', authenticateUser, adminOnly, updatePaymentStatus);

module.exports = router;