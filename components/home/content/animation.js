const randomSpanIndex= (len) =>  Math.floor(Math.random()*len);
function ignoreBlank(data,initial) {
    if(data[initial] !== ' ') {
       return initial
    }
    ignoreBlank(data,randomSpanIndex(data.length));
}
function getRandomColor(){
    return Math.floor(Math.random()*255)
}
function handleContentAnimation(){
    const interval= letterAnimation.interval;
    setInterval(() => {
        const spans = document.querySelectorAll('.home-left_section-content.active .home-content-title span.letter');
        const spanIndex= ignoreBlank(spans,randomSpanIndex(spans.length))
        spans.forEach((spanitem, index) => {
            spanitem.addEventListener('click', (e) => {
                e.target.classList.add('animated-letter');
            });
            spanitem.addEventListener('animationend', (e) => {
                e.target.classList.remove('animated-letter');
            });
        });
  
        const randomAnimationIndex= Math.floor(Math.random()*letterAnimationName.length);
        if(letterAnimationName[randomAnimationIndex]==='letter-bg'){
            const randomBgColor= {
                r: getRandomColor(),
                g: getRandomColor(),
                b: getRandomColor()
            }
            spans[spanIndex].style.setProperty("--letter-bg", `rgb(${randomBgColor.r},${randomBgColor.g},${randomBgColor.b})`); 
        }
        spans[spanIndex].style.setProperty("--animation-type", letterAnimationName[randomAnimationIndex]);
        spans[spanIndex].style.setProperty("--animation-duration", `${letterAnimation.duration}ms`);
        spans[spanIndex].classList.add(`animated-letter`);  
    },interval)
}

function handleHomeTab(e){
    const { id }= e.target.dataset;
    const activeSection= homeSections.filter((item) => item.id===id);
    if(activeSection.length){
        const homeLeftContent= containerHome.querySelectorAll('.home-left_section-content');      
        const homeContentIcons= containerHome.querySelectorAll('.home-left_section-icons span');      
        Object.keys(homeContentIcons).map( i => toggleClassName(id,homeContentIcons[i],'section-active'));
        Object.keys(homeLeftContent).map( i => toggleClassName(id,homeLeftContent[i],'active'));
    }
    handleContentAnimation()
}

const homeLeftSections= containerHome.querySelectorAll('.home-left_section-icons span');
homeLeftSections.forEach((i) => i.addEventListener("click", handleHomeTab));
handleContentAnimation()