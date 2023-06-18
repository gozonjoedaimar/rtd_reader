var express = require('express');
var router = express.Router();
const controller = local_require('app/controllers/index');

/* GET home page. */
router.get('/', controller.index);

/** Get docs html */
router.get(/\.html$/, controller.pages)

/** Get docs static files */
router.get(/\.(css|woff|woff2|js|ico)$/, controller.static);

module.exports = router;
