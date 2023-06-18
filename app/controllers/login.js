
var reCAPTCHA = require('google-recaptcha');
var debug = __debug('app/controllers/login');

function index(req, res, next) {
  let flash = req.flash('info');
  flash = flash.length > 0 ? flash[0]: "[]";
  try{
    flash = JSON.parse(flash);
  }
  catch(e){
    debug(e.message);
  }
  res.render('login', { title: "Login", notif: flash });
}

function verify(req, res) {
  let data = req.body;
  req.__model.user.findOne({ username: data.username }).exec().then( (result) => {
    if (result?.verify(data.password)) {
      function resolve() {
        req.session.user = { username: result.username }
        req.flash('info', JSON.stringify({
          message: 'Login successful',
          type: "success"
        }));
        res.redirect(req.get('referer'))
      }

      if (__config('services/google_recaptcha/enabled') && __config('services/google_recaptcha/secret')) {
        const googleRecaptcha = new reCAPTCHA({
          secret: __config('services/google_recaptcha/secret')
        });

        const recaptchaResponse = data['g-recaptcha-response']

        googleRecaptcha.verify({response: recaptchaResponse}, function(error) {
          if (error) {
            req.flash('info', JSON.stringify({
              message: 'Invalid captcha',
              type: "danger"
            }));
            res.redirect(req.get('referer'))
          }
          else {
            resolve();
          }
        })
      }
      else {
        resolve();
      }
    }
    else {
      req.flash('info', JSON.stringify({
        message: 'Username/password incorrect. Please try again.',
        type: "warning"
      }));
      res.redirect(req.get('referer'))
    }
  })
  .catch(function(e) {
    debug(e.message);
    req.flash('info', JSON.stringify({
      message: 'There was an error on your request',
      type: "danger"
    }));
    res.redirect(res.get('referer'))
  });
}

module.exports = {
  index,
  verify
}