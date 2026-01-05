import { createDOMElement } from "../../utils/createDOMElm.js";

export function createDropdown(children = []) {  
  const elm= createDOMElement({ type: 'div',attributes:{ class: 'dropdown-hover', role:'menu' }})

  children.forEach((item, i) => {
    createDOMElement({ type: 'a',attributes:{ class: 'dropdown-link', role:'menuitem',tabindex: '-1', href: item.href },text: item.label })
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    link.className = "dropdown-link";
    link.setAttribute("role", "menuitem");
    link.setAttribute("tabindex", "-1");
    link.style.animationDelay = `${i * 0.07}s`;
    elm.appendChild(link);
  });

  return elm;
}
