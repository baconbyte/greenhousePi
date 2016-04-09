(function () {
    'use strict';

    angular
        .module('GreenhouseApp')
        .controller('ThermometerController', ThermometerController);

    ThermometerController.$inject = ['$timeout', '$log', 'thermometerService'];

    function ThermometerController($timeout, $log, thermometerService) {
        var vm = this;
        vm.thermometers = [];

        //todo retrieve name
        vm.series = ['Greenhouse', 'Outside'];
        vm.hourlyData = [];
        vm.dailyData = [];

        $log.log("Init therm controller");

        (function refresh() {
            loadDailyStats();
            loadHourlyStats();
            loadCurrentStats();
            $timeout(refresh, 60000);
        })();

        function loadCurrentStats() {
            thermometerService.current.query(
                function (thermometers) {
                    $log.log(thermometers);
                    if (vm.thermometers.length != thermometers.length) {
                        //initial load
                        vm.thermometers = thermometers;
                    } else {
                        //update the contents of the thermometers array individually, overwriting existing array was causing UI flicker
                        thermometers.forEach(function (thermometer) {
                            vm.thermometers.forEach(function (localThermometer) {
                                if (localThermometer.id == thermometer.id) {
                                    localThermometer.temperature = thermometer.temperature;
                                }
                            })
                        });
                    }
                });
        };

        function loadHourlyStats() {
            thermometerService.hourly.query({id:1},
                function (hourlystats) {
                    //todo handle missing data points on
                    vm.hourlyLabels = hourlystats.map(function(item) {
                        var date = new Date(item.timestamp);
                        return date.getHours() + ":00";
                    });

                    vm.hourlyData[0] = hourlystats.map(function(item) {
                        return Math.round((item.temperature_sum/item.count) * 10) / 10;
                    });
                });
            thermometerService.hourly.query({id:2},
                function (hourlystats) {
                    vm.hourlyData[1] = hourlystats.map(function(item) {
                        return Math.round((item.temperature_sum/item.count) * 10) / 10;
                    });
                });
        }

        function loadDailyStats() {
            thermometerService.daily.query({id:1},
                function (dailystats) {
                    //todo handle missing data points on
                    vm.dailyLabels = dailystats.map(function(item) {
                        var date = new Date(item.timestamp);
                        return date.getDate() + "-" + date.getMonth();
                    });

                    vm.dailyData[0] = dailystats.map(function(item) {
                        return Math.round((item.temperature_sum/item.count) * 10) / 10;
                    });
                });
            thermometerService.daily.query({id:2},
                function (dailystats) {
                    vm.dailyData[1] = dailystats.map(function(item) {
                        return Math.round((item.temperature_sum/item.count) * 10) / 10;
                    });
                });
        }


    }

})();