const allRefs=(()=>{const e=document.querySelectorAll("section"),s=document.querySelector("header"),t=s.querySelector(".navigation-name"),a=s.querySelector(".burger-button"),n=a.querySelectorAll(".burger-line"),o=s.querySelectorAll(".navigation-option"),r=s.querySelector("nav"),i=document.querySelector("#home"),l=document.querySelector("#skills"),c=l.querySelector(".section-heading"),d=l.querySelector(".skills-info"),m=document.querySelector("#hobbies"),g=m.querySelector(".section-heading"),h=m.querySelector(".hobbies-info"),v=document.querySelector("#contacts"),u=v.querySelector(".section-heading"),b=v.querySelector(".contacts-info");return{navBar:s,navBarName:t,navBurger:a,navBurgerLines:n,navBarOptions:o,navBarOptionsContainer:r,home:i,skills:l,skillsHeading:c,skillsInfo:d,sections:e,hobbies:m,hobbiesHeading:g,hobbiesInfo:h,contacts:v,contactsHeading:u,contactsInfo:b}})(),navBarLogic=(()=>{const e=allRefs.navBarOptions;let s="home",t=e[0];allRefs.navBarName.addEventListener("click",()=>window.scrollTo(0,0)),e.forEach(e=>e.addEventListener("click",()=>{if(allRefs.navBarOptionsContainer.classList.toggle("show"),allRefs.navBurgerLines.forEach(e=>e.classList.toggle("show")),"home"===(s=e.classList[1]))return window.scrollTo(0,0);document.getElementById(`${s}`).scrollIntoView()}));const a=new IntersectionObserver((e,a)=>{e.forEach(e=>{e.isIntersecting&&(s=e.target.id,t.classList.remove("current"),(t=allRefs.navBar.querySelector(`.${s}`)).classList.add("current"))})},{rootMargin:"0px",threshold:.4});allRefs.navBurger.addEventListener("click",()=>{allRefs.navBurgerLines.forEach(e=>e.classList.toggle("show")),allRefs.navBarOptionsContainer.classList.toggle("show")});return{editNav:()=>{window.scrollY>1.5*allRefs.navBar.offsetHeight?allRefs.navBar.classList.add("sticky"):allRefs.navBar.classList.remove("sticky")},highlightOnScrollLogic:e=>a.observe(e)}})(),pageBuilder=(()=>{const e={rootMargin:"0px",threshold:.3},s=new IntersectionObserver((e,s)=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("active")})},e),t=new IntersectionObserver((e,s)=>{e.forEach(async e=>{e.isIntersecting&&("skill-div"===e.target.classList[0]?e.target.querySelector(".skill-bar").classList.add("show"):e.target.classList.add("show"),t.unobserve(e.target))})},e),a=new IntersectionObserver((e,s)=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("show")})},e),n=new IntersectionObserver((e,s)=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("show")})},e);return{addHomeObserver:e=>{s.observe(e)},addSkillsObserver:e=>{t.observe(e)},addHobbiesObserver:e=>{a.observe(e)},addContactsObserver:e=>{n.observe(e)}}})(),processAllSections=()=>{const e=[{name:"HTML5",mastery:85},{name:"CSS3",mastery:93},{name:"Javascript",mastery:98},{name:"React",mastery:80},{name:"Node.js",mastery:85},{name:"Express",mastery:70},{name:"MongoDB",mastery:76}],s=[{name:"Coding",icon:"./assets/coding.svg",iconAlt:"./assets/coding-alt.svg"},{name:"Music",icon:"./assets/music.svg",iconAlt:"./assets/music-alt.svg"},{name:"Gaming",icon:"./assets/gaming.svg",iconAlt:"./assets/gaming-alt.svg"},{name:"Anime",icon:"./assets/anime.svg",iconAlt:"./assets/anime-alt.svg"}],t=[{name:"Github",link:"https://github.com/sidtohan",icon:"./assets/github.svg"},{name:"Linkedin",link:"https://linkedin.com/in/siddhant-tohan",icon:"./assets/linkedin.svg"},{name:"Codechef",link:"https://www.codechef.com/users/siddhant_tohan",icon:"./assets/codechef.svg"},{name:"Codeforces",link:"https://codeforces.com/profile/Siddhant_Tohan",icon:"./assets/codeforces.svg"}];allRefs.sections.forEach(a=>{if("home"===a.id)for(let e of a.children)pageBuilder.addHomeObserver(e);else"skills"===a.id?(e.forEach(e=>{const s=document.createElement("div"),t=document.createElement("p"),a=document.createElement("div");s.classList.add("skill-div"),t.classList.add("skill-name"),t.textContent=e.name,a.classList.add("skill-bar"),a.style.width=`${e.mastery}%`,s.appendChild(t),s.appendChild(a),pageBuilder.addSkillsObserver(s),allRefs.skillsInfo.appendChild(s)}),pageBuilder.addSkillsObserver(a.children[0])):"hobbies"===a.id?(s.forEach(e=>{let s;const t=document.createElement("div"),a=document.createElement("div"),n=document.createElement("object"),o=document.createElement("p");n.type="image/svg+xml",n.data=e.icon,n.classList.add("hobby-image"),n.addEventListener("load",()=>{(s=n.contentDocument.querySelector("path")).style.transition="0.35s ease-in-out"}),a.className="hobby-bg-div",o.textContent=e.name,t.className="hobby-card",o.className="hobby-name",t.appendChild(a),t.appendChild(n),t.appendChild(o),t.addEventListener("mouseenter",()=>{s.style.fill="#fdfffc"}),t.addEventListener("mouseleave",()=>{s.style.fill="#6320ee"}),pageBuilder.addHobbiesObserver(t),allRefs.hobbiesInfo.appendChild(t)}),pageBuilder.addHobbiesObserver(a.children[0])):(t.forEach(e=>{let s;const t=document.createElement("a");t.className="contact-card";const a=document.createElement("div");a.className="contact-name",a.textContent=e.name,t.href=e.link,t.target="_blank";const n=document.createElement("object");n.classList.add("contact-image"),n.type="image/svg+xml",n.data=e.icon,n.addEventListener("load",()=>{s=n.contentDocument.querySelector("path")});const o=document.createElement("div");o.className="contact-bg-div",t.appendChild(n),t.appendChild(a),t.appendChild(o),t.addEventListener("mouseenter",()=>{s.style.fill="#fdfffc",s.style.transition="0.42s ease-in-out"}),t.addEventListener("mouseleave",()=>{s.style.fill="#6320ee"}),pageBuilder.addContactsObserver(t),allRefs.contactsInfo.appendChild(t)}),pageBuilder.addContactsObserver(a.children[0]));navBarLogic.highlightOnScrollLogic(a)})};processAllSections(),window.addEventListener("scroll",navBarLogic.editNav);