class userController {
  login = async (req, res) => {
    res.status(200).json({ message: "Login" })
  }
  sendMail = async (req, res) => {
    res.status(200).json({ success: true, message: "Login" })
  }
}

module.exports = new userController()
