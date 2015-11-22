'use strict';

/* Controllers */

angular.module('myApp', ['myApp.services']).
  controller('IndexCtrl', function ($scope, $http) {
    $http.get('/api/posts').
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
      });
  }).

  controller('presetsCtrl', ['$scope', '$http', 'editPresetService', function ($scope, $http, editPresetService) {
    $http.get('/api/presets').
      success(function(data, status, headers, config) {
        $scope.presets = data;
      });
    $scope.editPreset = function(presetNumber) {
    	editPresetService.setPresetNumber(presetNumber);
    };
  }]).

  controller('editPresetCtrl', ['$scope', '$http', 'editPresetService', function($scope, $http, editPresetService) {
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
  }]);