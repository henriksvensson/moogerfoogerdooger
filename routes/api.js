var express = require('express');
var router = express.Router();
var midi = require('../midi');

module.exports.sendPreset = function(req, res){
	midi.sendPreset(req.body);
  res.end();
};
