const promBundle = require("express-prom-bundle")

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {
    project_name: "hello_world",
    project_type: "test_metrics_labels"
  },
  promClient: {
    collectDefaultMetrics: {}
  }
})
module.exports = { metricsMiddleware }
