var sys = require('sys');
var exec = require('child_process').exec;

module.exports.dir = function() {
	exec("dir", function (error, stdout, stderr) {
	  console.log('stdout: ' + stdout);
	  console.log('stderr: ' + stderr);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  }
	});	
};

module.exports.sendPreset = function(preset) {
	var cmd = "midisnd";
	for(var c = 0; c < preset.controls.length; c++) {
		var control = preset.controls[c];
		var ex = cmd + " " + control.ccValue
		console.log(ex);
	}
};