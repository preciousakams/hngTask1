const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    'username': {
        type: String,
        unique: true,
        required: [true, 'please provide a username']
    },
    'email': {
        type: String,
        unique: true,
        required: [true, 'please provide an email']
    },
    'password': {
        type: String,
        required: [true, 'please provide a password']
    },

})

userSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10, function(error, encrypted) {
        user.password = encrypted
        next()
    })
})


module.exports = mongoose.model('user', userSchema)