var sceneImported = false;

function importScene(jsonString) {
    if (sceneImported === false) {

        var sceneProperties = JSON.parse(jsonString);

        scene.background.setHSL(sceneProperties.sceneBackground.h, sceneProperties.sceneBackground.s,
        sceneProperties.sceneBackground.l);

        addFloor(sceneProperties.floorType);

        var sceneObjs = sceneProperties.sceneObjects;
        importObjs(sceneObjs);
        animatorAnims = objCollection.getSortedAnimations();
        sceneImported = true;
    }

}


function importObjs(sceneObjs) {
    for (let i = 0; i < sceneObjs.length; i++) {
            let pos = position(sceneObjs[i].position.x, sceneObjs[i].position.y, sceneObjs[i].position.z);
            //addObj(sceneObjs[i].name, sceneObjs[i].scale, sceneObjs[i].url, sceneObjs[i].texture, pos);
            let obj = addJsonModel(sceneObjs[i].url, sceneObjs[i].name, pos, sceneObjs[i].scale);
    }
}

function position(xCord, yCord, zCord) {
    return {x: xCord, y: yCord, z: zCord};
}

function generateTrajectoryLineFromJSON() {
    var points = [];

}