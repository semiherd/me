const wait = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
}

function createDOMElement({ type, attributes, text }) {
	const element = document.createElement(type);
	if (text) {
		element.innerText = text;
	}
	if (attributes) {
		Object.entries(attributes).forEach(([key, value]) => {
			if (key.indexOf("on") === 0) {
				element.addEventListener(key.substring(2), value);
			} else {
				element.setAttribute(key, value);
			}
		});
	}
	return element;
}

function isViewport(element) {
	var rect = element.getBoundingClientRect();
	var html = document.documentElement;
	return (
	  rect.top >= 0 &&
	  rect.left >= 0 &&
	  rect.bottom <= (window.innerHeight || html.clientHeight) &&
	  rect.right <= (window.innerWidth || html.clientWidth)
	);
}
function isVisible (elm) {
	const { top, bottom } = elm.getBoundingClientRect();
	const vHeight = (window.innerHeight || document.documentElement.clientHeight);
  
	return (
	  (top > 0 || bottom > 0) &&
	  top < vHeight
	);
}
function isInViewport(element, parentElement=null)
{
	var childRect = element.getBoundingClientRect();
	if (parentElement == null)
	{
		// check for full visibility in window area
		// (original version)
		var html = document.documentElement;
		return (
			childRect.top >= 0 &&
			childRect.left >= 0 &&
			childRect.bottom <= (window.innerHeight || html.clientHeight) &&
			childRect.right <= (window.innerWidth || html.clientWidth)
		);
	}
	else
	{
		// check for full visibility in a specific parent element's area
		// (for scrollable containers that don't fill the whole window)
		var parentRect = parentElement.getBoundingClientRect();
		return (
			childRect.top >= parentRect.top &&
			childRect.left >= parentRect.left &&
			childRect.bottom <= parentRect.bottom &&
			childRect.right <= parentRect.right
		);
	}
}
function switchScreenOnScroll(){
	window.addEventListener('scroll', function() {
		if(window.scrollY==0){
			toggleScreen({ screenId: 'home', renderFn: renderHome });
		};
	});
}
function listenHoverElm({elm,cbover,cbout}){
    elm.addEventListener('mouseover',cbover);
    elm.addEventListener('mouseout',cbout);
}
function toggleScreen({ screenId, renderFn }){
    const base=`section`;
    const disableSelector= `:not(#${screenId})`;
    const hiddenSections= document.querySelectorAll(`${base}${disableSelector}`);
    hiddenSections.forEach(i => i.style.display= 'none');
	const selector= `${base}#${screenId}`;
    const navSection= document.querySelector(selector);
	if(navSection){
		navSection.style.display= 	'grid';
		renderFn();
	}
}
function isElmIdOn(parent,id){
    const elmAvailable= parent.querySelectorAll(`#${id}`);
    if(!elmAvailable.length)
        return false;
    return true;
}
function findContainers(parent){
    const response={};
    const children= parent.children;
    if(children.length){
        for(const child of children){
            console.log('ccc:',child)
            const childId= child.getAttribute('id');
            response[childId]= child;
        }     
    }
    return response;
}