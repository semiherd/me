const hasPlotter= (self) => {
    return{       
        plotter({ canvas,ctx,cancelOnUp,weight,color,cap,join,points}){          
            const draw={};
            let isDrawing= false,lastX=0,lastY=0,hue=0;
                   
            

            draw.onMove= function(e){ 
                if(!isDrawing) return;
                ctx.strokeStyle= `hsl(${color==='random' ? hue : color}, 100%, 50%)`;
                ctx.lineWidth= weight || 1;
                ctx.lineJoin= cap || 'round';
                ctx.lineCap= join || "round";
                
                ctx.beginPath();
                ctx.moveTo(lastX,lastY);
                ctx.lineTo(e.offsetX,e.offsetY);
                ctx.stroke();
               
                if(points){
                    const coord= { x:e.offsetX, y:e.offsetY };
                    if(!draw.path){
                        draw.path=[];
                    }
                    draw.path.push(coord)
                }
                hue++;             
                if(hue>=360){
                    hue=0;
                };
                [lastX,lastY]= [e.offsetX,e.offsetY];
                
            }
            draw.clearCanvas= function (){
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
            draw.onMouseDown= function(e){
                isDrawing= true;
                [lastX, lastY]= [e.offsetX,e.offsetY];
            }
            draw.onMouseUp= function(){
                isDrawing= false;  
                if(cancelOnUp){
                    draw.clearCanvas();
                } 
            }
            draw.onMouseOut= function(){
                isDrawing= false;
            }
            canvas.addEventListener("mousedown",draw.onMouseDown);
            canvas.addEventListener("mouseup",draw.onMouseUp);
            canvas.addEventListener("mousemove",draw.onMove);
            canvas.addEventListener("mouseout",draw.onMouseOut);
            
            return draw;
        }
    }
}
// const draw= ({ canvas,ctx,cancelOnUp,weight,color,cap,join,points}) => {
//     const draw={};
//     let isDrawing= false,lastX=0,lastY=0;

//     ctx.strokeStyle= color || '#000000';
//     ctx.lineWidth= weight || 10;
//     ctx.lineJoin= cap || 'round';
//     ctx.lineCap= join || "round";

//     draw.onMove= function(e){ 
//         if(!isDrawing) return;
//         ctx.beginPath();
//         ctx.moveTo(lastX,lastY);
//         ctx.lineTo(e.offsetX,e.offsetY);
//         ctx.stroke();
//         if(points){
//             const coord= { x: e.offsetX, y: e.offsetY };
//             if(!draw.path){
//                 draw.path=[];
//             }
//             this.path.push(coord);
//         }
//         [lastX,lastY]= [e.offsetX,e.offsetY];
//     }
//     draw.clearCanvas= function (){
//         ctx.clearRect(0,0,canvas.width,canvas.height);
//     }
//     draw.onMouseDown= function(e){
//         isDrawing= true;
//         [lastX, lastY]= [e.offsetX,e.offsetY];
//     }
//     draw.onMouseUp= function(){
//         isDrawing= false;  
//         if(cancelOnUp){
//             this.clearCanvas();
//         } 
//     }
//     draw.onMouseOut= function(){
//         isDrawing= false;
//     }
//     canvas.addEventListener("mousedown",draw.onMouseDown);
//     canvas.addEventListener("mouseup",draw.onMouseUp);
//     canvas.addEventListener("mousemove",draw.onMove);
//     canvas.addEventListener("mouseout",draw.onMouseOut);
    
//     return draw;
// };