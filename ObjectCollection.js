class ObjectCollection {
  constructor() {
    var objs = [];
    this.json = {"sceneObjects": []};
  }

  get getJson(){
    return this.json;
  }

  addSceneObject(obj){
    objs.push(obj);
  }

  getObject(name){
      for(var i = 0; i < objs.length(); i++){
          if( objs[i].getName() === name){
              return objs[i];
          }
      }
      return null;
  }

  addAnimation(objName, animation){
      for(var i = 0; i < objs.length(); i++){
          if( objs[i].getName() === name){
              objs[i].addAnimation(animation);
              return true;
          }
      }
      return false;
  }
}