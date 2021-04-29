module.exports = async function($) {
  $.page.title = 'Profile'

  return /* html */`
    <style>
      main {
        text-align: center;
      }
    </style>
    <h1>Profile</h1>
    <p>
      You are now logged in. This is your profile.
    </p>
  `
}
