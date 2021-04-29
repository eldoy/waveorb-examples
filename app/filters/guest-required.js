module.exports = async function($) {
  if ($.user) {
    return { error: { message: $.t('filters.authenticate.already_logged_in') } }
  }
}
