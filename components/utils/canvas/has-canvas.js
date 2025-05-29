const hasCanvas= (self) => {
    return{       
        createCanvas({id,width,height}){
            const canvas= createDOMElement({ type:'canvas', attributes: { id, width,height } });
            canvas.id= id;
            const ctx=  canvas.getContext("2d"); 
            self.canvas.push({canvas,ctx});      
            return { canvas ,ctx }
        }
    }
}
