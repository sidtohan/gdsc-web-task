const options = document.querySelectorAll(".navigation-option");

const DisplayHandler = (function () {
  let current;
  let currentDiv;
  const body = document.body;

  function generateDiv() {
    if (current === "home") {
      currentDiv = document.createElement("section");
      currentDiv.id = "home";

      const divHeading = document.createElement("h2");
      divHeading.id = "home-heading";
      divHeading.textContent = "I let my work speak for itself,";

      const divInfo = document.createElement("p");
      divInfo.id = "home-info";
      divInfo.textContent =
        "I have been programming for a few years and don't intend to stop anytime soon";

      const homeImg = new Image();
      homeImg.id = "home-logo";
      homeImg.src = "./assets/laptop.svg";

      currentDiv.appendChild(divHeading);
      currentDiv.appendChild(divInfo);
      currentDiv.appendChild(homeImg);
    }
    body.appendChild(currentDiv);
  }

  function renderDisplay(chosen) {
    currentDiv.classList.remove("current");
    currentDiv.addEventListener("transition-end", function () {
      body.remove(currentDiv);

      // old option highlight remove
      const oldOption = document.querySelector(`.${current}`);
      oldOption.classList.remove("current");

      current = chosen;
      const chosenOption = document.querySelector(`.${current}`);
      chosenOption.classList.add("current");
      generateDiv();
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
    addListeners();
    current = "home";
    generateDiv("home");
  }

  return { init };
})();

DisplayHandler.init();
