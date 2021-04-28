module.exports = async function ($) {
  $.page.title = $.t('contact.title')

  async function handleSubmit(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'v1/contact/create', values })
    if (result.error) {
      showErrors(result)
    } else {
      location = $.link('sent')
    }
    button.disabled = false
  }

  return /* html */ `
    <div id="page-contact">
      <h1>${$.t('contact.header')}</h1>
      <form class="support-form" onsubmit="return false">
        <div class="hq-field">
          <label for="email">${$.t('contact.email')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <input id="email" name="email" type="email" oninput="clearErrors(this)">
          <span class="hq-errors email-errors"></span>
        </div>
        <div class="hq-field">
          <label for="subject">${$.t('contact.subject')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <input id="subject" name="subject" type="text" oninput="clearErrors(this)">
          <span class="hq-errors subject-errors"></span>
        </div>
        <div class="hq-field -wide">
          <label for="content">${$.t('contact.message')}</label>
          <span class="hq-star" title="required">*</span>
          <br>
          <textarea id="content" name="content" oninput="clearErrors(this)"></textarea>
          <span class="hq-errors content-errors"></span>
        </div>
        <div class="hq-form-buttons">
          <button class="hq-button" onclick="handleSubmit(this)">${$.t('contact.send')}</button>
        </div>
      </form>
    </div>
    <script>${handleSubmit}</script>
  `
}
