module.exports = async function ($) {
  $.page.title = $.t('settings.title')
  $.page.layout = 'dialog'

  async function handleUpload(input) {
    var result = await api(
      { action: 'v1/user/upload' },
      {
        files: input.files,
        progress: function (event) {
          var { loaded, total, percent } = event
          text('.progress', `${(loaded / 1024).toFixed(2)} kb/${(total / 1024).toFixed(2)} kb, ${percent}%`)
        }
      }
    )
    html('.user-image', `<img class="hq-profile-image" src="${esc(result.image)}">`)
  }

  async function handleSaveUser(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'v1/user/update', query: { id: user.id }, values })
    if (result.error) {
      showErrors(result)
    } else {
      flash($.t('settings.saved'))
    }
    button.disabled = false
  }

  async function handleDeleteUser(button) {
    if (confirm($.t('settings.confirm'))) {
      button.disabled = true
      var result = await api({ action: 'v1/user/delete', query: { id: user.id } })
      if (result.error) {
        flash(result.error.message)
      } else {
        cookie('flash', $.t('settings.confirmation'))
        cookie('login', null)
        location = $.link('index')
      }
      button.disabled = false
    }
  }

  async function renderSettings() {
    var token = cookie('login')
    user = await api({ action: 'v1/user/get', query: { token } })
    var image = esc(user.image) || `https://gravatar.com/avatar/${esc(user.md5)}`
    html(
      '#settings',
      /* html */ `
      <div class="user-image"><img class="hq-profile-image" src="${image}"></div>
      <input type="file" onchange="handleUpload(this)">

      <h4>${$.t('settings.update_profile')}</h4>
      <form onsubmit="return false">
        <div class="hq-field">
          <label for="name">${$.t('signup.form.name')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <input id="name" name="name" type="text" value="${esc(user.name)}" oninput="clearErrors(this)">
          <span class="hq-errors name-errors"></span>
        </div>
        <div class="hq-field">
          <label for="email">${$.t('settings.email')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <input id="email" type="email" name="email" value="${esc(user.email)}" oninput="clearErrors(this)">
          <span class="hq-errors email-errors"></span>
        </div>
        <div class="hq-field">
          <label for="homepage">${$.t('profile.homepage')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <input id="homepage" type="text" name="homepage" value="${esc(user.homepage)}" oninput="clearErrors(this)">
          <span class="hq-errors homepage-errors"></span>
        </div>
        <div class="hq-field -wide">
          <label for="about">${$.t('layouts.nav.about')}</label>
          <br>
          <textarea id="about" name="about" oninput="clearErrors(this)">${esc(user.about)}</textarea>
          <span class="hq-errors about-errors"></span>
        </div>
        <div class="hq-field -wide">
          <label for="address">${$.t('settings.address')}</label>
          <br>
          <textarea id="address" name="address" oninput="clearErrors(this)">${esc(user.address)}</textarea>
          <span class="hq-errors address-errors"></span>
        </div>
        <div class="hq-form-buttons">
          <button class="hq-button" onclick="handleSaveUser(this)">${$.t('settings.save')}</button>
        </div>
      </form>

      <h4>${$.t('settings.header_update')}</h4>
      <form onsubmit="return false">
        <div class="hq-field">
          <label for="current">${$.t('settings.current_password')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <input id="current" type="password" name="current" oninput="clearErrors(this)">
          <span class="hq-errors current-errors"></span>
        </div>
        <div class="hq-field">
          <label for="password">${$.t('settings.new_password')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <input id="password" type="password" name="password" oninput="clearErrors(this)">
          <span class="hq-errors password-errors"></span>
        </div>
        <div class="hq-form-buttons">
          <button class="hq-button" onclick="handleSaveUser(this)">${$.t('settings.save')}</button>
        </div>
      </form>
      <h4>${$.t('settings.delete_user')}</h4>
      <form onsubmit="return false">
        <div class="hq-field">
          <label class="warning-label">${$.t('settings.warning')}</label>
        </div>
        <div class="hq-form-buttons">
          <button class="hq-button" onclick="handleDeleteUser(this)">${$.t('settings.delete_user')}</button>
        </div>
      </form>
    `
    )
  }

  return /* html */ `
    <div id="settings"></div>
    <script>
      var user
      ${handleUpload}
      ${handleSaveUser}
      ${handleDeleteUser}
      ${renderSettings}
      renderSettings()
    </script>
  `
}
