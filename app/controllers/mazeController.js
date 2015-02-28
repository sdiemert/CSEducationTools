var mazeController = angular.module('mazeController', []); 

mazeController.controller('mazeController', function($scope){
    $scope.gridValues = [
            [0,0,0,0,0,0], 
            [0,0,0,0,0,0], 
            [0,0,0,0,0,0], 
            [0,0,0,0,0,0], 
            [0,0,0,0,0,0], 
            [0,0,0,0,0,0]
    ]; 

    /*
    $scope.gridValues = [
            ['goal',0,0,0,0,0], 
            [0,0,'visited',0,'visited',0], 
            [0,0,0,'block',0,0], 
            [0,'block',0,0,0,0], 
            [0,0,0,0,'start',0], 
            [0,'current',0,'block',0,0]
    ]; 
    */

    $scope.renderGrid = function(){
        var e; 
        for(var i = 0; i < $scope.gridValues.length; i++){
            for(var j = 0; j < $scope.gridValues[i].length; j++){
                e = $('#grid tr#'+(i+1)+" td#"+(j+1));  
                e.removeClass('goal'); 
                e.removeClass('start'); 
                e.removeClass('block'); 
                e.removeClass('current'); 
                e.removeClass('visited'); 

                if($scope.gridValues[i][j] === 'goal'){
                    e = $('#grid tr#'+(i+1)+" td#"+(j+1));  
                    e.addClass('goal'); 
                }else if($scope.gridValues[i][j] === 'start'){
                    e = $('#grid tr#'+(i+1)+" td#"+(j+1));  
                    e.addClass('start'); 
                }else if($scope.gridValues[i][j] === 'block'){
                    e = $('#grid tr#'+(i+1)+" td#"+(j+1));  
                    e.addClass('block'); 
                }else if($scope.gridValues[i][j] === 'current'){
                    e = $('#grid tr#'+(i+1)+" td#"+(j+1));  
                    e.addClass('current'); 
                }else if($scope.gridValues[i][j] === 'visited'){
                    e = $('#grid tr#'+(i+1)+" td#"+(j+1));  
                    e.addClass('visited'); 
                }
            }
        }
    }; 

    

    $scope.renderGrid(); 

}); 
