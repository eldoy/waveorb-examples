const JIMP_OPTIONS = {
  resize: [80, 80]
}

/* upload */
module.exports = {
  filters: ['setup-site', 'authenticate', 'login-required'],
  main: async function($) {
    const { config = JIMP_OPTIONS } = $.params
    const options = { timestamp: true, config }

    const urls = await $.app.file.upload($.files, options)

    const image = urls[0]
    $.app.db('user').update({ id: $.user.id }, { image })

    return { image }
  }
}
