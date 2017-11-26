/*

var object_trajectories = {};
var numPoints = 100; // line trajectory points
var creatingTrajectory = false;
var speed = 0.0;
var fps = 60;
var trajectoryColors = [];
trajectoryColors.push(new THREE.Color( 0xe6194b ));
trajectoryColors.push(new THREE.Color( 0x3cb44b ));
trajectoryColors.push(new THREE.Color( 0xffe119 ));
trajectoryColors.push(new THREE.Color( 0x0082c8 ));
trajectoryColors.push(new THREE.Color( 0xf58231 ));

//GUARDAR TEMPO!!!

function handleTrajectoryCreation() {

    if (creatingTrajectory === true) {
        generateTrajectoryLine(selected_object);

    }

    else {
        if (object_trajectories[selected_object.name] === undefined) {
            object_trajectories[selected_object.name] = [];
        }

        else {
            object_trajectories[selected_object.name].push({spheres: [], line: null});
        }

    }


    creatingTrajectory = !creatingTrajectory;

}

function generateTrajectoryLine(object) {
    var obj = object_trajectories[object.name];
    var trajectory = obj[obj.length - 1 + ''];
    var spheres = trajectory['spheres'];
    var points = [];

    if (obj.length > 1) {
        var anteriorTrajectorySize = obj[obj.length - 2 + '']['spheres'].length;
        points.push(obj[obj.length - 2 + '']['spheres'][anteriorTrajectorySize - 1].position);
    }
    for (var i in spheres) {
        if (spheres[i].parent === object) {
            points.push(spheres[i].parent.position);
            //objects.splice(objects.indexOf(spheres[i]), 1);
        }
        else {
            points.push(spheres[i].position);
            //objects.splice(objects.indexOf(spheres[i]), 1);
        }
    }
    var spline = new THREE.SplineCurve3(points);

    var geometry = new THREE.Geometry();
    var splinePoints = spline.getPoints(numPoints);

    for (var i = 0; i < splinePoints.length; i++){
        geometry.vertices.push(splinePoints[i]);
    }
    var lineMaterial = new THREE.LineBasicMaterial({linewidth : 2});

    var line = new THREE.Line(geometry, lineMaterial);

    if (obj.length <= trajectoryColors.length) {
        line.material.color = trajectoryColors[obj.length - 1];
    }
    else {
        line.material.color = trajectoryColors[(obj.length - 1) % (trajectoryColors.length)];
    }
    scene.add(line);
    trajectory['line'] = spline;
}


//IGNORAR

/*
function runTrajectories() {
    //falta ver o tempo inicial
    var t = 3.0;
    for (var key in object_trajectories) {
        var obj = object_trajectories[key];
        for (var index in obj) {
            var traj = obj[index + ""];
            var distance = 0;
            var spheres = traj['spheres'].children;
            for (var i = 0; i < spheres.length - 1; i++) {
                var point1 = spheres[i].position;
                var point2 = spheres[i + 1].position;
                console.log(point2);
                console.log(point1);
                distance += point1.distanceTo( point2 );
                var dir = new THREE.Vector3(); // create once an reuse it
                dir.subVectors( point2, point1 ).normalize();
                dirVectors.push(dir);
            }

            speed = distance / t;

      }
        }
    }
    */