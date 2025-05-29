/*
function createNavButton({parent,id,label,renderFn}){
    const navBut= createDOMElement({
        type: 'button',
        attributes: {
            id: id,
            class: 'home-footer-nav_button'
        },
        text: label
    });
    parent.append(navBut);
    const parentId= id.split('-')[1];
    listenNavButton({ elm: navBut, cb: () => toggleScreen({ screenId: parentId, renderFn }) })
    listenHoverElm({ elm: navBut, cbover: () => showNavArrow(navBut), cbout: () => removeArrow(navBut) })
}
function showNavArrow(container){
    //const elm1 = createArrow(1);
    //const elm2 = createArrow(2);
    //container.append(elm1.elm,elm2.elm);
}
function listenNavButton({elm,cb}){
    elm.addEventListener('click',cb);
}
*/
