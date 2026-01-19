const User = require('../models/User');
const Address = require('../models/Address');

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password -__v');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: "User profile fetched successfully", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = req.body; 
        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true }).select('-password -__v');
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: "User profile updated successfully", user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const addAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = req.body; 
        const newAddress = await Address.create({ userId, ...data });
        return res.status(201).json({ success: true, message: "Address added successfully", address: newAddress });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const getAddresses = async (req, res) => {
    try {
        const userId = req.user._id;
        const addresses = await Address.find({ userId });
        return res.status(200).json({ success: true, message: "Addresses fetched successfully", addresses });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const updateAddress =  async (req, res) => {
    try {
        const userId = req.user._id;
        const addressId = req.params.id;
        const data = req.body; 
        const updatedAddress = await Address.findOneAndUpdate({ _id: addressId, userId }, data, { new: true });
        if (!updatedAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }   
        return res.status(200).json({ success: true, message: "Address updated successfully", address: updatedAddress });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const addressId = req.params.id;
        const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId });
        if (!deletedAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        return res.status(200).json({ success: true, message: "Address deleted successfully", address: deletedAddress });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}
const getMe = async (req, res) => {
    try {
        const user = req.user;
        const userData = await User.findById(user._id).select('-password -__v');
        return res.status(200).json({ success: true, message: "Current user fetched successfully", user: userData });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    getMe
}