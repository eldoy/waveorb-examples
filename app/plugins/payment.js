const stripe = require('stripe')

module.exports = async function(app) {
  app.payment = stripe(app.config.payment.secret_key)
}
