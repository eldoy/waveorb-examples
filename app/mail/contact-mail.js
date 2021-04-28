/** Contact mail */
module.exports = async function($, data) {
  return {
    options: {
      subject: $.t('mails.contact.subject')
    },
    html: {
      layout: 'mail-html',
      content: data.content
    },
    text: {
      layout: 'mail-text',
      content: data.content
    }
  }
}
