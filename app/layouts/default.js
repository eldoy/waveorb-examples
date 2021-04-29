module.exports = async function($) {
  const host = process.env.NODE_ENV == 'production'
    ? 'https://waveorb.com/api'
    : 'http://localhost:5000'

  async function handleLogout() {
    const token = cookie('login')
    if (token) {
      var result = await api({ action: 'login/delete', query: { token } })
      if (result.error) {
        return flash(result.error.message)
      }
      cookie('login', null)
      cookie('flash', $.t('layouts.logout'))
      location = $.link('index')
    }
  }

  function init() {
    var u = cookie('login')
    document.querySelectorAll('#header a').forEach(function (a) {
      if ((u && a.classList.contains('pub')) || (!u && a.classList.contains('user'))) {
        a.style.display = 'none'
      }
      if (a.pathname == location.pathname) {
        a.classList.add('active')
      }
    })
  }

  return /* html */`
    <!doctype html>
    <html lang="${$.lang}">
      <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="description" content="Incredible waveorb app">
        <title>${$.page.title || '♥'} - Waveorb app</title>
        <link rel="icon" type="image/png" href="/img/favicon.png">
        ${$.script('/bundle.js')}
        ${$.style('/bundle.css')}
        <script>window.api = waveorb('${host}')</script>
        ${process.env.NODE_ENV == 'development' ? $.script('/js/dev.js') : ''}
      </head>
      <body>
        <header id="header">
          <nav>
            <div>
              <a href="${$.link('index')}">Home</a>
              <a href="${$.link('about')}">About</a>
              <a class="private" href="${$.link('profile')}">Profile</a>
            </div>
            <div>
              <a class="public" href="${$.link('signup')}">Signup</a>
              <a class="public" href="${$.link('login')}">Login</a>
              <a class="private" href="${$.link('settings')}">Settings</a>
              <a class="private" href="javascript:void(0)" onclick="handleLogout();return false">Logout</a>
            </div>
          </nav>
        </header>
        <script>
          toggleVisibility()
          setActiveLink()
        </script>
        <div id="flash"></div>
        <main>${$.page.content}</main>
        <footer>
          Made by <a href="https://eldoy.com">Eldøy Projects</a>, Oslo, Norway
        </footer>
        <script>
          flash()
          navCount()
          ${handleLogout}
        </script>
      </body>
    </html>
  `
}
