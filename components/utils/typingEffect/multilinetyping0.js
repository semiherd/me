const TypingEffect= {
    withHider: withHider
}
function createHiderDiv(){
    const hiderPTag= createDOMElement({
        type: 'div',
        attributes: { class: 'hiders' }
    });
    return hiderPTag
}
function createHiderElm(){
    const elm= createDOMElement({
        type:'p',
        text: '&nbsp;',
    });
    return elm;
}
function withHider(initial,hider){
    const hiderContainer= createHiderDiv();

    for(i=0;i<hider;i++){
        const newHider= createHiderElm();
        const delay= typingDuration * i;
        newHider.style.setProperty("--typing-duration", `${typingDuration}s`);
        newHider.style.setProperty("--animation-delay", `${initial + delay}s`);
        hiderContainer.append(newHider);
    }; 
    return hiderContainer;
}

function createTypingContainer(value){
    const container= createDOMElement({type: 'div',attributes:{ class: 'multiline-typing-hider'}});

    const paragraph= createPElm(value,'typing-paragraph-hider');
    container.appendChild(paragraph);
    return container
}
const createTypingEffectwithHider= ({content,chSize}) => {
    let wait= 0;
    const response= content.map((value,index) => {
        const container= createTypingContainer(value.text);
        const contentLen= value.text.length;
        const elmwidth= document.body.offsetWidth*(1/2); //getElementById('right-container').offsetWidth;
        const chonLine= Math.round(elmwidth/chSize);
        const hiders= Math.round(contentLen/chonLine);
        const hiderElm= withHider(wait,hiders);
        container.append(hiderElm);
        wait += hiders;
        return container    
    });
    
    return response;
}

