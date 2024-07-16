const { models } = require("mongoose")
const User = require("../../model/userModel");
const constant = require("../../constant/constant");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const passport = require("passport")
const key = require("../../config/keys")

module.exports = {
    addUser: async (obj) => {

        const userExists = await User.findOne({ email: obj.email })
        if (userExists) {
            console.log("User already exists")
        } else {
            const newUser = new User(obj);
            console.log("New user: " + newUser.email)
            try {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });

            } catch (error) {
                console.log("error saving user:", error);
                throw new Error('Error saving user');
            }
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