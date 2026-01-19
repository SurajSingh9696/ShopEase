const router = require('express').Router();
const authenticateUser = require('../middlewares/userMiddleware');
const adminOnly = require('../middlewares/roleMiddleware');
const { getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/productController');

// Public product browse endpoints
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticateUser, adminOnly, createProduct);
router.put('/:id', authenticateUser, adminOnly, updateProduct);
router.delete('/:id', authenticateUser, adminOnly, deleteProduct);

module.exports = router;