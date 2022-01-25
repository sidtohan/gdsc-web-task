// const backgroundParticles = (() => {
//   const body = document.body;
//   const getDiv = (index) => {
//     let newDiv = document.createElement("div");
//     newDiv.classList.add("bg-div");

//     const height = Math.min(
//       75,
//       Math.max(50, Math.ceil(Math.random() * 10 + 1) * 8)
//     );
//     const width = height;
//     const color = colorPallete[Math.floor(Math.random() * 3)];

//     const leftFactor = Math.max(10, Math.ceil(Math.random() * 90));
//     newDiv.setAttribute(
//       "style",
//       `
//     height: ${height}px;
//     width: ${width}px;
//     background-color: ${color};
//     bottom: -${width}px;
//     left: ${Math.ceil(Math.random() * 100)}%;
//     animation: float-up ${Math.min(
//       30,
//       Math.max(20, Math.floor(Math.random() * 100))
//     )}s linear infinite;
//     opacity: ${Math.min(0.8, Math.max(0.5, Math.random()))};
//     animation-delay: ${index > 25 ? index - 25 : index}s;
//   `
//     );
//     return newDiv;
//   };
//   const colorPallete = ["#4ECDC4", "#FF6B6B", "#FFE66D"];
//   for (let i = 0; i < 30; i++) {
//     body.appendChild(getDiv(i));
//   }
// })();

// stores all the refs
const allRefs = (() => {
  const navBar = document.querySelector("header");
  const navBarName = navBar.querySelector(".navigation-name");
  const navBurger = navBar.querySelector(".burger-button");
  const navBarOptions = navBar.querySelectorAll(".navigation-option");

  const home = document.querySelector("#home");

  const skills = document.querySelector("#skills");
  const skillsHeading = skills.querySelector(".section-heading");
  const skillsInfo = skills.querySelector(".skills-info");
  return {
    navBar,
    navBarName,
    navBurger,
    navBarOptions,
    home,
    skills,
    skillsHeading,
    skillsInfo,
  };
})();

const navBarLogic = (() => {
  const options = allRefs.navBarOptions;
  let current = "home";
  let currentOptionDiv = options[0];

  const editNav = () => {
    if (window.scrollY > 3 * allRefs.navBar.offsetHeight) {
      allRefs.navBar.classList.add("sticky");
    } else {
      allRefs.navBar.classList.remove("sticky");
    }
  };

  options.forEach((option) =>
    option.addEventListener("click", () => {
      if (current === option.classList[1]) {
        return;
      }
      current = option.classList[1];
      currentOptionDiv.classList.remove("current");

      currentOptionDiv = option;
      currentOptionDiv.classList.add("current");

      if (current === "home") {
        return window.scrollTo(0, 0);
      }
      // if home, then we go to the top of the document

      const section = document.querySelector(`#${current}`);
      section.scrollIntoView({
        behavior: "smooth",
      });
    })
  );
  return { editNav };
})();

const pageBuilder = (() => {
  const skillList = [
    { name: "HTML5", mastery: 95 },
    {
      name: "CSS3",
      mastery: 95,
    },
    {
      name: "Javascript",
      mastery: 100,
    },
  ];
  const waitForMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  let skillVisited = false;
  let hobbiesVisited = false;

  const homeObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        entry.target.classList.add("active");
      }
    });
  };

  const skillsObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (entry.target.className === "section-heading") {
          if (skillVisited) return;
          skillVisited = true;
          const name = "SKILLS";
          let length = 0;
          while (length < name.length) {
            const newSpan = document.createElement("span");
            newSpan.classList.add("section-heading-letter");
            newSpan.classList.add("init");

            // this listener removes the init class
            newSpan.addEventListener("animationend", (event) => {
              newSpan.classList.remove("init");
            });
            newSpan.textContent = name[length++];
            allRefs.skillsHeading.appendChild(newSpan);

            await waitForMs(200);
          }
        }
      }
    });
  };

  const homeObserver = new IntersectionObserver(homeObserverCallback, options);
  const skillsObserver = new IntersectionObserver(
    skillsObserverCallback,
    options
  );

  const addHomeObserver = (element) => {
    homeObserver.observe(element);
  };

  const addSkillsObserver = (element) => {
    skillsObserver.observe(element);
  };

  return {
    addHomeObserver,
    addSkillsObserver,
    // addHobbiesObserver,
  };
})();

const observeAllSections = () => {
  const allSections = document.querySelectorAll("section");
  allSections.forEach((section) => {
    if (section.id === "home") {
      for (let element of section.children) {
        pageBuilder.addHomeObserver(element);
      }
    } else if (section.id === "skills") {
      for (let element of section.children) {
        pageBuilder.addSkillsObserver(element);
      }
    }
  });
};

observeAllSections();
window.addEventListener("scroll", navBarLogic.editNav);
