var express = require('express');
var router = express.Router();
var fs = require('fs');

var presets = require('../db/presets.json');
var controls = require('../db/controls.json');

module.exports.presets = function(req, res){
  res.end(JSON.stringify(presets));
};

module.exports.controls = function(req, res){
  res.end(JSON.stringify(controls));
};
