var presets = [
	{ 
		presetNumber: 0,
		presetName: "Preset 1"
	},
	{
		presetNumber: 1,
		presetName: "Preset 2"
	}
];

angular.module('myApp.services', []).
factory('editPresetService', function() {
  var presetNumber = -1;
  return {
    setPresetNumber : function(p) {
      presetNumber = p;
    },
    getPresetNumber : presetNumber
    };
  });
