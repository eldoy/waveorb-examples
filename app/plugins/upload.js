// Set up dugg for upload to Amazon S3
const dugg = require('dugg')

module.exports = async function(app) {
  app.file = dugg(app.config.upload)
}
