require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const route = require("./src/routers/index")
const connectDB = require("./src/config/configDb")
const PORT = process.env.PORT || 5050
const { metricsMiddleware } = require("./src/middleware/PrometheusMetric.js")

app.use(bodyParser.json({ limit: 10000 }))
app.use(bodyParser.urlencoded({ extended: true, limit: 10000 }))
app.use(cors())
app.use(cookieParser())
app.use(express.static("public"))
app.use(metricsMiddleware)
connectDB()
route(app)

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT)
})
