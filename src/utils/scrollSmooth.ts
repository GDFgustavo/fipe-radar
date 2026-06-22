export const scrollSmooth = (id: string, offset: number = 90, duration: number = 600) => {
    if (typeof window === "undefined") return;

    const el = document.getElementById(id);
    if (!el) return;

    const start = window.scrollY;
    const target = el.getBoundingClientRect().top + start - offset;
    const startTime = performance.now();

    const animate = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Curva de desaceleração macia

        window.scrollTo(0, start + (target - start) * ease);
        
        if (elapsed < duration) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};