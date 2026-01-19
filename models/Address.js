const mongoose = require('mongoose');
const user = require('./User');

const mongoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    line1: {
        type: String,
        required: true
    },
    line2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
},{
    collection: 'addresses',
    timestamps: true
});

module.exports = mongoose.model('Address', mongoSchema);