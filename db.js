var mysql      = require('mysql');
var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mfd',
  password : 'moogerfoogerdooger',
  database : 'mfd'
});
dbConnection.connect();

/**
 * Returns the list of Presets in JSON format.
 *
 */
var getPresets = function(callback) {
	if(!callback)
		return;

	dbConnection.query('SELECT presetNumber, presetName FROM Presets', function(err, rows, fields) {
	  if (!err)
	    callback(null, rows)
	  else
	    callback(err, null);
	});

};
module.exports.getPresets = getPresets;

var getControls = function(callback) {
	if(!callback)
		return;

	dbConnection.query('SELECT controlId, controlName FROM Controls', function(err, rows, fields) {
	  if (!err)
	    callback(null, rows)
	  else
	    callback(err, null);
	});
};
module.exports.getControls = getControls;

var getControlsForPreset = function(presetNumber, callback) {
	if(!callback)
		return;

	dbConnection.query('SELECT c.controlId, c.controlName FROM Controls c JOIN PresetControlValues pcv ON pcv.controlId = c.controlId JOIN Presets p ON p.presetId = pcv.presetI WHERE p.presetNumber = ' + presetNumber, 
		function(err, rows, fields) {
		  if (!err)
		    callback(null, rows)
		  else
		    callback(err, null);
		});
};
module.exports.getControlsForPreset = getControlsForPreset;
