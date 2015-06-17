'use strict';
var colors = require('cli-color');

function Logger(path, color){

    var that = {}; 

    if ( color ){

        color = true;

    }else{

        color = false; 
    }

    var getDateTime = function(){

        var d = new Date();
        return d.getFullYear()+"-"+d.getMonth()+1+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();

    }

    var prepareOutput = function(l, text, m){

        var s = "\n";
        s += "["+l+"]  ";
        s += getDateTime() +" "; 
        s += path 
        if ( m !== undefined ){

          s += ":"+m;

        }
        s += " : "; 
        s += text; 
        return s;

    }

    var success = function(text, message){

        if (color){

            console.log(colors.green(prepareOutput("SUCCESS",text, message)));

        }else{

            console.log(prepareOutput("SUCCESS",text, message));

        }

    }

    var info = function(text, message){

        console.log(prepareOutput("INFO", text, message));

    }

    var warn = function (text, message){

        console.log(colors.yellow(prepareOutput("WARNING",text, message)));

    }

    var error = function( text, message ){

        console.log(colors.red(prepareOutput("ERROR",text, message)));

    }

    that.success    = success; 
    that.info       = info; 
    that.warn       = warn; 
    that.error      = error;

    return that; 

}


module.exports = { Logger : Logger };