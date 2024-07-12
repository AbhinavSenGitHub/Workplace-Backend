const constant = require("../../constant/constant")
const userService = require("../Service/userService")
const { addUser } = require("../Service/userService")

module.exports = {
    addUser: async (req, res) => {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const response = await userService.addUser(userData)
        if (response) {
            res.status(200).send({
                message: "ho gaya bhai save tere user",
                data: true
            })
        } else {
            console.log("saved failed")
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            const response = await userService.loginUser(email, password)
            if (response) {
                res.status(constant.OK_SUCCESS).send({
                    message: "User login successful",
                    data: response,
                    success: 1
                })
            }else{
                res.status(constant.UNAUTHORIZED).send({
                    message: "User with the email or password not found",
                    success: 0
                })
            }
        } catch (error) {
            res.status(constant.INTERNAL_SERVER_ERROR).send({
                message: "Server Error",
                error: error,
                success: 0
            })
        }
    }
}