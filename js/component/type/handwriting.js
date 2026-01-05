import opentype from `${import.meta.env.BASEURL}vendor/opentype.module.js`;

export async function drawHandwriting(
  element,
  text,
  {
    fontUrl,
    fontSize = 120,
    stroke = "#00bcd4",
    strokeWidth = 2.4,
    fillColor = "#03312E",
    speed = 0.8,
    letterSpacing = 2,
    loop = false,
  } = {}
) {
    const setMount= () => {
        
        if (!element) return null
        element.innerHTML = "";
        element.style.display = "flex";
        element.style.justifyContent = "center";
        element.style.alignItems = "center";
        element.style.overflow = "hidden";
        element.style.position = "relative";
        return element
    }
    // SVG setup
    const createSvg= () => {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block"; 
        svg.style.overflow = "visible";
        svg.style.position = "absolute";
        svg.style.top = "50%";
        svg.style.left = "50%";
        svg.style.transform = "translate(-45%, -50%)"; 
        const g = document.createElementNS(svgNS, "g");
        svg.appendChild(g);
        return { g, svg, svgNS }
    }
    const generateGlyphPaths= () => {
        const glyphs = font.stringToGlyphs(text);
        let x = 0;
        const y = fontSize;
        const paths = [];
        return { glyphs, paths,x,y };
    }
    const setPathElms= ({glyphs,paths,svgNS,x,y}) => {
        for (let i = 0; i < glyphs.length; i++) {
            const glyph = glyphs[i];
            const path = glyph.getPath(x, y, fontSize);
            const d = path.toPathData(2);
            const pathEl = document.createElementNS(svgNS, "path");
            pathEl.setAttribute("d", d);
            pathEl.setAttribute("fill", "none");
            pathEl.setAttribute("stroke", stroke);
            pathEl.setAttribute("stroke-width", strokeWidth);
            pathEl.setAttribute("stroke-linecap", "round");
            pathEl.setAttribute("stroke-linejoin", "round");
            g.appendChild(pathEl);
            paths.push(pathEl);

            const adv = glyph.advanceWidth
                ? glyph.advanceWidth * (fontSize / font.unitsPerEm)
                : fontSize * 0.6;
            x += adv + letterSpacing;
        }
        return { paths, glyphs, x }
    }
    const generatePath= (points) => {
        points.forEach((p) => {
            const len = p.getTotalLength();
            const dur = Math.max(0.2, len * speed / 100);
            p.style.strokeDasharray = len;
            p.style.strokeDashoffset = len;
            p.style.transition = `stroke-dashoffset ${dur}s ease-in-out ${totalDelay}s`;
            totalDelay += dur * 0.9;
        });
        requestAnimationFrame(() => {
            points.forEach((p) => (p.style.strokeDashoffset = 0));
        });
        return totalDelay
    }
    const fillLetters= (delay,points) => {
        const totalTime = delay + 0.5;
        setTimeout(() => {
            points.forEach((p) => {
                p.setAttribute("fill", fillColor);
                p.style.transition = "fill 0.6s ease";
            });
            if (loop) {
                setTimeout(
                    () =>
                    drawHandwriting(element, text, {
                        fontUrl,
                        fontSize,
                        stroke,
                        strokeWidth,
                        fillColor,
                        speed,
                        letterSpacing,
                        loop,
                    }),
                    totalTime * 1000
                );
            }
        }, totalTime * 1000);
    }
    
    const mountComponent= setMount()
    if(!mountComponent) return
   
    // Make sure container has non-zero size
    const containerWidth = mountComponent.clientWidth || 800;
    const containerHeight = mountComponent.clientHeight || 200;

    const font = await opentype.load(fontUrl); 
    const { g,svg,svgNS }= createSvg();
    const glyphPaths= generateGlyphPaths();
    setPathElms({...glyphPaths,svgNS });
    
   
    svg.setAttribute("viewBox", `0 0 ${containerWidth} ${containerHeight}`);
    let totalDelay = 0;
    totalDelay += generatePath(glyphPaths.paths);
    fillLetters(totalDelay,glyphPaths.paths)
    mountComponent.appendChild(svg);

    // Handle resize
    window.addEventListener(
        "resize",
        () => {
            drawHandwriting(element, text, {
                fontUrl,
                fontSize,
                stroke,
                strokeWidth,
                fillColor,
                speed,
                letterSpacing,
                loop,
            });
        },
        { once: true }
    );
}
