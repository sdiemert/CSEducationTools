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

    $scope.currentLocation = {x:0, y:0}; 

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

    $scope.generateBlocks = function(numBlocks){        
        var e; 
        var blockCount = 0;
        var randNumX = 0; 
        var randNumY = 0; 
        while(blockCount < numBlocks){
            randNumX = Math.floor(Math.random()*10);
            randNumY = Math.floor(Math.random()*10);
            if(randNumX < 6 && randNumY < 6 && $scope.gridValues[randNumX][randNumY] === 0){
                $scope.gridValues[randNumX][randNumY] = 'block'; 
                blockCount++; 
            }
        }
    }

    $scope.moveCurrentLocation = function(x, y){
        if(x >= 6 || y >= 6){
            console.log("Cannot move to index above 6. x,y:"+x+", "+y); 
        }
        if($scope.gridValues[$scope.currentLocation.x][$scope.currentLocation.y] === 'start'){
        }else{
            $scope.gridValues[$scope.currentLocation.x][$scope.currentLocation.y] = 'visited';
        }
        $scope.currentLocation = {x:x, y:y}; 
        $scope.gridValues[$scope.currentLocation.x][$scope.currentLocation.y] = 'current';
    }; 

    $scope.setStart = function(x, y){
        $scope.gridValues[x][y] = 'start'; 
    }; 

    $scope.setGoal = function(x, y){
        $scope.gridValues[x][y] = 'goal'; 
    }; 

    //below this runs on page render. 
    $scope.generateBlocks(2); 
    $scope.setStart(0,0); 
    $scope.setGoal(5,5); 
    $scope.moveCurrentLocation(5,3); 
    $scope.renderGrid(); 
}); 
