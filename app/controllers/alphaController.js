var alphaController = angular.module('alphaController', []); 

caesarController.controller('alphaController', function($scope){
    $scope.alpha = "abcdefghijklmnopqrstuvwxyz"; 
    $scope.alphaOutputCipher = ""; 
    $scope.alphaOutputPlain = ""; 
    $scope.encryptKey = ""; 
    $scope.decryptKey = ""; 
    $scope.errorMessage = ""; 

    $scope.encrypt = function(p){
        $scope.errorMessage = ""; 
        $scope.alphaOutputCipher = ""; 
        if($scope.encryptKey.length != 26){
            $scope.errorMessage = "Opps! Make sure your encryption key is exactly 26 characters long!"
        }
        for(var i = 0; i < p.length; i++){
            p = p.toLowerCase(); 
            $scope.alphaOutputCipher += $scope.encryptKey.charAt(($scope.alpha.indexOf(p.charAt(i)))%26); 
        }
    }; 

    $scope.decrypt = function(c){
        $scope.errorMessage = ""; 
        if($scope.decryptKey.length > 26 || $scope.decryptKey.length < 26){
            $scope.errorMessage = "Opps! Make sure your decryption key is exactly 26 characters long!"
        }

        $scope.alphaOutputPlain = ""; 
        c = c.toLowerCase(); 
        for(var i = 0; i < c.length; i++){
            $scope.alphaOutputPlain += $scope.alpha.charAt(($scope.decryptKey.indexOf(c.charAt(i)))%26); 
        }
    };
}); 
