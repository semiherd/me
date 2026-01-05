export const css= `
    .visible {
        visibility: visible;
        pointer-events: auto;
        transition: all .5s ease;
    }
    .hidden-scroll {
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-50%);
        transition: opacity 0.5s ease, transform 0.4s ease;
    }
`