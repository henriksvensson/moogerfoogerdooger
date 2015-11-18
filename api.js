var mysql      = require('mysql');
var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mfd',
  password : 'moogerfoogerdooger',
  database : 'mfd'
});
dbConnection.connect();

var getPresets = function(req, res) {
	dbConnection.query('SELECT * from mfd.Presets', function(err, rows, fields) {
	  if (!err)
	    res.end(JSON.stringify(rows));
	  else
	    console.log('Error while performing Query.');
	});
};

module.exports.getPresets = getPresets;