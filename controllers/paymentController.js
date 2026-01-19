const Order = require('../models/Order');
const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
    try {
        const { orderId, amount, provider, transactionId } = req.body;
        await Payment.create({ userId: req.user.id, orderId, amount, provider, transactionId });
        return res.status(201).json({success: true, message: 'Payment created successfully'});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}

const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({success: false, message: 'Payment not found'});
        }
        return res.status(200).json({success: true, message: 'Payment retrieved successfully', data: payment});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}

const getPaymentsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const payments = await Payment.find({ userId });
        return res.status(200).json({success: true, message: 'Payments retrieved successfully', data: payments});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}

const verifyPayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({success: false, message: 'Payment not found'});
        }
        // Placeholder for actual verification logic
        return res.status(200).json({success: true, message: 'Payment status verified', data: payment});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}

const updatePaymentStatus =  async (req, res) => {
    try {
        const paymentId = req.params.id;
        const { status } = req.body;
        const payment = await Payment.findByIdAndUpdate(paymentId, { status: status }, { new: true });
        if (!payment) {
            return res.status(404).json({success: false, message: 'Payment not found'});
        }
        if (status === 'completed') {
            await Order.findByIdAndUpdate(payment.orderId, { paymentId: payment._id, status: 'processing' });
        }
        return res.status(200).json({success: true, message: 'Payment verified and order updated successfully'});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}

module.exports = {
    createPayment,
    getPaymentById,
    getPaymentsByUser,
    verifyPayment,
    updatePaymentStatus
};