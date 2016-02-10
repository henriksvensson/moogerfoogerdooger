var shell = require('shelljs');

module.exports.dir = function () {
    var s = shell.exec("ls", {async: true});
    s.stdout.on('data', function(data) {
        console.log(data);
    });
};

module.exports.sendPreset = function (preset) {
    // amidi -p hw:1,0,0 -S "B0 50 00"
    // B0: Control Change, channel 1
    // 50: Bypass (dec 80)
    // 00: Bypassed (00: Bypassed, 40: Active)

    // B0:
    // 57: Delay Time Multiplier
    // 00: Normal
    
    var cmd = "amidi -p hw:1,0,0 -S ";

    for (var c = 0; c < preset.controls.length; c++) {
        var control = preset.controls[c];
        var ex = cmd + " " + control.ccValue
        console.log(ex);
    }
};