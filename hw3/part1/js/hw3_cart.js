var myModule = angular.module('myApp', []);

myModule.controller('CartController', function ($scope) {
    // create new data object to hold a new book
    // this would allow for additinal data items to be added to the controller
    // similar to Vue.js data() {}
    var data = {
        book: {
            title: 'New Book',
            qty: 1,
            price: 10.99
        }
    }

    // grab saved books from storage or use predefined list
    $scope.books = JSON.parse(window.localStorage.getItem('barker_cart')) || [
        {
            title: 'Absolute Java',
            qty: 1, price: 114.95
        },
        {
            title: 'Pro HTML5',
            qty: 1, price: 27.95
        },
        {
            title: 'Head First HTML5',
            qty: 1, price: 27.89
        }
    ];

    $scope.removeBook = function (index) {
        $scope.books.splice(index, 1);
    }

    // add a new book to the book array
    $scope.addBook = function () {
        $scope.books.push(data.book)
    }

    // store the books
    $scope.save = function () {
        window.localStorage.setItem('barker_cart', JSON.stringify($scope.books))
    }

    /**
     * Adapted from https://stackoverflow.com/a/42217585/8473614
     */
    $scope.getTotal = function () {
        var total = 0;
        angular.forEach($scope.books, function (key, value) {
            total += key.price * key.qty;
        });
        return total;
    }
});
