const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/userMiddleware');
const adminOnly = require('../middlewares/roleMiddleware');
const { applyCoupon, createCoupon, getAllCoupons, deleteCoupon } = require('../controllers/couponController');

router.post('/apply', authenticateUser, applyCoupon);
router.post('/create', authenticateUser, adminOnly, createCoupon);
router.get('/all', authenticateUser, adminOnly, getAllCoupons);
router.delete('/:id', authenticateUser, adminOnly, deleteCoupon);

module.exports = router;
