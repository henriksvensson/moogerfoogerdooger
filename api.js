var db = require('./db');

/**
 * Returns the list of Presets in JSON format.
 *
 */
var getPresets = function(request, response) {
	db.getPresets(function(err, rows) {
	  if (!err)
	    response.end(JSON.stringify(rows));
	  else
	    console.log('Error while performing Query.');
	});
	};

module.exports.getPresets = getPresets;