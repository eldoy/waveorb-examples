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
      <div class="hq-field">
        <label for="email">${$.t('forgot.email')}</label>
        <span class="hq-star" title="required">*</span>
        <br>
        <input id="email" type="text" name="email" oninput="clearErrors(this)">
        <span class="hq-errors email-errors"></span>
      </div>
      <div class="hq-form-buttons">
        <button class="hq-button" onclick="handleForgot(this)">${$.t('forgot.submit')}</button>
      </div>
    </form>
    <p>
      <a href="${$.link('login')}">${$.t('forgot.back')}</a>
    </p>
    <script>${handleForgot}</script>
  `
}
