const Wishlist = require('../models/Wishlist');

// Get user's wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
        
        if (!wishlist) {
            return res.status(200).json({
                success: true,
                data: { products: [] }
            });
        }

        return res.status(200).json({
            success: true,
            data: wishlist
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (!wishlist) {
            wishlist = new Wishlist({
                userId: req.user.id,
                products: [productId]
            });
        } else {
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Product already in wishlist'
                });
            }
            wishlist.products.push(productId);
        }

        await wishlist.save();
        await wishlist.populate('products');

        return res.status(200).json({
            success: true,
            message: 'Product added to wishlist',
            data: wishlist
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist not found'
            });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();
        await wishlist.populate('products');

        return res.status(200).json({
            success: true,
            message: 'Product removed from wishlist',
            data: wishlist
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
    getWishlist,
    addToWishlist,
    removeFromWishlist
};
