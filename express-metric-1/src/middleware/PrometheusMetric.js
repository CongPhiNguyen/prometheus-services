const promBundle = require("express-prom-bundle")
const { logger } = require("../utils/logger")
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  // bypass: (req) => {
  //   // console.log("req", req)
  //   console.log("req.ip", req.ip)
  //   logger.log({
  //     level: "info",
  //     message: req.headers
  //   })
  //   return false
  // },
  customLabels: {
    project_name: "authen_app",
    project_type: "authentication test bruhhh"
  },
  promClient: {
    collectDefaultMetrics: {}
  }
})
module.exports = { metricsMiddleware }
