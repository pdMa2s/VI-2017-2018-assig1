class SceneObject {
  constructor(name, scale,position) {
    this.name = name;
    this.position = position;
    this.url = "";
    this.scale = scale;
    this.texture  = "";
    this.animations = [];
    this.json = {"name": this.name, "url": this.url, "scale": this.scale, "texture": this.texture,
        "position":{"x": position.x, "y": position.y, "z": position.z} ,"animations": [] };
  }

  getJson(){
    return this.json;
  }
  setTexture(texture){
    this.texture = texture;
    this.json.texture = texture;
  }
  setPosition(pos) {
      this.position = pos;
      this.json.position = {"x": pos.x, "y": pos.y, "z": pos.z};
  }


  getName(){
    return this.name;
  }
  setUrl(url){
    this.url = url;
    this.json.url = url;
  }

  addAnimation(animation){
    this.animations.push(animation);
  }
}