const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        typr: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'staff', 'customer'],
        default: 'customer'
    },
    mobile_number: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        default: true,
    }

}, {timestamps: true});

module.export = mongoose.model('User', UserSchema)