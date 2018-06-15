function tryGetSuccessMessage (req) {
  if (req.session.successMessage) {
    let successMessage = req.session.successMessage
    delete req.session.successMessage

    return successMessage
  }
}

module.exports = {
  tryGetSuccessMessage
}
