module.exports = async function(req, res) {
  // Example basic auth:
  // const auth = req.headers.authorization
  // console.log('Authorization Header is:', auth)
  // if (auth) {
  //   const [username, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(/:(.+)/)
  //   console.log({ username, password })
  //   if (username == 'admin' && password == 'test') {
  //     return
  //   }
  // }
  // res.statusCode = 401 // or 403 to deny
  // res.setHeader('WWW-Authenticate', 'Basic realm="Restricted"')
  // return 'Please authenticate to view this resource.'
}
