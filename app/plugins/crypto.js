const wcrypt = require('wcrypt')

module.exports = async function(app) {
  app.crypto = wcrypt(app.config.crypto)
}
