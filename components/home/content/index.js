function getCharacters(text){
    return text.split('');
}
function createTextContent({id,parent,text,content,attr}){
    const titleChr= getCharacters(text);
    const contentChr= getCharacters(content);
    const title= createDOMElement({type: 'h1',attributes:{ class: 'home-content-title'}})
    const classNameP= id==='5' ?'home-content-description background-animation' :'home-content-description border-animation';
    const description= createDOMElement({type: 'p',attributes:{ class: classNameP,style: attr.style }})
    titleChr.map(t => {
        const newSpanElm=createDOMElement({ type:'span',attributes:{ class: 'letter', 'data-letter':t},text: t});
        title.append(newSpanElm);
    })
    contentChr.map(t => {
        const newSpanElm=createDOMElement({ type:'span',attributes:{ class: 'animated-letter','data-letter':t},text: t});
        description.append(newSpanElm);
    })
    parent.append(title,description);
}
function renderSectionContent(parent,defaultIndex){
    const container= createDOMElement({
        type: 'div',
        attributes:{
            class: 'home-left_section',
        }
    });
    homeSections.forEach( (s,index) => {      
        const sectionContent= createDOMElement({
            type: 'div',
            attributes:{
                class: index===defaultIndex? 'home-left_section-content active' :'home-left_section-content',
                'data-id': s.id,
                'data-name': s.name,
                style: `background-color: ${s.backgroundColor}`
            }
        });
        createTextContent({
            id: s.id,
            parent: sectionContent,
            text: s.title,
            content: s.content,
            attr: {
                style: `--paragraph-border-color: ${s.borderColor}`
            }
        })
        container.append(sectionContent);
    });
    parent.append(container);
}