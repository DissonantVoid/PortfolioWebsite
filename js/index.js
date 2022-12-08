"use strict";

window.addEventListener("load",function(){
  //Focal name animation
  const name = document.querySelector(".main-text > h1 > span");
  let nameStr = name.innerText;
  let currLetter = 0;
  this.setInterval(function() {
    name.innerHTML = nameStr.substr(0,currLetter) + '<span style="color:#ededed;">' + nameStr.substr(currLetter,1) + '</span>' + nameStr.substr(currLetter+1);
    currLetter += 1;
    if(currLetter == nameStr.length)
      currLetter = 0;
  },200)

  //skill selection highlighter
  const skillHL = document.querySelector(".skill-selection-highlighter");
  const skillBoxes = document.querySelectorAll(".skills-wrapper > li");
  
  for(let box of skillBoxes)
  {
    box.addEventListener("mouseenter",function(){
      skillHL.classList.add("visible-selection-highlighter");
      
      let cardCenter = {
        "x": box.offsetLeft + box.getBoundingClientRect().width/2 - 100, //highlighter is 200px wide
        "y": box.offsetTop + box.getBoundingClientRect().height/2 - 100 //highlighter is 200px high
      }
      
      skillHL.style.left = cardCenter.x + 'px';
      skillHL.style.top = cardCenter.y + 'px';
      
    })
    box.addEventListener("mouseleave",function(){
      skillHL.classList.remove("visible-selection-highlighter")
    })
  }


  //email animation 
  const email = "arandomdude75@gmail.com";
  const emailElement = document.querySelector(".email");
  emailElement.addEventListener("click",function clickHandler(e){
    //remove event listener
    e.currentTarget.removeEventListener("click",clickHandler);

    e.currentTarget.classList.replace("email-hidden","email-revealed");
    e.currentTarget.querySelector("p").innerText = email;
  });

});