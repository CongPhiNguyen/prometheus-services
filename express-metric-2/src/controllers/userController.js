const axios = require("axios")
const authenEndpoint = process.env.AUTHEN_ENDPOINT_URL
  ? process.env.AUTHEN_ENDPOINT_URL
  : "http://localhost:5050"
// import fetch from "node-fetch"
class userController {
  login = async (req, res) => {
    res.status(200).json({ message: "Login" })
  }
  sendMail = async (req, res) => {
    axios
      .get(authenEndpoint + "/authen")
      .then((data) => {
        // console.log("data", data)
        res.status(200).json({ success: true, message: "Send mail ok" })
      })
      .catch((err) => {
        // console.log("err", err)
        res.status(200).json({
          success: false,
          message: "Authen failed"
          // err: JSON.stringify(err)
        })
      })
  }
}

module.exports = new userController()
