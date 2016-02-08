app.factory('presetService', function ($http) {

    return {
        /**
         * Fetches all presets for the server.
         * @param callbackSuccess Called when all presets are fetched successfully. First parameter is the array of
         *                        presets.
         */
        getAllPresets : function(callbackSuccess) {
            $http({
                method: 'GET',
                url: '/db/presets'
            }).then(function (response) {
                if(callbackSuccess)
                callbackSuccess(response.data.presets);
            });
        }
    };

});
