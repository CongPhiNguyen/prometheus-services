const userRoute = require("./user")

function route(app) {
  app.use("/", userRoute)
  app.use("/haisss", (req, res) => {
    res.send("ABC")
  })
}

module.exports = route
