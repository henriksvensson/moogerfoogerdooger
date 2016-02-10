app.controller('BodyCtrl', ['$scope', 'eventSourceService',
    function ($scope, eventSourceService) {

        $scope.keypressEvent = null;

        $scope.$watch('keypressEvent', function () {
            if (!$scope.keypressEvent)
                return;

            if ($scope.keypressEvent.keyCode == 44) // Comma sign ","
                eventSourceService.trigger('"B01:1');
            if ($scope.keypressEvent.keyCode == 46) // Full stop sign "."
                eventSourceService.trigger('"B02:1');
            if ($scope.keypressEvent.keyCode == 32) // Space bar " "
                eventSourceService.trigger('"B03:1');
        });

    }]);
