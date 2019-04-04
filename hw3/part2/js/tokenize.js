var myModule = angular.module('myApp', []);

myModule.controller('TokenController', function ($scope) {
    $scope.delimeter = '#';
    $scope.inputString = 'Angular is awesome'
});

myModule.filter('tokenize', function () {
    return function (value, delimeter) {
        if (angular.isString(value)) {
            splitString = value.split("");
            return splitString.join(delimeter || ',');
        } else {
            return value;
        }
    };
});


