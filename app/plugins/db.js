const connection = require('mongowave')

module.exports = async function(app) {
  app.db = await connection(app.config.db)
}
