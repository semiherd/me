const containerAbout= document.querySelector('section.about');

const sliderAttr= {  
    width: '1vw',
    height: '1vw',      
    borderWidth: '0px',
    borderColor: 'rgb(10,10,10)',
    backgroundColor: 'rgb(100,100,100)',
    opacity: '1',
    afbgcl: 'rgb(255,99,71)',
    bfbgcl: 'rgb(255,99,71)',
};

function renderAbout(){
    if(!isElmIdOn(containerAbout,'about-left-container')){       
        const leftContainerDiv= createDOMElement({ type: 'div',
            attributes:{
                id: 'about-left-container',
                style: 'z-index: 99',
            }
        });
        const myStorySlider= createStorySlider({ id : 'myStory', data: myStory, parent: leftContainerDiv,  attributes: sliderAttr }) 
        const iconContainer= createTechContainer();
        leftContainerDiv.appendChild(myStorySlider);
        leftContainerDiv.appendChild(iconContainer);
        containerAbout.appendChild(leftContainerDiv);
    }
    if(!isElmIdOn(containerAbout,'about-right-container')){   
        const rightContainerDiv= createDOMElement({ type: 'div',
            attributes:{
                id: 'about-right-container'
            }
        });
        const storyContentItems= createMultilineTyper({ 
            fn: createTypingEffectwithHider, 
            content: myStory, chSize: 16 
        });
        storyContentItems.forEach((item) => rightContainerDiv.append(item));
        containerAbout.appendChild(rightContainerDiv);
    }  
}
