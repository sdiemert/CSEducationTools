var express = require("express");
var app = express(); 
var async = require("async"); 
var db = require("mongojs")("mongodb://localhost/datamining", ["tuples", "classifier"]);
var util = require('util');

var logger = require("./lib/logger.js").Logger('app.js', false);

logger.info("Starting...");

db.on("ready", function(){
	logger.info("Connected to MongoDB"); 
})

db.on('error',function(err) {
    logger.info('database error: %s', err);
});


//Expects attributes to be given in the query field of the request.

app.post("/classifier/:id", function(req, res){

	//1. Check that this classifier doesn't exists....
	//    - Not currently implemented. 
	//2. Push the entry into the database. 

	logger.warn("POST: /classifier/"+req.params.id);

	db.classifier.insert(
		{
			"classifier": req.params.id,
			"attributes" : req.query.attr
		},
		function(err, data){

			if(err){
				logger.error(err); 
				res.status(500);
				res.send("ERROR"); 
			}

			res.send("OK"); 
		}
	); 
});


app.get("/data/:id", function(req, res){

	logger.warn("GET: /data/"+req.params.id);

	var result = []; 
	var flag = false; 
	setTimeout(function(){
		if(!flag){
			res.status(408);
			res.send("TIMEOUT!"); 
		}
	}, 3000); 

	async.each(
		[req.params.id],
		function(item, callback){
				db.tuples.find({"classifier" : item}, function(err, data){

				if( data.length <= 0 ){

					//logger.info(util.inspect(data, false, null));

					result.push([]);
					return callback(204); //respond with no-data

				}else{

					result.push(data); 
					return callback(); //indicate we are done to the async library.

				}

				
			}); 
		},
		function(err){

			if(err){

				flag = true; 

				if( err === 204 ){

					res.status(204);
					return res.send("NO DATA");

				}else{

					res.status(500);
					return res.send("ERROR");

				}

			}

			res.status(200);
			flag = true; 
			return res.send	(JSON.stringify(result)); 
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

	logger.warn("POST: /data/"+req.params.id);

	var fromClient = ""; 

	req.on('data', function(d){

		fromClient += d; 

	});

	req.on('end', function(){

		try{

			fromClient = JSON.parse(fromClient);


			async.each(
				fromClient,
				function(item, cb){

						db.tuples.insert(
						{
							"classifier" : req.params.id, 
							"data" 		 : item,  
						},
						function(err, data){

							if(err){

								cb();

							}; 

							cb(); 
						}
					);

				}, function(err){

					res.status(200);
					return res.send(); 

				}
			);
			

		}catch(e){

			res.status(400);
			return res.send("COULD NOT PARSE INPUT");

		}

	});


}); 

var server = app.listen(3000, '0.0.0.0', function(){
	var host = server.address().address; 
	var port = server.address().port; 
	logger.info("App running at: http://"+host+":"+port); 
}); 

app.use(express.static("public")); 
