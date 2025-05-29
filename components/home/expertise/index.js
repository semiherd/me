function renderMyTitle(parent){
    const elm= createDOMElement({
        type: 'div',
        attributes: {
            class: 'home-title container-sliding',
            style:"--animation-duration: 24s"
        }
    })
    const h1Elm= createDOMElement({
        type: 'h1',
        attributes: {
            class: 'content'
        },
        text: 'Areas of Expertise'
    })
   
    const listElm= createDOMElement({
        type: 'ol',
        attributes: {},
    })
    myAreas.forEach(i => {
        const liElm= createDOMElement({
            type: 'li',
            attributes: {},
        })

        const spanElm= createDOMElement({
            type: 'span',
            attributes: {},
            text: i
        })
        liElm.append(spanElm);
        listElm.append(liElm);
    })
    h1Elm.append(listElm);
    elm.append(h1Elm);
    parent.append(elm);
}