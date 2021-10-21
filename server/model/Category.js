const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema)
