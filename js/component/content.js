import { highlightedProjects } from "../highlightedprojects.js"
import { createDOMElement } from "../util/createDOMElm.js";
import { createSlidingItems } from "./sliding/v1/index.js";
import { drawHandwriting } from "../component/type/handwriting.js";
import { images, urls } from "../urls.js";


export function createContent(containerId) {
    const container = document.getElementById(containerId);
    const contentContainer= createDOMElement({ type: 'div', attributes: { class: 'content-section' }});

    const slidingSection =createDOMElement({type: 'section',attributes:{ class: 'cards-section' }});
    const profileSection=  createDOMElement({type: 'section',attributes:{ class: 'profile-section' }});
    createMainContent(profileSection);
    createSlidingItems(slidingSection,highlightedProjects,'horizontal');

    contentContainer.append(profileSection,slidingSection)
    container.append(contentContainer);
}

async function createMainContent(container){
    
    container.innerHTML = `
        <div class="home-image">
                <img src="${images.semihPhoto}" alt="Semih Erdoğan" />
            </div>
        <div class="home-text">
            <div id="handwrite-mount" class="home-name handwrite-container"></div>
            <p class="home-title">
                Building digital experiences that connect data, design, and innovation and create real values with a product focused mentality.
            </p>
            <div class="home-badges">
                <span class="badge">Lead Frontend Engineer</span>
                <span class="badge">Senior Fullstack Web Developer</span>
                <span class="badge">Digitalization Expert</span>
                <span class="badge">Cloud Architect</span>
                <span class="badge">Industrial Engineer</span>
            </div>
            <p class="home-description">
                I design, develop, and scale modern <strong>Web Apps and SaaS platforms with DevOps Infrastructure</strong> that blend intuitive UX,
                efficient architecture, and cloud-native performance.
                From crafting interactive UIs in <strong>Javascript, Typescript, React and Angular</strong> with a modern UX. 
                I develop backend architecture with <strong>Php, Node.js and Python</strong> with a cloud infrastructure on <strong>AWS, Azure and GCP</strong>
                I turn complex ideas into seamless digital tools and products in various areas including Ecommerce, Manufacturing, Finance, Gaming and GeoData.
            </p>
        </div>
    `;
       
    const imageEl = container.querySelector(".home-image img");
    const textEl = container.querySelector(".home-text");
    const imageContainer = container.querySelector(".home-image");

    // light overlay element as a glowing shadow
    const glowLayer= document.createElement('div');
    glowLayer.className= 'light-glow';

    // Parallax state
    let currentScroll = 0;
    let targetScroll = 0;
    let lastScrollY = 0;
    let scrollVelocity = 0;
    let offsetY = 0;

   
    const imgSpeed = 0.25;
    const txtSpeed = -0.15;

    // --- mouse parallax variables ---
    let tiltTargetX = 0, tiltTargetY = 0;
    let tiltX = 0, tiltY = 0;
    let velocityX = 0, velocityY = 0;
    const spring = 0.08;    // how fast it moves toward target
    const damping = 0.75;   // how much it eases back when you stop moving

    // track cursor position relative to center column
    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // range -0.5 → 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tiltTargetX = x * 10;  // horizontal sensitivity
        tiltTargetY = y * 6;   // vertical sensitivity
    });

    window.addEventListener("mouseleave", () => {
        // reset on leave
        tiltTargetX = 0;
        tiltTargetY = 0;
    });

     // scroll listener (for Y translation)
    window.addEventListener("scroll", () => {
        targetScroll = window.scrollY;
        const delta = targetScroll - lastScrollY;
        // how strongly it reacts
        scrollVelocity = delta * 0.25; 
        lastScrollY = targetScroll;
    });

    function animateCenterParallax() {
        currentScroll += (targetScroll - currentScroll) * 0.08;

        // --- spring-damped mouse motion ---
        const dx = tiltTargetX - tiltX;
        const dy = tiltTargetY - tiltY;
        velocityX = velocityX * damping + dx * spring;
        velocityY = velocityY * damping + dy * spring;
        tiltX += velocityX;
        tiltY += velocityY;

        // parallax offset reacts to scroll direction
        offsetY += scrollVelocity;
        scrollVelocity *= 0.9; // friction to slow down
        offsetY *=0.9;
        offsetY = Math.max(Math.min(offsetY, 120), -120);;        // pull back toward 0 (auto return)

        // --- detect scroll direction (positive = down) ---
        const direction = targetScroll - lastScrollY;
        lastScrollY = targetScroll;   

        //  scale factor based on direction
        // scroll down → shrink slightly (depth out), scroll up → restore
        let dynamicScale =
            direction > 0
                ? 1 - Math.min(Math.abs(direction) / 300, 0.1)  //  zoom out
                : 1 + Math.min(Math.abs(direction) / 600, 0.1); //  zoom in
        const baseScale = 1 + Math.min(Math.abs(currentScroll) / 1000, 0.05);
        const finalScale = (baseScale * dynamicScale).toFixed(3);

        // image translate + scale + tilt
        const imgTranslate = currentScroll * imgSpeed + offsetY * 1.2;
        imageEl.style.transform = `
            translateY(${-2*imgTranslate}px)
            translateX(${tiltX * 0.6}px)
            rotateY(${tiltX * 0.5}deg)
            rotateX(${-tiltY * 0.5}deg)
            scale(${finalScale})
        `;

        // text translate + opacity fade
        const txtTranslate = currentScroll * txtSpeed + offsetY * -0.4;
        const opacity = Math.max(1 - Math.abs(currentScroll) / 800, 0.2);
        textEl.style.transform = `
            translateY(${txtTranslate}px)
            translateX(${tiltX * -0.4}px)
            rotateY(${tiltX * -0.5}deg)
            rotateX(${tiltY * 0.5}deg)
        `;
        textEl.style.opacity = opacity.toFixed(2);

        // CSS vars for the glow pseudo-element
        const glowX = (50 + tiltX * 3).toFixed(1);
        const glowY = (50 - tiltY * 3).toFixed(1);
        const glowA = (0.3 + Math.min(Math.abs(tiltX + tiltY) / 30, 0.4)).toFixed(2);
        imageContainer.style.setProperty("--glow-x", `${glowX}%`);
        imageContainer.style.setProperty("--glow-y", `${glowY}%`);
        imageContainer.style.setProperty("--glow-a", glowA);
        
        requestAnimationFrame(animateCenterParallax);
    }

    window.addEventListener("scroll", () => {
        targetScroll = window.scrollY;
    });
    const options={
        fontUrl: urls.fonts.ItallianoRegular,
        fontSize: 120,
        stroke: "#0B3C5D",
        // stroke: "#242f31ff",
        strokeWidth: 1.5,
        fillColor: "#03312E",
        speed: 0.05,
        letterSpacing: 2,
        loop: false, 
    }
    const handwriteMount = container.querySelector("#handwrite-mount");
    await drawHandwriting(handwriteMount, "Semih Erdoğan", options);

    animateCenterParallax();

    return container
}