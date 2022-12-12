"use strict";


window.addEventListener("load",function(){
  
  //show particles only if user has a mouse
  if (matchMedia("(pointer:fine)").matches === false) return;

  let canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);
  let contex = canvas.getContext("2d");
  
  let img = new Image();
  img.src = "res/images/Star.png"

  window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  let particlesPool = new Array();
  const minPtclT = 500, maxPtclT = 1000;
  let Particle = function(x,y){
    this.x = x;
    this.y = y;
  
    this.dirX = 0;
    this.dirY = 1;
    this.angle = Math.random() * (Math.PI * 2);
    
    this.dirX = Math.cos(this.angle) * this.dirX - Math.sin(this.angle) * this.dirY;
    this.dirY = Math.sin(this.angle) * this.dirX + Math.cos(this.angle) * this.dirY;

    this.speed = 0.1;
    //lifetime in ms
    this.lifetime = Math.random() * (maxPtclT - minPtclT) + minPtclT;
  }
  const ptclsPerMove = 3;
  
  document.addEventListener("mousemove",function(e){
    let x = e.clientX;
    let y = e.clientY;
    for (let i = 0; i < ptclsPerMove; i++)
    {
      particlesPool.push(new Particle(x,y));
    }
  });
  
  let lastTimestamp = 0;
  function loop(timestamp)
  {
    let deltaTime = timestamp - lastTimestamp;
    
    contex.clearRect(0,0,canvas.width,canvas.height);
    
    for (let i = particlesPool.length-1; i > -1; i--) //reverse iteration so we can safely delete
    {
      let ptcl = particlesPool[i];
      
      //update
      ptcl.lifetime -= deltaTime;
      if (ptcl.lifetime <= 0)
      {
        particlesPool.splice(i,1);
        continue;
      }

      //wall bounce
      // if (ptcl.x < 0 || ptcl.x > canvas.width)
      //   ptcl.dirX = -ptcl.dirX;
      // if (ptcl.y < 0 || ptcl.y > canvas.height)
      //   ptcl.dirY = -ptcl.dirY;
  
      ptcl.x += ptcl.dirX * ptcl.speed * deltaTime;
      ptcl.y += ptcl.dirY * ptcl.speed * deltaTime;
  
      //draw
      let timeLeft = ptcl.lifetime/maxPtclT; // [0,1]
      contex.save();
      contex.globalAlpha = timeLeft + 0.2;
      contex.translate(ptcl.x,ptcl.y);
      contex.scale(timeLeft + 0.4,timeLeft + 0.4);
      contex.rotate(ptcl.angle);
      contex.drawImage(img,0,0);
      contex.restore();
    }
    
    lastTimestamp = timestamp;
    window.requestAnimationFrame(loop);
  }
  
  window.requestAnimationFrame(loop);

})