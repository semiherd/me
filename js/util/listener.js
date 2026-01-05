export function listenHover({elm,cbover,cbout}){
    elm.addEventListener('mouseover',cbover);
    elm.addEventListener('mouseout',cbout);
}
export function listenClick(elm,cb){
    elm.addEventListener('click',cb);
}
export function listenResize(cb){
    window.addEventListener('resize',cb)
};