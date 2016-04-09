(function () {
    'use strict';

    angular
        .module('GreenhouseApp')

        .filter('secondsToDateTime', [function () {
            return function (seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        }]);

})();