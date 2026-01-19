const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount:{
        type: Number,
        required: true,
        min: 0
    },
    provider:{
        type: String,
        enum: ['stripe', 'paypal', 'razorpay', 'paytm', 'cash'],
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transactionId:{
        type: String,
        required: true,
        unique: true
    },  
},
{
    collection: 'payments',
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;