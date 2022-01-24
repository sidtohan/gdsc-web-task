const pageBuilder = (() => {
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        entry.target.classList.add("active");
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, {
    rootMargin: "0px",
    threshold: 1.0,
  });

  const addObserver = (element) => {
    observer.observe(element);
  };
  return {
    addObserver,
  };
})();

// stores all the refs
const allRefs = (() => {
  const navbar = document.querySelector("header");
  const navBarName = navbar.querySelector(".navigation-name");
  const navBarButton = navbar.querySelector(".navigation-button");
  const home = document.querySelector("#home");
  const skills = document.querySelector("#skills");
  return {
    navbar,
    home,
    skills,
    navBarName,
    navBarButton,
  };
})();

const observeAllSections = () => {
  const allSections = document.querySelectorAll("section");
  allSections.forEach((section) => {
    for (let element of section.children) {
      pageBuilder.addObserver(element);
    }
  });
};

const editNav = () => {
  if (window.scrollY > 20) {
    navBarName.classList.remove("active-nav");
    navBarButton.classList.add("active-nav");
  }
};
observeAllSections();
window.addEventListener("scroll", editNav);
