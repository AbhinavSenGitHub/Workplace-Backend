const mongoose = require("mongoose")
const { secretOrKey } = require("../config/keys")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
},
    { timestamps: true }
)

userSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateJwt = function() {
    const payload = {username: this.username, email: this.email}
    const token = jwt.sign(payload, secretOrKey, { expiresIn: '4m' }) 
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User
