/* create */
module.exports = {
  filters: ['setup-site', 'authenticate', 'login-required'],
  main: async function($) {
    const { config } = $.params
    const options = { timestamp: true, config }
    await $.app.file.upload($.files, options)
    return $.files.map(f => ({ name: f.name, type: f.type, size: f.size, url: f.url }))
  }
}
