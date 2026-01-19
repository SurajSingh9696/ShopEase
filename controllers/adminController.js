const User = require('../models/User');
const Order = require('../models/Order');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ success: true, message: "Users retrieved successfully", data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const blockUser = async(req, res) => {
    try {
        const blockingId = req.params.id;
        const blockingReason = req.body.reason;
        await User.findByIdAndUpdate(blockingId, { isBlocked: true , blockedReason: blockingReason });
        return res.status(200).json({ success: true, message: "User blocked successfully" });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error' });
    }
}

//{reason: 'Spamming activities'}

const unblockUser = async (req, res) => {
    try {
        const unblockingId = req.params.id;
        await User.findByIdAndUpdate(unblockingId, { isBlocked: false , blockedReason: null });
        return res.status(200).json({ success: true, message: "User unblocked successfully" });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error' });
    }
}


const updateOrderStatus =  async (req, res) => {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.status;
        await Order.findByIdAndUpdate(orderId, { status: newStatus });
        return res.status(200).json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error' });
    }
}

//{status: 'shipped'}

module.exports = {
    getAllUsers,
    getAllOrders,
    blockUser,
    unblockUser,
    updateOrderStatus
};