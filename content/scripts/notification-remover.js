const $ = window.jQuery

$(document).ready(function () {
  $('.alert').click(function () {
    $('.alert').remove()
  })

  setTimeout(function () {
    $('.alert-success').remove()
  }, 3000)
})
