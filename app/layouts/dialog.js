module.exports = async function ($) {
  const host = process.env.NODE_ENV == 'production'
  ? 'https://waveorb.com/api'
  : 'http://localhost:5000'

  return /* html */ `
    <!doctype html>
    <html lang="${$.lang}">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="${$.t('layouts.description')}">
        <title>${$.page.title || '♥'} - ${$.t('layouts.title')}</title>
        <link rel="icon" type="image/png" href="/img/favicon.png">
        ${$.script('/bundle.js')}
        ${$.style('/bundle.css')}
        <script>window.api = waveorb('${host}')</script>
        ${process.env.NODE_ENV == 'development' ? '<script src="/js/dev.js"></script>' : ''}
      </head>
      <body id="dialog-layout">
        <div class="dialog">
          <div class="dialog-header">
            <h1>${$.page.title}</h1>
            <a class="close" title="Back" href="#" onclick="goBack();return false">
              <img src="/img/close.svg" alt="icon" class="reset-icon icon">
            </a>
          </div>
          <div id="flash"></div>
          <script>flash()</script>
          <div id="dialog-content">${$.page.content}</div>
        </div>
        <script>
          window.addEventListener('keydown', closeWindow)
          navCount(true)
        </script>
      </body>
    </html>
  `
}
