import { createCard } from "./card.js";
import { createDOMElement } from "../../../util/index.js";

export function createSlidingItems(container,data,direction="horizontal") {
    if (!container) {
        console.error("Projects container not found:", container);
        return;
    }
    
    const section = createDOMElement({ type: 'div', attributes: { class: 'slider-section'}});
    const wrapper = createDOMElement({ type: 'div', attributes: { class: 'slider-wrapper'}});
    const track = createDOMElement({ type: 'div', attributes: { class: `slider-track ${direction}`}});
   
    data.forEach((p) => track.appendChild(createCard(p)));
    data.forEach((p) => {
        const dup = createCard(p);
        dup.classList.add("duplicate");
        track.appendChild(dup);
    });

    wrapper.appendChild(track);
    section.appendChild(wrapper);
    container.appendChild(section);

    // === Continuous scroll ===
    let paused = false;
    // === Pause entire slider when hovering any card ===
    section.addEventListener("mouseenter", (e) => {
        console.log('entered in section')
            paused = true;
        if (e.target.closest(".card-item")) {
            console.log(e.target.closest(".card-item"))
        }
    });

    section.addEventListener("mouseleave", (e) => {
            paused = false;
        if (e.target.closest(".card-item")) {
        }
    });

    let pos = 0;
    const speed = 2;

    function animate() {
        if (!paused) {
            pos -= speed;
            const totalDirLen = direction==='horizontal' 
                ? track.scrollWidth / 2
                : direction==='vertical'
                    ? track.scrollHeight / 2
                    :0;
            const moveTo= direction==='horizontal'
                ? `translateX`
                : direction==='vertical'
                    ? `translateY`
                    :``;
            if (Math.abs(pos) >= totalDirLen) pos = 0;
            track.style.transform = `${moveTo}(${pos}px)`;
            
        }
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(() => {
        // Add random animation delays for reflection effect
        document.querySelectorAll(".card-screen").forEach((card) => {
            const randomDelay = (Math.random() * 8).toFixed(2);
            card.style.animationDelay = `${randomDelay}s`;
        });
        // === Random glow animation delay for each card ===
        document.querySelectorAll(".scene-item").forEach((card) => {
            const randomDelay = (Math.random() * 8).toFixed(2); 
            card.style.setProperty("--halo-delay", `${randomDelay}s`);
        });
    });
    
    animate();
}
