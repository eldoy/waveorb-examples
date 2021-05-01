/* create */
module.exports = {
  validate: {
    values: {
      email: {
        is: '$email',
        required: true
      },
      subject: {
        minlength: 3,
        required: true
      },
      content: {
        minlength: 3,
        required: true
      }
    }
  },
  main: async function($) {
    const { values = {} } = $.params
    const { email, subject, content } = values
    // Uncomment to actually send email
    // if (process.env.NODE_ENV !== 'test') {
    //   const options = { subject, from: email, reply: email }
    //   await $.app.mailer.send('contact-mail', $, options, { content })
    // }
    return await $.app.db('contact').create(values)
  }
}
