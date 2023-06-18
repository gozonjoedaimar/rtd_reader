module.exports = {
  "google_recaptcha": {
    "enabled": (
      process.env.RECAPTCHA_ENABLED
      ? JSON.parse(process.env.RECAPTCHA_ENABLED)
      : false
    ),
    "site": process.env.RECAPTCHA_SITE,
    "secret": process.env.RECAPTCHA_SECRET
  }
}