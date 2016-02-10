app.factory('controlService', function ($http, $filter) {

    var allControls = null;

    return {
        /**
         * Fetches all available controls for the server.
         * @param callbackSuccess Called when all controls are fetched successfully. First parameter is the array of
         *                        controls.
         */
        getAll: function (callbackSuccess) {
            if (allControls && callbackSuccess)
                callbackSuccess(allControls);

            $http({
                method: 'GET',
                url: '/db/controls'
            }).then(function (response) {
                allControls = response.data.controls;
                if (callbackSuccess)
                    callbackSuccess(allControls);
            });
        },

        get: function (controlId) {
            if (allControls)
                for (var c = 0; c < allControls.length; c++)
                    if (allControls[c].controlId == controlId)
                        return allControls[c];
            return null;
        },

        getName: function (controlId) {
            var c = this.get(controlId);
            if (c)
                return c.controlName;
            return null;
        },

        getPresentationValue: function (controlId, ccValue) {
            var c = this.get(controlId);
            if (!angular.isDefined(c))
                return "N/A";
            if (angular.isDefined(c.listDimension))
                for (i = 0; i < c.listDimension.length; i++)
                    if (c.listDimension[i].listValue == ccValue)
                        return c.listDimension[i].listLabel;
            if (angular.isDefined(c.rangeDimension))
                return $filter('number')(
                        ccValue / (c.maxCcValue - c.minCcValue) * c.rangeDimension.maxPresentationValue
                        - c.rangeDimension.minPresentationValue, 2)
                    + " " + c.rangeDimension.unit;
            return ccValue + " [raw]";
        }
    };
});
