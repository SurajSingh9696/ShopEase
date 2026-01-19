const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
        required: true,
    },
    phone: {
        type: String,
        required: false,
        default: null,
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    },
    blockedReason: {
        type: String,
        required: false,
        default: null,
    },
    lastLogin: {
        type: Date,
        required: false,
        default: null,
    },
}, {
    collection: 'users',
    timestamps: true,
});

module.exports = mongoose.model('User', mongoSchema );

