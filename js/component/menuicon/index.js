import { createDOMElement } from "../../util/index.js";

export const MenuIcon= {
    element: null,
    wrapper: null,
    options: { position: 'center', className: 'menu-icon' },
    isOpen: false,
    toggle(){ 
        this._applyState(Boolean(!this.isOpen)); 
    }, 
    _createWrapper(){
        this.wrapper= createDOMElement({ type: "div", attributes: { class: `${this.options.className} ${this.options.className}_${this.options.position}` }})
    },
    _createSvg(viewBox = "0 0 24 24", width = "28", height = "28"){
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", viewBox);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        return svg;
    },
    _createDefaultIcon(){
        const svg = this._createSvg();
        svg.innerHTML = this.isOpen
            ? `<path d="M6 18L18 6M6 6l12 12" stroke="#00ffff" stroke-width="2" stroke-linecap="round"/>`
            : `<path d="M3 12h18M3 6h18M3 18h18" stroke="#00ffff" stroke-width="2" stroke-linecap="round"/>`;
        return svg;
    },
    _createIcon(){
        const elm= this._createDefaultIcon();
        this.element= elm;
        return elm; 
    },
    closeMenu(itemsContainer){
        if(itemsContainer.classList.contains(this.options.itemsContainerClassName))
            itemsContainer.classList.remove(this.options.itemsContainerClassName);
        this._applyState(Boolean(false)) 
    },
    _applyState(state){
        this.isOpen = state;
        const newIcon = this._createIcon();
        if(!newIcon.classList.contains('pulse'))
            this.wrapper.replaceChildren(newIcon);
        if (typeof this.options.onToggle === "function") this.options.onToggle(this.isOpen, newIcon);
    },
    on(){
        this._boundToggle= this.toggle.bind(this);
        this.wrapper?.addEventListener("click", this._boundToggle)
    },
    off(){
        if(this._boundToggle)   
            this.wrapper?.removeEventListener("click", this._boundToggle)
    },
    setState(state){
        this._applyState(state);
    },
    render({ itemsContainerClassName, position = "right", iconRenderer = null, className = "menu-icon",animated = true,onToggle= () => {}}){
        this.options= { ...this.options, position, className, animated, onToggle, itemsContainerClassName };
        this._createWrapper();
        this._createIcon()
        this.element && this.wrapper? this.wrapper.appendChild(this.element): {};
        if(this.wrapper) this.on();
    },
}
