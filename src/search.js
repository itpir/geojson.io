// var mongoose = require('mongoose');


var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080 

// mongoose.connect('mongodb://localhost/features');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/features";

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });