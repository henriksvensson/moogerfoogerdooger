app.controller('LiveCtrl', ['$scope', '$http', 'presetService', function ($scope, $http, presetService) {

    $scope.presets = [
        {presetNumber: 0,  presetName: "Preset A"},
        {presetNumber: 1,  presetName: "Preset B"},
        {presetNumber: 2,  presetName: "Preset C"},
        {presetNumber: 3,  presetName: "Preset D"},
        {presetNumber: 4,  presetName: "Preset E"},
        {presetNumber: 5,  presetName: "Preset F"},
        {presetNumber: 6,  presetName: "Preset G"},
        {presetNumber: 7,  presetName: "Preset H"},
        {presetNumber: 8,  presetName: "Preset I"},
        {presetNumber: 9,  presetName: "Preset J"},
        {presetNumber: 10, presetName: "Preset K"}
    ];
    $scope.currentPreset = $scope.presets[0];

    $scope.activatePreset = function (preset) {
        $scope.currentPreset = preset;
    };

}]);