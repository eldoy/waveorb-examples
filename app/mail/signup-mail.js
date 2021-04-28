/** Signup mail */
module.exports = async function($, data) {
  return {
    options: {
      subject: $.t('mails.signup.subject')
    },

    html: {
      layout: 'mail-html',
      content: [
        `<h1>${ $.t('mails.signup.header') }</h1>`,
        `<p>${ $.t('mails.signup.intro') }</p>`
      ].join('\n')
    },

    text: {
      layout: 'mail-text',
      content: [
        $.t('mails.signup.header'),
        ``,
        $.t('mails.signup.intro')
      ].join('\n')
    }
  }
}
