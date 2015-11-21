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
  }).

  controller('editPresetCtrl', function($scope, $http ) {
    $http.get('/api/controlsInPreset').
      success(function(data, status, headers, config) {
        $scope.controlsInPreset = data;
      });
    $http.get('/api/controlsNotInPreset').
      success(function(data, status, headers, config) {
        $scope.controlsNotInPreset = data;
      });
    $scope.controlValue = function(control) {
    	if(angular.isDefined(control.rangeValue) && control.rangeValue != null)
    		return control.rangeValue + ' ' + control.unit;
    	else if(angular.isDefined(control.label) && control.label != null)
    		return control.label;
    	else
    		return control.ccValue;
    };
  	$scope.presetName = "New preset";
  });