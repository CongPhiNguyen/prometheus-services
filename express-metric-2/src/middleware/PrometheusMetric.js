const promBundle = require("express-prom-bundle")

const { logger } = require("../utils/logger")

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  // bypass: (req) => {
  //   console.log("req.ip", req.ip)
  //   logger.log({
  //     level: "info",
  //     message: req.headers
  //   })
  //   return false
  // },
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
