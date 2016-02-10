app.controller('LiveCtrl', ['$scope', '$http', 'presetService', 'controlService', 'eventSourceService',
    function ($scope, $http, presetService, controlService, eventSourceService) {

        // Make the preset service available in the local scope.
        $scope.presetService = presetService;
        // Make the control service available in the local scope.
        $scope.controlService = controlService;

        // Fetch all presets from the service and assign them to scope variables.
        presetService.getAll(function (presets) {
            $scope.allPresets = presets;
            $scope.currentPresetIndex = 0;
            $scope.currentPreset = $scope.allPresets[$scope.currentPresetIndex];
        });

        controlService.getAll();

        eventSourceService.register("B01", "1", function () {
            $scope.activatePreviousPreset();
            $scope.$apply();
        });
        eventSourceService.register("B02", "1", function () {
            $scope.activateNextPreset();
            $scope.$apply();
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
            }
        };

        $scope.activatePreviousPreset = function () {
            if ($scope.currentPresetIndex > 0) {
                $scope.currentPresetIndex--;
                $scope.currentPreset = $scope.allPresets[$scope.currentPresetIndex];
            }
        };

    }]);