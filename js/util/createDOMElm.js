export function createDOMElement({ type, attributes={}, text="", html }) {
	const element = document.createElement(type);
    Object.entries(attributes).forEach(([key, value]) => {
        if (key.toLowerCase() === "class" || key.toLowerCase() === "classname") element.className = value
        else if (key.indexOf("on") === 0)
            element.addEventListener(key.substring(2), value);
        else
            element.setAttribute(key, value);
	});
	if (text) {
        element.textContent = text;
	}else if(html)
        element.insertAdjanentHTML("beforeend",html);
	
	return element;
}