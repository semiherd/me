function createArrow(i){
    const elm= ImageItem({
        id: 'profile-image',
        src: 'assets/icons/right-arrow.png',
        attributes:{
            style: `--i: ${i}`,
            alt: `link-arrow`,
            class: 'link-arrow',
            width: '5%',
            height: '40%'
        }
    });
    return elm;
}
function removeArrow(elm){
    const elms= elm.querySelectorAll('.link-arrow');
    if(elms.length){
        elms.forEach(i => i.remove());
    }
}