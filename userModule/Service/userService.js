const { models } = require("mongoose")
const User = require("../../model/userModel");
const constant = require("../../constant/constant");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const passport = require("passport")
const key = require("../../config/keys")

module.exports = {
    addUser: async (obj) => {
        try {
            const userExists = await User.findOne({ email: obj.email })
            if (userExists) {
                console.log("User already exists")
                return { success: false, message: "User already exists" }
            } else {
                const newUser = new User(obj)
                console.log("New user: " + newUser.email)
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newUser.password, salt)
                newUser.password = hash
                await newUser.save()

                // setting token
                const token = newUser.generateJwt()
                return token
            }
        } catch (error) {
            console.log("Error while adding the user: ", error)
        }

    },

    loginUser: async (email, password) => {
        try {
            const userExists = await User.findOne({ email: email })

            if (!userExists || !(await userExists.validPassword(password))){
                return {success: false, message: "User does not exist"}
            }
        } catch (error) {
            console.log("Error while adding the user: ", error)
        }
    }
}