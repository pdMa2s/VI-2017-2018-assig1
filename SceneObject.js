class SceneObject {
  constructor(name, scale) {
    this.name = name;
    this.url = "";
    this.scale = scale;
    this.texture  = "";
    this.json = {"name": this.name, "url": this.url, "scale": this.scale, "texture": this.texture,"animations": [] };
  }

  getJson(){
    return this.json;
  }
  setTexture(texture){
    this.texture = texture;
    this.json.texture = texture;
  }

  getName(){
    return this.name;
  }
  setUrl(url){
    this.url = url;
    this.json.url = url;
  }

  addAnimation(animation){
    this.json.animations.push({animation});
  }
}