const router = require('express').Router();
const authenticateUser = require('../middlewares/userMiddleware');
const adminOnly = require('../middlewares/roleMiddleware');
const {getCategories,
    createCategory,
    updateCategory,
    deleteCategory} = require('../controllers/categoryController');

// Public category listing
router.get('/', getCategories);
router.post('/', authenticateUser, adminOnly, createCategory);
router.put('/:id', authenticateUser, adminOnly, updateCategory);
router.delete('/:id', authenticateUser, adminOnly, deleteCategory);

module.exports = router;