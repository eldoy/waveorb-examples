const URL = require('url').URL

// Setup site subdomain and load config
module.exports = async function($) {
  // const url = new URL($.req.headers.referer)
  // const hostname = url.hostname
  // const domain = $.app.config.env.domain

  // if (hostname.endsWith(domain)) {
  //   const subdomain = hostname.split('.')[0]
  //   $.site = await $.app.db('site').get({ subdomain })
  // } else {
  //   $.site = await $.app.db('site').get({ domain: hostname })
  // }

  // if (process.env.NODE_ENV == 'development' && !$.site) {
  //   $.site = await $.app.db('site').get()
  // }

  // if (!$.site) {
  //   return {}
  // }

  // // TODO: Lazy load this? Not normally needed...
  // $.site.config = await $.app.db('configuration').get({ site_id: $.site.id })
}
