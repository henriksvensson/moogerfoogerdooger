var presets = [
	{ 
		presetNumber: 0,
		presetName: "Preset 1",
		controls: [{
			controlId: 739,
			ccValue: 1200}, {
			controlId: 80,
			ccValue: 64}
			]
	},
	{
		presetNumber: 1,
		presetName: "Preset 2",
		controls: [{
			controlId: 80,
			ccValue: 0}
			]
	}
];

var controls = [
	{
		controlId: 80,
		ccNumberMSB: null,
		ccNumberLSB: 80,
		controlName: "Bypass on/off",
		minCcValue: 0,
		maxCcValue: 127,
		listDimension: [{listLabel: "Bypassed", listValue: 0}, {listLabel: "Active", listValue: 64}]
	},
	{
		controlId: 739,
		ccNumberMSB: 07,
		ccNumberLSB: 39,
		controlName: "Output level",
		minCcValue: 0,
		maxCcValue: 16383,
		rangeDimension: {minPresentationValue: 0, maxPresentationValue: 100, unit: "%"}
	}
]

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
        $scope.allControls = controls;
    });

  // TODO: Rewrite as an angular filter.
  $scope.controlsNotInUse = function() {
  	if($scope.currentPreset == null || !angular.isDefined($scope.allControls))
  		return [];
  	return $scope.allControls.filter(function(item) {
  		for(c = 0; c < $scope.currentPreset.controls.length; c++)
  			if(item.controlId == $scope.currentPreset.controls[c].controlId)
  				return false;
  		return true;
  	});
  };

 	$scope.deletePreset = function(presetNumber) {
 		for(i = 0; i < presets.length; i++) {
 			if(presets[i].presetNumber == presetNumber)
 				presets.splice(i, 1);
 		}
 	};

  $scope.getControlName = function(controlId) {
    var c = $scope.getControl(controlId);
		return c.controlName;  	
  };
  $scope.getControlPresentationValue = function(controlId, ccValue) {
    var c = $scope.getControl(controlId);
    if(!angular.isDefined(c))
    	return "N/A";
    if(angular.isDefined(c.listDimension)) 
    	for(i = 0; i < c.listDimension.length; i++)
    		if(c.listDimension[i].listValue == ccValue)
    			return c.listDimension[i].listLabel;
    if(angular.isDefined(c.rangeDimension))
    	return ccValue / (c.maxCcValue - c.minCcValue) * c.rangeDimension.maxPresentationValue - c.rangeDimension.minPresentationValue + " " + c.rangeDimension.unit;
  	return control.ccValue + " [raw]";
  };
  $scope.getControl = function(controlId) {
  	for(c = 0; c < controls.length; c++) 
  		if(controls[c].controlId == controlId)
  			return controls[c];
  	return null;
  }
});
