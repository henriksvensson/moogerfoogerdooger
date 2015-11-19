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

var getControlsInPreset = function(presetNumber, callback) {
	if(!callback)
		return;

  var sql = "SELECT c.controlId, c.controlName, pcv.ccValue, pcv.ccValue / (c.maxCcValue - c.minCcValue) * rd.maxPresentationValue + rd.minPresentationValue as rangeValue, rd.unit, ld.listName, ldi.label FROM Controls c JOIN PresetControlValues pcv ON pcv.controlId = c.controlId JOIN Presets p ON p.presetId = pcv.presetId LEFT JOIN RangeDimensions rd ON rd.rangeDimensionId = c.rangeDimensionId LEFT JOIN ListDimensions ld ON ld.listDimensionId = c.listDimensionId LEFT JOIN ListDimensionItems ldi ON ld.listDimensionId = ldi.listDimensionId AND pcv.ccValue BETWEEN ldi.fromCcValue AND ldi.throughCcValue WHERE p.presetNumber = " + presetNumber;
	dbConnection.query(sql, function(err, rows, fields) {
		  if (!err) 
		    callback(null, rows);
		  else
		    callback(err, null);
		});
};
module.exports.getControlsInPreset = getControlsInPreset;

var getControlsNotInPreset = function(presetNumber, callback) {
	if(!callback)
		return;

  var sql = "SELECT c.controlId, c.controlName FROM Controls c WHERE c.controlId NOT IN (SELECT pcv.controlId FROM PresetControlValues pcv JOIN Presets p ON p.presetId = pcv.presetId WHERE p.presetNumber = " + presetNumber + ")";
	dbConnection.query(sql, function(err, rows, fields) {
		  if (!err)
		    callback(null, rows);
		  else
		    callback(err, null);
		});
};
module.exports.getControlsNotInPreset = getControlsNotInPreset;
