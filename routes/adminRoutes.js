const express = require("express")
const router = express.Router()
const { registeradmin, loginadmin } = require("../controllers/adminController")


router.post("/", registeradmin)

router.post("/login", loginadmin)

module.exports = router; 