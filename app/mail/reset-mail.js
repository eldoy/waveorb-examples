/** Reset mail */
module.exports = async function($, data) {
  const host = process.env.NODE_ENV === 'production'
    ? 'https://example.com'
    : 'http://localhost:5001'

  const link = `${host}${ $.link('reset') }?key=${data.key}`

  return {
    options: {
      subject: $.t('mails.reset.subject')
    },

    html: {
      layout: 'mail-html',
      content: [
        `<h1>${ $.t('mails.reset.header') }</h1>`,
        `<a href="${ link }">${ link }</a>`
      ].join('\n')
    },

    text: {
      layout: 'mail-text',
      content: [
        $.t('mails.reset.header'),
        ``,
        link
      ].join('\n')
    }
  }
}
