module.exports = async function($) {
  if ($.user) {
    return { error: { message: 'you are already logged in' } }
  }
}
