import { createDropdown } from "../../component/dropdown/dropdown_composition.js";
import { isMobile, createDOMElement,listenHover, listenClick } from "../../util/index.js";
import { createPulse } from '../../feature/hasPulse/index.js';

export function NavigationItem({ item, level = 0, index=null, attr={} }) {
  
  let isOpen = false;
  let dropdown = null;
  let toggle = null;

  // === root element ===
  const wrapper = createDOMElement({
    type: "div",
    attributes: { class: `navigation-item level-${level}`, role: "menuitem" },
  });

  const link = createDOMElement({
    type: "a",
    attributes: {
      href: item.href || "#",
      class: "navigation-item-link",
      "aria-haspopup": !!item.children,
      "aria-expanded": "false",
    },
    text: item.label,
  });

  // add pulse-effect on hover
  createPulse({target:link, });
  wrapper.appendChild(link);

  // === internal helper methods ===
//   const showDropdown = () => {
//     if (!dropdown) return;
//     dropdown.classList.add("active");
//     toggle?.classList.add("rotated");
//     link.setAttribute("aria-expanded", "true");
//     isOpen = true;
//   };

//   const hideDropdown = () => {
//     if (!dropdown) return;
//     dropdown.classList.remove("active");
//     toggle?.classList.remove("rotated");
//     link.setAttribute("aria-expanded", "false");
//     isOpen = false;
//   };

//   const toggleDropdown = (e) => {
//     e?.preventDefault?.();
//     isOpen ? api.hide() : api.show();
//   };

    // const updateDirection = () => {
    //     if (!dropdown) return;
    //     const rect = wrapper.getBoundingClientRect();
    //     const spaceBelow = window.innerHeight - rect.bottom;
    //     const spaceAbove = rect.top;
    //     if (spaceBelow < 200 && spaceAbove > 200)
    //     dropdown.classList.add("drop-up");
    //     else
    //     dropdown.classList.remove("drop-up");
    // };

    // const bindMode = () => {
    //     if (!item.children) return;
    //     if (isMobile()) {
        
    //     wrapper.onmouseenter = null;
    //     wrapper.onmouseleave = null;
    //     link.onclick = (e) => e.preventDefault(); 
    //     listenClick(toggle, toggleDropdown);
    //     } else {
    //     link.onclick = null;
    //     listenHover({
    //         elm: wrapper,
    //         cbover: showDropdown(),
    //         cbout: hideDropdown,
    //     });
    //     }
    // };

    // === children setup ===
    // if (item.children && item.children.length > 0) {
    //     toggle = createDOMElement({
    //     type: "span",
    //     attributes: {
    //         class: "submenu-toggle",
    //         "aria-label": "Expand submenu",
    //     },
    //     text: "+",
    // });
    // wrapper.appendChild(toggle);

    // dropdown = createDropdown(item.children, { component: NavItem, level: level+1 });
    // wrapper.appendChild(dropdown);

    // Update direction on scroll/resize
    // window.addEventListener("scroll", () => {
    //   if (isOpen) updateDirection();
    // });
    // window.addEventListener("resize", () => {
    //   if (isOpen) updateDirection();
    //   bindMode();
    // });

    // bindMode();

  // === public API ===
  const api = {
    element: wrapper,
    // show: () => {
    //   showDropdown();
    //   updateDirection();
    // },
    // hide: hideDropdown,
    // toggle: toggleDropdown,
    isOpen: () => isOpen,
    getLink: () => link,
    // getDropdown: () => dropdown,
    // rebind: bindMode,
  };

  return api;
}