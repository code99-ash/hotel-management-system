const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    room_number: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: ['vacant', 'booked'],
        default: 'vacant'
    },
}, {timestamps: true});

module.exports = mongoose.model('Room', RoomSchema);