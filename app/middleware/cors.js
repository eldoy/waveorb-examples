// Specific origin
// const origin = process.env.NODE_ENV == 'production'
//   ? 'https://5o.no'
//   : 'http://5o.test:5001'

module.exports = async function(req, res) {
  // Allow from any origin
  // const origin = req.headers.origin
  // if (!origin) return
  // res.setHeader('Access-Control-Allow-Origin', origin)
  // res.setHeader('Access-Control-Allow-Credentials', 'true')
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control')
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
}
