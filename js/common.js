"use strict";

class appHeader extends HTMLElement
{
  constructor()
  {
    super();
    this.navType = this.getAttribute("type");
    let nav = this.navType === "index" ?
    `
    <li><a href="#skills">Skills</a></li>
    <li><a href="#contact">Contact</a></li>
    `
     :
    `
    <li><a href="../index.html">Back to main page</a></li>
    `

    this.innerHTML = `
    <header>
      <div class="header-container">
        <h1>- Dissoant Void -</h1>
        <ul class="navigation">` + nav +
`
        </ul>
      </div>
    </header>
`
  }
}

class appFooter extends HTMLElement
{
  constructor()
  {
    super();
    this.innerHTML = `
    <footer>
      <p>Copyright 2022, All Rights Reserved <span>(whatever that means)</span></p>
    </footer>
    `
  }
}

class skillStats extends HTMLElement
{
  connectedCallback()
  {
    //wait for 0 time, enough for children to load
    //TODO: need to learn how this code works
    setTimeout(this.onConnected.bind(this));
  }

  onConnected()
  {
    //while this code was a great practice as an introduction to js
    //but it can probably be done differently

    //get child of type <ul>, for each <li> create a new column with name = li.title attribute, and for each comma seperated entry in <li> create a new row
    let ul = this.querySelector("ul");
    if(ul === null) return;
    
    let cols = new Array(); //[name,...] 
    let rows = new Array(); //[[name,col],..]
    for(var child = ul.firstChild; child !== null; child = child.nextSibling)
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

    console.log(cols);
    console.log(rows);
    //reverse so highest skills are on top.
    //TODO: instead of reversing, we should insert reversed children in for loop above
    rows.reverse()

    //-reformating:-
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
    this.innerHTML = formattedHTML.outerHTML; //outer html because we want to include the element itself and not just its children
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