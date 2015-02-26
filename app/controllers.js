/*
 * * This is the main controllers file where all the controllers for the app are
 * * agreggated through angular's dependancy injection.  To add a controller:
 * *   - create a new file under controllers/ directory. 
 * *   - make sure the script file is included on the index.html page after this file
 * *   - add it to the dependency list on the module definition line. 
*/
var controllers = angular.module('controllers', [
    'mainController', 
    'caesarController', 
    'alphaController', 
]);
