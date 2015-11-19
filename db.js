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