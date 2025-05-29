function createTypingEffectWithPseudo({content,parent}){
    parent.classList.add('multiline-typing-pseudo');
    let len=0;
    content.map((value,index) => {
        const valLen= value.length;   
        const pElm= createPElm(value,`typing-paragraph-pseudo line`)
        pElm.style.setProperty('--pseudo-before-width',valLen);
        pElm.style.setProperty('--pseudo-before-len',len);
        len += valLen;
        parent.append(pElm);
    })

    return parent
}