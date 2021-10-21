const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const RoomSchema = new Schema({
    room_id: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    active: {
        type:Boolean,
        default: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('Room', RoomSchema);