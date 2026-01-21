const Cart = require('../models/Cart');

const getCart = async (req, res) => {
    try {
        console.log('🛒 [GET] Fetching cart for user:', req.user._id);
        
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        
        if (!cart) {
            console.log('📭 Cart is empty for user:', req.user._id);
            return res.status(200).json({ success: true, message: 'Cart is empty', data: { items: [] } });
        }

        console.log(`✅ Cart retrieved: ${cart.items.length} items`);
        
        const items = cart.items.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
            product: item.productId,
        }));

        return res.status(200).json({ success: true, message: 'Cart retrieved successfully', data: { items } });
    } catch (error) {
        console.error('❌ Error fetching cart:', error.message);
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        console.log('🛒 [ADD] Adding to cart:', { productId, quantity, userId: req.user._id });
        console.log('🔍 ProductId type:', typeof productId, '| Value:', productId);
        
        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
        }

        const cart = await Cart.findOne({ userId: req.user._id });
        if (cart) {
            // FIX: Convert both to string for comparison (Issue #2: ObjectId mismatch)
            const existing = cart.items.find((item) => item.productId.toString() === productId.toString());
            
            if (existing) {
                console.log('✅ Item exists, updating quantity from', existing.quantity, 'to', existing.quantity + quantity);
                existing.quantity += quantity;
            } else {
                console.log('➕ Adding new item to cart');
                cart.items.push({ productId, quantity });
            }
            
            await cart.save();
            console.log('💾 Cart saved successfully, total items:', cart.items.length);
            return res.status(200).json({ success: true, message: 'Item added to cart successfully' });
        }

        console.log('🆕 Creating new cart');
        await Cart.create({ userId: req.user._id, items: [{ productId, quantity }] });
        return res.status(201).json({ success: true, message: 'Cart created and item added successfully' });
    } catch (error) {
        console.error('❌ Error adding to cart:', error.message);
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try{
        const { itemId } = req.params;
        const { quantity } = req.body;
        
        console.log('🔄 [UPDATE] Updating cart item:', { itemId, quantity, userId: req.user._id });
        console.log('🔍 ItemId type:', typeof itemId, '| Value:', itemId);
        
        if(!quantity){
            return res.status(400).json({success: false, message: 'Quantity is required' });
        }
        
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            console.log('❌ Cart not found for user:', req.user._id);
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        console.log('📦 Cart before update:', cart.items.map(i => ({ id: i._id.toString(), qty: i.quantity })));
        
        let updated = false;
        cart.items.forEach((item) => {
            // FIX: Convert both to string for comparison (Issue #2: ObjectId mismatch)
            if (item._id.toString() === itemId.toString()) {
                console.log(`✅ Found item, updating quantity from ${item.quantity} to ${quantity}`);
                item.quantity = quantity;
                updated = true;
            }
        });

        if (!updated) {
            console.log('❌ Item not found in cart. Available items:', cart.items.map(i => i._id.toString()));
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        await cart.save();
        console.log('💾 Cart updated successfully');
        console.log('📦 Cart after update:', cart.items.map(i => ({ id: i._id.toString(), qty: i.quantity })));
        
        return res.status(200).json({ success: true, message: 'Item quantity updated successfully' });
    }catch(error){
        console.error('❌ Error updating cart:', error.message);
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const removeFromCart =  async (req, res) => {
    try {
        const { itemId } = req.params;
        
        console.log('🗑️  [DELETE] Removing cart item:', { itemId, userId: req.user._id });
        console.log('🔍 ItemId type:', typeof itemId, '| Value:', itemId);
        
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            console.log('❌ Cart not found for user:', req.user._id);
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        
        console.log('📦 Cart before removal:', cart.items.map(i => ({ id: i._id.toString(), qty: i.quantity })));
        
        const initialLength = cart.items.length;
        // FIX: Convert both to string for comparison (Issue #2: ObjectId mismatch)
        const updatedItems = cart.items.filter((item) => item._id.toString() !== itemId.toString());
        
        if (updatedItems.length === initialLength) {
            console.log('❌ Item not found in cart. Available items:', cart.items.map(i => i._id.toString()));
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        
        cart.items = updatedItems;
        await cart.save();
        
        console.log('✅ Item removed successfully');
        console.log('📦 Cart after removal:', cart.items.map(i => ({ id: i._id.toString(), qty: i.quantity })));
        
        return res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('❌ Error removing from cart:', error.message);
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