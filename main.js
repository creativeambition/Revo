import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

let body = document.body;
const theme = localStorage.getItem("theme");
if (theme) {
  body.classList.add(theme);
}

const nav = document.querySelector("nav");
const navEye = document.querySelector("nav .eye");
navEye.addEventListener("click", () => {
  nav.classList.toggle("hide");
});

const themeToggle = document.querySelectorAll(".theme-toggle");
themeToggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    body.classList.toggle("darkmode");
    localStorage.setItem("theme", body.classList.value);
  });
});

gsap.registerPlugin(ScrollToPlugin, TextPlugin);
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li span");
  navLinks.forEach((link) =>
    link.addEventListener("click", (e) => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `${e.target.id}`, autoKill: true },
        ease: "power2",
      });
    })
  );
  gsap.from(".get-app", {
    opacity: 0,
    duration: 1,
    y: 50,
    delay: 0.8,
    ease: "power2",
  });
  gsap.from(".discount-msg", {
    opacity: 0,
    duration: 1,
    y: 20,
    delay: 0.6,
    ease: "power2",
  });
  gsap.from("header .logo", {
    opacity: 0,
    duration: 1,
    y: -15,
    delay: 0.6,
    ease: "power2",
  });
  gsap.from("header .utils", {
    opacity: 0,
    duration: 1,
    y: -15,
    delay: 0.6,
    ease: "power2",
  });
  gsap.from(".sub-content span", {
    opacity: 0,
    duration: 1,
    y: 15,
    delay: 0.9,
    ease: "power2",
  });
  gsap.from(".sub-content .btn-wrapper", {
    opacity: 0,
    duration: 0.8,
    y: 15,
    delay: 1,
    ease: "power2",
  });
  gsap.from(".sub-content .slide-wrapper .slide", {
    opacity: 0,
    duration: 0.8,
    x: 20,
    delay: 1,
    stagger: 0.5,
    ease: "power2",
  });
  gsap.from(".sub-content .contributors .avatar-group img", {
    opacity: 0,
    duration: 0.5,
    x: 20,
    delay: 2,
    stagger: 0.2,
    ease: "power2",
  });
});

const setupTextSlide = (delay, placeholder, elements) => {
  let index = 0;

  if (window.innerWidth < 640) {
    placeholder.style.width = `${elements[index].offsetWidth + 20}px`;
  } else {
    placeholder.style.width = `${elements[index].offsetWidth + 50}px`;
  }

  let currentElement = elements[index];

  currentElement.classList.add("in");
  if (delay) {
    currentElement.style.transitionDelay = `${0.06}s`;
  }

  setTimeout(() => {
    currentElement.classList.remove("in");
    currentElement.classList.add("out");

    setTimeout(() => {
      currentElement.classList.add("reset");
    }, 800);
  }, 3000);

  setInterval(() => {
    index++;

    if (index >= elements.length) {
      index = 0;
    }

    if (window.innerWidth < 640) {
      placeholder.style.width = `${elements[index].offsetWidth + 20}px`;
    } else {
      placeholder.style.width = `${elements[index].offsetWidth + 50}px`;
    }

    let currentElement = elements[index];
    currentElement.classList.remove("out");
    currentElement.classList.remove("reset");
    currentElement.classList.add("in");

    if (delay) {
      currentElement.style.transitionDelay = `${0.06}s`;
    }

    setTimeout(() => {
      currentElement.classList.remove("in");
      currentElement.classList.add("out");

      setTimeout(() => {
        currentElement.classList.add("reset");
      }, 500);
    }, 3000);
  }, 3000);
};
setupTextSlide(
  false,
  document.querySelector(".page.home .placeholder.home"),
  document.querySelectorAll(".page.home .placeholder.home .element")
);
setupTextSlide(
  true,
  document.querySelector(".page.home .placeholder.home-alt"),
  document.querySelectorAll(".page.home .placeholder.home-alt .element")
);
setupTextSlide(
  false,
  document.querySelector(".page.users .placeholder"),
  document.querySelectorAll(".page.users .placeholder .element")
);

const navItems = document.querySelectorAll("nav ul li");
const pages = document.querySelectorAll("body > .page");

const frame = document.querySelector(".page.frame .content-wrapper");
const horizontalPages = document.querySelectorAll(
  ".page.frame .content-wrapper .page"
);
function animateViewportPage() {
  if (
    frame.getBoundingClientRect().top <= window.innerHeight / 3 &&
    frame.getBoundingClientRect().bottom >= window.innerHeight / 3
  ) {
    horizontalPages[0].classList.add("animate");
  }

  pages.forEach((page, index) => {
    if (
      page.getBoundingClientRect().top <= window.innerHeight / 3 &&
      page.getBoundingClientRect().bottom >= window.innerHeight / 3
    ) {
      page.classList.add("animate");
      navItems.forEach((item) => item.classList.remove("active"));
      navItems[index].classList.add("active");
    }
  });
}
animateViewportPage();
window.addEventListener("scroll", () => {
  animateViewportPage();
});

const frame_Scroll_Left_Indicator = document.querySelector(
  ".page.frame .scroll.left"
);
const frame_Scroll_Right_Indicator = document.querySelector(
  ".page.frame .scroll.right"
);

frame.addEventListener("scroll", () => {
  if (
    horizontalPages[0].getBoundingClientRect().right <
    window.innerWidth / 2
  ) {
    frame_Scroll_Left_Indicator.classList.add("active");
  } else {
    frame_Scroll_Left_Indicator.classList.remove("active");
  }

  if (
    horizontalPages[horizontalPages.length - 1].getBoundingClientRect().left <
    window.innerWidth / 2
  ) {
    frame_Scroll_Right_Indicator.classList.remove("active");
  } else {
    frame_Scroll_Right_Indicator.classList.add("active");
  }

  horizontalPages.forEach((page) => {
    if (
      page.getBoundingClientRect().left < window.innerWidth / 2 &&
      page.getBoundingClientRect().right > window.innerWidth / 2
    ) {
      page.classList.add("animate");
    }
  });
});

const servicesPage = document.querySelector(".page.services");
const targetElement = document.querySelector(".page.services .tools");
servicesPage.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 10;
  const y = (e.clientY / window.innerHeight) * 30;

  targetElement.style.transform = `translate(-${x + 50}%) skewY(-${y}deg)`;
});

servicesPage.addEventListener("mouseleave", () => {
  targetElement.style.transform = `translate(-50%) skewY(-30deg)`;
});
