/**
 * Dynamically detects clicks outside a target element, with optional auto-cleanup ("once" mode).
 *
 * @param {() => HTMLElement | null} getContainer - Function returning the container element (can change over time).
 * @param {Function} onOutsideClick - Callback to run when an outside click occurs.
 * @param {Object} [options]
 * @param {HTMLElement[]} [options.ignore=[]] - Elements that should not trigger outside detection (e.g., toggle buttons).
 * @param {number} [options.checkInterval=200] - How often to recheck if container exists (ms).
 * @param {boolean} [options.once=false] - If true, automatically removes listener after the first outside click.
 * @returns {Function} cleanup - Manually remove listeners and stop tracking.
 */

export function useClickOutside(getContainer, onOutsideClick, options = {}) {
  const {
    ignore = [],
    checkInterval = 200,
    once = false,
  } = options;

  let currentContainer = null;
  let stopped = false;

  function handleClick(event) {
    if (stopped) return;

    const container = currentContainer || getContainer?.();
    if (!container) return;

    const isIgnored = ignore.some((el) => el && el.contains(event.target));
    const isOutside = !container.contains(event.target);

    if (isOutside && !isIgnored) {
      onOutsideClick(event);
      if (once) cleanup(); // auto-stop after first trigger
    }
  }

  const observer = setInterval(() => {
    const newContainer = getContainer?.();
    if (newContainer !== currentContainer) {
      currentContainer = newContainer;
    }
  }, checkInterval);

  document.addEventListener("mousedown", handleClick);
  document.addEventListener("touchstart", handleClick);

  function cleanup() {
    if (stopped) return;
    stopped = true;
    clearInterval(observer);
    document.removeEventListener("mousedown", handleClick);
    document.removeEventListener("touchstart", handleClick);
  }

  return cleanup;
}
