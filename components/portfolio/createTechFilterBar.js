/* create filter-bar with tech used tabs */
/*
function createArrows(){
    const lefticon= createDOMElement({ type: 'div',attributes: { class : "icon" }});
    const righticon= createDOMElement({ type: 'div',attributes: { class : "icon" }});
    const spanIcon= (id,text) => createDOMElement({type: 'span', attributes:{ class: id },text});
    lefticon.append(spanIcon('left-arrow','<'));
    righticon.append(spanIcon('right-arrow','>'));
    return {
        lefticon,righticon
    }
}

function createOptions(data){
    const optionsList= createDOMElement({ type: 'div', attributes:{ class: 'tabs'}});
    const optionElm= (option) => createDOMElement({type: 'li', attributes: { class: 'tab active'},text: option });
    data.forEach( t => {
        const newOption= optionElm(t.label);
        optionsList.append(newOption);
    });
    return { techOptions: optionsList };
}
function createTechFilterBar(techList){
    const barContainer= createDOMElement({
        type: 'div',
        attributes: { id: 'portfolio-scrollbar', class: "scrollbar" }
    });
    const { lefticon, righticon } = createArrows();
    const { techOptions } = createOptions(techList);
    barContainer.append(lefticon);  
    barContainer.append(techOptions);
    barContainer.append(righticon);
    return barContainer;
}
*/
