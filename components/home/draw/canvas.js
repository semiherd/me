// function createCanvas ({ id, width, height}){
//     const canvas= createDOMElement({ type:'canvas', attributes: { id } });
//     canvas.id= id;
//     const ctx=  canvas.getContext("2d");
//     canvas.width= width;
//     canvas.height= height; 

//     return { canvas ,ctx }
// }
function getCanvas({id,container}){
    let parent= document.querySelector('body');
    if(container){
        parent= container;
    }
    const canvas= parent.querySelector(`canvas#${id}`);
    const ctx=  canvas.getContext("2d"); 
    return { canvas, ctx }
}
function updateCanvas({ id,attributes }){
    const elm= getCanvas(id);
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (key.indexOf("on") === 0) {
                elm.context.addEventListener(key.substring(2), value);
            } else {
                elm.context.setAttribute(key, value);
            }
        });
    };
    
}

const hasImage= (self) => ({
    createImage({ file, width, height}){
        return ImageItem(self);
    }
})
const onCanvas= (self) => ({
    onCanvas({width,height}){
        createCanvas({ id: self.id,width,height})
    },
    updateCanvas({attributes}){
        const cvs= document.querySelector(`canvas#${id}`);
        const ctx= cvs.getContext('2d');
    }
})
function drawImage ({ canvas,ctx }){
    const maxWidth= canvas.clientWidth , maxHeight= canvas.clientHeight;
    const imgSize = calculateAspectRatioFit(img.width,img.height,maxWidth,maxHeight);
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    ctx.drawImage( img, 50, 0, imgSize.width, imgSize.height);
    return { canvas, ctx }
}
function createImgCanvas({ id, attributes, file, parentDivFn }){
    let img= new Image();
    img.src= file;
    img.onload= () => {
        if(this.width + this.height == 0) {
            this.onerror();
            return;
        }
        parentDivFn(id)
        const imageParentElm= parentDiv? parentDiv : createDOMElement({
            type:'div',
            attributes:{ id, class: attributes.class }, 
            text: null
        }) 
        
        const { canvas, ctx }= createCanvas({ 
            id: `canvas-${id}`, 
            width: attributes.width, 
            height: attributes.height 
        })
        //canvas.appendChild(imageItem);
        imageParentElm.appendChild(canvas);
        parentDiv.parentNode.insertBefore(imageParentElm, parentDiv.nextSibling);          
        return { canvas, ctx }
    }
    img.onerror= () => {
        return { id,error: 'image-loading-error'}
    }
}
function Canvas({id}){
    let self={
        id
    }
    return Object.assign(
        self,
        getCanvas(self),
        updateCanvas(self),
        createCanvas(self)
    )
}
function ImageCanvas({id}){
    let self={
        id
    }
    return Object.assign(
        self,
        getCanvas(self),
        createImgCanvas(self)
    )
}





    

 