/* update */
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
      email: {
        is: '$email',
        matcher: async function(email, $) {
          if (email !== $.user.email) {
            const count = await $.app.db('user').count({ email })
            if (count) {
              return 'email is taken'
            }
          }
        }
      },
      name: {
        minlength: 2
      }
    }
  },
  main: async function($) {
    const { query = {}, values = {} } = $.params
    return await $.app.db('user').update(query, values)
  }
}