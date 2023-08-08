const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    friends: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User