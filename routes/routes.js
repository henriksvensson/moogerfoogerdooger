var express = require('express');
var router = express.Router();

module.exports.index = function(req, res){
  res.render('index', { title: 'MoogerFoogerDooger' } );
};

module.exports.live = function(req, res){
  res.render('live', { title: 'Live mode' } );
};
