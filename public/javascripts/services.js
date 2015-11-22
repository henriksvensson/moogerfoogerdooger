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
