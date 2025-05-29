const borderRadiusOptions= [
    '15% 85% 53% 47% / 55% 41% 59% 45%',
    '85% 100% 93% 19% / 99% 29% 130% 67%',
    '27% 28% 96% 28% / 72% 85% 53% 87%;',
    '50% 20% 43% 99% / 50% 69% 156% 137%',
    '25% 85% 86% 47% / 105% 21% 99% 55%',
    '90% 50% 43% 29% / 50% 90% 56% 97%',
    '35% 50% 143% 179% / 170% 129% 30% 57%',
    '95% 20% 43% 20% / 50% 25% 80% 97%',
]

function createStorySlider({id, data, parent, attributes}){
    const obj= SlidingAnimation({ id, data, attributes });
    const containerId= 'about-shape_container'
    obj.createWrapper({ id: containerId, type: 'div',className: 'about-shape_container'});
    obj.createWrapper({ id: 'about-left-story_head_container', type: 'div',className: 'about-shape_head_container'});
    obj.createWrapper({ id: 'about-left-story_content_container', type: 'div',className: 'about-shape_content_container'});
    
    const container= obj.containers['about-shape_container'];
    const headContainer= obj.containers['about-left-story_head_container'];
    const contentContainer= obj.containers['about-left-story_content_container'];
    
    //create elms on head-container
    obj.createHeaderIcons(data,obj.baseAttr,headContainer);
    obj.createLabel(parent)
    if(container){    
        if(headContainer){
            container.append(headContainer);  
        }
    }
    //create elms on content-container
    data.forEach(item => {
        const content= obj.createContentContainer({ id: `content-${item.phase}` });
        obj.createContentText(content,item)
        contentContainer.append(content);
    })
    container.append(contentContainer); 
    
    // handle animation in intervals
    const dropList= headContainer.querySelectorAll('.shape-drop');
    obj.listenOnHover(dropList);
    obj.createAnimationOnInterval({ elms: dropList, phaseInterval: 2000, defaultIndex: 0});
    
    return obj.containers[containerId];
}

function SlidingAnimation({id, data, attributes}){
    let state={
        id, 
        eventOn: { id :null, item: null},
        containers: {},
        headings: {},
        header:{
            items: []
        },
        data: {
            items: data,
        },
        baseAttr:{  
            width: attributes.width || '1vw',
            height: attributes.height || '1vw',      
            borderWidth: attributes.borderWidth || '0px',
            borderColor: attributes.borderColor || 'rgb(10,10,10)',
            backgroundColor: attributes.backgroundColor || 'rgb(100,100,100)',
            opacity: attributes.opacity || '1',
            afbgcl: attributes.afbgcl || 'rgb(255,99,71)',
            bfbgcl: attributes.bfbgcl || 'rgb(255,99,71)',
        }
    }
    
    return Object.assign(
        state,
        createWrapper(state),
        updateAttr(state), 
        hasHoverAnimator(state), 
        hasDisplayedItem(state), 
        hasHeaderIcons(state),
        hasHeadingText(state),
        hasHeaderLabel(state),
        hasContent(state),
        hasTimeline(state),
        hasAutoAnimator(state),
        hasResizeCb(state),
    )
}
const updateAttr= (state) => {
    return {
        update(key,value){
            state.baseAttr[key]= value;
        }
    }
}

const hasResizeCb= (self) => {
    return {
        onResize(width,cbFn){
            const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
            if (mediaQuery.matches) {
                cbFn();
            }
        }
    }
}
const hasHeaderLabel= (self) => {
    return  {
        createLabel(container){
            const elm= self.createWrapper({ id:'about-left-timeline_label', type:'div', className: 'about-left-timeline_label'});
            const elmText= self.createHeading({ id:'about-left-timeline_label_text', type: 'h1', className: 'about-left-timeline_label_text',text: 'My-Story-in-Short' })
            if(elm){
                elm.append(elmText);
                container.append(elm);
            }
        }
    }
}

const hasHeaderIcons= (self) => {
    return {
        createHeaderIcons(data,props,parent){
            data.forEach( (item,index) => {
                const newDrop= DropShape({
                    id: item.phase, 
                    content: { 
                        className: 'drop_title', 
                        label: item.time, 
                        text: item.title
                    },
                    attributes: {
                        ...props,
                        top: `15%`,
                        left: `${11*(index+1)}%`,
                    }
                });
                parent.append(newDrop);
            }) 
        }
    }
}
const hasDisplayedItem= (self) => {
    return {
        display({item}){
            const data= self.data.items.filter((i) => i.phase===item.id); 
            const itemsOnTimeline= item.parentNode.querySelectorAll('.shape-drop_content h1.drop_title');
            itemsOnTimeline.forEach(i => self.removeOnTimelineClass(i));
            const displayedPhase= item.parentNode.parentNode.querySelector(`.about-shape_content_container > #content-${item.id}`);  
            if(data.length){
                const phaseActive= data[0];
                const contentsOff= displayedPhase.parentNode.querySelectorAll(`.about-phase_description.animation-slide-in-lr:not(#${item.id})`);
                contentsOff.forEach( c =>  c.classList.remove('animation-slide-in-lr'));
                setTimeout(() => displayedPhase.classList.add('animation-slide-in-lr'),200);
                self.addOnTimelineClass(item);      
                self.animateItemOnTimeline(item,phaseActive)            
            }
        }
    }

}
const hasHoverAnimator= (self) => {
    return {
        listenOnHover(items){
            items.forEach( item => {
                item.addEventListener('mouseover', () => {
                    item.classList.add('hovered');
                    self.display({item}) // show description of the phase-item -> showDescription(item)
                });
                item.addEventListener('mouseout', () => {
                    item.classList.remove('hovered');
                });
            })
        }
    }
}
const hasHeadingText= (self) => {
    return{       
        createHeading({id,type,text,className}){
            const elm= createDOMElement({ type: type || 'h1', attributes:{ id, class: className }, text });
            self.headings[id]= elm;
            return elm;
        }
    }
}
const hasAutoAnimator= (self) => {
    return {
        createAnimationOnInterval({ elms, phaseInterval=10000, defaultIndex=0 }){  
            let loop= defaultIndex;
            const elmKeys= Object.keys(elms);
            let isHovered= { state: false, item : null };
            setInterval(() => {
                elmKeys.forEach( elm => {
                    const isOn= elms[elm].classList.value.includes('hovered'); 
                    if(isOn){
                        isHovered= {
                            state: isOn,
                            elm: isOn? elms[elm] :null
                        }   
                        return false;
                    }
                      
                })
                if(isHovered.state){
                    const hoveredIndex= self.data.items.map( item => item.phase).indexOf(isHovered.elm.id);
                    loop= hoveredIndex;
                    isHovered.state= false;
                }
                if(!isHovered.state){
                    if(loop>=elms.length)
                        loop=0; 
                    self.display({item: elms[loop] });              
                    loop++;
                }
            },phaseInterval) 
        }
    }
}
const createWrapper= (self) => {
    return{       
      createWrapper({id,type,className}){
            const elm= createDOMElement({ type, attributes:{ id, class: className }});
            self.containers[id]= elm;
            return elm;
        }
    }
}
const hasTimeline= (self) => {
    return{
        removeOnTimelineClass(item){
            if(item.classList.value.includes('on-timeline')){
                item.classList.remove('on-timeline');
            }
        },
        addOnTimelineClass(item){
            const title= item.querySelector('.shape-drop_content h1.drop_title')
            title.classList.add('on-timeline');
        },
        animateBorder(item,styleList){
            const styleId= Math.round( Math.random()* styleList.length);
            item.style.setProperty('border-radius',styleList[styleId])
        },
        animateItemOnTimeline(item,phaseActive){
            const idx= self.data.items.map( i => i.phase).indexOf(phaseActive.phase);
            const gparent= item.parentNode.parentNode;
            const newPhase= gparent.querySelectorAll('.about-shape_head_container .shape-drop');
            self.onResize(800,() => this.animateBorder(gparent,borderRadiusOptions));
            const shape= newPhase[idx];
            const progress= 3  + ((idx) * 11);
            shape.parentNode.style.setProperty('--phase-progress',`${progress}%`);
        }
    }
}
const hasContent= (self) => {
    return {
        createContentContainer({id}){
            const container= createDOMElement({
                type: 'div',
                attributes:{ id, class: 'about-phase_description' }
            }); 
            self.containers[id]= container;
            return container;
        },
        createContentText(parent,data){
            const descHeading= createDOMElement({
                type: 'h2',
                attributes:{ class : 'about-phase_text title'},
                text: data.title,
            });
            const descWhere= createDOMElement({
                type: 'h2',
                attributes:{ class : 'about-phase_text company'},
                text: data.where,
            });
            const descLocation= createDOMElement({
                type: 'h2',
                attributes:{ class : 'about-phase_text location'},
                text: data.location,
            });
            parent.append(descHeading, descWhere, descLocation);
        }
    }
}
