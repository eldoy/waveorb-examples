module.exports = async function ($) {
  $.page.title = $.t('login.title')
  $.page.layout = 'dialog'

  async function handleLogin(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'login/create', values })
    if (result.error) {
      showErrors(result)
    } else {
      cookie('login', result.token)
      var redirect = store('redirect', null)
      if (redirect) {
        location = redirect
      } else {
        cookie('flash', $.t('login.welcome'))
        location = $.link('profile')
      }
    }
    button.disabled = false
  }

  return /* html */ `
    <div id="page-login">
      <form class="login-form" onsubmit="return false">
        <p>
          <label for="email">${$.t('login.form.email')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="email" name="email" type="email" oninput="clearErrors(this)">
          <em class="email-errors"></em>
        </p>
        <p>
          <label for="password">${$.t('login.form.password')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="password" name="password" type="password" oninput="clearErrors(this)">
          <em class="password-errors"></em>
        </p>
        <p>
          <button onclick="handleLogin(this)">
            ${$.t('login.form.button')}
          </button>
          <a href="${$.link('forgot')}">${$.t('login.forgot')}</a>
        </p>
      </form>
      <p>
        ${$.t('login.no_account')}
        <a href="${$.link('signup')}">${$.t('login.signup')}</a>
      </p>
    </div>
    <script>
      ${handleLogin}
    </script>
  `
}
