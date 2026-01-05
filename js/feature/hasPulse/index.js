// import { useInjectCSS } from '../useInjectCss/index.js'

export function createPulse({ target, borderRadius= 10, color= "#00ffff", scale= 1.1 } = {}) {
 
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // useInjectCSS(
  //   `.pulse{
  //       transition: transform 0.3s ease, box-shadow 0.3s ease;
  //       border-radius: ${borderRadius}px;
  //       padding: max(.5%,.5rem);
  //     }
  //     .pulse:hover {
  //       transform: scale(${scale});
  //       background:${color};
  //       box-shadow: 0 0 10px ${color};
  //     }`,
  //   '',{ scope: target}
  // );
  if(target){
    target.classList.add("pulse");
  }
  function cb(){
    target.classList.remove("pulse")
  }
  return (target) => {
    target.addEventListener("animationend",cb,{ once: true });
    return () => target.classList.remove("pulse");
  };
  
}
