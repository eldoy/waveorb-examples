module.exports = async function($) {
  const token = $.req.headers['authorization'] || $.req.cookie('session')
  if (token) {
    const session = await $.app.db('session').get({ token })
    if (session && session.user_id) {
      $.user = await $.app.db('user').get({ id: session.user_id })
      if (!$.user) {
        $.req.cookie('token', null)
        await $.app.db('session').delete({ token })
        delete $.user
      }
    }
  }
}
