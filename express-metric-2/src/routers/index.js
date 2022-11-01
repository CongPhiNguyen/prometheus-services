const userRoute = require("./user")
const client = require("prom-client")
function route(app) {
  const collectionDefaultMetrics = client.collectDefaultMetrics
  collectionDefaultMetrics()
  app.use("/", userRoute)
  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType)
    return res.send(await client.register.metrics())
  })
  app.use("/haisss", (req, res) => {
    res.send("ABC")
  })
}

module.exports = route
