// import { injectCSS } from "../useInjectCss/injectCss.js";
// import { css } from "./style.js";
// import { loadFeatureCSS } from "../../util/createStyle.js";

export function onScrollRemove({
  component=null,
  threshold = 25,          // px
  showAtTopPercent = 5,     // always visible near top
  minDelta = 4,             // px movement before detecting direction
  classNames = [],
} = {}) {
  if (!component) return;

  // injectCSS(css);

  const extras = Array.isArray(classNames)
    ? classNames.filter(Boolean) // filter-out falsy values
    : classNames
        ? [classNames]
        : [];

  // --- keep state across scrolls ---
  let lastScroll = window.scrollY;
  let lastDirection = "up";
  let ticking = false; // boolean if we already waiting for the next animation frame update

  const getScrollPercent = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    return (window.scrollY / max) * 100;
  };

  const show = () => {
    component.classList.remove("hidden-scroll");
    component.classList.add("visible");
    extras.forEach((c) => component.classList.remove(c));
  };

  const hide = () => {
    component.classList.add("hidden-scroll");
    component.classList.remove("visible");
    extras.forEach((c) => component.classList.add(c));
  };

  const handle = () => {
    const y = window.scrollY;
    const delta = y - lastScroll;
    const direction =
      delta > minDelta ? "down" : delta < -minDelta ? "up" : lastDirection;

    // Always visible near top
    if (getScrollPercent() < showAtTopPercent) {
      show();
    } else if (direction === "down" && y > threshold) {
      hide();
    } else if (direction === "up") {
      show();
    }

    lastScroll = y;
    lastDirection = direction;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) { 
      requestAnimationFrame(handle);
      ticking = true;
    }
  };

  // --- ensure visible on load ---
  show();
  window.addEventListener("scroll", onScroll, { passive: true });

  return {
    handle: () => handle(),
    stop() {
      window.removeEventListener("scroll", onScroll);
    },
  };
}
