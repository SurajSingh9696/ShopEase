const Category = require('../models/Category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({success: true,message: 'Categories retrieved successfully', data: categories});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error' , error: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const parentId = await Category.findOne({ name: parent });
        await Category.create({name , parentId: parentId ? parentId._id : null });
        return res.status(201).json({success: true, message: 'Category created successfully' });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error' , error: error.message });
    }

}

const updateCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const parentId = await Category.findOne({ name: parent });
        await Category.findByIdAndUpdate(req.params.id, {name , parentId: parentId ? parentId._id : null });
        return res.status(200).json({success: true, message: 'Category updated successfully' });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error' , error: error.message });
    }
}   

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({success: true, message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server Error' , error: error.message });
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};