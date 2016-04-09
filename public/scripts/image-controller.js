(function () {
    'use strict';

    angular
        .module('GreenhouseApp')
        .controller('ImageController', ImageController);

    ImageController.$inject = ['$timeout', 'imageservice'];

    function ImageController($timeout, imageservice) {
        var vm = this;
        vm.imageUrl = "";

        (function refresh() {
            var result = imageservice.query(
                function () {
                    console.log(result);
                    vm.imageUrl = "img/camera/" + result.filename;
                });
            $timeout(refresh, 1000);
        })();

    }

})();