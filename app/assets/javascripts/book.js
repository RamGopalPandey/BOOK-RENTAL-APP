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

var bookApp = angular.module('bookApp', [ 'ngFlash', 'ngCookies', 'ngAnimate']);

bookApp.controller('bookCtrl', ['$rootScope', '$scope', '$http', '$timeout', 'Flash', '$cookies', function($rootScope, $scope, $http, $timeout, Flash, $cookies){

    $scope.successCreate = function () {
        var message = '<strong>Well done!</strong> You successfully created a user.';
        $cookies.put("message_type", 'success');
        $cookies.put("message", message);
        //Flash.create('success', message);
    };

    $scope.successLogin = function(){
        var message = '<strong>Welcome</strong>, Successfully logged in!'
        $cookies.put("message_type", 'success');
        $cookies.put("message", message);
    }
    $scope.info = function () {
        var message = '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.';
        $cookies.put("message_type", 'info');
        $cookies.put("message", message);
        //Flash.create('info', message);
    };
    $scope.warning = function (response) {
        var message = '<strong>Warning!</strong> User not created because: ' + response.data.error_description;
        $cookies.put("message_type", 'danger');
        $cookies.put("message", message);
        //Flash.create('warning', message);
    };
    $scope.danger = function (response) {
        var message = '<strong>Oh snap!</strong> You could not log in because : ' + response.data.error_description;
        $cookies.put("message_type", 'danger');
        $cookies.put("message", message);
        //Flash.create('danger', message);
    };
    $scope.pause = function () {
        Flash.pause();
    };

    //Chequeo si hay mensaje para mostrar
    $scope.gotMessage = function(){
        if($cookies.get("message_type") !== "null"){
            $scope.hasFlash = true;
            return true;
        }else{
            return false;
        }
    }


    //Chequeo el mensaje de las cookies.
    if($cookies.get("message_type") !== "null"){
        Flash.create($cookies.get("message_type"), $cookies.get("message"));
    }


    //Inicializo variables
    $scope.user = {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null,
        grant_type: null
    };

    //Busco los libros
    if($scope.books === null || $scope.books === undefined){
        $http.get("1/books")
        .then(function successCallBack(response){
            $scope.books = response.data.response;
        });
    }
    

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
            $cookies.put('token', response.data.access_token);
            $scope.successLogin();
        }, function errorCallback(response) {
            $cookies.put("token", null);
            $scope.danger(response);
        });
    };

    $scope.register = function(){

        $scope.user.first_name = $scope.first_name;
        $scope.user.last_name = $scope.last_name;
        $scope.user.password = $scope.password;
        $scope.user.password_confirmation = $scope.password_confirmation;
        $scope.user.email = $scope.email;

        $http({
            method: 'POST',
            url: '/1/users',
            data: $scope.user
        }).then(function successCallBack(response){
            $scope.successCreate();
        }, function errorCallback(response){
            $scope.warning(response);
        });
    }


    $scope.logout = function(){
        $cookies.put('token', null);
        $scope.loggedIn = false;
        $cookies.put("userId", null);
    };

    //Funcion chequeo de logeo
    var getBooks = function(){
        $http({
            method: 'GET',
            url: '/1/users/me',
            headers: {
                'Authorization': "Bearer " + $cookies.get('token')
            }
        }).then(function successCallBack(response) {
            $scope.loggedIn = true;
            $cookies.put("userId", response.data.response.id);
        }, function errorCallback(response) {
            $scope.loggedIn = false;
            $cookies.put("userId", null);
        });
    }
    

    $scope.hideMessage = function(){
       $scope.hasFlash = false;
       $cookies.put("message_type", null);
    };


    //Filtro de libros
    $scope.filterMyBooks = function(){
        $scope.allBooksSelected = false;
        $scope.studiedBooksSelected = false;
        $scope.myBooksSelected = true;
        $http({
            method: 'GET',
            url: '/1/books/my_books',
            headers: {
                'Authorization': "Bearer " + $cookies.get("token")
            }
        }).then(function successCallBack(response){
            $scope.myBooks = response.data.response;
        }, function errorCallback(response){

        });
    };

    $scope.filterStudiedBooks = function(){
        $scope.allBooksSelected = false;
        $scope.myBooksSelected = false;
        $scope.studiedBooksSelected = true;
        $http({
            method: 'GET',
            url: '/1/books/studied_books',
            headers: {
                'Authorization': "Bearer " + $cookies.get("token")
            }
        }).then(function successCallBack(response){
            $scope.studiedBooks = response.data.response;
        }, function errorCallback(response){

        });
    }

    $scope.allBooks = function(){
        $scope.allBooksSelected = true;
        $scope.myBooksSelected = false;
        $scope.studiedBooksSelected = false;
    }


    $scope.rentBook = function (book){
        $http({
            method: 'POST',
            url: '/1/books/rent',
            data: book,
            headers: {
                'Authorization': "Bearer " + $cookies.get("token")
            }
        }).then(function successCallBack(response){
            
        }, function errorCallback(response){

        });
    }

    $scope.iRentedThisBook = function(book){
        return (book.rented_by_id === parseInt($cookies.get('userId')));
    }

    $scope.returnBook = function(book){
        $http({
            method: 'POST',
            url: '1/books/return',
            data: book,
            headers: {
                'Authorization': "Bearer " + $cookies.get("token")
            }
        }).then(function successCallBack(response){

        }, function errorCallback(response){
            
        });
    }

    $scope.init = function(){
        $scope.allBooksSelected = true;
        $scope.myBooksSelected = false;
        $scope.studiedBooksSelected = false;
        $scope.bookToUpload = {};
        $scope.key = "";
        getBooks();
    }

    $scope.upload = function(){
        $http({
            method: 'POST',
            url: '/1/books',
            data: $scope.bookToUpload,
            headers: {
                'Authorization': "Bearer " + $cookies.get("token")
            }
        }).then(function successCallBack(response){
            $scope.bookToUpload = {};
        })
    }

    $scope.isNotMyBook = function(book){
        return (book.owner_id !== parseInt($cookies.get("userId")));
    }

    $scope.search = function(){
        $http({
            method: 'GET',
            url: '/1/books/search',
            params: {
                key: $scope.key
            },
            headers: {
                'Authorization': "Bearer " + $cookies.get("token")
            }
        }).then(function successCallBack(response){
            if($scope.allBooksSelected){
                $scope.books = response.data.response;
            }else if($scope.myBooksSelected){
                $scope.myBooks = response.data.response;
            }else{
                $scope.studiedBooks = response.data.response;
            }
        })
    }

}]);
