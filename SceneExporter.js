function exportScene() {
    var stringToExport = '{ "sceneBackground": ' + JSON.stringify(scene.background.getHSL()) + ',' +
        '"floorType":'  + '"' + floorType +  '"' + ',' + JSON.stringify(objCollection.getJson().sceneObjects) + '}';
        alert(stringToExport);
}

