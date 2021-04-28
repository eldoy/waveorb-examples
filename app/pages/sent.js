module.exports = async function ($) {
  $.page.title = $.t('sent.title')

  return /* html */ `
    <h1>${$.t('sent.thank_you')}</h1>
    <p>${$.t('sent.text')}</p>
  `
}
