// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var bookApp = angular.module('bookApp', []);

bookApp.controller('bookCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

    //Inicializo variables
    $scope.user = {
        email: null,
        password: null,
        grant_type: null
    };

    //Busco los libros
    $http.get("1/books")
        .then(function successCallBack(response){
            $scope.books = response.data.response;
        });

    //Funcion para login
    $scope.login = function(){

        $scope.user.email = $scope.email;
        $scope.user.password = $scope.password;
        $scope.user.grant_type = "password";

        $http({
            method: 'POST',
            url: '/oauth/token',
            data: $scope.user
        }).then(function successCallBack(response) {
            $scope.token = response.data.access_token;

        }, function errorCallback(response) {
            $scope.token = null;
        });
    };

    $scope.logout = function(){
        $scope.token = null;
    };
}]);

bookApp.controller('loginCtrl', ['$scope', '$http', function($scope, $http){

    $scope.user = {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null
    };

    $scope.createUser = function(){
        $scope.user.first_name = $scope.first_name;
        $scope.user.last_name = $scope.last_name;
        $scope.user.email = $scope.email;
        $scope.user.password = $scope.password;
        $scope.user.password_confirmation = $scope.repassword;

        $http({
            method: 'POST',
            url: '/1/users',
            data: $scope.user
        }).then(function successCallBack(response) {

        });
    }

}]);
