import { createDOMElement, loadFeatureCSS } from "../util/index.js";
import { SocialIcons } from "../social-icons.js";

export function createFooter(containerId) {
    const container = document.getElementById(containerId);
    const footer = document.createElement("footer");
    footer.className = "footer";
    loadFeatureCSS("../../css/page/footer.css");

    const logo= createDOMElement({type: "div", attributes: { class: "footer-logo"}})
    const quickLinks= createDOMElement({type: "div", attributes: { class: "quick-links"}})
    const socialLinks= createDOMElement({type: "div", attributes: { class: "social-icons"}})

    logo.innerHTML= `
        <span class="logo-symbol"></span>
        <span class="logo-text">Semih Erdoğan</span>
    `
    quickLinks.innerHTML=   `
        <a class="quick-link" href="/home.html">Home</a>

    `
    
    socialLinks.innerHTML=  `    
        <a class="social-icon" href="https://www.github.com/semiherd" aria-label="GitHub" title="GitHub">
            ${SocialIcons.github.svg}
        </a>
        <a class="social-icon" href="https://www.linkedin.com/in/semih-erdogan" aria-label="LinkedIn" title="LinkedIn">
            ${SocialIcons.linkedin.svg}
        </a>
        <a class="social-icon" href="https://www.xing.com/profile/Semih_Erdogan5/web_profiles" aria-label="Xing" title="Xing">
            ${SocialIcons.xing.svg}
        </a>
    `
    const bottom= createDOMElement({type: "div", attributes: { class: "footer-bottom"}})
    bottom.innerHTML=`
        <p>© ${new Date().getFullYear()} All rights reserved.</p>
    `;
    const inner= createDOMElement({ type: "div", attributes: { class: "footer-inner"}});
    inner.append(logo,quickLinks,socialLinks)

    footer.append(inner,bottom);
   
    container.appendChild(footer);
}
