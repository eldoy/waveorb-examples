module.exports = async function($) {
  if (!$.user) {
    return { error: { message: $.t('filters.authenticate.login_required') } }
  }
}