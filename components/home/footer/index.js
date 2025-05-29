function createCenterContent(container){
    const shapes= createShapes();
    shapes.forEach( i => container.append(i.elm));
    return container
}
function createCanvasContent(obj){
    const paintBoard={
        width: window.innerWidth,
        height: window.innerHeight * 0.20
    };
    const paintCanvas= obj.createCanvas({ 
        id: 'paint-board', 
        width: paintBoard.width, 
        height: paintBoard.height 
    });
    obj.plotter({
        canvas: paintCanvas.canvas,
        ctx: paintCanvas.ctx,
        cancelOnUp: true,
        weight: 50, 
        color: 'random',
        cap: 'round', 
        join: 'round',
        points: false
    });
    
    return paintCanvas.canvas
}

function createRandomNumber(n){
    return Math.random() * n;
}
function createListRandomNr(list,elms,max){ 
    const newNr= createRandomNumber(max);
    list.push(newNr)
    if(list.length<elms){
        createListRandomNr(list,elms,max)
    }
    return list;  
}
function stringNr(n){
    switch(n){
        case 0:
            return 'zero';
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        case 6:
            return 'six';
        case 7:
            return 'seven';
        case 8:
            return 'eight';
        case 9:
            return 'nine';
    }
}
function createRandomDimensions(count,maxValue){
   return  createListRandomNr([],count,maxValue);
}
function createShapes(){
    let shapes=[];
    for(i=0;i<20;i++){
        const unit= 'vw';
        let newElm= createCircle({ 
            id: `circle-${stringNr(i)}`, 
            className:'circle',
            attributes: {} 
        });
        const itemWidth= createRandomDimensions(10,20);
        const itemHeight= createRandomDimensions(10,20);
        const opacity= createRandomDimensions(10,10);
        const borderWeight= createRandomDimensions(10,5);
        const borderRadius= createRandomDimensions(10,50);
        const positionx= createRandomDimensions(10,10);
        const positiony= createRandomDimensions(10,10);
        const positionz= createRandomDimensions(10,10);
        const skewx= createRandomDimensions(10,360);
        const skewy= createRandomDimensions(10,360);

        const color={
            r: Math.round(Math.random()*255),
            g: Math.round(Math.random()*255),
            b: Math.round(Math.random()*255),
        }
        itemWidth.forEach( (val,index) => {          
            newElm.style.setProperty(`--dimension-width-${stringNr(index)}`,`${Math.floor(val)}px`);
            newElm.style.setProperty(`--position-x`,`${positionx[index]}${unit}`);
            newElm.style.setProperty(`--position-y`,`${positiony[index]}${unit}`);
            newElm.style.setProperty(`--position-z`,`${positionz[index]}${unit}`);
            newElm.style.setProperty(`--skew-x-${stringNr(index)}`,`${skewx[index]}deg`);
            newElm.style.setProperty(`--skew-y-${stringNr(index)}`,`${skewy[index]}deg`);
            newElm.style.setProperty(`--opacity-${stringNr(index)}`,`${opacity[index]}`);
            newElm.style.animation= 'circle-resize 30s infinite ease-in-out';
            newElm.style.borderRadius= `${borderRadius[index]}px`;
            newElm.style.border= `${borderWeight[index]}px solid rgb(${color.r},${color.g},${color.b})`;
            //newElm.style.backgroundColor= `rgb(${color.r},${color.g},${color.b})`;
        })
        itemHeight.forEach( (val,index) => {
            newElm.style.setProperty(`--dimension-height-${stringNr(index)}`,`${Math.floor(val)}vw`);
        })
       
        shapes.push({ 
            id: Math.random(),
            elm: newElm
        });
    }
    return shapes
    
}
function renderFooter(parent){
    const obj= FooterContainer({id: 'home-footer'});
    const centerElm= obj.createWrapper({id:'home-footer-center',type:'div',className:'home-footer_center'})
    const canvasElm= createCanvasContent(obj);
    createCenterContent(centerElm);
    let dataurl = canvasElm.toDataURL();
    console.log(dataurl);
    centerElm.style.background='url('+dataurl+')'
    //parent.append(canvasElm);  
    parent.append(centerElm);  
}   
function listenNavButton({elm,cb}){
    elm.addEventListener('click',cb);
}
function FooterContainer({id}){
    let state={
        id,
        containers:[],
        canvas: []
    }
    
    return Object.assign(
        state,
        createWrapper(state),
        hasCanvas(state),
        hasPlotter(state),
    )
}
