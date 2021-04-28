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
    html('.user-image', `<img class="profile-image" src="${esc(result.image)}">`)
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
      <div class="user-image"><img class="profile-image" src="${image}"></div>
      <input type="file" onchange="handleUpload(this)">

      <h4>${$.t('settings.update_profile')}</h4>
      <form onsubmit="return false">
        <p>
          <label for="name">${$.t('signup.form.name')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="name" name="name" type="text" value="${esc(user.name)}" oninput="clearErrors(this)">
          <em class="name-errors"></em>
        </p>
        <p>
          <label for="email">${$.t('settings.email')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="email" type="email" name="email" value="${esc(user.email)}" oninput="clearErrors(this)">
          <em class="email-errors"></em>
        </p>
        <p>
          <label for="homepage">${$.t('profile.homepage')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="homepage" type="text" name="homepage" value="${esc(user.homepage)}" oninput="clearErrors(this)">
          <em class="homepage-errors"></em>
        </p>
        <p>
          <label for="about">${$.t('layouts.nav.about')}</label>
          <br>
          <textarea id="about" name="about" oninput="clearErrors(this)">${esc(user.about)}</textarea>
          <em class="about-errors"></em>
        </p>
        <p>
          <label for="address">${$.t('settings.address')}</label>
          <br>
          <textarea id="address" name="address" oninput="clearErrors(this)">${esc(user.address)}</textarea>
          <em class="address-errors"></em>
        </p>
        <p>
          <button onclick="handleSaveUser(this)">${$.t('settings.save')}</button>
        </p>
      </form>

      <h4>${$.t('settings.header_update')}</h4>
      <form onsubmit="return false">
        <p>
          <label for="current">${$.t('settings.current_password')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="current" type="password" name="current" oninput="clearErrors(this)">
          <em class="current-errors"></em>
        </p>
        <p>
          <label for="password">${$.t('settings.new_password')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="password" type="password" name="password" oninput="clearErrors(this)">
          <em class="password-errors"></em>
        </p>
        <p>
          <button onclick="handleSaveUser(this)">${$.t('settings.save')}</button>
        </p>
      </form>
      <h4>${$.t('settings.delete_user')}</h4>
      <form onsubmit="return false">
        <p>
          <label class="warning-label">${$.t('settings.warning')}</label>
        </p>
        <p>
          <button onclick="handleDeleteUser(this)">${$.t('settings.delete_user')}</button>
        </p>
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
