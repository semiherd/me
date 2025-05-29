function onResize(width,cbFn){
    const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
    if (mediaQuery.matches) {
        console.log(width,mediaQuery.matches);
        cbFn();
    }
}