const router = require('express').Router();
const authenticateUser = require('../middlewares/userMiddleware');
const adminOnly = require('../middlewares/roleMiddleware');
const {addReview,
    getReviewsByProduct,
    deleteReview} = require('../controllers/reviewController');

router.post('/:productId', authenticateUser, addReview);
router.get('/product/:productId', authenticateUser, getReviewsByProduct);
router.delete('/:id', authenticateUser, adminOnly, deleteReview);

module.exports = router;