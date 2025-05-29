const containerPortfolio= document.querySelector('section.portfolio');
containerPortfolio.style= "display: grid;";

function createOptions(data){
    const optionsList= createDOMElement({ type: 'div', attributes:{ class: 'tabs'}});
    const optionElm= (option) => createDOMElement({type: 'li', attributes: { class: 'tab active'},text: option });
    data.forEach( t => {
        const newOption= optionElm(t.label);
        optionsList.append(newOption);
    });
    return { techOptions: optionsList };
}
function createTechFilterBar(techList){
    const barContainer= createDOMElement({
        type: 'div',
        attributes: { id: 'portfolio-scrollbar', class: "scrollbar" }
    });
    const { lefticon, righticon } = createArrows();
    const { techOptions } = createOptions(techList);
    barContainer.append(lefticon);  
    barContainer.append(techOptions);
    barContainer.append(righticon);
    return barContainer;
}

function renderFilterScrollbar(){
    const filterBar= createTechFilterBar(techIcons);
    filterByTechHandler(filterBar);
    return filterBar
}
function isClassOn(elm,className){
    return elm.classList.contains(className)
}
function filterProjects(data,activeTechList){
    let visibleProjects=[]
    data.forEach((item,_) => {
        item.technology.forEach( t => {
            if(activeTechList.indexOf(t)>-1){
                if(visibleProjects.map(i => i.id).indexOf(item.id)<0){
                    visibleProjects.push(item);
                }
            }
        })
    });
    return visibleProjects;
}
function renderTitleWrapper(){
    const elm= createDOMElement({ type: 'div',attributes:{ id: 'portfolio-projects_title_wrapper', class: 'project portfolio-projects_title_wrapper'}});
    return elm
}
function renderTitle(visibleProjects){
    const titleText= visibleProjects.length ?'projects' :'project';
     const title= createDOMElement({
        type: 'h1',
        attributes: {
            id: 'portfolio-projects_title',
            class: 'projects-title'
        },
        text: `${visibleProjects.length} ${titleText}`
    });
    return title;
}
function getVisibleItems(){
    const techList= getAllTech();
    let activeTech=[];
    techList.forEach(elm => {
        const isActive= isClassOn(elm,'active');
        if(isActive && activeTech.indexOf(elm)<0)
            activeTech.push(elm.innerText)
    });
    let visibleProjects= filterProjects(projects,activeTech);
    return visibleProjects;
}
function renderProjectList(parent,list){
    list.forEach( p => {
        const projectElm= renderProjectBox(p)
        parent.append(projectElm);
    })
}
function updateProjectElms({parent,data}){
    const isOn= parent.querySelectorAll('.project:not(#portfolio-projects_title_wrapper)');
    if(isOn.length)
        isOn.forEach(i => i.remove());
    renderProjectList(parent,data);
}
function renderPortfolioProjects(){
    const projectsOn= getVisibleItems();
    let containerProjects= document.querySelector('#portfolio-projects');
    
    if(!isElmIdOn(containerPortfolio,'portfolio-projects')){
         containerProjects= createDOMElement({ type: 'div',
            attributes:{
                id: 'portfolio-projects',
                style: `--projects:${projectsOn.length}`
            }
        });
    }else{
        const projectLen= getComputedStyle(containerProjects).getPropertyValue('--projects') === projectsOn.length;
        if(!projectLen){
            containerProjects.style.setProperty("--projects", projectsOn.length);
        }
       
    }

    
    
    if(!isElmIdOn(containerProjects,'portfolio-projects_title_wrapper')){
        // projects-title-box
        renderElm({ parent: containerProjects,id: 'portfolio-projects_title_wrapper', renderFn: renderTitleWrapper })
        const newTitleWrapper= containerProjects.querySelector('#portfolio-projects_title_wrapper');
        //title-h1
        renderElm({ parent: newTitleWrapper,id: 'portfolio-projects_title', renderFn: () => renderTitle(projectsOn) });
        // project-boxes
        updateProjectElms({parent: containerProjects,data:projectsOn});
        
    }else {
        const titleWrapper= containerProjects.querySelector('#portfolio-projects_title_wrapper');     
        if(isElmIdOn(titleWrapper,'portfolio-projects_title')){
            const titleText= titleWrapper.querySelector('#portfolio-projects_title');
            const [count,...rest]= titleText.innerText.split(' ');
            if( count !== projectsOn.length){
                titleText.innerText= `${projectsOn.length} ${rest.join(' ')}`
            }
        }else{
            renderElm({ parent: titleWrapper,id: 'portfolio-projects_title', renderFn: renderTitle(projectsOn) });
        }
        updateProjectElms({parent: containerProjects,data:projectsOn});
        
    }

    return containerProjects;
}

function renderElm({parent,id,renderFn}){
    if(!isElmIdOn(parent,id)){
        const elm= renderFn()
        parent.append(elm);
    }
}
function getAllTech(){
    return document.querySelectorAll('#portfolio-scrollbar > .tabs li.tab');
}

function listenTechFilter(data){
    getAllTech().forEach( tech => {
        tech.addEventListener('click', () => {
            renderPortfolioProjects()
        })
    })
}

/* render portfolio page*/
    function renderPortfolio(){
        // portfolio-scrollbar
        renderElm({ parent:containerPortfolio, id: 'portfolio-scrollbar', renderFn: renderFilterScrollbar  })
        // portfolio-projects
        const all= projects.map(i => i.id);
        renderElm({ parent:containerPortfolio, id: 'portfolio-projects', renderFn: () => renderPortfolioProjects(all)  })
        listenTechFilter();
    }

