var express = require('express');
var router = express.Router();
const controller = local_require('app/controllers/login');

/* GET login page. */
router.get('/',controller.index);

router.post('/',controller.verify);

module.exports = router;
