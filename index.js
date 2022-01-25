// stores all the refs
const allRefs = (() => {
  const sections = document.querySelectorAll("section");
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
    sections,
  };
})();

const navBarLogic = (() => {
  const options = allRefs.navBarOptions;
  let current = "home";
  let currentOptionDiv = options[0];

  const editNav = () => {
    if (window.scrollY > 1.5 * allRefs.navBar.offsetHeight) {
      allRefs.navBar.classList.add("sticky");
    } else {
      allRefs.navBar.classList.remove("sticky");
    }
  };

  // for name to navigate back to home
  allRefs.navBarName.addEventListener("click", () => window.scrollTo(0, 0));

  // for each of the navbar options
  options.forEach((option) =>
    option.addEventListener("click", () => {
      if (current === option.classList[1]) {
        const section = document.getElementById(`${current}`);
        section.scrollIntoView();
      }
      current = option.classList[1];
      currentOptionDiv.classList.remove("current");

      currentOptionDiv = option;
      currentOptionDiv.classList.add("current");

      if (current === "home") {
        return window.scrollTo(0, 0);
      }
      // if home, then we go to the top of the document

      const section = document.getElementById(`${current}`);
      section.scrollIntoView();
    })
  );

  // section highlight logic when scrolling
  const sectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        current = entry.target.id;
        currentOptionDiv.classList.remove("current");

        currentOptionDiv = allRefs.navBar.querySelector(`.${current}`);
        currentOptionDiv.classList.add("current");
      }
    });
  };
  const sectionObserver = new IntersectionObserver(sectionObserverCallback, {
    rootMargin: "0px",
    threshold: 0.6,
  });

  const highlightOnScrollLogic = (section) => sectionObserver.observe(section);
  return { editNav, highlightOnScrollLogic };
})();

const pageBuilder = (() => {
  const skillList = [
    { name: "HTML5", mastery: 85 },
    {
      name: "CSS3",
      mastery: 93,
    },
    {
      name: "Javascript",
      mastery: 98,
    },
    {
      name: "React",
      mastery: 80,
    },
    {
      name: "Node.js",
      mastery: 85,
    },
    {
      name: "Express",
      mastery: 70,
    },
    {
      name: "MongoDB",
      mastery: 76,
    },
  ];
  const waitForMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  let skillHeadingVisited = false;
  let skillsInfoVisited = false;
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
          if (skillHeadingVisited) return;
          skillHeadingVisited = true;
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

            await waitForMs(225);
          }
        } else {
          if (skillsInfoVisited) return;

          skillsInfoVisited = true;
          skillList.forEach((skill) => {
            const skillDiv = document.createElement("div");
            const skillName = document.createElement("div");
            const skillBar = document.createElement("div");
            // acts as progress bar
            skillDiv.classList.add("skill-div");

            skillName.classList.add("skill-name");
            skillName.textContent = skill.name;

            skillBar.classList.add("skill-bar");
            skillBar.style.width = `${skill.mastery}%`;

            skillDiv.appendChild(skillName);
            skillDiv.appendChild(skillBar);

            allRefs.skillsInfo.appendChild(skillDiv);
          });
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
  allRefs.sections.forEach((section) => {
    if (section.id === "home") {
      for (let element of section.children) {
        pageBuilder.addHomeObserver(element);
      }
    } else if (section.id === "skills") {
      for (let element of section.children) {
        pageBuilder.addSkillsObserver(element);
      }
    }

    navBarLogic.highlightOnScrollLogic(section);
  });
};

observeAllSections();
window.addEventListener("scroll", navBarLogic.editNav);
