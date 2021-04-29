module.exports = async function ($) {
  $.page.title = $.t('upload.title')

  async function handleUpload(input) {
    var urls = await api(
      { action: 'upload/create' },
      {
        files: input.files,
        progress: function (event) {
          var { loaded, total, percent } = event
          text('.progress', `${(loaded / 1024).toFixed(2)} kb/${(total / 1024).toFixed(2)} kb, ${percent}%`)
        }
      }
    )
    if (urls && urls.length) {
      html(
        '.result',
        urls.map(url => `<img src="${url}">`),
        'end'
      )
    }
  }

  return /* html */ `
    <h1>${$.t('upload.header')}</h1>
    <p>${$.t('upload.intro')}</p>
    <input type="file" onchange="handleUpload(this)">
    <span class="progress"></span>
    <div class="result"></div>
    <script>${handleUpload}</script>
  `
}
