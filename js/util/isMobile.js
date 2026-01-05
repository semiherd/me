export const isMobile= () => window.matchMedia('(max-width: 600px)').matches;

export function onMobileChange(callback=() => {}, breakpoint = 768) {
  const query = window.matchMedia(`(max-width: ${breakpoint}px)`);
  query.addEventListener("change", (e) => callback(e.matches));
  
  callback(query.matches); 
  
  return () => query.removeEventListener("change", callback);
}