module.exports = async function ($) {
  $.page.title = $.t('layouts.nav.menu')
  $.page.layout = 'menu'

  return /* html */ `
    <header>
      <a href="javascript:void(0)" onclick="history.go(-1);return false">${$.t('layouts.nav.close')}</a>
    </header>
    <h1>${$.t('layouts.nav.menu')}</h1>
    <div>
      <a class="user" href="${$.link('profile')}">${$.t('layouts.nav.profile')}</a>
    </div>
    <div>
      <a class="user" href="javascript:void(0)" onclick="handleLogout();return false">
        ${$.t('layouts.nav.logout')}
      </a>
    </div>
    <div>
      <a class="pub" href="${$.link('signup')}">${$.t('layouts.nav.signup')}</a>
    </div>
    <div>
      <a class="pub" href="${$.link('login')}">${$.t('layouts.nav.login')}</a>
    </div>
  `
}
