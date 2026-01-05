import { createDOMElement } from "../../../util/index.js";

export function createCard(project) {
    const item = createDOMElement({ type: 'div', attributes: { class: 'card-item desktop-frame' }});
    // item.className = `scene-item ${project.type === "mobile" ? "mobile-frame" : "desktop-frame"}`;
    
    // === Screen container ===
    const screenWrapper= createDOMElement({ type: 'div', attributes: { class: 'card-screen' }});

    const img = createDOMElement({ type: 'img', attributes: { src: project.image, alt: project.title, loading:"lazy" }});
    screenWrapper.appendChild(img);

    // === Info section ===
    const content = createDOMElement({ type: 'div', attributes: { class: 'card-content' }});
    const title = createDOMElement({ type: 'div', attributes: { class: 'card-title' },text: project.title});
    const desc = createDOMElement({ type: 'div', attributes: { class: 'card-description' }, text: project.description });
    const link = createDOMElement({ type: 'a', attributes: { class: 'card-link', href: project.href }, text: "View Details →" });
    
    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(link);

    // === Combine ===
    item.appendChild(screenWrapper);
    item.appendChild(content);

    return item;
}
