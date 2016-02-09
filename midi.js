var shell = require('shelljs');

module.exports.dir = function () {
    var s = shell.exec("ls", {async: true});
    s.stdout.on('data', function(data) {
        console.log(data);
    });
};

module.exports.sendPreset = function (preset) {
    var cmd = "midisnd";
    for (var c = 0; c < preset.controls.length; c++) {
        var control = preset.controls[c];
        var ex = cmd + " " + control.ccValue
        console.log(ex);
    }
};