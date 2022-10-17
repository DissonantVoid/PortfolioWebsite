//TODO: this needs cleaning

const skillsContainer = document.querySelectorAll("#skills > .skills-wrapper > *");

function onSkillClicked(e)
{
  switch (e.currentTarget.idx)
  {
    case 0:
      window.location = "../pages/Programming.html";
      break;
    //...
  }
}

console.log(skillsContainer);

for (let i = 0; i < skillsContainer.length; i++)
{
  skillsContainer[i].addEventListener("click",onSkillClicked,false)
  skillsContainer[i].idx = i;
}