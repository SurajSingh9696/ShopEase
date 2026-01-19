const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true  
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: [String],
        required: true
    },
    categoryId:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        required: true
    },
    salePrice:{
        type: Number,
        default: null,  
        min: 1
    },
    sku:{
        type: String,
        required: true,
        unique: true
    },
    brand:{
        type: String,
        required: true
    },
    images:{
        type: [String],
        required: true
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{
    collection: 'products',
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;