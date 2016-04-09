(function () {
    'use strict';

    angular
        .module("GreenhouseApp")
        .factory("thermometerService", thermometerService);

    thermometerService.$inject = ["$resource"];

    function thermometerService($resource) {
        return {
            current: $resource('http://192.168.1.91:4730/thermometers/:id', {id: '@id'}, {update: {method: 'PUT'}}),
            hourly: $resource('http://192.168.1.91:4730/thermometers/:id/hourly', {id: '@id'}, {update: {method: 'GET'}}),
            daily: $resource('http://192.168.1.91:4730/thermometers/:id/daily', {id: '@id'}, {update: {method: 'GET'}})
        };
    };
})();
