
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

    if(animationEnd > timeLineMax){
        timeLineMax = animationEnd;
    }
    var animation = new Animation(animationStart, animationEnd);
    animation.rotation(rX,rY,rZ);
    objCollection.addAnimation(selected_object.name, animation);

}

function rotateObject(obj, prevTime,animationTime) {
    var date = new Date();
    var now = date.getTime();
    var fps = animationTime*50;
    var animationMillis = animationTime *1000;
    if( (now - prevTime) <= animationMillis || rotated((rX/fps),(rY/fps),(rZ/fps)) ){
        obj.rotation.x += (rX/fps);
        obj.rotation.y += (rY/fps);
        obj.rotation.z += (rZ/fps);
    }
    else{
        rotatedX = 0;
        rotatedY = 0;
        rotatedZ = 0;
    }

}

function rotated(rXFps,rYFps,rZFps) {
    rotatedX += rXFps;
    rotatedY += rYFps;
    rotatedZ += rZFps;

    return (rotatedX <= rX*0.85) && (rotatedY <= rY*0.85) && (rotatedZ <= rZ*0.85);
}

function updateGui(gui) {
    for (var i = 0; i < Object.keys(gui.__folders).length; i++) {
    var key = Object.keys(gui.__folders)[i];
    for (var j = 0; j < gui.__folders[key].__controllers.length; j++ )
    {
        gui.__folders[key].__controllers[j].updateDisplay();
    }
}

}
