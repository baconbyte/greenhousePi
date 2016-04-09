(function () {
    'use strict';

    angular
        .module('GreenhouseApp')

        .filter('timerLabel', [function () {
            return function (status) {
                if (status) {
                    return "Stop Timer";
                } else {
                    return "Start Timer";
                }
            };
        }]);

})();