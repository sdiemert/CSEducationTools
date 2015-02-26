var caesarController = angular.module('caesarController', []); 

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
}


caesarController.controller('caesarController', function($scope){
    $scope.alpha = "abcdefghijklmnopqrstuvwxyz"; 
    $scope.caesarOutputCipher = ""; 
    $scope.caesarOutputPlain = ""; 
    $scope.encryptKey = 0; 
    $scope.decryptKey = 0; 

    $scope.solverOutputPlain = ""; 

    $scope.encrypt = function(p){
        $scope.caesarOutputCipher = ""; 
        for(var i = 0; i < p.length; i++){
            p = p.toLowerCase(); 
            $scope.caesarOutputCipher += $scope.alpha.charAt(($scope.alpha.indexOf(p.charAt(i))+$scope.encryptKey).mod(26)); 
        }
    }; 

    $scope.decrypt = function(c){
        $scope.caesarOutputPlain = ""; 
        c = c.toLowerCase(); 
        for(var i = 0; i < c.length; i++){
            $scope.caesarOutputPlain += $scope.alpha.charAt(($scope.alpha.indexOf(c.charAt(i))-$scope.decryptKey).mod(26)); 
        }
    };

    $scope.solve = function(c){
        console.log("solve("+c+")"); 
        $scope.solverOutputPlain = ""; 
        var tempText = ""; 
        for(var k = 0; k < 26; k++){
            tempText = ""; 
            for(var i = 0; i < c.length; i++){
                tempText += $scope.alpha.charAt(($scope.alpha.indexOf(c.charAt(i))-k).mod(26)); 
            }   
            console.log("k: "+k+" temp:"+tempText+" c:"+c); 
            $scope.solverOutputPlain += "key: "+k+"\ttext: "+tempText+"\n"; 
        }
    }; 
}); 
