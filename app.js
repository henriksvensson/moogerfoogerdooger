var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express_sse = require('express-sse');
var os = require('os');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/routes');
app.get('/', routes.index);
app.get('/live', routes.live);

var db = require("./routes/db");
app.get('/db/presets', db.presets);
app.get('/db/controls', db.controls);
app.post('/db/savepresets', db.savePresets);

var api = require('./routes/api');
app.post('/api/sendpreset', api.sendPreset);

var sse = new express_sse();
app.get('/sse', sse.init);
// Use the following line to send messegaes on the stream:
// sse.send('coolt');

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/javascripts/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/javascripts/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/stylesheets/animate/animate.min.css', express.static(__dirname + '/node_modules/animate.css/animate.min.css'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/**
 * Methods for handling GPIO (hardware buttons).
 */

// Check for linux on an ARM processor to be reasonably sure it's a Raspberry PI
if (os.platform() == 'linux' && os.arch() == 'arm') {
// For Raspberry Pi GPIO pins, go to http://pinout.xyz/pinout/pin7_gpio4
    var Gpio = require('onoff').Gpio,
        button01 = new Gpio(4, 'in', 'both'),
        button02 = new Gpio(17, 'in', 'both');

    function exit() {
        button01.unexport();
        button02.unexport();
        process.exit();
    }

    process.on('SIGINT', exit)

    button01.watch(function (err, value) {
        sse.send('B01:' + value);
    });

    button02.watch(function (err, value) {
        sse.send('B02:' + value);
    });

}

else {
    console.log("Raspberry PI is not detected, disabling GPIO and hardware")
}

module.exports = app;
