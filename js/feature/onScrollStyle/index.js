// import { injectCSS } from "../useInjectCss/injectCss.js";
// import { css } from './style.js';
export function onScrollStyle({   
    component=null,
    threshold=20,
    classNames=[],
}){
    if(!component) return;
    const classList= Array.isArray(classNames)? classNames: [classNames];
    
    // function addDefStyle(){
    //     injectCSS(css);
    // }
    function getPosition(){
        return {
            current: window.scrollY,
            innerHeight: window.innerHeight,
            totalHeight: document.documentElement.scrollHeight
        }
    }

    function handleScroll(){      
        const {current,innerHeight,totalHeight}=getPosition()
        const pageHeight = totalHeight - innerHeight;
        const scrollPercent = (current / pageHeight) * 100;
        
        if (scrollPercent > threshold) {
            component.classList.add('scrolled');
        } else {
            component.classList.remove('scrolled');
        }
        if(classList.length){
            if (scrollPercent > threshold) {
               classList.forEach((cls) => component.classList.add(cls));
            } else {
                classList.forEach((cls) => component.classList.remove(cls));
            }
        }
    }
    
    // addDefStyle();
    handleScroll()
    window.addEventListener("scroll", handleScroll);
    
    // CLEANUP
    return {
        stop() {
            window.removeEventListener("scroll", handleScroll);
        },
    };
   
}