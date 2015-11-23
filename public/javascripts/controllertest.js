var presets = [
	{ 
		presetNumber: 0,
		presetName: "Preset 1",
		controls: [{
			controlId: 0,
			ccValue: 12,
			displayValue: "23%"}
			]
	},
	{
		presetNumber: 1,
		presetName: "Preset 2",
		controls: [{
			controlId: 0,
			ccValue: 23,
			displayValue: "Bypassed"}
			]
	}
];

angular.module('myApp', []).
controller('TestCtrl', function ($scope, $http) {
	$scope.presets = presets;
	$scope.currentPreset = null;
	$scope.setCurrentPreset = function(preset){
		$scope.currentPreset = preset;
	};
	$http.get('/api/presets').
      success(function(data, status, headers, config) {
        $scope.presetsDb = data;
    });
	$http.get('/api/controls').
      success(function(data, status, headers, config) {
        $scope.allControls = data;
    });
});