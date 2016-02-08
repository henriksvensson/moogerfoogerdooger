app.controller('LiveCtrl', ['$scope', '$http', 'presetService', 'eventSourceService',
    function ($scope, $http, presetService, eventSourceService) {

        // Fetch all presets from the service and assign them to scope variables.
        presetService.getAllPresets(function (presets) {
            $scope.allPresets = presets;
            $scope.currentPresetIndex = 0;
            $scope.currentPreset = $scope.allPresets[$scope.currentPresetIndex];
        });

        eventSourceService.register("B01", "1", function () {
            $scope.activatePreviousPreset();
        });
        eventSourceService.register("B02", "1", function () {
            $scope.activateNextPreset();
        });

        /**
         * Activates a preset to be shown in the live view.
         * @param presetIndex The index of the preset to be activated.
         */
        $scope.activatePresetIndex = function (presetIndex) {
            $scope.currentPresetIndex = presetIndex;
            $scope.currentPreset = $scope.allPresets[presetIndex];
        };

        $scope.activateNextPreset = function () {
            if ($scope.currentPresetIndex < $scope.allPresets.length - 1) {
                $scope.currentPresetIndex++;
                $scope.currentPreset = $scope.allPresets[$scope.currentPresetIndex];
                $scope.$apply();
            }
        };

        $scope.activatePreviousPreset = function () {
            if ($scope.currentPresetIndex > 0) {
                $scope.currentPresetIndex--;
                $scope.currentPreset = $scope.allPresets[$scope.currentPresetIndex];
                $scope.$apply();
            }
        };

    }]);