var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
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

module.exports.index = function(req, res){
  res.render('index', { title: 'MoogerFoogerDooger' } );
};

module.exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};