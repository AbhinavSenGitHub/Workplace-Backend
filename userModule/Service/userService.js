const { models } = require("mongoose")
const User = require("../../model/userModel");
const constant = require("../../constant/constant");

module.exports = {
    addUser: async (obj) => {
        const newUser = new User(obj);
        try {
            await newUser.save();
            console.log("user:", newUser);
            return newUser;
        } catch (error) {
            console.log("error saving user:", error);
            throw new Error('Error saving user');
        }
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