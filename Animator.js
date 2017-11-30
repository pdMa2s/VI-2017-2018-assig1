var animationDuration = 1;
var rX = 0;
var rY = 0;
var rZ = 0;
var rotatedX = 0;
var rotatedY = 0;
var rotatedZ = 0;
var t = 0;
var fps = 60;
var animatorAnims = [];
var animationId = 1;

function addAnimatorAnis(anim) {
    animatorAnims.push(anim);
}

function removeAmin(obj) {
    for(let i = 0; i< animatorAnims.length; i++){
        if(animatorAnims[i].getObj().name === obj.name)
            animatorAnims.splice(i,1);
    }
}
function createRotation() {

    var animation = new Animation(selected_object, animationDuration, animationId);
    animation.rotation(rX, rY, rZ);
    objCollection.addAnimation(selected_object.name, animation);
    addAnimatorAnis(animation);
    animationId ++;
}

function play(prevTime, animation) {
    var animationType = animation.getType();
    var animationObj = animation.getObj();

    switch(animationType){
        case "rotation":
            return rotateObject(animationObj, prevTime, animation);
        case "trajectory":
            return translateObject(animationObj, animation);
        default:
            alert("Invalid animation");
    }
    return true;
}

var up = new THREE.Vector3(0, 0, 1);
var axis = new THREE.Vector3();
var pt, radians, axis, tangent;

function translateObject(obj, animation) {
    var duration = animation.getDuration();
    if (t < 1) {

        var spline = animation.json.animation.line;

        pt = spline.getPointAt(t);
        obj.position.set(pt.x, pt.y, pt.z);

        tangent = spline.getTangent(t).normalize();

        axis.crossVectors(up, tangent).normalize();

        radians = Math.acos(up.dot(tangent));

        obj.quaternion = new THREE.Quaternion();
        obj.quaternion.setFromAxisAngle(axis, radians);
        t += 1 / (duration * fps);

        return false;
    }

    else {
        t = 0;
        return true;
    }
}


function rotateObject(obj, prevTime, animation) {
    var animationTime = animation.getDuration();

    var date = new Date();
    var now = date.getTime();
    var fps = animationTime * 55;
    var animationMillis = animationTime * 1000;

    if ((now - prevTime) <= animationMillis){ //|| rotated((rX / fps), (rY / fps), (rZ / fps))) {
        var axis = animation.getRotationAxis();

        obj.rotation.x += (axis.x / fps);
        obj.rotation.y += (axis.y / fps);
        obj.rotation.z += (axis.z / fps);

        return false;
    }
    else {

        rotatedX = 0;
        rotatedY = 0;
        rotatedZ = 0;
        return true;
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
var trajectoryColors = [new THREE.Color(0xe6194b), new THREE.Color(0x3cb44b), new THREE.Color(0xffe119),
new THREE.Color(0x0082c8), new THREE.Color(0xf58231)];


var trajPositions = [];

function createTrajectory() {
    var insuficient_points = false;
    creatingTrajectory = !creatingTrajectory;

    if (creatingTrajectory === false) {

        if (trajPositions.length < 1) {
            insuficient_points = true;
            alert("Must define at least one trajectory point");
        }

        else {
            var line = generateTrajectoryLine();

            var animation = new Animation(selected_object, animationDuration, animationId);
            animation.trajectory(trajPositions, line);
            objCollection.addAnimation(selected_object.name, animation);
            addAnimatorAnis(animation);
            animationId++;
        }
    }

    else {
        trajPositions = [];

        if (objCollection.getObject(selected_object.name).hasTrajectoryAnimation() === false) {
            trajPositions.push(selected_object.position);
        }

    }

    if (insuficient_points) {
        creatingTrajectory = true;
    }
}


function generateTrajectoryLine() {
    var obj = objCollection.getObject(selected_object.name);
    var points = [];

    if (obj.hasTrajectoryAnimation()) {

        for (var i = obj.animations.length - 1; i >= 0; i--) {
            var anim = obj.animations[i];
            if (anim.type === "trajectory") {
                var anteriorPositionsSize = anim.json.animation.pos.length - 1;
                points.push(anim.json.animation.pos[anteriorPositionsSize]);
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
    return spline;
}
