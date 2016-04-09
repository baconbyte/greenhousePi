(function () {
    'use strict';

    angular
        .module("GreenhouseApp")
        .factory("tapservice", tapservice);

    tapservice.$inject = ["$resource"];

    function tapservice($resource) {
        return $resource('http://192.168.1.91:4730/taps/:id', { id: '@id' }, {update: {method: 'PUT'}});
    }
})();
