const express = require("express")
const router = express.Router()
const authenController = require("../controllers/authenController")

router.get("/login", authenController.login)
router.get("/", authenController.authen)

module.exports = router
