'use strict';

/* Controllers */

angular.module('myApp', []).
  controller('IndexCtrl', function ($scope, $http) {
    $http.get('/api/posts').
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
      });
  }).
  controller('presetsCtrl', function ($scope, $http) {
    $http.get('/api/presets').
      success(function(data, status, headers, config) {
        $scope.presets = data;
      });
    $scope.editPreset = function(presetNumber) {
    	console.log(presetNumber);
    };
  });