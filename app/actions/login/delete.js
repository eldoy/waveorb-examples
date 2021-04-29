/* delete */
module.exports = {
  filters: ['setup-site', 'authenticate', 'login-required'],
  validate: {
    query: {
      token: {
        minlength: 36,
        required: true
      }
    }
  },
  main: async function($) {
    const { query = {} } = $.params
    const { token } = query

    return await $.app.db('login').delete({ token })
  }
}
