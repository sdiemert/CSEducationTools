var express = require("express");
var app = express(); 
var async = require("async"); 
var db = require("mongojs").connect("datamining", ["tuples"]);

db.on("ready", function(){
	console.log("Connected to MongoDB"); 
})

db.on('error',function(err) {
    console.log('database error: %s', err);
});

var dataModule = require("./data.js"); 

var data = new dataModule.Data({db : db}); 

app.get('/', function(req, res){
	res.send("hello world!"); 
});

app.get("/data/:id", function(req, res){
	console.log("req.params:  %s ", JSON.stringify(req.params)); 
	console.log("req.query:  %s ", JSON.stringify(req.query)); 
	var result = []; 
	var flag = false; 
	setTimeout(function(){
		if(!flag){
			res.send(JSON.stringify(result)); 
		}
	}, 3000); 

	async.each(
		[req.params.id],
		function(item, callback){
				db.tuples.find({"classifier" : parseInt(item)}, function(err, data){
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


app.post("/data/:id", function(req, res){
	//the id field is in the params.
	console.log(req.params); 
	console.log(req.headers); 

	res.send(req.headers.val); 
}); 

var server = app.listen(3000, function(){
	var host = server.address().address; 
	var port = server.address().port; 
	console.log("App running at: http://%s:%s", host, port); 
}); 

app.use(express.static("public")); 