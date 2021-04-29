/* create */
module.exports = {
  filters: ['setup-site', 'authenticate', 'guest-required'],
  validate: {
    values: {
      email: {
        is: '$email',
        required: true
      },
      password: {
        minlength: 8,
        required: true
      }
    }
  },
  main: async function($) {
    console.log('WHAT')
    const { values = {} } = $.params
    const { email = '', password = '' } =  values
    const user = await $.app.db('user').get({ email })
    if (!user) {
      return { error: { message: $.t('actions.login.user_not_found') } }
    }
    if (!$.tools.compare(password, user.password)) {
      return { error: { message: $.t('actions.login.password_not_valid') } }
    }
    const token = $.tools.uuid()
    await $.app.db('login').create({ user_id: user.id, token })
    return { token }
  }
}