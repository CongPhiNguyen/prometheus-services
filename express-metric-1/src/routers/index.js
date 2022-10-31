const authenRoute = require("./authen")

function route(app) {
  app.use("/authen", authenRoute)
  app.use("/", (req, res) => {
    res.send("ABC")
  })
}

module.exports = route
