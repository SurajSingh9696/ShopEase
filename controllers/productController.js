const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, limit } = req.query;
        
        // Build filter object
        let filter = { isActive: true };
        
        // Filter by category (category name is stored in array)
        if (category) {
            filter.category = { $in: [category] };
        }
        
        // Search in title and description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Filter by price range
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        
        // Execute query with optional limit
        let query = Product.find(filter);
        if (limit) query = query.limit(Number(limit));
        
        const products = await query;
        return res.status(200).json({ success: true, message: 'Products retrieved successfully', data: products });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.status(200).json({ success: true, message: 'Product retrieved successfully', data: product });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, categoryId, salePrice, sku, brand, images, stock } = req.body;
        await Product.create({ title, description, price, category, categoryId, salePrice, sku, brand, images, stock });
        return res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};  