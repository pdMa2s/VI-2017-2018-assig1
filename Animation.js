class Animation {
  constructor(obj,start, end) {
    this.start = start;
    this.end = end;
    this.json = {"animation": {}};
    this.type = "";
    this.obj = obj;
  }

  getStart(){
      return this.start;
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
  getEndTime(){
      return this.end;
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

  trajectory(positions, line) {
      this.type = "trajectory";
      this.json.animation = {"type": "trajectory", "pos": positions, "line": line };
  }

}