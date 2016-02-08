app.controller('EditCtrl', ['$scope', '$http', 'presetService', 'controlService',
    function ($scope, $http, presetService, controlService) {

        // Make the preset service available in the local scope.
        $scope.presetService = presetService;
        // Make the control service available in the local scope.
        $scope.controlService = controlService;

        // Populate all presets from the server via the preset service.
        presetService.getAll(function (presets) {
            $scope.presets = presets;
        });

        // Populate all controls from the server via the control service.
        controlService.getAll(function (controls) {
            $scope.allControls = controls;
        });

        $scope.currentPreset = null;
        $scope.setCurrentPreset = function (preset) {
            $scope.currentPreset = preset;
        };

        $scope.addPreset = function () {
            var nextPresetNumber = 0;
            for (i = 0; i < $scope.presets.length; i++)
                if ($scope.presets[i].presetNumber >= nextPresetNumber)
                    nextPresetNumber = $scope.presets[i].presetNumber + 1;

            var newPreset = {
                presetNumber: nextPresetNumber,
                presetName: "New preset #" + nextPresetNumber,
                controls: []
            };
            $scope.presets.push(newPreset);
            $scope.setCurrentPreset(newPreset);
        }

        $scope.addCurrentControlToCurrentPreset = function () {
            var currentCcValue;
            if ($scope.currentListItem != null) {
                currentCcValue = $scope.currentListItem.listValue;
                $scope.currentListItem = null; // Clear variable for next input.
            }
            if ($scope.currentRangePresentationValue != null) {
                // Calculate the correct CCValue from the presentation value range.
                var minPres = $scope.currentControl.rangeDimension.minPresentationValue;
                var maxPres = $scope.currentControl.rangeDimension.maxPresentationValue;
                var minCc = $scope.currentControl.minCcValue;
                var maxCc = $scope.currentControl.maxCcValue;
                currentCcValue = ($scope.currentRangePresentationValue - minPres) / (maxPres - minPres) * (maxCc - minCc);
                $scope.currentRangePresentationValue = null // Clear variable for next input.
            }

            var newControl = {
                controlId: $scope.currentControl.controlId,
                ccValue: currentCcValue
            };

            $scope.currentPreset.controls.push(newControl);
        }

        // TODO: Rewrite as an angular filter.
        $scope.controlsNotInUse = function () {
            if ($scope.currentPreset == null || !angular.isDefined($scope.allControls))
                return [];
            return $scope.allControls.filter(function (item) {
                for (c = 0; c < $scope.currentPreset.controls.length; c++)
                    if (item.controlId == $scope.currentPreset.controls[c].controlId)
                        return false;
                return true;
            });
        };

        $scope.deletePreset = function (presetNumber) {
            for (i = 0; i < $scope.presets.length; i++) {
                if ($scope.presets[i].presetNumber == presetNumber)
                    $scope.presets.splice(i, 1);
            }
            $scope.savePresets();
        };

        $scope.savePresets = function () {
            presetService.saveAll($scope.presets);
        };

        $scope.savePresetsAndClose = function () {
            $scope.savePresets();
            $scope.currentPreset = null; // Closes the controls input view.
        };

        $scope.sendPreset = function (preset) {
            presetService.send(preset);
        };

    }]);
