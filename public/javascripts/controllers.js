angular.module('myApp', []).
controller('EditPresetsCtrl', function ($scope, $http) {

	$http({
		method: 'GET',
		url: '/db/presets'
			}).then(function(response) {
        $scope.presets = response.data.presets;
    });
	$http({
		method: 'GET',
		url: '/db/controls'
			}).then(function(response) {
        $scope.allControls = response.data.controls;
    });

	$scope.currentPreset = null;
	$scope.setCurrentPreset = function(preset){
		$scope.currentPreset = preset;
	};
	
	$scope.addPreset = function() {
		var nextPresetNumber = 0;
		for(i = 0; i < $scope.presets.length; i++)
			if($scope.presets[i].presetNumber >= nextPresetNumber)
				nextPresetNumber = $scope.presets[i].presetNumber + 1;

		var newPreset = {
			presetNumber: nextPresetNumber,
			presetName: "New preset #" + nextPresetNumber,
			controls: []};
		$scope.presets.push(newPreset);
		$scope.setCurrentPreset(newPreset);
	}

  $scope.addCurrentControlToCurrentPreset = function() {
    var currentCcValue;
    if($scope.currentListItem != null){
      currentCcValue = $scope.currentListItem.listValue;
      $scope.currentListItem = null; // Clear variable for next input.
    }
    if($scope.currentRangePresentationValue != null) {
      // Calculate the correct CCValue from the presentation value range.
      var minPres = $scope.currentControl.rangeDimension.minPresentationValue;
      var maxPres = $scope.currentControl.rangeDimension.maxPresentationValue;
      var minCc   = $scope.currentControl.minCcValue;
      var maxCc   = $scope.currentControl.maxCcValue;
      currentCcValue = ($scope.currentRangePresentationValue - minPres) / (maxPres - minPres) * (maxCc - minCc);
      $scope.currentRangePresentationValue = null // Clear variable for next input.
    }

    var newControl = {
      controlId : $scope.currentControl.controlId,
      ccValue : currentCcValue
    };

    $scope.currentPreset.controls.push(newControl);
  }

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
 		for(i = 0; i < $scope.presets.length; i++) {
 			if($scope.presets[i].presetNumber == presetNumber)
 				$scope.presets.splice(i, 1);
 		}
 	};

  $scope.savePresetAndClose = function() {
    $http.post('db/savepresets', $scope.presets); // Saves all presets.
    $scope.currentPreset = null; // Closes the controls input view.
  }

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

  $scope.updateControlInput = function() {
    var t = "hej";
  }

  $scope.sendPreset = function(preset) {
  	$http.post('api/sendpreset', preset);
  }
});

