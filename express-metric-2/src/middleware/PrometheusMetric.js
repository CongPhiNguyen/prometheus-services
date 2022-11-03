const promBundle = require("express-prom-bundle")
const mongoose = require("mongoose")
const URI_TRACKING = process.env.TRACKING_SERVICE_MONGO
  ? process.env.TRACKING_SERVICE_MONGO
  : "mongodb+srv://phiroud:1@tracking-service.cp1dn0g.mongodb.net/tracking-service"

const logCon = mongoose.createConnection(URI_TRACKING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const { logger } = require("../utils/logger")

const getIpFromRequest = (req) => {
  let ips = (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    ""
  ).split(",")

  return ips[0].trim()
}

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  bypass: (req) => {
    console.log("req.ip", req.ip)
    console.log("req.ip", getIpFromRequest(req))
    console.log("req.ip", req.connection.remoteAddress)
    logger.log({
      level: "info",
      message: req
    })
    const logCollection = logCon.model(
      "log",
      new mongoose.Schema(
        {
          info: {}
        },
        { timestamps: true }
      )
    )
    logCollection.insertMany({
      info: { ip: req.ip }
    })
    return false
  },
  // httpDurationMetricName: "nguyencongphi",
  customLabels: {
    project_name: "send-mail",
    project_type: "sendmail to hell"
  },
  promClient: {
    collectDefaultMetrics: {}
  }
})
module.exports = { metricsMiddleware }
