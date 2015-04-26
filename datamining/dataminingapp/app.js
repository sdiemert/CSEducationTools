var express = require("express");
var app = express(); 
var async = require("async"); 
var db = require("mongojs").connect("datamining", ["tuples", "classifier"]);

db.on("ready", function(){
	console.log("Connected to MongoDB"); 
})

db.on('error',function(err) {
    console.log('database error: %s', err);
});


/*
app.get('/', function(req, res){
	res.send("hello world!"); 
});
*/


//Expects attributes to be given in the query field of the request.

app.post("/classifier/:id", function(req, res){
	console.log("POST: /classifier/%s", req.params.id); 

	console.log("query: %s", JSON.stringify(req.query)); 

	//1. Check that this classifier doesn't exists....
	//    - Not currently implemented. 
	//2. Push the entry into the database. 

	db.classifier.insert(
		{
			"classifier": req.params.id,
			"attributes" : req.query.attr
		},
		function(err, data){
			if(err){
				console.log(err); 
				res.send("ERROR"); 
			}

			res.send("OK"); 
		}
	); 
});


app.get("/data/:id", function(req, res){
	console.log("GET: /data/%s", req.params.id); 
	//console.log("req.params:  %s ", JSON.stringify(req.params)); 
	//console.log("req.query:  %s ", JSON.stringify(req.query)); 
	var result = []; 
	var flag = false; 
	setTimeout(function(){
		if(!flag){
			res.send("TIMEOUT!"); 
		}
	}, 3000); 

	async.each(
		[req.params.id],
		function(item, callback){
				db.tuples.find({"classifier" : item}, function(err, data){
				console.log("find: %s", JSON.stringify(data)); 
				result.push(data); 
				callback(); //indicate we are done to the async library.
			}); 
		},
		function(err){
			flag = true; 
			res.send(JSON.stringify(result)); 
		} 
	);
});


/*
* Takes in a classifier_id (via url REST) and then a 
* sequence of values via the "query" of the req. 
* 
* 1. Push the data in the into Mongo.tuples using the keys 
*     of the query as the keys into Mongo. 
* 2. Craft response message. 
*/
app.post("/data/:id", function(req, res){
	//the id field is in the params.
	console.log("POST: /data/%s", req.params.id); 
	/*
	console.log("params: "); 
	console.log(req.params); 
	console.log("query: "); 
	console.log(req.query); 
	console.log("header: "); 
	console.log(req.headers); 
	*/

	db.tuples.insert(
		{
			"classifier" : req.params.id, 
			"data" 		 : req.query,  
		},
		function(err, data){
			if(err){
				conosole.log(err)
				res.send("ERROR"); 
			}; 

			console.log(data); 

			res.send(req.params.id); 
		}
	);
}); 

var server = app.listen(3000, function(){
	var host = server.address().address; 
	var port = server.address().port; 
	console.log("App running at: http://%s:%s", host, port); 
}); 

app.use(express.static("public")); 