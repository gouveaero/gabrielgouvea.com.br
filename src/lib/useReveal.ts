import { useEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Scroll-reveal for [data-reveal] descendants of `scope`, via IntersectionObserver.
 * Robust by design: fires for elements already in view, and a safety timeout
 * guarantees content is never left hidden if anything misfires.
 * No-op (content visible) under prefers-reduced-motion.
 */
export function useReveal(
  scope: RefObject<HTMLElement>,
  opts: { selector?: string; y?: number; stagger?: number } = {}
): void {
  const { selector = "[data-reveal]", y = 26, stagger = 0.08 } = opts;
  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;

    let safety: number | undefined;
    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      const reveal = (els: Element[]) => {
        if (!els.length) return;
        gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger, overwrite: "auto" });
      };
      const io = new IntersectionObserver(
        (entries) => {
          const shown = entries.filter((e) => e.isIntersecting).map((e) => e.target);
          reveal(shown);
          shown.forEach((t) => io.unobserve(t));
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      targets.forEach((t) => io.observe(t));
      // safety net: never leave content hidden
      safety = window.setTimeout(() => {
        io.disconnect();
        gsap.to(targets, { opacity: 1, y: 0, duration: 0 });
      }, 4000);
      (el as HTMLElement & { __io?: IntersectionObserver }).__io = io;
    }, el);

    return () => {
      if (safety) window.clearTimeout(safety);
      (el as HTMLElement & { __io?: IntersectionObserver }).__io?.disconnect();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
