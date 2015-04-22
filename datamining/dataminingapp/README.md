## Data Mining Educational Tool

### API 
This web app contains a front end (html and css pages) and a back end in the form of a REST API. 

#### Routes

These are the routes for the web app pages and REST API: 

* GET: `/index.html` serves an index page
* GET: `/student.html` serves a page that can be used by students to enter their data.
* GET: `/instructor.html` serves a page for instructors to create a new data set 
* POST: `/data` a spot to push data, must also send an object containing training tuples and the associated data set ID.
* GET: `/data?id=<DATA SET ID>` requests all of the data from the database regarding a particular data set ID. 
* GET: `/result?id=<DATA SET ID>&param1=<VALUE 1>....&paramN=<VALUE N>` requests the classifier result for a data set and for a given set of input params.

### Dependencies
The following are the nodejs packages required for this app.

 * Node Express `npm install express`
 * Mongo DB `npm install mongodb` 
 * MongoJS `npm install mongojs` (https://github.com/mafintosh/mongojs)

 The following are the environmental dependencies: 

 * mongo db database running on port 27017
 * nodejs

### Notes

* Need to make queries on data base async to make sure we return data on `/data` queries
    - http://justinklemm.com/node-js-async-tutorial/