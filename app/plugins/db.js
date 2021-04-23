// Mongodb setup
const db = require('mongowave')

module.exports = async function(app) {
  app.db = await db({ name: '5ono-server' })
}