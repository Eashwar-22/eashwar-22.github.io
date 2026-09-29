const sectionFiles = ["home", "about", "projects", "contact"];

async function loadSections() {
  const responses = await Promise.all(
    sectionFiles.map((section) => fetch(`./sections/${section}.html`)),
  );
  const sectionMarkup = await Promise.all(
    responses.map((response) => response.text()),
  );

  document.querySelector("#site-content").innerHTML = sectionMarkup.join("");
  initializePage();
}

function initializePage() {
  const dataRain = document.querySelector(".scroll-data-rain");
  const aboutSection = document.querySelector("#about");
  const projectsSection = document.querySelector("#projects");
  const contactSection = document.querySelector("#contact");
  const navItems = document.querySelectorAll(".site-nav__item");
  let lastRainDrop = 0;

  function updateActiveNavigation() {
    let activeSection = "home";
    const isAtPageEnd =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;

    if (
      contactSection.getBoundingClientRect().top <= window.innerHeight ||
      isAtPageEnd
    ) {
      activeSection = "contact";
    } else if (projectsSection.getBoundingClientRect().top <= window.innerHeight / 2) {
      activeSection = "projects";
    } else if (aboutSection.getBoundingClientRect().top <= window.innerHeight / 2) {
      activeSection = "about";
    }

    navItems.forEach((item) => {
      item.classList.toggle(
        "site-nav__item--active",
        item.getAttribute("href") === `#${activeSection}`,
      );
    });
  }

  window.addEventListener("scroll", () => {
    updateActiveNavigation();

    const now = Date.now();

    if (now - lastRainDrop < 130) return;

    lastRainDrop = now;

    for (let index = 0; index < 2; index += 1) {
      const drop = document.createElement("span");
      drop.className = "data-drop";
      drop.textContent = Math.floor(Math.random() * 10);
      drop.style.left = `${Math.random() * 12}vw`;
      drop.style.animationDelay = `${index * 80}ms`;
      dataRain.append(drop);
      drop.addEventListener("animationend", () => drop.remove());
    }
  }, { passive: true });

  updateActiveNavigation();
}

loadSections();
