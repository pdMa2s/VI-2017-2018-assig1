class ObjectCollection {
    constructor() {
        this.objs = [];
        this.json = {"sceneObjects": []};
        this.sortedAnimations = [];
    }

    getJson() {
        return this.json;
    }
    getObjs(){
        return this.objs;
    }

    addSceneObject(obj) {
        this.json.sceneObjects.push(obj.getJson());
        this.objs.push(obj);
    }
    removeSceneObject(obj){
        var index =  this.objs.indexOf(obj);
        if(index > -1)
            this.objs.splice(index, 1);
    }
    getObject(name) {
        for (var i = 0; i < this.objs.length; i++) {
            if (this.objs[i].getName() === name) {
                return this.objs[i];
            }
        }
        return null;
    }

    setPosition(name, pos) {
        for (var i = 0; i < this.objs.length; i++) {
            if (this.objs[i].getName() === name) {
                this.objs[i].setPosition(pos);
                return true;
            }
        }
        return false;
    }

    addAnimation(name, animation) {
        alert("objs length" + this.objs.length);
        for (var i = 0; i < this.objs.length; i++) {
            if (this.objs[i].getName() === name) {
                this.objs[i].addAnimation(animation);

                return true;
            }
        }
        return false;
    }

    getSortedAnimations() {
        this.sortedAnimations = this.getAnimationArray();
        let nrAnimations = this.sortedAnimations.length;
        let k;
        for (let i = nrAnimations; i >= 0; i--) {
            for (let j = 0; j < nrAnimations - 1; j++) {
                k = j + 1;
                if (this.sortedAnimations[j].id > this.sortedAnimations[k].id) {
                    this.swapNumbers(j, k, this.sortedAnimations);
                }
            }
        }
        /*for(let x = 0 ; x < this.sortedAnimations.length; x++){
            console.log(JSON.stringify(this.sortedAnimations[x].getJson()));
        }*/

        return this.sortedAnimations;
    }

    swapNumbers(i, j, array) {
        var temp;
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    getAnimationArray() {
        var animations = [];
        for (var i = 0; i < this.objs.length; i++) {
            var objAnimations = this.objs[i].getAnimations();
            for (var j = 0; j < objAnimations.length; j++) {
                animations.push(objAnimations[j]);
            }
        }

        return animations;
    }
}



