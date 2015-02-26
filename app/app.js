var mainApp = angular.module('mainApp', ['ngRoute', 'controllers']); 

mainApp.config(function($routeProvider){
        $routeProvider.when(
            '/caesarCipher',
            {controller:'caesarController', templateUrl:'app/views/caesarCipher.html'}
        ).otherwise(
            {redirectTo: '/'}
        );
});
