class Animation {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.json = {"animation": {}};
  }

  rotation(x , y , z){
      this.json.animation = {"rotation": {"x":x , "y":y, "z":z}};
  }

  translation(positions){
      var jsonPos = [];
      if(positions.length < 1)
          alert("Invalid positions");
      for(var i = 0; i < positions.length ; i++){
        jsonPos.push({ "x": positions[i].x, "y": positions[i].y, "z": positions[i].z});
      }
      this.json.animation = {"translation": jsonPos};
  }


}