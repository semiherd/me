function onScroll(elm,renderFn){
    console.log('onscroll',elm)
    const visibility= isVisible(elm);
    if(visibility){
        renderFn()
    }else{
		const allChildren= elm.querySelectorAll("*");
		allChildren.forEach(e => e.remove());
    }  
}

const sectionAbout= document.querySelector('section#about');
const sectionPortfolio= document.querySelector('section#portfolio');

// if(sectionAbout){
//     //document.addEventListener('scroll',() => onScroll(sectionAbout,renderAbout));
// }
// if(sectionPortfolio){
//     //document.addEventListener('scroll',() => onScroll(sectionPortfolio,renderPortfolio));
// }