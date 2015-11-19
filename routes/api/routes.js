var express = require('express');
var router = express.Router();
var api = require('../../api');

router.get('/getpresets', api.getPresets);


module.exports = router;
