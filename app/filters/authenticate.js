module.exports = async function($) {
  const token = $.req.headers['authorization'] || $.req.cookie('login')
  if (token) {
    const login = await $.app.db('login').get({ token })
    if (login && login.user_id) {
      $.user = await $.app.db('user').get({ id: login.user_id })
      if (!$.user) {
        $.req.cookie('token', null)
        await $.app.db('login').delete({ token })
        delete $.user
      }
    }
  }
}
