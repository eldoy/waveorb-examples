/* find */
module.exports = {
  filters: ['setup-site', 'authenticate', 'login-required'],
  main: async function($) {
    const { query = {} } = $.params
    return await $.app.db('user').find(query)
  }
}