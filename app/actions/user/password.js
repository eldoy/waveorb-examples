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
            return $.t('actions.user.password_not_valid')
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
    if ($.user.id != query.id) {
      return { error: { message: $.t('actions.user.user_id_mismatch') } }
    }
    const password = $.tools.hash(values.password)
    return await $.app.db('user').update(query, { password })
  }
}