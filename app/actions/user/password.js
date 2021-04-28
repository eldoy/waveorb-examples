/* password */
module.exports = {
  filters: ['setup-site', 'authenticate', 'login-required'],
  validate: {
    query: {
      id: {
        is: '$id',
        required: true
      }
    },
    values: {
      current: {
        minlength: 8,
        required: true,
        matcher: async function(current, $) {
          if (!$.tools.compare(current, $.user.password)) {
            return 'password not valid'
          }
        }
      },
      password: {
        minlength: 8,
        required: true
      }
    }
  },
  main: async function($) {
    const { query = {}, values = {} } = $.params
    const password = $.tools.hash(values.password)
    return await $.app.db('user').update(query, { password })
  }
}