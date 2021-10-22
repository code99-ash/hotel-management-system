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
        required: false
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ]

}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema)
