(function () {
    'use strict';

    angular
        .module("GreenhouseApp")
        .factory("imageservice", imageservice);

    imageservice.$inject = ["$resource"];

    function imageservice($resource) {
        return $resource('http://192.168.1.91:4730/photos/latest', { }, {'query': {method: 'GET', isArray: false}});
    }
})();
