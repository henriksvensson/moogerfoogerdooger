app.factory('controlService', function ($http) {

    var allControls = null;

    return {
        /**
         * Fetches all available controls for the server.
         * @param callbackSuccess Called when all controls are fetched successfully. First parameter is the array of
         *                        controls.
         */
        getAllControls: function (callbackSuccess) {
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

        getControl: function (controlId) {
            if (allControls)
                for (var c = 0; c < allControls.length; c++)
                    if (allControls[c].controlId == controlId)
                        return allControls[c];
            return null;
        },

        getControlName: function (controlId) {
            return this.getControl(controlId).controlName;
        }

    };

});
