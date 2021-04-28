module.exports = async function ($) {
  $.page.title = $.t('forgot.title')
  $.page.layout = 'dialog'

  async function handleForgot(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'v1/reset/create', values })
    if (result.error) {
      button.disabled = false
      return showErrors(result)
    }
    cookie('flash', $.t('forgot.confirmation'))
    location = $.link('login')
  }

  return /* html */ `
    <form onsubmit="return false">
      <p>
        <label for="email">${$.t('forgot.email')}</label>
        <span class="star" title="required">*</span>
        <br>
        <input id="email" type="text" name="email" oninput="clearErrors(this)">
        <em class="email-errors"></em>
      </p>
      <p>
        <button onclick="handleForgot(this)">${$.t('forgot.submit')}</button>
      </p>
    </form>
    <p>
      <a href="${$.link('login')}">${$.t('forgot.back')}</a>
    </p>
    <script>${handleForgot}</script>
  `
}
