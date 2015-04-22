var async = require("async"); 

var Data = function(params){
	var that = {}; 
	console.log("Data(%s)", params); 

	that.getData = function(classifier_id){
		console.log("Data.getData()"); 
		console.log(typeof(classifier_id)); 

		var result = []; 

		async.each(
			[classifier_id],
			function(item, callback){
				params.db.tuples.find({"classifier" : parseInt(item)}, function(err, data){
					console.log("find: %s", JSON.stringify(data)); 
					callback(); //indicate we are done to the async library.
				}); 
			},
			function(err){
				console.log("returning from getData()");
				return result; 
			} 
		);
		console.log("end of Data.getData()"); 
	}

	return that; 
}	
module.exports = {Data : Data}; 