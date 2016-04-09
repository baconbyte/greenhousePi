(function () {
    'use strict';

    angular
        .module('GreenhouseApp')
        .controller('AppController', AppController);

    AppController.$inject = ['$timeout', '$log', 'tapservice'];

    function AppController($timeout, $log, tapservice) {
        var vm = this;
        vm.taps = [];
        vm.toggleTimer = toggleTimer;
        vm.incrementTime = incrementTime;
        vm.decrementTime = decrementTime;
        vm.update = update;
        vm.editSeconds = [];

        (function refresh() {
            tapservice.query(
                function (taps) {
                    if (vm.taps.length == 0) {
                        //initial load
                        vm.taps = taps;
                        vm.taps.forEach(function (tap) {
                            vm.editSeconds[tap.id] = tap.timerSeconds;
                        });
                    } else {
                        //update the contents of the taps array individually, overwriting existing array was causing UI flicker
                        taps.forEach(function (tap) {
                            vm.taps.forEach(function (localTap) {
                                if (localTap.id == tap.id) {
                                    localTap.status = tap.status;
                                    localTap.timerStatus = tap.timerStatus;
                                    localTap.timerSeconds = tap.timerSeconds;
                                }
                            })
                        });
                    }
                    $timeout(refresh, 1000);
                });
        })();

        function update(tap) {
            tapservice.update({}, tap);
        }

        function toggleTimer(tap) {
            if (tap.timerStatus) {
                vm.editSeconds[tap.id] = tap.timerSeconds;
                tap.status = false;
            } else {
                tap.timerSeconds = vm.editSeconds[tap.id];
            }
            tap.timerStatus = !tap.timerStatus;
            tapservice.update({}, tap);
        }

        function incrementTime(tap) {
            vm.editSeconds[tap.id] += 60;
        }

        function decrementTime(tap) {
            vm.editSeconds[tap.id] += 60;
        }
    }

})();