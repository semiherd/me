const createTechContainer= () => {
    const techContainer= createDOMElement({
        type: 'div',
        attributes: {
            class: 'container-technology',
        }
    });
    techLevels.forEach((t) => {
        const techDiv= createDOMElement({
            type:'div',
            attributes:{
                id: t.toLowerCase(),
                class: 'technology-skills'
            }
        })
        const iconsDiv= createDOMElement({
            type:'div',
            attributes:{
                id: `${t.toLowerCase()}-tech-skills-icons`,
                class: 'tech-skills-icons'
            }
        })
        const title= createDOMElement({type:'h1',attributes:{ class: 'tech-level'},text: t});
        techDiv.append(title);
        techIcons.forEach((i) => {
            if(i.level.toLowerCase()===t.toLowerCase()){
                const imgIcon= renderImage(i);
                const techItem= createDOMElement({
                    type:'div',
                    attributes:{
                        id: imgIcon.id.toLowerCase(),
                        class: 'tech-skill'
                    }
                })
                techItem.append(imgIcon.elm);
                iconsDiv.append(techItem)
                techDiv.append(iconsDiv);
                addHoverCB(techItem,imgIcon.elm,imgIcon.id,i.label.toLowerCase())
            }
        })
        techContainer.append(techDiv);
    })
    return techContainer;
}
function renderImage(item){
    return ImageItem({
        id: item.id,
        src: item.path,
        attributes:{
            alt: `icon ${item.id}`,
            class: 'tech-icon',
            width: '80%',
            height: '80%'
        }
    });
}
function renderTechIcons(){
    let icons=[];
    techIcons.forEach((item,_) => {
        const newTLogo= renderImage(item);
        icons.push(newTLogo)    
    })
    return icons.map(i => i.elm);
}
const showLabel= (parent,id,label) => parent.append(createDOMElement({ type: 'span', attributes:{ id: `tech-label-${id}`,class: 'tech-label hover' }, text: label }));
const removeElement = el => el.parentNode.removeChild(el);

function addHoverCB(parent,elm,id,label){
    elm.addEventListener('mouseover',() => showLabel( parent,id,label ));
    elm.addEventListener('mouseout',() => removeElement( parent.querySelector(`#tech-label-${id}`) ));
}
