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
// new commit 

        console.log("inside the server: ", userData)
        try {
            const response = await userService.addUser(userData);
            console.log("response: ", response)
            if(response.success){
                res.status(200).send({
                    message: "User is saved successfully",
                    data: response, // You can send the saved user object back if needed
                });
            }
            
        } catch (error) {
            console.log("Error while saving user:", error.message);
            res.status(500).send({
                message: "Error while saving this user",
                data: false,    
                error: error.message,
            });
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
            } else {
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