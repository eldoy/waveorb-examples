/* current */
module.exports = {
  filters: ['setup-site', 'authenticate', 'login-required'],
  main: async function($) {
    return $.user
  }
}