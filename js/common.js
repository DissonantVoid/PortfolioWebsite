"use strict";

//TODO: consider spliting this into 2 files, one for the classes and one for the functions below

//const ev = CustomEvent("AppSettingChanged",);

class appHeader extends HTMLElement
{
  constructor()
  {
    super();

    let navType = this.getAttribute("type");
    let isIndex = navType === "index";
    let nav = isIndex ?
    `
    <li><a id="nav-skill" sfx-hover="linkHover" sfx-press="linkPress">Skills</a></li>
    <li><a id="nav-contact" sfx-hover="linkHover" sfx-press="linkPress">Contact</a></li>
    `
     :
    `
    <li><a href="index.html" sfx-hover="linkHover">Back to main page</a></li>
    `

    this.innerHTML = `
    <header>
      <div class="header-container">
        <h1>- Dissoant Void -</h1>
        <div class="header-links">
          <ul class="navigation">`
          + nav + `
          </ul>
          <ul class="settings">
            <li class="audio-setting clickable" sfx-hover="settingHover" sfx-press="settingPress"></li>
            <li class="particles-setting clickable" sfx-hover="settingHover" sfx-press="settingPress"></li>
          </ul>
        </div>
      </div>
    </header>
`
    if(isIndex)
    {
      document.getElementById("nav-skill").addEventListener("click",
      function() { document.getElementById("skills").scrollIntoView({behavior: "smooth"}); });

      document.getElementById("nav-contact").addEventListener("click",
      function() { document.getElementById("contact").scrollIntoView({behavior: "smooth"}); });
    }

    //settings & local storage
    this.isAudioActive = JSON.parse(localStorage.getItem("isAudioActive")) || false;
    this.isParticlesActive = JSON.parse(localStorage.getItem("isParticlesActive")) || false;

    const audioSetting = document.querySelector(".audio-setting");
    const particlesSetting = document.querySelector(".particles-setting");
    this.toggleSetting(this.isAudioActive,audioSetting);
    this.toggleSetting(this.isParticlesActive,particlesSetting);

    audioSetting.addEventListener("click",e => {
      this.isAudioActive = !this.isAudioActive;
      localStorage.setItem("isAudioActive", JSON.stringify(this.isAudioActive));
      this.toggleSetting(this.isAudioActive,e.currentTarget);
    });
    particlesSetting.addEventListener("click",e => {
      this.isParticlesActive = !this.isParticlesActive;
      localStorage.setItem("isParticlesActive", JSON.stringify(this.isParticlesActive));
      this.toggleSetting(this.isParticlesActive,e.currentTarget);
    });
  }
  
  toggleSetting(isActive, settingEl)
  {
    if(isActive) settingEl.setAttribute("active","");
    else settingEl.removeAttribute("active");
  }
}

class appFooter extends HTMLElement
{
  constructor()
  {
    super();
    
    let navType = this.getAttribute("type");
    this.innerHTML = `
    <footer>`
    + (navType === "index" ? "" :
    ` <a class="back-to-idx" href="index.html" sfx-hover="linkHover">Back to main page</a>`) +
    `
      <p>Copyright 2022, All Rights Reserved <span>(whatever that means)</span></p>
    </footer>
    `
  }
}

class skillStats extends HTMLElement
{
  constructor()
  {
    super();
    //while this code was a great practice as an introduction to js
    //it can probably be done differently

    //get child of type <ul>, for each <li> create a new column with name = li.title attribute, and for each comma seperated entry in <li> create a new row
    let ul = this.querySelector("ul");
    if(ul === null) return;
    
    let cols = new Array(); //[name,...] 
    let rows = new Array(); //[[name,col],..]
    for(let child of ul.children)
    {
      if(child.tagName == "LI")
      {
        cols.push(child.title);

        for(var liChild = child.firstChild; liChild !== null; liChild = liChild.nextSibling)
        {
          let entryText = liChild.textContent.trim();
          if(entryText.length !== 0)
          {
            let entryTextSplit = entryText.split(',');
            
            for(let i = 0; i < entryTextSplit.length; i++)
            {
              rows.push([entryTextSplit[i].trim(), child.title]);
            }
          }
        }
      }
    }

    //console.log(cols);
    //console.log(rows);
    
    //reverse so highest skills are on top.
    rows.reverse()

    //-reformating:-
    //create title
    let title = document.createElement("h4");
    title.textContent = this.getAttribute("title");

    //create table with class "stats-table" parented by a div with class "table-scroll-container"
    let formattedHTML = createElementWithClass("div","table-scroll-container");
    
    let table = createElementWithClass("table","stats-table");
    table.setAttribute("rule","none");
    
    //fill the first <tr> with column entries, with the first one beign empty
    let firstTr = document.createElement("tr");
    firstTr.appendChild(document.createElement("td"));
    for(let col of cols)
    {
      let td = document.createElement("td");
      td.textContent = col;
      firstTr.appendChild(td);
    }
    table.appendChild(firstTr);

    //for each row create a <tr> with first <td> being the title, and fill the rest of empty <tr>s to match column size
    for(let i = 0; i < rows.length; i++)
    {
      let tr = document.createElement("tr");

      //first td is row title
      let firstTd = document.createElement("td");
      firstTd.textContent = rows[i][0];
      tr.appendChild(firstTd);
      
      //rest of tds
      let targetColReached = false;
      for(let j = 0; j < cols.length; j++)
      {
        let td = document.createElement("td");
        if(targetColReached === false)
        {
          //if td is under a column lower than target, add "table-rect"
          td.classList.add("table-rect")
          if(rows[i][1] === cols[j])
          {
            targetColReached = true;
            //and if td is under the target column, additionaly add "table-rect-end"
            td.classList.add("table-rect-end")
          }
        }
        let tdDiv = document.createElement("div"); //we use div so we can shrink the green rect height
        td.appendChild(tdDiv);
        tr.appendChild(td);
      }
      
      table.appendChild(tr);
    }
   
    formattedHTML.appendChild(table);
    this.innerHTML = title.outerHTML + formattedHTML.outerHTML; //outer html because we want to include the element itself and not just its children
  }
}

function createElementWithClass(element, cls)
{
  let el = document.createElement(element);
  el.classList.add(cls);
  return el;
}

customElements.define("app-header",appHeader);
customElements.define("app-footer",appFooter);
customElements.define("skill-stats",skillStats);



//clickable
function onClickableClicked(e)
{
  if (e.currentTarget.hasAttribute("clickable-new-page-link")) window.open(e.currentTarget.getAttribute("clickable-new-page-link"),"_blank");
  if (e.currentTarget.hasAttribute("clickable-link")) window.open(e.currentTarget.getAttribute("clickable-link"),"_self");
}

const clickables = document.querySelectorAll(".clickable");
clickables.forEach(clickable => {
  clickable.addEventListener("click",onClickableClicked);
});

//tiles, note that there are 2 classes here: fade-into-view and fading-into-view
const tileElements = [...document.querySelectorAll(".fade-into-view")];

updateTiles(null); //initial check
document.addEventListener("scroll",e => updateTiles(e));
window.addEventListener("resize",e => updateTiles(e))

function updateTiles(e)
{
  for(let i = tileElements.length-1; i > -1; i--)
  {
    let element = tileElements[i];
    let rect = element.getBoundingClientRect();
    if((rect.top >= 0 && rect.top <= window.innerHeight) || (rect.bottom >= 0 && rect.bottom <= window.innerHeight))
    {
      element.classList.replace("fade-into-view","fading-into-view");
      tileElements.splice(i,1);
    }
  }
}

//sfx popup
if(JSON.parse(localStorage.getItem("isAudioActive")))
{
  const popup = createElementWithClass("div", "sound-popup");
  popup.innerHTML = `
    <div>
      <img src="res/images/Note.png" alt="Note">
      <h4>Click Anywhere To Activate Audio!</h4>
    </div>
  `
  document.body.appendChild(popup);
  
  document.body.addEventListener("mousedown",function callback(e) {
    //remove event
    document.body.removeEventListener("mousedown",callback,true);
    document.body.removeChild(popup);  
  },true);

  //TODO: listen for keyboard input as well, note that some input like arrows don't activate audio
}


//sfx
const sounds = {
  "linkHover":    new Audio("res/sfx/LinkHover.ogg"),
  "linkPress":    new Audio("res/sfx/LinkPress.ogg"),
  "settingHover": new Audio("res/sfx/SettingHover.ogg"),
  "settingPress": new Audio("res/sfx/SettingPress.ogg"),
  "skillHoverProgramming":new Audio("res/sfx/SkillHoverProgramming.ogg"),
  "skillHoverPixelArt":   new Audio("res/sfx/SkillHoverPixelArt.ogg"),
  "skillHoverMusic":      new Audio("res/sfx/SkillHoverMusic.ogg"),
  "SkillHoverEditing":    new Audio("res/sfx/SkillHoverEditing.ogg"),
  "socialHover":  new Audio("res/sfx/SocialHover.ogg"),
  "socialPress":  new Audio("res/sfx/SocialPress.ogg"),
  "emailPress":   new Audio("res/sfx/EmailPress.ogg"),
  "emailCopy":    new Audio("res/sfx/EmailCopy.ogg")
}

//TODO: we may need to ditch the sfx-.. attributes approach and assign sfx manually from script,
//      problem with curr approach is that it only offers basic control, for example we can't stop
//      all other skill hover sfxs when one plays, and we can't set sfx-once for press only...

const hoverSfxEl = document.querySelectorAll("*[sfx-hover]");
const pressSfxEl = document.querySelectorAll("*[sfx-press]");

function addSfxListener(element, isHover)
{
  const soundName = isHover ? element.getAttribute("sfx-hover") : element.getAttribute("sfx-press");
  const eventName = isHover ? "mouseover" : "click";
  if (soundName in sounds)
  {
    const playOnce = element.hasAttribute("sfx-once");

    element.addEventListener(eventName,function response(e){
      if(playOnce) element.removeEventListener(eventName,response);
      
      sounds[soundName].currentTime = 0;
      sounds[soundName].play();
    });
  }
  else console.error("in [" + window.location.pathname + "] no sfx with name " + soundName);
}

for (let el of hoverSfxEl)
  addSfxListener(el,true);

for (let el of pressSfxEl)
  addSfxListener(el,false);