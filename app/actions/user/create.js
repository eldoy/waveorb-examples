const crypto = require('crypto')

/* create */
module.exports = {
  filters: ['setup-site', 'authenticate', 'guest-required'],
  validate: {
    values: {
      email: {
        is: '$email',
        required: true,
        matcher: async function(email, $) {
          const count = await $.app.db('user').count({ email })
          if (count) {
            return 'email is taken'
          }
        }
      },
      name: {
        minlength: 2,
        required: true
      },
      password: {
        minlength: 8,
        required: true
      }
    }
  },
  main: async function($) {
    const { values = {} } = $.params
    let { email, name, password } = values
    password = $.tools.hash(password)
    const md5 = crypto.createHash('md5').update(email).digest('hex')
    const hash = $.tools.hash(email)
    // TODO: Setup and don't run for tests
    // $.app.mailer('signup-mail', {}, $, {})
    return await $.app.db('user').create({ email, md5, name, password })
  }
}