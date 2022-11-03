const promBundle = require("express-prom-bundle")
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
  // in
  bypass: (req) => {
    // console.log("req", req)
    console.log("req.ip", req.ip)
    console.log("req.ip", getIpFromRequest(req))
    console.log("req.ip", req.connection.remoteAddress)

    logger.log({
      level: "info",
      message: req
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
