var THREE = require('./three.js-master/build/three.js');
var OBJExporter =  require('./OBJExporter.js');
var fs = require('fs');
var texture;
fs.readFile("textures/crateTexture.jpg", function(err, data) {
  if (err) throw err; // Fail if the file can't be read.);
  texture = data;
  });
var geometry = new THREE.BoxGeometry(75, 75, 75).clone();
var material = new THREE.MeshBasicMaterial({map: texture });
var mesh = new THREE.Mesh(geometry, material);

mesh.position.y = 0.5;

var exporter = new THREE.OBJExporter();
var result = exporter.parse(mesh);

fs.writeFile("box.obj", result, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
console.log( result);
