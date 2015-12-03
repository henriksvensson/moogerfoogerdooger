var express = require('express');
var router = express.Router();
var fs = require('fs.extra');
var moment = require('moment');

var presetsFileName = __dirname + '/../db/presets.json';
var controlsFileName = __dirname + '/../db/controls.json';

var presets = require(presetsFileName);
var controls = require(controlsFileName);

module.exports.presets = function(req, res){
  fs.readFile(presetsFileName, function(err, data) {
    if(err)
      throw err;
    presets = data;
    res.end(presets);
  });
};

module.exports.controls = function(req, res){
  res.end(JSON.stringify(controls));
};

module.exports.savePresets = function(req, res){
  // Create a backup copy of the current presets file.
  var backupFileName = __dirname + '/../db/backup/presets-backup-' + moment().format('YYYYMMDD-HHmmss') + '.json';
  fs.copy(presetsFileName, backupFileName, function(err) {
    if(err)
      console.log("Could not create backup copy of presets file. " + err);
  });

  // Write the new data to the presets file.
  var p = { presets: req.body };
  fs.writeFile(presetsFileName, JSON.stringify(p, null, 2), function(err) {
      if(err) {
          console.log("Could not save presets file. " + err);
      }
  }); 
  res.end();
};
