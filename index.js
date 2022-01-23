const options = document.querySelectorAll(".navigation-option");

// const AnimationHandler = function () {
//   const waitForMs = function (ms) {
//     return new Promise(function (resolve) {
//       setTimeout(resolve, ms);
//     });
//   };
//   return {
//     waitForMs,
//   };
// };

const DisplayHandler = (function () {
  let current;
  let currentDiv;
  const body = document.body;
  const observer = new IntersectionObserver(observerCallback, {
    rootMargin: "0px",
    threshold: 0.4,
  });

  function observerCallback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }
  function addObserver() {
    currentDiv.childNodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function homeDiv() {
    currentDiv = document.createElement("section");
    currentDiv.id = "home";

    const divHeading = document.createElement("h2");
    divHeading.id = "home-heading";
    divHeading.textContent = "I let my work speak for itself,";

    const divInfo = document.createElement("div");
    divInfo.id = "home-info";

    const para1 = document.createElement("p");
    para1.innerHTML =
      "My name is <span class='highlight'>Siddhant Tohan</span>, currently a 2nd year in NSUT with specialization in Mathematics and Computing";

    const para2 = document.createElement("p");
    para2.textContent =
      "I have been programming for a few years and don't intend to stop anytime soon";

    divInfo.appendChild(para1);
    divInfo.appendChild(para2);

    const homeLaptop = new Image();
    homeLaptop.id = "home-laptop";
    homeLaptop.src = "./assets/laptop.svg";

    const hobbiesButton = document.createElement("button");
    hobbiesButton.classList.add("home-button");
    hobbiesButton.textContent = "My Hobbies";

    const skillsButton = document.createElement("button");
    skillsButton.classList.add("home-button");
    skillsButton.textContent = "Skills";

    hobbiesButton.addEventListener("click", function (event) {
      renderDisplay("hobbies");
    });

    skillsButton.addEventListener("click", function (event) {
      renderDisplay("skills");
    });
    const homePhone = new Image();
    homePhone.id = "home-phone";
    homePhone.src = "./assets/phone.svg";

    hobbiesButton.addEventListener("click", function (e) {
      renderDisplay("hobbies");
      document.body.scrollIntoView();
    });

    currentDiv.appendChild(divHeading);
    currentDiv.appendChild(divInfo);
    currentDiv.appendChild(homeLaptop);

    currentDiv.appendChild(hobbiesButton);
    currentDiv.appendChild(skillsButton);
    currentDiv.appendChild(homePhone);
  }

  function hobbiesDiv() {
    currentDiv = document.createElement("section");
    currentDiv.id = "my-hobbies";

    const divHeading = document.createElement("h2");
    divHeading.id = "hobbies-heading";
    divHeading.textContent = "I like to,";

    currentDiv.appendChild(divHeading);
  }

  function generateDiv() {
    if (current === "home") {
      homeDiv();
    } else if (current === "hobbies") {
      hobbiesDiv();
    }
    currentDiv.classList.add("current");
    body.appendChild(currentDiv);
  }

  function renderDisplay(chosen) {
    currentDiv.classList.remove("current");
    currentDiv.classList.add("leave");

    // old option highlight remove
    const oldOption = document.querySelector(`.${current}`);
    oldOption.classList.remove("current");

    current = chosen;
    const chosenOption = document.querySelector(`.${current}`);
    chosenOption.classList.add("current");

    currentDiv.addEventListener("animationend", function () {
      body.removeChild(currentDiv);
      generateDiv();

      currentDiv.addEventListener("animationend", function () {
        // when the current div finishes the show up animation,
        // we need to add the observers
        addObserver();
      });
    });
  }

  function addListeners() {
    options.forEach(function (option) {
      option.addEventListener("click", function (event) {
        const chosen = event.target.classList[1];
        if (current === chosen) return;
        renderDisplay(chosen);
      });
    });
  }

  function init() {
    current = "home";
    generateDiv();
    addListeners();
  }

  return { init };
})();

DisplayHandler.init();
