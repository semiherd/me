function onTechClickCb({elm}){  
    const isActive= elm.classList.contains("active");
    isActive? removeClass(elm,'active'): addClass(elm,'active');
    //scrollToElm(elm);
};
function listenTabs({tabs,arrows}){
    
    tabs.addEventListener('scroll', (e) => updateIconVisibility({
        scrollLeft: e.target.scrollLeft,
        tabs,
        controlIcons: arrows
    }));
    tabs.addEventListener('wheel', (e) => {
        tabs.style.scrollBehavior= 'auto';
        tabs.scrollLeft += e.deltaY;
    });
}
function listenOnClickElms(elms,cbFn){
    elms.forEach( elm => elm.addEventListener('click', () => cbFn({ elm })));
}

function onArrowIconClick({ icons,container}){
    icons.forEach( icon => {
        icon.addEventListener('click',() => {           
            container.scrollLeft += icon.classList.contains('right-arrow') 
                ? 150
                : icon.classList.contains('left-arrow')
                    ? -150
                    : 0;  
        })
    });
}

function addClass(elm,name){
    elm.classList.add(name);
}
function removeClass(elm,name){
    elm.classList.remove(name)
}
function updateIconVisibility({scrollLeft,tabs,controlIcons}){
    const { clientWidth, scrollWidth }= tabs;
    controlIcons.forEach( icon => {
        if(icon.classList.contains("left-arrow")){
            icon.parentElement.classList.toggle('hide', scrollLeft<=1);
        }
        if(icon.classList.contains("right-arrow")){
            icon.parentElement.classList.toggle('hide', scrollWidth - (clientWidth + scrollLeft)<=1);
        }     
    })
}

function scrollToElm(elm){
    // elm.scrollIntoView({
    //     inline: 'center',
    // })
}

function filterByTechHandler(container){
    const tabs= container.querySelector('.tabs');
    const items= tabs.querySelectorAll('.tab');
    const arrows= container.querySelectorAll('.icon span');
    listenOnClickElms(items,onTechClickCb);  
    onArrowIconClick({icons: arrows, container: tabs});
    listenTabs({ tabs, arrows });
}
