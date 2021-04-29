/* get */
module.exports = {
  filters: ['setup-site', 'authenticate', 'guest-required'],
  validate: {
    query: {
      key: {
        length: 36,
        required: true
      }
    }
  },
  main: async function($) {
    const { query = {} } = $.params
    const { key } = query
    const reset = await $.app.db('reset').get({ key })
    if (!reset) {
      return { error: { message: $.t('actions.account.reset_password.invalid') } }
    }
    if (new Date().getTime() > reset.time) {
      await $.app.db('reset').delete({ key })
      return { error: { message: $.t('actions.account.reset_password.expired') } }
    }
    const token = $.tools.uuid()
    await $.app.db('login').create({ token, user_id: reset.user_id })
    return { token }
  }
}
