function exportScene() {
    var stringToExport = '{ "sceneBackground": ' + JSON.stringify(scene.background.getHSL()) + ',' +
        '"floorType":'  + '"' + floorType +  '"' + ',' +  '"sceneObjects":' + JSON.stringify(objCollection.getJson().sceneObjects) + '}';
        console.log(stringToExport);
}

