const { addUser, loginUser } = require("../controler/userControler");

const router = require("express").Router();

// request call 
router.post("/api/signup", addUser)

router.post("api/login", loginUser)
// export router
module.exports = router