export const css = `
    .pulse {
        --color: var(--color,#00ffff)
        position: absolute;
        border-radius: 10px;
        pointer-events: none;
        opacity: 0.5;
        background: var(--color);
        transform: translate(-50%, -50%) scale(0.3);
        animation: overlayPulseFade 1s ease-out forwards;
        z-index: 999; /* above blur, below UI */
    }

    @keyframes PulseFade {
        0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.6;
        }
        60% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
        }
    }
`;
