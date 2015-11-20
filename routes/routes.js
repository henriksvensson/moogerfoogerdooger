var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getPresets( function(err, rows) {
    res.render('index', { title: 'MoogerFoogerDooger', presets: rows });
  });
});

router.get('/preset', function(req, res, next) {
	var presetNumber = -1;
	if(req.query.presetNumber)
		presetNumber = req.query.presetNumber;
	db.getControlsNotInPreset(presetNumber, function(err, controlsNotInPreset) {
		db.getControlsInPreset(presetNumber, function(err, controlsInPreset) {
      res.render('preset', { title: 'Preset', controlsnotinpreset: controlsNotInPreset, controlsinpreset: controlsInPreset });
    });
  });
});

module.exports = router;
