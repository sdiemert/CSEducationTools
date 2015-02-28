var mainApp = angular.module('mainApp', ['ngRoute', 'controllers']); 

mainApp.config(function($routeProvider){
        $routeProvider.when(
            '/caesarCipher',
            {controller:'caesarController', templateUrl:'app/views/caesarCipher.html'}
        ).when(
            '/alphaCipher',
            {controller:'alphaController', templateUrl:'app/views/alphaCipher.html'}
        ).when(
            '/maze',
            {controller:'mazeController', templateUrl:'app/views/maze.html'}
        ).otherwise(
            {redirectTo: '/'}
        );
});
