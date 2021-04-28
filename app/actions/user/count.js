/* count */
module.exports = {
  filters: ['setup-site'],
  main: async function($) {
    const { query = {} } = $.params
    const n = await $.app.db('user').count(query)
    return { n }
  }
}