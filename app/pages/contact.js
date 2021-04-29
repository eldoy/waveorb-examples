module.exports = async function ($) {
  $.page.title = $.t('contact.title')

  async function handleSubmit(button) {
    button.disabled = true
    var values = serialize(button.form)
    var result = await api({ action: 'contact/create', values })
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
        <p>
          <label for="email">${$.t('contact.email')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="email" name="email" type="email" oninput="clearErrors(this)">
          <em class="email-errors"></em>
        </p>
        <p>
          <label for="subject">${$.t('contact.subject')}</label>
          <span class="star" title="required">*</span>
          <br>
          <input id="subject" name="subject" type="text" oninput="clearErrors(this)">
          <em class="subject-errors"></em>
        </p>
        <p>
          <label for="content">${$.t('contact.message')}</label>
          <span class="star" title="required">*</span>
          <br>
          <textarea id="content" name="content" oninput="clearErrors(this)"></textarea>
          <em class="content-errors"></em>
        </p>
        <p>
          <button onclick="handleSubmit(this)">${$.t('contact.send')}</button>
        </p>
      </form>
    </div>
    <script>${handleSubmit}</script>
  `
}
