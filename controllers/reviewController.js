const Review = require('../models/Review');

const addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;
        await Review.create({
            productId,
            userId,
            rating,
            comment
        });
        return res.status(201).json({ success: true, message: 'Review added successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).populate('userId', 'name');
        return res.status(200).json({ success: true, message: 'Reviews fetched successfully', data: reviews });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

module.exports = {
    addReview,
    getReviewsByProduct,
    deleteReview
};