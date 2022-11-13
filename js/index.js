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