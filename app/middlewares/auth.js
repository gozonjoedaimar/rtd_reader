const check = () => function(req, res, next) {
   if (req.path.match(/\.(css|woff|woff2|js|ico)$/)) {
     next();
   }
   else if (req.path.includes('/login')) {
     if (req.session.user) {
       return res.redirect(req.session.intended ? req.session.intended: '/');
     }
     next();
   }
   else {
     let pathStr = req.path;
     if (Object.keys(req.query).length !== 0) pathStr += "?" + querystring.stringify(req.query);
     req.session.intended = pathStr;
     if (!req.session.user) {
       return res.redirect('/login');
     }
     next();
   }
 }

module.exports = {
   check
}