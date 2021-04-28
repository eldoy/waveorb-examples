const mailer = require('wmail')

module.exports = async function(app) {
  app.mailer = mailer(app.config.mail)
}
