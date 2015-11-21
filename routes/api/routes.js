var express = require('express');
var router = express.Router();
var api = require('../../api');
var db = require('../../db');

//router.get('/getpresets', api.getPresets);

//module.exports = router;



// initialize our faux database
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

// GET
module.exports.presets = function (req, res) {
  db.getPresets(function(err, rows) {
    if (!err)
      res.end(JSON.stringify(rows));
    else
      console.log('Error while performing Query.');
  });
};

module.exports.controlsInPreset = function (req, res) {
  db.getControlsInPreset(2, function(err, rows) {
    if (!err)
      res.end(JSON.stringify(rows));
    else
      console.log('Error while performing Query.');
  });
};

module.exports.controlsNotInPreset = function (req, res) {
  db.getControlsNotInPreset(2, function(err, rows) {
    if (!err)
      res.end(JSON.stringify(rows));
    else
      console.log('Error while performing Query.');
  });
};


module.exports.posts = function (req, res) {
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

module.exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
};

// POST
module.exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};

// PUT
module.exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
module.exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};