const containerHome= document.querySelector('section#home');

function handleGridCreation({container,id,className}){
    if(!isElmIdOn(container,id)){
        const newContainer= createDOMElement({ 
            type: 'div',
            attributes:{id, class: className}
        });
        return { new: true, elm: newContainer };
    }else  
        return { new: false, elm: container.querySelector(`#${id}`)};
}
function createHomeGrids(){
    const response= {}
    response.leftContainer=  handleGridCreation({ container: containerHome, id: 'home-left-container',className: 'home-left' })
    response.rightContainer= handleGridCreation({ container: containerHome, id: 'home-right-container',className: 'home-right' })
    response.footerContainer= handleGridCreation({ container: containerHome, id: 'home-footer-container',className: 'home-footer' })
    
    return response
}
function renderHome(){
    const gridCreation = createHomeGrids();
    Object.keys(gridCreation).forEach( item => {
        if(gridCreation[item].new === true){
            const newChild= gridCreation[item];
            containerHome.append(newChild.elm);
        }
    })
    
    
    const { leftContainer,rightContainer,footerContainer}= gridCreation;
    if(leftContainer.new){
        renderSectionContent(leftContainer.elm,homeDefaultContentIndex);
        renderSectionIcons(leftContainer.elm,homeDefaultContentIndex);
    }
    if(rightContainer.new){
        //render-profile-images three-times for animation
        let prfimg1= renderMyPhoto();
        let prfimg2= renderMyPhoto();
        let prfimg3= renderMyPhoto();
        const photoDiv= createDOMElement({
            type:'div',attributes:{ id:'profile-photo-wrapper' }
        });
        photoDiv.append(prfimg1.elm,prfimg2.elm,prfimg3.elm);
        rightContainer.elm.append(photoDiv);

        renderMyName(rightContainer.elm);
        renderMyTitle(rightContainer.elm);
        renderSocialMedia(rightContainer.elm);
        renderDotBox(rightContainer.elm);
        createNavButtons(rightContainer.elm);
    }
    if(footerContainer.new){
        renderFooter(footerContainer.elm);
    }
}

function renderMyName(parent){
    const animationNameDuration= `${nameTypingDuration}s`
    const elm= createDOMElement({
        type: 'div',
        attributes: {
            class: 'home-name container-typing',
            style: '--container-width: 25vw'
        }
    })
    const elmChild= createDOMElement({
        type: 'span',
        attributes: {
            class: 'typing',
            style: `--typing-duration: ${animationNameDuration};--typing-color:rgb(93, 98, 97);`
        },
        text: `${myName}`
    });
    elm.appendChild(elmChild);
    
    parent.append(elm);
}

function toggleClassName(id,elm,className){
    const cName= elm.classList.value;
    if(cName.includes(className)){
        elm.classList.remove(className);
    }else if(elm.dataset.id===id){
        elm.classList.add(className);
    }
}

renderHome();



