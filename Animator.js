var animationStart = 0;
var animationEnd = 0;
var timeLineMax = 0;
var rX = 0;
var rY = 0;
var rZ = 0;

var rotatedX = 0;
var rotatedY = 0;
var rotatedZ = 0;

function createRotation() {
    if (animationEnd > timeLineMax) {
        timeLineMax = animationEnd;
    }
    var animation = new Animation(animationStart, animationEnd);
    animation.rotation(rX, rY, rZ);
    objCollection.addAnimation(selected_object.name, animation);
}

function rotateObject(obj, prevTime, animationTime) {
    var date = new Date();
    var now = date.getTime();
    var fps = animationTime * 50;
    var animationMillis = animationTime * 1000;
    if ((now - prevTime) <= animationMillis || rotated((rX / fps), (rY / fps), (rZ / fps))) {
        obj.rotation.x += (rX / fps);
        obj.rotation.y += (rY / fps);
        obj.rotation.z += (rZ / fps);
    }
    else {
        rotatedX = 0;
        rotatedY = 0;
        rotatedZ = 0;
    }

}

function rotated(rXFps, rYFps, rZFps) {
    rotatedX += rXFps;
    rotatedY += rYFps;
    rotatedZ += rZFps;

    return (rotatedX <= rX * 0.85) && (rotatedY <= rY * 0.85) && (rotatedZ <= rZ * 0.85);
}

var numPoints = 100; // line trajectory points
var creatingTrajectory = false;
var fps = 60;
var trajectoryColors = [new THREE.Color(0xe6194b), new THREE.Color(0x3cb44b), new THREE.Color(0xffe119),
new THREE.Color(0x0082c8), new THREE.Color(0xf58231)];


var trajPositions = [];

function createTrajectory() {
    creatingTrajectory = !creatingTrajectory;

    if (creatingTrajectory === false) {

        if (trajPositions.length <= 1) {
            creatingTrajectory = true;
            alert("Must define at least one trajectory point");
        }

        else {
            var line = generateTrajectoryLine();

            var animation = new Animation(animationStart, animationEnd);
            animation.trajectory(trajPositions, line);
            objCollection.addAnimation(selected_object.name, animation);

            //meter pos em vez de esferas
            //generateTrajectoryLine(selected_object);
            //chamar a cena animation.cenas e passar pos
            // tirar elemento do objects esferas tbm para nao ser possivel mudar a pos
            // ver se traje pos > 1
        }
    }

    else {
        trajPositions = [];

        if (objCollection.getObject(selected_object.name).hasTrajectoryAnimation() === false) {
            trajPositions.push(selected_object.position);
        }

    }
}


function generateTrajectoryLine() {
    var obj = objCollection.getObject(selected_object.name);
    var points = [];

    if (obj.hasTrajectoryAnimation()) {

        for (var i = obj.animations.length - 1; i >= 0; i--) {
            var anim = obj.animations[i];
            if (anim.type === "trajectory") {
                var anteriorPositionsSize = anim.json.animation.trajectory.pos.length - 1;
                points.push(anim.json.animation.trajectory.pos[anteriorPositionsSize]);
                break;
            }
        }
    }

    for (var j = 0; j < trajPositions.length; j++) {
        if ((trajPositions[j] instanceof THREE.Vector3) === false) {
            var pos = trajPositions[j].position;
            points.push(pos);
            objects.splice(objects.indexOf(trajPositions[j]), 1);
            trajPositions[j] = pos;
        }

        else {
            points.push(trajPositions[j]);
            objects.splice(objects.indexOf(selected_object), 1);
        }
    }

    var spline = new THREE.CatmullRomCurve3(points);

    var geometry = new THREE.Geometry();
    var splinePoints = spline.getPoints(numPoints);

    for (var i = 0; i < splinePoints.length; i++) {
        geometry.vertices.push(splinePoints[i]);
    }
    var lineMaterial = new THREE.LineBasicMaterial({linewidth: 2});

    var line = new THREE.Line(geometry, lineMaterial);
    line.material.color = new THREE.Color(0xe6194b);

    var nTraj = obj.getNumberOfTrajectories();

    if (nTraj < trajectoryColors.length) {
        line.material.color = trajectoryColors[nTraj];
    }

    else {
        line.material.color = trajectoryColors[nTraj % trajectoryColors.length];
    }

    scene.add(line);
    return line;
}


