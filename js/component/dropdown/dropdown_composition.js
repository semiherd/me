import { createDOMElement } from "../../util/index.js";

/**
 * Generic dropdown container builder.
 * 
 * @param {Array} items - Array of navigation data or custom data nodes.
 * @param {Object} options - Configurable behavior:
 *   @param {Function} options.component - factory function to render each item (default: NavItem).
 *   @param {number} [options.level=1] - Nesting depth for styling or indentation.
 *   @param {string} [options.className="dropdown"] - CSS class for the container.
 *   @param {Function} [options.onRender] - Optional callback executed after render(item, element).
 *   @param {boolean} [options.recursive=true] - Whether to build recursively for nested children.
 * @returns {HTMLElement} dropdown container
 */
export function createDropdown(
  items,
  {
    component,
    level = 1,
    className = "dropdown",
    onRender,
    recursive = true,
  } = {}
) {
  if (typeof component !== "function") {
    throw new Error("createDropdown: 'component' must be a valid render function.");
  }

  // Create dropdown wrapper
  const dropdown = createDOMElement({
    type: "div",
    attributes: { class: `${className} level-${level}` },
  });

  // Iterate over items and inject component dynamically
  items.forEach((item) => {
    const instance = component(item, level);
    const element = instance.element || instance; // Support plain HTMLElement or compositional object
    dropdown.appendChild(element);

    // Optionally perform extra operations
    if (onRender) onRender(item, element, level);
  });

  return dropdown;
}
