/* create */
module.exports = {
  filters: ['setup-site', 'authenticate', 'guest-required'],
  validate: {
    values: {
      email: {
        is: '$email',
        required: true
      }
    }
  },
  main: async function($) {
    const { values = {} } = $.params
    const { email } = values
    const user = await $.app.db('user').get({ email })
    if (!user) {
      return { error: { message: $.t('actions.login.forgot_password.user_not_found') } }
    }
    const key = $.tools.uuid()
    const expires_at = new Date().getTime() + 15 * 6e4

    // TODO: Send email
    // await $.app.mailer('reset-mail', { to: email }, $, { key })
    return await $.app.db('reset').create({ key, user_id: user.id, expires_at })
  }
}