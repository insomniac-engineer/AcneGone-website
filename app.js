const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const featureButtons = document.querySelectorAll("[data-feature]");
const featureImages = document.querySelectorAll("[data-feature-img]");
const hero = document.querySelector(".hero");

/** Optional tip link — Ko-fi, Buy Me a Coffee, etc. Leave empty to hide footer link. */
const SUPPORT_URL = "https://ko-fi.com/insomniacengineer";

/** Direct Android APK — EAS preview build or GitHub Release. Leave empty to hide beta download. */
const ANDROID_APK_URL = "https://expo.dev/artifacts/eas/2liiKUwQcLhJ0a1ZL3rRLFtr5APD9YFAavJHJGM-soE.apk";

document.querySelectorAll("[data-apk-block]").forEach((block) => {
  if (!ANDROID_APK_URL) {
    block.setAttribute("hidden", "");
    return;
  }
  block.removeAttribute("hidden");
});

document.querySelectorAll("[data-apk-download]").forEach((link) => {
  if (!ANDROID_APK_URL) return;
  link.href = ANDROID_APK_URL;
  link.rel = "noopener noreferrer";
  link.setAttribute("download", "AcneGone.apk");
});

document.querySelectorAll("[data-support-link]").forEach((link) => {
  if (!SUPPORT_URL) {
    if (link.closest(".footer") || link.classList.contains("support-icon-btn") || link.classList.contains("mobile-support")) {
      link.setAttribute("hidden", "");
    } else {
      const text = document.createElement("span");
      text.className = "support-text";
      text.textContent = link.textContent;
      link.replaceWith(text);
    }
    return;
  }
  link.removeAttribute("hidden");
  link.href = SUPPORT_URL;
  link.rel = "noopener noreferrer";
  link.target = "_blank";
});

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

requestAnimationFrame(() => {
  hero?.classList.add("is-ready");
});

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

const revealSelectors = [
  ".section-kicker",
  ".section > .wrap > h2",
  ".section-lead",
  ".features-grid",
  ".why-card",
  ".inc-card",
  ".privacy-grid > *",
  ".faq-item",
  ".closer .wrap > .section-kicker",
  ".closer .wrap > .h2",
  ".closer .wrap > .section-lead",
  ".closer .wrap > .store-row",
];

const revealItems = [];
revealSelectors.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el) => revealItems.push(el));
});

revealItems.forEach((el, index) => {
  el.classList.add("reveal");
  const groupDelay = Math.min((index % 4) * 0.08, 0.24);
  el.style.setProperty("--reveal-delay", `${groupDelay}s`);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  revealItems.forEach((el) => revealObserver.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

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
