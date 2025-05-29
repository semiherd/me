function renderSectionIcons(parent,defaultIndex){
    const sectionContainer= createDOMElement({
        type: 'div',
        attributes:{
            class: 'home-left_section-icons'
        }
    });
    homeSections.forEach( (s,index) => {
        const circleItem= createDOMElement({
            type: 'span',
            attributes:{
                class: index===defaultIndex ? 'section-active' :'', 
                'data-id': s.id
            }
        });
        sectionContainer.append(circleItem);
    })
    parent.append(sectionContainer);
}