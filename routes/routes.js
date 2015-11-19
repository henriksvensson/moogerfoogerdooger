var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getPresets( function(err, rows) {
    res.render('index', { title: 'MoogerFoogerDooger', presets: rows });
  });
});

router.get('/addpreset', function(req, res, next) {
	db.getControls( function(err, allControls) {
		db.getControlsForPreset(2, function(err, currentControls) {
      res.render('addpreset', { title: 'Add preset', allcontrols: allControls, currentcontrols: currentControls });
    });
  });
});

module.exports = router;
