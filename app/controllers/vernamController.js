var caesarController = angular.module('caesarController', []); 

caesarController.controller('caesarController', function($scope){
    $scope.alpha = "abcdefghijklmnopqrstuvwxyz"; 
    $scope.caesarOutputCipher = ""; 
    $scope.caesarOutputPlain = ""; 
    $scope.encryptKey = 0; 
    $scope.decryptKey = 0; 

    $scope.encrypt = function(p){
        $scope.caesarOutputCipher = ""; 
        for(var i = 0; i < p.length; i++){
            p = p.toLowerCase(); 
            $scope.caesarOutputCipher += $scope.alpha.charAt(($scope.alpha.indexOf(p.charAt(i))+$scope.encryptKey)%26); 
        }
    }; 

    $scope.decrypt = function(c){
        $scope.caesarOutputPlain = ""; 
        c = c.toLowerCase(); 
        for(var i = 0; i < c.length; i++){
            $scope.caesarOutputPlain += $scope.alpha.charAt(($scope.alpha.indexOf(c.charAt(i))-$scope.decryptKey)%26); 
        }
    };
}); 
