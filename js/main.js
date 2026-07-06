const slides = Array.from(document.querySelectorAll(".heroSlide"));
const primaryNavList = document.querySelector("#siteNav .siteNavList");
const cloneNav = document.querySelector("#siteNavClone");
const primaryNav = document.querySelector("#siteNav");
const navToggle = document.querySelector("#siteNavToggle");
const backTopLink = document.querySelector(".backTop a");

let currentIndex = 0;
let slideTimer = null;

const setActiveSlide = (index) => {
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
};

const startSlideShow = () => {
  if (slides.length <= 1) {
    return;
  }

  slideTimer = window.setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(currentIndex);
  }, 3000);
};

const syncScrolledState = () => {
  const threshold = Math.max(document.querySelector("#siteNav").offsetHeight / 2, 240);
  document.body.classList.toggle("is-scrolled", window.scrollY >= threshold);
};

const smoothAnchor = (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) {
    return;
  }

  const href = link.getAttribute("href");
  if (!href || href === "#") {
    return;
  }

  const target = document.querySelector(href);
  if (!target) {
    return;
  }

  event.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top, behavior: "smooth" });

  if (window.innerWidth <= 850) {
    document.body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }
};

const syncMobileNavState = () => {
  if (window.innerWidth > 850) {
    document.body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }
};

if (primaryNavList && cloneNav) {
  cloneNav.appendChild(primaryNavList.cloneNode(true));
}

document.addEventListener("click", smoothAnchor);
window.addEventListener("scroll", syncScrolledState);
window.addEventListener("resize", syncScrolledState);

if (backTopLink) {
  backTopLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

setActiveSlide(currentIndex);
syncScrolledState();
syncMobileNavState();
startSlideShow();

window.addEventListener("resize", syncMobileNavState);
