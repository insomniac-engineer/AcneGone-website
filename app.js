const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const featureButtons = document.querySelectorAll("[data-feature]");
const featureImages = document.querySelectorAll("[data-feature-img]");

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

menuToggle?.addEventListener("click", () => {
  const open = mobileNav?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.style.overflow = open ? "hidden" : "";
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

featureButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-feature");
    featureButtons.forEach((item) => {
      const on = item === button;
      item.classList.toggle("is-active", on);
      item.setAttribute("aria-selected", on ? "true" : "false");
    });
    featureImages.forEach((img) => {
      img.classList.toggle("is-on", img.getAttribute("data-feature-img") === id);
    });
  });
});

const MED_DISMISS_KEY = "acnegone-med-disclaimer-dismissed";
const medBanner = document.querySelector("#med-banner");
const medDialog = document.querySelector("#med-dialog");

const showMedBanner = () => {
  if (!medBanner || sessionStorage.getItem(MED_DISMISS_KEY)) return;
  medBanner.hidden = false;
  document.body.classList.add("has-med-banner");
};

const hideMedBanner = () => {
  medBanner?.setAttribute("hidden", "");
  document.body.classList.remove("has-med-banner");
};

document.querySelectorAll("[data-med-open]").forEach((el) => {
  el.addEventListener("click", () => {
    if (typeof medDialog?.showModal === "function") {
      medDialog.showModal();
    }
  });
});

document.querySelector("[data-med-dismiss]")?.addEventListener("click", () => {
  sessionStorage.setItem(MED_DISMISS_KEY, "1");
  hideMedBanner();
});

showMedBanner();
