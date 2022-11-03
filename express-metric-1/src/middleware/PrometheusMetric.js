const promBundle = require("express-prom-bundle")
const { logger } = require("../utils/logger")
const mongoose = require("mongoose")
const URI_TRACKING = process.env.TRACKING_SERVICE_MONGO
  ? process.env.TRACKING_SERVICE_MONGO
  : "mongodb+srv://phiroud:1@tracking-service.cp1dn0g.mongodb.net/tracking-service"

const logCon = mongoose.createConnection(URI_TRACKING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
  // in
  bypass: (req) => {
    logCollection.insertMany({
      info: {
        service: "express-metric-1",
        ip: req.ip,
        headers: req.rawHeaders,
        host: req.get("host"),
        roject_name: "authen_app",
        project_type: "authentication test bruhhh"
      }
    })
    return false
  },
  customLabels: {
    project_name: "authen_app",
    project_type: "authentication test bruhhh"
  },
  promClient: {
    collectDefaultMetrics: {}
  }
})
module.exports = { metricsMiddleware }
