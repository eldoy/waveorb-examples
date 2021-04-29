/* get */
module.exports = {
  filters: ['setup-site', 'authenticate', 'login-required'],
  validate: {
    query: {
      id: {
        is: '$id',
        required: true
      }
    }
  },
  main: async function($) {
    const { query = {} } = $.params
    return await $.app.db('user').get(query)
  }
}
