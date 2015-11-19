var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getPresets( function(err, rows) {
    res.render('index', { title: 'MoogerFoogerDooger', presets: rows });
  });
});

module.exports = router;
