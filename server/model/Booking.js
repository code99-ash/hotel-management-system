const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const BookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    quantity: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_reference: {
        type: String,
        required: true
    },
    day_in: {
        type: Date,
        required: true,
    },
    day_out: {
        type: Date,
        required: true
    },
    released_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
})

module.export = mongoose.model('Booking', BookingSchema);