module.exports = async function ($) {
  $.page.title = $.t('reset.title')

  async function handleReset() {
    var key = params('key')
    if (!key) {
      cookie('flash', $.t('reset.error'))
      location = $.link('forgot')
    } else {
      var result = await api({ action: 'v1/reset/create', values: { key } })
      if (result.error) {
        cookie('flash', result.error.message)
        location = $.link('forgot')
      } else {
        cookie('login', result.token)
        init()
        q('.verify-key').style.display = 'none'
        q('.reset-form').style.display = ''
      }
    }
  }

  async function handleUpdate(form) {
    var password = serialize(form).password
    var result = await api({ action: 'v1/reset/update', query: { key, password } })
    if (result.error) {
      showErrors(result)
    } else {
      cookie('flash', $.t('reset.confirmation'))
      location = $.link('sites')
    }
  }

  return /* html */ `
    <h1>${$.t('reset.header')}</h1>
    <p class="verify-key">${$.t('reset.verify')}</p>
    <form onsubmit="handleUpdate(this);return false" style="display: none">
      <div class="hq-field">
        <label for="password">${$.t('reset.password')}</label>
        <span class="hq-star" title="required">*</span>
        <br>
        <input id="password" name="password" type="password" oninput="clearErrors(this)">
        <span class="hq-errors password-errors"></span>
      </div>
      <div class="hq-form-buttons">
        <button class="hq-button">${$.t('reset.update')}</button>
      </div>
    </form>
    <script>var key;(${handleReset}());${handleUpdate}</script>
  `
}