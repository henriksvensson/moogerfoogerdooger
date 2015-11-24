angular.module('myApp', []).
controller('TestCtrl', function ($scope, $http) {

	$scope.currentPreset = null;
	$scope.setCurrentPreset = function(preset){
		$scope.currentPreset = preset;
	};
	
	$http({
		method: 'GET',
		url: '/db/presets'
			}).then(function(response) {
				console.log(response.data);
        $scope.presets = response.data.presets;
    });
	$http({
		method: 'GET',
		url: '/db/controls'
			}).then(function(response) {
        $scope.allControls = response.data.controls;
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
  	for(c = 0; c < $scope.allControls.length; c++) 
  		if($scope.allControls[c].controlId == controlId)
  			return $scope.allControls[c];
  	return null;
  }
});
