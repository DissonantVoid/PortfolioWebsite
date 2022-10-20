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