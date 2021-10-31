const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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

}, {emitIndexErrors: true, timestamps: true});

var handleE11000 = function(error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('There was a duplicate key error'));
    } else {
      next();
    }
};

CategorySchema.post('save', handleE11000);

module.exports = mongoose.model('Category', CategorySchema)
