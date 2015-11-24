var express = require('express');
var router = express.Router();

module.exports.index = function(req, res){
  res.render('index', { title: 'MoogerFoogerDooger' } );
};

module.exports.live = function(req, res){
  res.render('live', { title: 'Live mode' } );
};

module.exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};