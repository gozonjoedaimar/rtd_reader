
var path = require('path');
var fs = require('fs');
var debug = __debug('app/controllers/index');

function index(req, res, next) {
  let index = path.resolve(req.__appdir, 'build/html/index.html');
  res.sendFile(index);
}

function static(req, res, next) {
  let publicFile = path.join(req.__appdir, req.__public, req.path);
  let docFile = path.join(req.__appdir, req.__docdir, req.path);
  // check if public file exists
  fs.access(publicFile, function(err) {
    // file is not public
    if (err) {
      // check if doc file exists
      fs.access(docFile, function(err) {
        if (err) {
          // file does not exist; pass to next handler
          next();
        }
        else {
          // serve file
          res.sendFile(docFile);
        }
      })
    }
    else {
      // file exists; pass to next handler
      next();
    }
  })
}

function pages(req, res, next) {
  try {
    // file path
    let file = path.join(req.__appdir, req.__docdir, req.path);
    // Check if file exists; throw error if not
    fs.accessSync(file);
    // Serve file
    res.sendFile(file);
  }
  catch(e) {
    debug(e.message);
    next();
  }
}

module.exports = {
  index,
  static,
  pages
}