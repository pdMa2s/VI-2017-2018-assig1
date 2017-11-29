function importScene(jsonString){
    var sceneProperties = JSON.parse(jsonString);
    var sceneObjs = sceneProperties.sceneObjects;
    for(let i = 0; i< sceneObjs.length; i++){
        let pos = position(sceneObjs[i].position.x, sceneObjs[i].position.y, sceneObjs[i].position.Z);
        addObj(sceneObjs[i].name , sceneObjs[i].scale, sceneObjs[i].url, sceneObjs[i].texture, pos);
        addJsonModel(sceneObjs[i].url, sceneObjs[i].name)
    }
}


function position(x,y,z){
    return {x:x, y:y, z:z};
}