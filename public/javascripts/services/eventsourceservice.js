app.factory('eventSourceService', function () {

    /**
     * Initialize the event source handler. The server will send commands on an open stream that needs to be
     * interpreted on the client side.
     * @type {EventSource}
     */
    var es = new EventSource("/sse");

    var registeredListeners = {};

    var eventTrigger = function (event, isExternal) {
        if (!event.data)
            return;
        var raw = event.data.replace(/"/g, '').split(":");
        if (raw.length != 2)
            return;
        var object = raw[0];
        var eventMessage = raw[1];

        // Check to see if we have any registered listeners on the given object and event. If so, make a call
        // to each callback function.
        if (registeredListeners && registeredListeners[object] && registeredListeners[object][eventMessage])
            for (var c = 0; c < registeredListeners[object][eventMessage].length; c++)
                registeredListeners[object][eventMessage][c](object, eventMessage, isExternal);
    };

    /**
     * The onmessage function gets called for each message received on the event source stream. Here, we parse the
     * message and call all listeners registered for the given object and event.
     * @param event
     */
    es.onmessage = function(event) {
        eventTrigger(event, true);
    };

    return {
        /**
         * Registers a new listener for the given object and event.
         * @param object The object to listen to.
         * @param event The event on that object to listen to.
         * @param callback The callback function for the given object and event. function(object, event)
         */
        register: function (object, event, callback) {
            if (!registeredListeners[object]) {
                registeredListeners[object] = {};
                registeredListeners[object][event] = [];
            }
            registeredListeners[object][event].push(callback);
        },

        /**
         * Programatically trigger an event.
         * @param eventData The event data to send in the triggered event.
         */
        trigger: function (eventData) {
            eventTrigger({data: eventData});
        }
    }
});
