"use strict";

//TODO: this needs cleaning
function onSkillClicked(e)
{
  window.location.href = "pages/"+skills[e.currentTarget.idx]+".html";
}

const skills = ["programming","pixelart","music","editing"];
for (let i = 0; i < skills.length; i++)
{
  let skill = document.querySelector("#skills .skill-" + skills[i]);
  skill.idx = i; //TODO: is this the best way to do it ?
  skill.addEventListener("click",onSkillClicked,false);
}


function goToLink(e)
{
  window.open(e.currentTarget.link,"_blank");
}

let discord = document.querySelector("#discord");
discord.link = "https://discordapp.com/users/776145967383969804";
discord.addEventListener("click",goToLink,false);

let itch = document.querySelector("#itch");
itch.link = "https://x-void-x.itch.io";
itch.addEventListener("click",goToLink,false);


//creatures, move to seperate file
let creature = document.createElement("img");
creature.src = "../res/images/creature.png";
creature.style.position = "fixed";
document.body.appendChild(creature);
let pos = {
  x:0, y:0
};
const speed = 0.4;
const rotSpeed = 0.05;
const minDistance = 1400;

window.requestAnimationFrame(loop);
document.onmousemove = onMouseMove;
let lastTimestamp = 0;
let mousePos = {
  x:0, y:0
};


function onMouseMove(e)
{
  mousePos["x"] = e.clientX;
  mousePos["y"] = e.clientY;
}

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

    //rotate point
    let newPosX = pos["x"] * cos - pos["y"] * sin;
    let newPosY = pos["x"] * sin + pos["y"] * cos;

    //translate point back:
    pos["x"] = newPosX + mousePos["x"];
    pos["y"] = newPosY + mousePos["y"];
  }
  
  creature.style.left = pos["x"] + "px";
  creature.style.top = pos["y"] + "px";

  lastTimestamp = timestamp;
  window.requestAnimationFrame(loop);
}