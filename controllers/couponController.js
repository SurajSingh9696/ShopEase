const Coupon = require('../models/Coupon');

// Validate and apply coupon
const applyCoupon = async (req, res) => {
    try {
        const { code, orderAmount } = req.body;

        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(),
            isActive: true,
            expiryDate: { $gt: new Date() }
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Invalid or expired coupon code'
            });
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({
                success: false,
                message: 'Coupon usage limit reached'
            });
        }

        if (orderAmount < coupon.minPurchase) {
            return res.status(400).json({
                success: false,
                message: `Minimum purchase of ₹${coupon.minPurchase} required`
            });
        }

        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (orderAmount * coupon.discountValue) / 100;
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        } else {
            discount = coupon.discountValue;
        }

        discount = Math.min(discount, orderAmount);

        return res.status(200).json({
            success: true,
            data: {
                couponId: coupon._id,
                code: coupon.code,
                discount: discount,
                finalAmount: orderAmount - discount
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Create coupon (admin only)
const createCoupon = async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();

        return res.status(201).json({
            success: true,
            message: 'Coupon created successfully',
            data: coupon
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get all coupons (admin only)
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: coupons
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Delete coupon (admin only)
const deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Coupon deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    applyCoupon,
    createCoupon,
    getAllCoupons,
    deleteCoupon
};
