const express = require('express')
const app = express()
app.use(express.static(__dirname));
var bodyParser = require('body-parser')
var request = require("request")
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var http = require("http");
var https = require("https");

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*"); 
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type'); 
    next(); 
})

app.post('/', function(req, res, next) {
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/gist', function (req, res) {

    request({
        url: req.body.gist,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
            res.send(body); 
        }
    })
});

var features = [];

app.post('/search', function(req,res){
    features = [];
    var bounds = req.body.bounds;
    bounds = [[parseInt(bounds[0][0]), parseInt(bounds[0][1])],[parseInt(bounds[1][0]), parseInt(bounds[1][1])], [parseInt(bounds[2][0]), parseInt(bounds[2][1])], [parseInt(bounds[3][0]), parseInt(bounds[3][1])]]
    // List of all features [sw, ne, nw, se]
    getFeatures(bounds, cb, res);
});

function cb(res){
    
    if(features.length == 0){
        features.push('No features matched.')
    }

    res.send(features);
}

// Connect to MongoDB and get features within bounds
function getFeatures(view, _callback, res){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/features";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        
        var results = [];
        
        db.collection("f").find({}).toArray(function(err, result) {
            if (err) throw err;

            for(var i=0;i<result.length;i++){
                if(withinBounds(result[i]['spatial_index'], view)){
                    features.push(result[i]);
                }
            }

            _callback(res);
        });
    });
}

/*
Checks if bounds1 is within bounds2
*/
function withinBounds(bounds1, bounds2){

    for(var i=0;i<bounds1.length;i++){
        if( ( bounds1[i][0] < bounds2[0][0] || bounds1[i][1] < bounds2[0][1])
            || (bounds1[i][0] > bounds2[1][0] || bounds1[i][1] > bounds2[1][1])
            || (bounds1[i][0] < bounds2[2][0] || bounds1[i][1] > bounds2[2][1])
            || (bounds1[i][0] > bounds2[3][0] || bounds1[i][1] < bounds2[3][1]) 
        ) return false;
    }

    return true;
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))