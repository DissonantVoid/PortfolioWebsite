const body = document.body
const htmlName = window.location.pathname.split("/").pop();
const header =
`
<header>
  <div class="header-container">
    <h1>- Dissoant Void -</h1>
    <ul class="navigation">
    ` +
(htmlName === "index.html" ?
`
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
`
:
`
      <li><a href="#">Back to main page</a></li>
`)+
`
     </ul>
  </div>
</header>
`
const footer = 
`
<footer>
  <p>Copyright 2022, All Rights Reserved <span>(whatever that means)</span></p>
</footer>
`

body.insertAdjacentHTML("afterbegin",header)
body.insertAdjacentHTML("beforeend",footer)