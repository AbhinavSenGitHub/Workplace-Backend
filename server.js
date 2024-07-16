const express = require("express")
const cors = require("cors")
const app = express()
const passport = require("passport")
// here we require data base file for connecting ..............
const db = require("./config/db")
// cors set up
app.use(cors({origin: "*"}))

// use express.json to parsing the data
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// import Router
const userRouter = require("./userModule/Router/userRouter")

// ROUTE
app.use("/", userRouter)

var PORT = 8080
app.listen(PORT, (error, res) => {
    if(error) {
        return res.send("Something went wrond")
    }else{
        console.log("listening on port " + PORT)
    }
})