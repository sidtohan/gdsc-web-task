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

  const hobbies = document.querySelector("#hobbies");
  const hobbiesHeading = hobbies.querySelector(".section-heading");
  const hobbiesInfo = hobbies.querySelector(".hobbies-info");
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

    hobbies,
    hobbiesHeading,
    hobbiesInfo,
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
    threshold: 0.5,
  });

  const highlightOnScrollLogic = (section) => sectionObserver.observe(section);
  return { editNav, highlightOnScrollLogic };
})();

const pageBuilder = (() => {
  let skillHeadingVisited = false;
  let hobbiesHeadingVisited = false;

  const waitForMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const options = {
    rootMargin: "0px",
    threshold: 0.7,
  };

  const headingTyper = async (name, heading) => {
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
      heading.appendChild(newSpan);

      await waitForMs(50);
    }
  };

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
          headingTyper("SKILLS", allRefs.skillsHeading);
        } else {
          entry.target.classList.add("show");
        }
      }
    });
  };

  const hobbiesObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (entry.target.className === "section-heading") {
          if (hobbiesHeadingVisited) return;
          hobbiesHeadingVisited = true;
          headingTyper("HOBBIES", allRefs.hobbiesHeading);
        } else {
          entry.target.classList.add("show");
        }
      }
    });
  };
  const homeObserver = new IntersectionObserver(homeObserverCallback, options);
  const skillsObserver = new IntersectionObserver(
    skillsObserverCallback,
    options
  );
  const hobbiesObserver = new IntersectionObserver(
    hobbiesObserverCallback,
    options
  );
  const addHomeObserver = (element) => {
    homeObserver.observe(element);
  };

  const addSkillsObserver = (element) => {
    skillsObserver.observe(element);
  };

  const addHobbiesObserver = (element) => {
    hobbiesObserver.observe(element);
  };
  return {
    addHomeObserver,
    addSkillsObserver,
    addHobbiesObserver,
  };
})();

const observeAllSections = () => {
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

  const hobbiesList = [
    {
      name: "Coding",
      icon: "./assets/coding.svg",
      iconAlt: "./assets/coding-alt.svg",
    },
    {
      name: "Music",
      icon: "./assets/music.svg",
      iconAlt: "./assets/music-alt.svg",
    },
    {
      name: "Gaming",
      icon: "./assets/gaming.svg",
      iconAlt: "./assets/gaming-alt.svg",
    },
    {
      name: "Anime",
      icon: "./assets/anime.svg",
      iconAlt: "./assets/anime-alt.svg",
    },
  ];

  allRefs.sections.forEach((section) => {
    if (section.id === "home") {
      for (let element of section.children) {
        pageBuilder.addHomeObserver(element);
      }
    } else if (section.id === "skills") {
      skillList.forEach((skill) => {
        const skillDiv = document.createElement("div");
        const skillName = document.createElement("p");
        const skillBar = document.createElement("div");

        // acts as progress bar
        skillDiv.classList.add("skill-div");

        skillName.classList.add("skill-name");
        skillName.textContent = skill.name;

        skillBar.classList.add("skill-bar");
        skillBar.style.width = `${skill.mastery}%`;

        skillDiv.appendChild(skillName);
        skillDiv.appendChild(skillBar);

        pageBuilder.addSkillsObserver(skillDiv);

        skillDiv.addEventListener("animationend", (event) => {
          skillBar.classList.add("show");
        });
        allRefs.skillsInfo.appendChild(skillDiv);
      });

      pageBuilder.addSkillsObserver(section.children[0]);
    } else {
      hobbiesList.forEach((hobby) => {
        let path;
        const hobbyCard = document.createElement("div");
        const hobbyBgColor = document.createElement("div");

        const hobbyImage = document.createElement("object");
        const hobbyName = document.createElement("p");

        hobbyImage.type = "image/svg+xml";
        hobbyImage.data = hobby.icon;
        hobbyImage.classList.add("hobby-image");
        hobbyImage.addEventListener("load", () => {
          path = hobbyImage.contentDocument.querySelector("path");
          path.style.transition = "0.35s ease-in-out";
        });

        hobbyBgColor.className = "hobby-bg-div";
        hobbyName.textContent = hobby.name;
        hobbyCard.className = "hobby-card";

        hobbyName.className = "hobby-name";

        hobbyCard.appendChild(hobbyBgColor);
        hobbyCard.appendChild(hobbyImage);
        hobbyCard.appendChild(hobbyName);

        hobbyCard.addEventListener("mouseenter", () => {
          path.style.fill = "#fdfffc";
        });
        hobbyCard.addEventListener("mouseleave", () => {
          path.style.fill = "#6320ee";
        });
        pageBuilder.addHobbiesObserver(hobbyCard);
        allRefs.hobbiesInfo.appendChild(hobbyCard);
      });
      pageBuilder.addHobbiesObserver(section.children[0]);
    }
    navBarLogic.highlightOnScrollLogic(section);
  });
};

observeAllSections();
window.addEventListener("scroll", navBarLogic.editNav);