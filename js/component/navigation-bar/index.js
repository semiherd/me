import { isMobile, createDOMElement,  } from "../../util/index.js";
import { onScrollStyle } from "../../feature/onScrollStyle/index.js";
import { onScrollRemove } from "../../feature/onScrollRemove/index.js";
import { useClickOutside } from "../../feature/useClickOut/index.js";
import { MenuIcon } from "../menuicon/index.js";


const createNavItems= ({ backgroundColor }) => createDOMElement({ type: "div", attributes: { class: "navigation-items", style: `bg-color: ${backgroundColor}` } });

export function createNavigationBar(containerId,items,{
    component,
    wrapperFactory,
    className = "navbar",
    enableScrollHide = true,
    enableScrollStyling = true,
    onItemRender,
    onMenuToggle,
    backgroundColor } = {}
) {
    // let menuOverlay;
    if (typeof component !== "function") {
        throw new Error("createNavigationBar: 'component' must be a function component renderer.");
    }
    
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    // === NAVBAR ROOT ===
    const navbar = createDOMElement({ type: "nav", attributes: { 
        class: `${className} visible`, 
        style:`--background-color: ${backgroundColor}` 
    }});

    // === WRAPPER (injectable factory or default) ===
    const navItemsWrapper = typeof wrapperFactory === "function" ? wrapperFactory() : createNavItems({ backgroundColor });

    // === BUILD NAV ITEMS ===
    const itemInstances = items.map((data,index) => {
        const instance = component({item:data,level:0,index});
        const element = instance.element || instance;
        element.style.setProperty("--index-delay", `${index*.2}s`);
        
        navItemsWrapper.appendChild(element);
        if (onItemRender) onItemRender(data, element, instance);
        
        return instance;
    });
    navbar.appendChild(navItemsWrapper);
    container.appendChild(navbar);

    function onToggle(state,elm) {
        toggleNavItems(state)
        // ===USER CALLBACK===
        if (typeof onMenuToggle === "function") onMenuToggle(open, navItemsWrapper);
    }

    const itemsContainerToggleClass= "navigation-items_open";

    // ===CREATE MENU ITEM FOR MOBILE-VIEW===
    const menuicon= MenuIcon;
    menuicon.render({
        position: "right",
        className: `menu-icon`,
        itemsContainerClassName: itemsContainerToggleClass,
        animated: true,
        onToggle,
    })
    navbar.appendChild(menuicon.wrapper);
    handleMenuIconVisibility(menuicon.wrapper);
   
    useClickOutside(
        () =>  document.querySelector("nav"),
        () =>  menuicon.closeMenu(navItemsWrapper),
        { once: false }
    );

    // === Lock/unlock scroll on mobile ===
    if (isMobile()) {
        document.body.classList.toggle("menu-locked", open);
        // document.body.style.overflow = menuOverlay.menuicon?.getButton()?.isOpen() ? "hidden" : "";
    }

    // === SCROLL STYLE BEHAVIOR ===
    if (enableScrollStyling) onScrollStyle({ component: navbar, threshold: 15, classNames: [] });

    if (enableScrollHide) {
        onScrollRemove({
        component: navbar,
        threshold: 10,
        showAtTopPercent: 5,
        minDelta: 2,
        classNames: [],
        });  
    }

    function handleMenuIconVisibility(elm){
        const menuIconClasses= elm.classList;
        if (isMobile()) {
            menuIconClasses.remove("menu-icon_hidden");
        } else {
            menuIconClasses.add("menu-icon_hidden");
        }

    }
    
    // === RESIZE BEHAVIOR ===
    function handleResize() { 
        handleMenuIconVisibility(menuicon.wrapper);

        itemInstances.forEach((instance) => {
            if (instance.rebind) instance.rebind();
        });
    }
    
    function toggleNavItems(state){
        navItemsWrapper.classList.toggle("navigation-items_open", state);
    }

    window.addEventListener("resize", handleResize);

    return {
        element: navbar,
        wrapper: navItemsWrapper,
        items: itemInstances,
        refresh: handleResize,
        openMenu: () => toggleNavItems(true),
        closeMenu: () => toggleNavItems(false),
        toggleMenu: () => {
            const open = navItemsWrapper.classList.toggle(itemsContainerToggleClass);
            if (onMenuToggle) onMenuToggle(open, navItemsWrapper);
        },
    };
}
