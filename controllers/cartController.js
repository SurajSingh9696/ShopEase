const Cart = require('../models/Cart');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart) {
            return res.status(200).json({ success: true, message: 'Cart is empty', data: { items: [] } });
        }

        const items = cart.items.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
            product: item.productId,
        }));

        return res.status(200).json({ success: true, message: 'Cart retrieved successfully', data: { items } });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
        }

        const cart = await Cart.findOne({ userId: req.user._id });
        if (cart) {
            const existing = cart.items.find((item) => item.productId.toString() === productId);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
            return res.status(200).json({ success: true, message: 'Item added to cart successfully' });
        }

        await Cart.create({ userId: req.user._id, items: [{ productId, quantity }] });
        return res.status(201).json({ success: true, message: 'Cart created and item added successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try{
        const { itemId } = req.params;
        const { quantity } = req.body;
        if(!quantity){
            return res.status(400).json({success: false, message: 'Quantity is required' });
        }
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        let updated = false;
        cart.items.forEach((item) => {
            if (item._id.toString() === itemId) {
                item.quantity = quantity;
                updated = true;
            }
        });

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        await cart.save();
        return res.status(200).json({ success: true, message: 'Item quantity updated successfully' });
    }catch(error){
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const removeFromCart =  async (req, res) => {
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        const updatedItems = cart.items.filter((item) => item._id.toString() !== itemId);
        cart.items = updatedItems;
        await cart.save();
        return res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        await Cart.deleteOne({ userId: req.user._id });
        return res.status(200).json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
};