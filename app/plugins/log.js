// Log console log and error to file
const lowtide = require('lowtide')

module.exports = async function(app) {
  if (process.env.NODE_ENV == 'production') {
    console.log = lowtide('../log/app.log')
    console.error = lowtide('../log/err.log')
  }
}
