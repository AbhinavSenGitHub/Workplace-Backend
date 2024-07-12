const { models } = require("mongoose")
const User = require("../../model/userModel");
const constant = require("../../constant/constant");

module.exports = {
    addUser: async (obj) => {
        const newUser = new User(obj);
        return await newUser.save().then(() => {
            return newUser;
        }).catch((error) => {
            console.log("error saving user")
        })
    },

    loginUser: async (email, password) => {
        try {
            const userFound = await User.findOne({ email: email, password: password })
            if (!userFound) {
                return null
            } else {
                return userFound
            }
        } catch (error) {
            return error
        }
    }
}