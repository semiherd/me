let opentypePromise;

/**
 * Lazy-load opentype.js exactly once
 */
async function loadOpenType() {
  if (!opentypePromise) {
    opentypePromise = import(`../../vendor/opentype.module.js`).then(m => m.default ?? m);
  }
  return opentypePromise;
}

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
  if (!element) return;

  element.innerHTML = "";
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.position = "relative";
  element.style.overflow = "hidden";

  const opentype = await loadOpenType();
  const font = await opentype.load(fontUrl);

  const containerWidth = element.clientWidth || 800;
  const containerHeight = element.clientHeight || 200;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${containerWidth} ${containerHeight}`);
  svg.style.width = "100%";
  svg.style.height = "100%";

  const g = document.createElementNS(svgNS, "g");
  svg.appendChild(g);

  const glyphs = font.stringToGlyphs(text);
  let x = 0;
  const y = fontSize;
  const paths = [];

  for (const glyph of glyphs) {
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

    const advance =
      glyph.advanceWidth
        ? glyph.advanceWidth * (fontSize / font.unitsPerEm)
        : fontSize * 0.6;

    x += advance + letterSpacing;
  }

  let totalDelay = 0;

  for (const p of paths) {
    const len = p.getTotalLength();
    const dur = Math.max(0.2, (len * speed) / 100);

    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    p.style.transition = `stroke-dashoffset ${dur}s ease-in-out ${totalDelay}s`;

    totalDelay += dur * 0.9;
  }

  requestAnimationFrame(() => {
    for (const p of paths) {
      p.style.strokeDashoffset = 0;
    }
  });

  setTimeout(() => {
    for (const p of paths) {
      p.setAttribute("fill", fillColor);
      p.style.transition = "fill 0.6s ease";
    }

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
        totalDelay * 1000
      );
    }
  }, (totalDelay + 0.5) * 1000);

  element.appendChild(svg);
}
