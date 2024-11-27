const { Schema, model } =require('mongoose');

const User =new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    cart_items: {
        type: Object,
        default: {}
    }
})
module.exports =model("users", User);