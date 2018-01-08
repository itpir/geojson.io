var b = document.createElement("BUTTON");
b.innerHTML = 'Search';
b.style.zIndex = "1000";
b.style.position = "relative";
b.style.background = "green";
b.style.color = "white";
b.style.opacity = ".8";
b.style.marginRight = "10px";
b.style.marginLeft = "10px";
b.style.borderRadius = "5px";
b.style.width = "150px";
b.style.height = "39px";
b.style.marginTop = "2px";
document.body.getElementsByClassName("file-bar")[0].appendChild(b);

b.onclick = function(){
  var bounds = window.api.map.getBounds();
  var sw = 'South West: ' + bounds._southWest
  var ne = '\nNorth East: ' + bounds._northEast

  var regExp = /\(([^)]+)\)/;
  var matches = regExp.exec(sw);
  var sw = matches[1].split(', ');
  
  matches = regExp.exec(ne);
  var ne = matches[1].split(', ');

  var nw = [sw[0], ne[1]];
  var se = [ne[0], sw[1]];
  getFeatures(sw,ne,nw,se);
};

var m = require('mongodb')
console.log(m)

function getFeatures(sw, ne, nw, se){
  // Connect to MongoDB and get features within bounds
  
  var view = [sw,ne,nw,se];
  // console.log(mongodb)
  // var MongoClient = require('mongodb').MongoClient
  var url = "mongodb://localhost:27017/features"

  // if withinBounds(,view){}
}

/*
  Checks if bounds1 is within bounds2
*/
function withinBounds(bounds1, bounds2){
  return ( (bounds1[0][0] > bounds2[0][0] && bounds1[0][1] > bounds2[0][1]) //sw
    && (bounds1[0][0] < bounds2[0][0] && bounds1[0][1] < bounds2[0][1]) //ne
    && (bounds1[0][0] > bounds2[0][0] && bounds1[0][1] < bounds2[0][1]) //nw
    && (bounds1[0][0] < bounds2[0][0] && bounds1[0][1] > bounds2[0][1]) ) //se
}