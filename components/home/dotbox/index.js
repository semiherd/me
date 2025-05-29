function renderDotBox(parent){
    const dotDiv= createDOMElement({
        type: 'div',
        attributes:{ class: 'dot-box'}
    });
   
    for(i=0;i<200;i++){
        const initial={
            r: 250,
            g: 0,
            b: 0
        };
        const newDotItem= createDot({
            color: `rgba(${initial.r+(i*1.25)},${initial.g+(i*1.25)},${initial.b+(i*1.25)})`
        });
        dotDiv.append(newDotItem)
    } 
    parent.append(dotDiv);
}
function createDot({color}){
    const dotItem= createDOMElement({
        type:'span',
        attributes: { 
            style:`--dot-color:${color}`,
            class: 'dot-item'}
    });
    return dotItem;
}