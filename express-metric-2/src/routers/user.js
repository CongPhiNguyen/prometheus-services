const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/login", userController.login)
router.get("/send-mail", userController.sendMail)

module.exports = router
