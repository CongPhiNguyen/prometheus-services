class authenController {
  login = async (req, res) => {
    res.status(200).json({ message: "Login" })
  }
  authen = async (req, res) => {
    res.status(200).json({ success: true, message: "Authentication complete" })
  }
}

module.exports = new authenController()
