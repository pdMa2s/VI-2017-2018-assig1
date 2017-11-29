class Animation {
  constructor(obj, duration, id) {
    this.duration = duration;
    this.json = {"animation": {}, "id": id, "duration": duration};
    this.type = "";
    this.obj = obj;
    this.id = id;
  }
  getJson(){
      if(this.type === "rotation"){
          return this.json;
      }
      else{
          return  { "animation": {"type": "trajectory", "pos": this.exportJsonPositions()}, "id": this.id ,
          "duration": this.duration };
      }
  }
  getObj(){
      return this.obj;
  }

  rotation(x , y , z){
      this.type = "rotation";
      this.json.animation = {"type": "rotation", "axis": {"x":x , "y":y, "z":z}};
  }

  getRotationAxis(){
      var rotation = this.json.animation;

      return {"x" : rotation.axis.x, "y" : rotation.axis.y, "z" : rotation.axis.z }
  }
  getType(){
      return this.type;
  }
  getDuration(){
      return this.duration;
  }

  translation(positions){
      this.type = "translation";
      var jsonPos = [];
      if(positions.length < 1)
          alert("Invalid positions");
      for(var i = 0; i < positions.length ; i++){
        jsonPos.push({ "x": positions[i].x, "y": positions[i].y, "z": positions[i].z});
      }
      this.json.animation = {"type": "translation", "positions": jsonPos};
  }

  exportJsonPositions(){
      var positions = this.json.animation.pos;
      var jsonToExport = [];
      for(let i = 0; i< positions.length; i++){
          jsonToExport.push({"x": positions[i].x, "y": positions[i].y, "z": positions[i].z});
      }
      return jsonToExport;
  }
  trajectory(positions, line) {
      this.type = "trajectory";
      this.json.animation = {"type": "trajectory", "pos": positions, "line": line };
  }

}