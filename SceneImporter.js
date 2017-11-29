var sceneImported = false;

function importScene(jsonString) {
    if (sceneImported === false) {

        var sceneProperties = JSON.parse(jsonString);
        var sceneObjs = sceneProperties.sceneObjects;
        importObjs(sceneObjs);

        sceneImported = true;
    }

}


function importObjs(sceneObjs) {
    for (let i = 0; i < sceneObjs.length; i++) {
            let pos = position(sceneObjs[i].position.x, sceneObjs[i].position.y, sceneObjs[i].position.z);
            addObj(sceneObjs[i].name, sceneObjs[i].scale, sceneObjs[i].url, sceneObjs[i].texture, pos);
            let objName = addJsonModel(sceneObjs[i].url, sceneObjs[i].name, pos);

        }
}

function importAnimations(obj,animations) {
    for (let i = 0; i < animations.length; i++) {
        let ani = new Animation(obj, animations[i].duration, animations[i].id );
        if(animations[i].animation.type === "rotation"){
            ani.rotation(animations[i].animation.axis.x,animations[i].animation.axis.y, animations[i].animation.axis.z);
        }
        else{
            ani.trajectory()
        }
        obj.addAnimation(animation)
    }

    scene.background.setHSL(sceneProperties.sceneBackground.h, sceneProperties.sceneBackground.s,
        sceneProperties.sceneBackground.l);

    addFloor(sceneProperties.floorType);
}
function position(xCord, yCord, zCord) {
    return {x: xCord, y: yCord, z: zCord};
}


