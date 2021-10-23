const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const BookingSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    room_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    }],
    amount: {
        type: Number,
        required: true,
    },
    payment_reference: {
        type: String,
        required: false,
    },
    check_in_date: {
        type: Date,
        required: false,
    },
    check_out_date: {
        type: Date,
        required: false,
    },
    released_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    held_back_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.export = mongoose.model('Booking', BookingSchema);