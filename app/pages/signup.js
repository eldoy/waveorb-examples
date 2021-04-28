module.exports = async function ($) {
  $.page.title = $.t('signup.title')
  $.page.layout = 'dialog'

  async function handleSignup(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'v1/user/create', values })
    if (result.error) {
      button.disabled = false
      return showErrors(result)
    }
    result = await api({ action: 'v1/login/create', values })
    if (result.error) {
      button.disabled = false
      return showErrors(result)
    }
    cookie('login', result.token)
    cookie('flash', $.t('signup.confirmation'))
    location = $.link('profile')
  }

  return /* html */ `
    <form class="signup-form" onsubmit="return false">
      <div class="hq-field">
        <label for="name">${$.t('signup.form.name')}</label>
        <span class="hq-star" title="required">*</span>
        <br>
        <input id="name" name="name" type="text" oninput="clearErrors(this)">
        <span class="hq-errors name-errors"></span>
      </div>
      <div class="hq-field">
        <label for="email">${$.t('signup.form.email')}</label>
        <span class="hq-star" title="required">*</span>
        <br>
        <input id="email" name="email" type="text" oninput="clearErrors(this)">
        <span class="hq-errors email-errors"></span>
      </div>
      <div class="hq-field">
        <label for="password">${$.t('signup.form.password')}</label>
        <span class="hq-star" title="required">*</span>
        <br>
        <input id="password" name="password" type="password" oninput="clearErrors(this)">
        <span class="hq-errors password-errors"></span>
      </div>
      <div class="hq-form-buttons">
        <button class="hq-button" onclick="handleSignup(this)">${$.t('signup.form.button')}</button>
      </div>
    </form>
    <p>
      ${$.t('signup.account')}
      <a href="${$.link('login')}">${$.t('signup.login')}</a>
    </p>
    <script>${handleSignup}</script>
  `
}
