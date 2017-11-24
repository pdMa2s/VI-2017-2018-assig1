var start = 0;
var end = 0;

var rX = 0;
var rY = 0;
var rZ = 0;

function createRotation() {
    alert(selected_object.name);
    var animation = new Animation(start, end);
    animation.rotation(rX,rY,rZ);
    objCollection.addAnimation(selected_object.name, animation);
}

