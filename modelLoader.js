var mixers = [];
var objects = [];
var count = 0;
var scale = 0.5;
var objCollection = new ObjectCollection();
var pooledFloorObjects = createFloors();
var floor;
var floorType = 'None';

function addObj(name, scale, url, texture, pos) {
    var obj = new SceneObject(name, scale, pos);
    obj.setUrl(url);
    obj.setTexture(texture);
    objCollection.addSceneObject(obj);
}

function removeObj(obj) {
    scene.remove(obj);
    objCollection.removeSceneObject(obj);
}

function addJsonModel(model, name) {
    var loader = new THREE.JSONLoader();
    loader.load(model, function (geometry) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            vertexColors: THREE.FaceColors,
            morphTargets: true,
        }));

        mesh.scale.set(scale, scale, scale);
        name = name + '_' + count;
        mesh.name = name;
        objects.push(mesh);
        scene.add(mesh);
        mixers.push(new THREE.AnimationMixer(mesh));
        var clip = THREE.AnimationClip.CreateFromMorphTargetSequence('move', geometry.morphTargets, 30);
        mixers[mixers.length - 1].clipAction(clip).setDuration(1).play();
        count++;
        addObj(name, scale, model, "", mesh.position);
    });

}

function setScale(newScale) {
    scale = newScale;

}

function addObjModel(model, material = null) {
    var loader = new THREE.OBJLoader();

    loader.load(
        // resource URL
        model,

        // pass the loaded data to the onLoad function.
        //Here it is assumed to be an object
        function (obj) {
            //add the loaded object to the scene
            if (material != null) {
                obj = applyMaterial(obj, material)
            }

            let fileName = model.split(".");
            let name = fileName[0] + "_" + count;
            obj.name = name;
            obj.position.y = 35;
            scene.add(obj);
            objects.push(obj);
            addObj(name, scale, model, "", obj.position);
            count++;
        },

        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // Function called when download errors
        function (xhr) {
            //alert( 'Error laoding object' );
            addJsonModel(model);
        }
    );

}

function addVeyron() {
    addCar("veyron");
}

function addCamaro() {
    addCar("camaro");
}

function addGallardo() {
    addCar("gallardo");
}

function addF50() {
    addCar("f50");
}

function addCar(carModel) {
    var loader = new THREE.BinaryLoader();
    loader.load(CARS[carModel].url, function (geometry) {

        createCar(geometry, CARS[carModel].url, carModel);
    });
}

function applyMaterial(obj, material) {
    return new THREE.Mesh(obj, material);
}


function applyTexture(textureFile) {
    var loader = new THREE.TextureLoader();
    var texture = loader.load(textureFile);
    return new THREE.MeshPhongMaterial({map: texture});
}

function addBox() {
    var side = 10 * scale + 4;
    var tex = "textures/crateTexture.jpg";
    var geometry = new THREE.BoxGeometry(side, side, side);
    var boxTexture = applyTexture(tex);
    var box = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(boxTexture));
    box.position.y = 15;
    var name = "box_" + count;
    box.name = name;
    objects.push(box);
    count++;
    addObj(name, scale, "", tex, box.position);
    scene.add(box);
}

function addEarth() {
    var ray = 200 * scale;
    var geometry = new THREE.SphereGeometry(ray, 32, 32);
    var texUrl = "textures/earth.jpg";
    var texture = applyTexture(texUrl);
    var earth = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(texture));
    earth.position.y = 100;
    var name = "earth_" + count;
    earth.name = name;
    objects.push(earth);
    count++;
    addObj(name, scale, "", texUrl, earth.position);
    scene.add(earth);
}

function addHorse() {
    addJsonModel("three.js-master/examples/models/animated/horse.js", "horse");
}

function addFlamingo() {
    addJsonModel("three.js-master/examples/models/animated/flamingo.js", "flamingo");
}

function addParrot() {
    addJsonModel("three.js-master/examples/models/animated/parrot.js", "parrot");
}

function addStork() {
    addJsonModel("three.js-master/examples/models/animated/stork.js", "stork");
}

function createCar(geometry, url, car) {

    geometry.sortFacesByMaterialIndex();

    var m = [],
        s = CARS[car].scale * (scale / 10),
        r = CARS[car].init_rotation,
        materials = CARS[car].materials,
        mi = CARS[car].init_material,
        bm = CARS[car].body_materials;

    for (var i in CARS[car].mmap) {

        m[i] = CARS[car].mmap[i];

    }

    var mesh = new THREE.Mesh(geometry, m);

    /*mesh.rotation.x = r[ 0 ];
    mesh.rotation.y = r[ 1 ];
    mesh.rotation.z = r[ 2 ];*/

    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    var name = car + "_" + count;
    mesh.name = name;
    objects.push(mesh);
    count++;
    addObj(name, scale, url, "", mesh.position);
    scene.add(mesh);

    CARS[car].object = mesh;

    //CARS[ car ].buttons = createButtons( materials.body, car );
    //attachButtonMaterials( materials.body, m, bm, car );

    //switchCar( car );

}

var CARS = {

    "veyron": {

        name: "Bugatti Veyron",
        url: "three.js-master/examples/obj/veyron/VeyronNoUv_bin.js",
        author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1129" target="_blank" rel="noopener">Troyano</a>',
        init_rotation: [0, 0, 0],
        scale: 5.5,
        init_material: 4,
        body_materials: [2],

        object: null,
        buttons: null,
        materials: null

    },

    "gallardo": {

        name: "Lamborghini Gallardo",
        url: "three.js-master/examples/obj/gallardo/GallardoNoUv_bin.js",
        author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1711" target="_blank" rel="noopener">machman_3d</a>',
        init_rotation: [0, 0, 0],
        scale: 3.7,
        init_material: 9,
        body_materials: [3],

        object: null,
        buttons: null,
        materials: null

    },

    "f50": {

        name: "Ferrari F50",
        url: "three.js-master/examples/obj/f50/F50NoUv_bin.js",
        author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1687" target="_blank" rel="noopener">daniel sathya</a>',
        init_rotation: [0, 0, 0],
        scale: 0.175,
        init_material: 2,
        body_materials: [3, 6, 7, 8, 9, 10, 23, 24],

        object: null,
        buttons: null,
        materials: null

    },

    "camaro": {

        name: "Chevrolet Camaro",
        url: "three.js-master/examples/obj/camaro/CamaroNoUv_bin.js",
        author: '<a href="http://www.turbosquid.com/3d-models/blender-camaro/411348" target="_blank" rel="noopener">dskfnwn</a>',
        init_rotation: [0.0, 0.0, 0.0 /*0, 1, 0*/],
        scale: 75,
        init_material: 0,
        body_materials: [0],

        object: null,
        buttons: null,
        materials: null

    }

};

var mlib = {

    "Orange": new THREE.MeshLambertMaterial({color: 0xff6600, combine: THREE.MixOperation, reflectivity: 0.3}),
    "Blue": new THREE.MeshLambertMaterial({color: 0x001133, combine: THREE.MixOperation, reflectivity: 0.3}),
    "Red": new THREE.MeshLambertMaterial({color: 0x660000, combine: THREE.MixOperation, reflectivity: 0.25}),
    "Black": new THREE.MeshLambertMaterial({color: 0x000000, combine: THREE.MixOperation, reflectivity: 0.15}),
    "White": new THREE.MeshLambertMaterial({color: 0xffffff, combine: THREE.MixOperation, reflectivity: 0.25}),

    "Carmine": new THREE.MeshPhongMaterial({color: 0x770000, specular: 0xffaaaa, combine: THREE.MultiplyOperation}),
    "Gold": new THREE.MeshPhongMaterial({
        color: 0xaa9944,
        specular: 0xbbaa99,
        shininess: 50,
        combine: THREE.MultiplyOperation
    }),
    "Bronze": new THREE.MeshPhongMaterial({
        color: 0x150505,
        specular: 0xee6600,
        shininess: 10,
        combine: THREE.MixOperation,
        reflectivity: 0.25
    }),
    "Chrome": new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, combine: THREE.MultiplyOperation}),

    "Orange metal": new THREE.MeshLambertMaterial({color: 0xff6600, combine: THREE.MultiplyOperation}),
    "Blue metal": new THREE.MeshLambertMaterial({color: 0x001133, combine: THREE.MultiplyOperation}),
    "Red metal": new THREE.MeshLambertMaterial({color: 0x770000, combine: THREE.MultiplyOperation}),
    "Green metal": new THREE.MeshLambertMaterial({color: 0x007711, combine: THREE.MultiplyOperation}),
    "Black metal": new THREE.MeshLambertMaterial({color: 0x222222, combine: THREE.MultiplyOperation}),

    "Pure chrome": new THREE.MeshLambertMaterial({color: 0xffffff}),
    "Dark chrome": new THREE.MeshLambertMaterial({color: 0x444444}),
    "Darker chrome": new THREE.MeshLambertMaterial({color: 0x222222}),

    "Black glass": new THREE.MeshLambertMaterial({color: 0x101016, opacity: 0.975, transparent: true}),
    "Dark glass": new THREE.MeshLambertMaterial({color: 0x101046, opacity: 0.25, transparent: true}),
    "Blue glass": new THREE.MeshLambertMaterial({color: 0x668899, opacity: 0.75, transparent: true}),
    "Light glass": new THREE.MeshBasicMaterial({
        color: 0x223344,
        opacity: 0.25,
        transparent: true,
        combine: THREE.MixOperation,
        reflectivity: 0.25
    }),

    "Red glass": new THREE.MeshLambertMaterial({color: 0xff0000, opacity: 0.75, transparent: true}),
    "Yellow glass": new THREE.MeshLambertMaterial({color: 0xffffaa, opacity: 0.75, transparent: true}),
    "Orange glass": new THREE.MeshLambertMaterial({color: 0x995500, opacity: 0.75, transparent: true}),

    "Orange glass 50": new THREE.MeshLambertMaterial({color: 0xffbb00, opacity: 0.5, transparent: true}),
    "Red glass 50": new THREE.MeshLambertMaterial({color: 0xff0000, opacity: 0.5, transparent: true}),

    "Fullblack rough": new THREE.MeshLambertMaterial({color: 0x000000}),
    "Black rough": new THREE.MeshLambertMaterial({color: 0x050505}),
    "Darkgray rough": new THREE.MeshLambertMaterial({color: 0x090909}),
    "Red rough": new THREE.MeshLambertMaterial({color: 0x330500}),

    "Darkgray shiny": new THREE.MeshPhongMaterial({color: 0x000000, specular: 0x050505}),
    "Gray shiny": new THREE.MeshPhongMaterial({color: 0x050505, shininess: 20})

};

// Gallardo materials

CARS["gallardo"].materials = {

    body: [

        ["Orange", mlib["Orange"]],
        ["Blue", mlib["Blue"]],
        ["Red", mlib["Red"]],
        ["Black", mlib["Black"]],
        ["White", mlib["White"]],

        ["Orange metal", mlib["Orange metal"]],
        ["Blue metal", mlib["Blue metal"]],
        ["Green metal", mlib["Green metal"]],
        ["Black metal", mlib["Black metal"]],

        ["Carmine", mlib["Carmine"]],
        ["Gold", mlib["Gold"]],
        ["Bronze", mlib["Bronze"]],
        ["Chrome", mlib["Chrome"]]

    ]

};

m = CARS["gallardo"].materials;
mi = CARS["gallardo"].init_material;

CARS["gallardo"].mmap = {

    0: mlib["Pure chrome"], 	// wheels chrome
    1: mlib["Black rough"],   // tire
    2: mlib["Black glass"], 	// windshield
    3: m.body[mi][1], 		// body
    4: mlib["Red glass"],    	// back lights
    5: mlib["Yellow glass"],  // front lights
    6: mlib["Dark chrome"]	// windshield rim

};

// Veyron materials

CARS["veyron"].materials = {

    body: [

        ["Orange metal", mlib["Orange metal"]],
        ["Blue metal", mlib["Blue metal"]],
        ["Red metal", mlib["Red metal"]],
        ["Green metal", mlib["Green metal"]],
        ["Black metal", mlib["Black metal"]],

        ["Gold", mlib["Gold"]],
        ["Bronze", mlib["Bronze"]],
        ["Chrome", mlib["Chrome"]]

    ]

};

m = CARS["veyron"].materials;
mi = CARS["veyron"].init_material;

CARS["veyron"].mmap = {

    0: mlib["Black rough"],		// tires + inside
    1: mlib["Pure chrome"],		// wheels + extras chrome
    2: m.body[mi][1], 			// back / top / front torso
    3: mlib["Dark glass"],		// glass
    4: mlib["Pure chrome"],		// sides torso
    5: mlib["Pure chrome"],		// engine
    6: mlib["Red glass 50"],		// backlights
    7: mlib["Orange glass 50"]	// backsignals

};

// F50 materials

CARS["f50"].materials = {

    body: [

        ["Orange", mlib["Orange"]],
        ["Blue", mlib["Blue"]],
        ["Red", mlib["Red"]],
        ["Black", mlib["Black"]],
        ["White", mlib["White"]],

        ["Orange metal", mlib["Orange metal"]],
        ["Blue metal", mlib["Blue metal"]],
        ["Black metal", mlib["Black metal"]],

        ["Carmine", mlib["Carmine"]],
        ["Gold", mlib["Gold"]],
        ["Bronze", mlib["Bronze"]],
        ["Chrome", mlib["Chrome"]]

    ]

};

m = CARS["f50"].materials;
mi = CARS["f50"].init_material;

CARS["f50"].mmap = {

    0: mlib["Dark chrome"], 		// interior + rim
    1: mlib["Pure chrome"], 		// wheels + gears chrome
    2: mlib["Blue glass"], 		// glass
    3: m.body[mi][1], 			// torso mid + front spoiler
    4: mlib["Darkgray shiny"], 	// interior + behind seats
    5: mlib["Darkgray shiny"], 	// tiny dots in interior
    6: m.body[mi][1], 			// back torso
    7: m.body[mi][1], 			// right mirror decal
    8: m.body[mi][1], 			// front decal
    9: m.body[mi][1], 			// front torso
    10: m.body[mi][1], 			// left mirror decal
    11: mlib["Pure chrome"], 		// engine
    12: mlib["Darkgray rough"],	// tires side
    13: mlib["Darkgray rough"],	// tires bottom
    14: mlib["Darkgray shiny"], 	// bottom
    15: mlib["Black rough"],		// ???
    16: mlib["Orange glass"],		// front signals
    17: mlib["Dark chrome"], 		// wheels center
    18: mlib["Red glass"], 		// back lights
    19: mlib["Black rough"], 		// ???
    20: mlib["Red rough"], 		// seats
    21: mlib["Black rough"], 		// back plate
    22: mlib["Black rough"], 		// front light dots
    23: m.body[mi][1], 			// back torso
    24: m.body[mi][1] 			// back torso center

};


// Camero materials

CARS["camaro"].materials = {

    body: [

        ["Orange", mlib["Orange"]],
        ["Blue", mlib["Blue"]],
        ["Red", mlib["Red"]],
        ["Black", mlib["Black"]],
        ["White", mlib["White"]],

        ["Orange metal", mlib["Orange metal"]],
        ["Blue metal", mlib["Blue metal"]],
        ["Red metal", mlib["Red metal"]],
        ["Green metal", mlib["Green metal"]],
        ["Black metal", mlib["Black metal"]],

        ["Gold", mlib["Gold"]],
        ["Bronze", mlib["Bronze"]],
        ["Chrome", mlib["Chrome"]]

    ]

};

m = CARS["camaro"].materials;
mi = CARS["camaro"].init_material;

CARS["camaro"].mmap = {

    0: m.body[mi][1], 			// car body
    1: mlib["Pure chrome"], 		// wheels chrome
    2: mlib["Pure chrome"], 		// grille chrome
    3: mlib["Dark chrome"], 		// door lines
    4: mlib["Light glass"], 		// windshield
    5: mlib["Gray shiny"],        // interior
    6: mlib["Black rough"],       // tire
    7: mlib["Fullblack rough"],   // tireling
    8: mlib["Fullblack rough"]    // behind grille

};

function createFloors() {
    var pooledFloors = [];
    var floorGeometry = new THREE.PlaneGeometry(9000, 9000, 100, 100);
    for (var i = 0, l = floorGeometry.vertices.length; i < l; i++) {
        var vertex = floorGeometry.vertices[i];
        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;
    }
    for (var i = 0, l = floorGeometry.faces.length; i < l; i++) {
        var face = floorGeometry.faces[i];
        face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    }

    var floorMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1;
    floorGeometry.rotateX(-Math.PI / 2);
    floor.name = 'floor';
    pooledFloors.push(floor);


    var floorTexture =  new THREE.TextureLoader().load('textures/tiles.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1;
    floor.name = 'floor';
    pooledFloors.push(floor);

    floorTexture = new THREE.TextureLoader().load('textures/grassTexture.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1;
    floor.name = 'floor';
    pooledFloors.push(floor);

    return pooledFloors;

}
function addFloor(type) {
    var obj= scene.getObjectByName('floor');
    scene.remove(obj);

    switch (type) {
        case "None":
            floorType = "None";
            break;
        case "Multicolor":
            floorType = "Multicolor";
            scene.add(pooledFloorObjects[0]);
            break;

        case "Wood tile":
            floorType = "Wood tile";
            scene.add(pooledFloorObjects[1]);
            break;

        case "Grass":
            floorType = "Grass";
            scene.add(pooledFloorObjects[2]);
            break;
    }


}
