"use strict";

window.addEventListener("load",function(){
  const email = "arandomdude75@gmail.com";
  const emailElement = document.querySelector(".email");
  emailElement.addEventListener("click",function clickHandler(e){
    //remove event listener
    e.currentTarget.removeEventListener("click",clickHandler);

    e.currentTarget.classList.replace("email-hidden","email-revealed");
    e.currentTarget.querySelector("p").innerText = email;
  });

});