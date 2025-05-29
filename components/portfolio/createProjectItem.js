/* create project items */
function openInNewTab(url) {
    window.open(url, '_blank').focus();
    }

    function createTechItem({parent,item,onClickCb}){
        const elm= createDOMElement({
            type:'h1',
            attributes:{
                id: item.id.toLowerCase(),
                class: 'project-technology',
                'data-selected': false,
                'data-label': item.label
            },
            text: item.label
        })
        parent.append(elm);
        onClickCb();
    }
    // function renderTechLabels(techList,cbFn){
    //     const container= createDOMElement({
    //         type: 'div', 
    //         attributes: { class: 'portfolio-technology'}
    //     });
    //     console.log('techList:',techList)
    //     techList.forEach((i) =>  createTechItem({ 
    //         parent: container, 
    //         item: i, 
    //         onClickCb: () => listenTechItemOnClick({ elm: i })
    //     }))
    //     return container;
    // }

    function toggleTechFilter({elm}){
        console.log(elm);
        if(elm.dataset.selected){
            elm.dataset.selected= false;
        }else elm.dataset.selected=true;
    }
    function listenTechItemOnClick({elm}){
        elm.addEventListener('click', () => toggleTechFilter({elm}));
    }
    /* create Project Box Elements */
function createProjectSubContainer({parentAtt,elementsFn}){
    const parentElm= createDOMElement({
        type: 'div',
        attributes: parentAtt
    });
    const element= elementsFn();
    if(Array.isArray(element)){
        console.log('element',element);
        element.forEach(item => parentElm.append(item));
    }else{
        parentElm.appendChild(element)
    }
    return parentElm
}
function createProjectTitle({id,title}){
    const titleContainer= createProjectSubContainer({
        parentAtt: { id: `project-title-${id}`, class: 'project-title'},
        elementsFn: () => createDOMElement({type: 'h1',attributes:{ class: 'title'},text:title})
    });
    return titleContainer
}
function createProjectDescription({id,description}){
    const descriptionContainer= createProjectSubContainer({
        parentAtt: { id: `project-description-${id}`, class: 'project-description'},
        elementsFn: () => createDOMElement({ type: 'p',attributes:{ class: 'description'},text: description})
    })
    return descriptionContainer
}
function createProjectLink({id,link}){
    const linkContainer= createProjectSubContainer({
        parentAtt: { id: `link-${id}`, class: 'project-links'},
        elementsFn: () => {
            const liveButton= link.live.length
                ? createDOMElement({ type:'a',attributes:{ id:'button-live',class: 'project-link-button', target:"_blank",href: link.live }, text: 'live'})
                : '';
            const codeButton= link.code.length
                ? createDOMElement({ type:'a',attributes:{ id: 'button-code',class: 'project-link-button', target:"_blank",href: link.code}, text: 'code'})
                : '';
            return [ liveButton, codeButton ]
        }
    })
    return linkContainer
}
function createProjectTech({id,matchingTech}){
    const techInProjectContainer= createProjectSubContainer({
        parentAtt: { id: `tech-used-on-${id}`, class: 'project-technology-icons'},
        elementsFn: () => renderImages(matchingTech,{ class: 'tech-icon', alt: 'technology icon', width: '10%', height: '10%'})
    })
    return techInProjectContainer
}
/* create Project Box Item */
function renderProjectBox(item){
    const { id, label, description, title, link, technology, images }= item;

    // create project main container with cover image
    const projectBox= createProjectSubContainer({
        parentAtt: { class: 'project', 'data-label': label,},
        elementsFn: () => renderImages(
            [{ id, path: images.cover}],
            {
                alt: `project-cover`,
                class: 'project-cover-img',
                width: '100%',
                height: '100%'
            }
        )
    })

    // create title container of the project to be seen on the main container
    if(title?.length){
        const titleContainer= createProjectTitle({id, title: item.title});
        projectBox.append(titleContainer);
    }

    // create info container of the project to be seen on hover
    if(description?.length){
        const descriptionContainer= createProjectTitle({id,description});
        projectBox.append(descriptionContainer);
    }
    
    // create link container of the project to be seen on the hover 
    const linkContainer= createProjectLink({id,link});    
    projectBox.append(linkContainer);

    // create technology container of the projects with icons of the technology used on the project
    const matchingTech= techIcons.filter(i => technology.includes(i.id));
    if(matchingTech){
        const technologyContainer= createProjectTech({id,matchingTech});
        projectBox.append(technologyContainer);
    }
    return projectBox
}