const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendOrderConfirmationEmail } = require('../config/email');

async function getProductDetails(productId) {
    return await Product.findById(productId);
}

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        const itemsWithPrice = await Promise.all(
            cart.items.map(async (item) => {
                const product = await getProductDetails(item.productId);
                if (!product) {
                    throw new Error(`Product not found: ${item.productId}`);
                }
                return {
                    productId: item.productId,
                    title: product.title,
                    quantity: item.quantity,
                    price: product.salePrice || product.price
                };
            })
        );

        const totalAmount = itemsWithPrice.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const order = new Order({
            userId: req.user.id,
            items: itemsWithPrice,
            totalAmount,
            shippingAddress: req.body.shippingAddress
        });

        await order.save();

        await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { items: [] }
        );

        // Send order confirmation email (non-blocking)
        const user = await User.findById(req.user.id);
        if (user) {
            sendOrderConfirmationEmail(user.email, user.name, {
                orderId: order._id.toString().slice(-8),
                totalAmount: totalAmount.toFixed(2),
                itemCount: itemsWithPrice.length
            }).catch(err => console.error('Email error:', err));
        }

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order 
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const getOrderById =  async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId).populate('items.productId');
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        return res.status(200).json({
            success: true,
            data : order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ userId }).populate('items.productId');

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.status;
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status: newStatus },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus
};