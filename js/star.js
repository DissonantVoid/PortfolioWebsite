"use strict";

window.addEventListener("load",function(){

  let creature = document.createElement("img");
  creature.src = "res/images/Creature.png";
  creature.style.position = "fixed";
  creature.style.pointerEvents = "none";
  creature.style.zIndex = 99;
  document.body.appendChild(creature);
  let pos = {
    x:0, y:0
  };
  const speed = 0.4;
  const rotSpeed = 0.05;
  const minDistance = 1400;
  
  let lastTimestamp = 0;
  let mousePos = {
    x:0, y:0
  };
  
  document.addEventListener("mousemove",function(e){
    mousePos["x"] = e.clientX;
    mousePos["y"] = e.clientY;
  });
  
  function loop(timestamp)
  {
    let deltaTime = timestamp - lastTimestamp;

    //update
    let direction = {
      "x":mousePos["x"] - pos["x"],
      "y":mousePos["y"] - pos["y"]
    };
    let lenght = direction["x"] * direction["x"] + direction["y"] * direction["y"]
    if (lenght > minDistance)
    {
      //normalize
      if(lenght !== 0)
      {
        direction["x"] /= Math.sqrt(lenght);
        direction["y"] /= Math.sqrt(lenght);
      }
      pos["x"] += direction["x"] * speed * deltaTime;
      pos["y"] += direction["y"] * speed * deltaTime;
    }
    else
    {
      //rotate arround mouse
  
      let sin = Math.sin(rotSpeed);
      let cos = Math.cos(rotSpeed);
  
      //translate point back to origin:
      pos["x"] -=  mousePos["x"];
      pos["y"] -=  mousePos["y"];
  
      //rotate
      let newPosX = pos["x"] * cos - pos["y"] * sin;
      let newPosY = pos["x"] * sin + pos["y"] * cos;
  
      //translate back
      pos["x"] = newPosX + mousePos["x"];
      pos["y"] = newPosY + mousePos["y"];
    }
    
    creature.style.left = pos["x"] + "px";
    creature.style.top = pos["y"] + "px";
  
    lastTimestamp = timestamp;
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
});
