var mixers = [];
var objects = [];

function addModel(model){
  var loader = new THREE.JSONLoader();
  loader.load( "three.js-master/examples/models/animated/"+ model+".js", function( geometry ) {
    mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
      vertexColors: THREE.FaceColors,
      morphTargets: true
    } ) );
    mesh.scale.set( 1.5, 1.5, 1.5 );
    objects.push(mesh);
    scene.add( mesh );
    mixers.push(new THREE.AnimationMixer( mesh ));
    var clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'move', geometry.morphTargets, 30 );
    mixers[mixers.length-1].clipAction( clip ).setDuration( 1 ).play();
  } );
}

function addHorse(){
  addModel("horse");
}

function addFlaming(){
  addModel("flamingo");
}

function addParrot(){
  addModel("parrot");
}

function addStork(){
  addModel("stork");
}
