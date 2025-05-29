function createNavButtons(parent){
    const container= createDOMElement({
        type: 'div',
        attributes: {
            class: 'home-nav_container'
        }
    })
    createNavButton({ renderFn: renderAbout, parent:container, id: 'nav-about', label: 'about me', selector: '.about'});
    createNavButton({ renderFn: renderPortfolio, parent:container, id: 'nav-portfolio', label: 'see projects', selector: '.portfolio'});
    parent.append(container);
}