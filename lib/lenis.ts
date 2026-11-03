import type Lenis from 'lenis';

// The site-wide Lenis instance (set by components/SmoothScroll), so sections can drive scroll.
// Null when reduced motion is on or before it has started.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => { instance = lenis; };
export const getLenis = () => instance;
