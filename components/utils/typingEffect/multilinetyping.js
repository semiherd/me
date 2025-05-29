function createPElm(text,className){
    const elm= createDOMElement({
        type:'p',
        attributes: { class: className },
        text,
    });
    return elm;
}
function createMultilineTyper({fn,content,chSize}){
    return fn({ 
        content, 
        chSize 
    });
}