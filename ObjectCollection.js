class ObjectCollection {
  constructor() {
    this.objs = [];
    this.json = {"sceneObjects": []};
  }

  get getJson(){
    return this.json;
  }

  addSceneObject(obj){
    this.objs.push(obj);
  }

  getObject(name){
      for(var i = 0; i < this.objs.length; i++){
          if( this.objs[i].getName() === name){
              return this.objs[i];
          }
      }
      return null;
  }

  setPosition(name, pos){
      for(var i = 0; i < this.objs.length; i++){
          if( this.objs[i].getName() === name){
              this.objs[i].setPosition(pos);
              return true;
          }
      }
      return false;
  }

  addAnimation(objName, animation){
      for(var i = 0; i < this.objs.length; i++){
          if( this.objs[i].getName() === name){
              this.objs[i].addAnimation(animation);
              return true;
          }
      }
      return false;
  }
}