/* find */
module.exports = {
  filters: ['setup-site'],
  main: async function($) {
    const { query = {} } = $.params
    return await $.app.db('user').find(query)
  }
}