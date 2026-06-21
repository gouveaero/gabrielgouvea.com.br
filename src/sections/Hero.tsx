import { useEffect, useRef } from "react";
import { useI18n, RT } from "../i18n/i18n";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { scrambleElement } from "../lib/scramble";

export default function Hero() {
  const { t } = useI18n();
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const cleanups: Array<() => void> = [];
    const GAP = 0.62; // time between each line forming (slower, one at a time)
    const START = 0.35;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line .block");
      // hide the title lines, then form them one by one via the decode/scramble
      gsap.set(".hero-line", { opacity: 0, y: 22 });
      lines.forEach((line, i) => {
        const at = START + i * GAP;
        const cReveal = gsap.delayedCall(at, () => {
          gsap.to((line.closest(".hero-line") as HTMLElement) || line, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
          cleanups.push(scrambleElement(line, 620));
        });
        cleanups.push(() => cReveal.kill());
      });

      // everything else appears AFTER the title has formed
      const afterTitle = START + lines.length * GAP + 0.1;
      el.querySelectorAll<HTMLElement>(".hero-eyebrow > span").forEach((s) => {
        if (s.textContent?.trim() === "·") return;
        const c = gsap.delayedCall(afterTitle + 0.05, () => cleanups.push(scrambleElement(s, 550)));
        cleanups.push(() => c.kill());
      });
      const tl = gsap.timeline({ delay: afterTitle, defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow > *", { y: 12, opacity: 0, duration: 0.55, stagger: 0.08 })
        .from(".hero-sub", { y: 18, opacity: 0, duration: 0.8 }, "-=0.25")
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5");

      // portrait reveals only AFTER the title has fully decoded
      gsap.set(".hero-portrait", { opacity: 0 });
      gsap.fromTo(
        ".hero-portrait",
        { opacity: 0, scale: 1.04, clipPath: "inset(0 0 14% 0)" },
        { opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.out", delay: afterTitle + 0.15 }
      );
      gsap.from(".hero-tag", { opacity: 0, x: -10, duration: 0.6, delay: afterTitle + 0.7 });
    }, el);
    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="top" className="relative flex min-h-[90svh] items-center pt-24 sm:pt-28">
      <div className="shell grid items-center gap-10 pb-10 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-12">
        {/* copy */}
        <div className="min-w-0">
          <div className="hero-eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.18em] text-paper-dim sm:text-[11px]">
            <span>{t.hero.eyebrow1}</span>
            <span className="text-lime">·</span>
            <span className="text-lime">{t.hero.eyebrow2}</span>
          </div>

          <h1 className="font-display font-semibold leading-[0.93] tracking-tighter2 text-[clamp(2.4rem,6.4vw,4.4rem)] text-balance">
            {t.hero.titleLines.map((line, i) => (
              <span key={i} className="hero-line block pb-[0.05em]">
                <RT html={line} as="span" className="block" />
              </span>
            ))}
          </h1>

          <RT
            html={t.hero.sub}
            as="p"
            className="hero-sub mt-7 max-w-[44ch] text-[clamp(0.98rem,1.5vw,1.18rem)] leading-relaxed text-paper-dim [&_strong]:font-medium [&_strong]:text-paper"
          />

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#contact"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-lime px-6 py-3 font-medium text-ink transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
            >
              {t.hero.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            <a
              href="#exos"
              className="hero-cta group inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.1em] text-paper-dim transition-colors duration-300 hover:text-paper"
            >
              <span className="inline-block h-px w-4 bg-paper-faint transition-all duration-300 group-hover:w-7 group-hover:bg-lime" />
              {t.hero.ctaGhost}
            </a>
          </div>
        </div>

        {/* portrait */}
        <div className="hero-portrait relative mx-auto w-full max-w-[340px] lg:mx-0 lg:ml-auto">
          <div className="relative overflow-hidden rounded-[4px]" style={{ aspectRatio: "1 / 1.12" }}>
            <img
              src="/gabriel.jpg"
              alt="Gabriel Gouvea"
              loading="eager"
              className="absolute inset-0 h-full w-full scale-[1.04] object-cover [object-position:50%_26%]"
              style={{ filter: "grayscale(1) contrast(1.05)" }}
            />
            {/* lime rim + grounding gradient */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(205,245,100,0.12) 0%, rgba(205,245,100,0) 42%), linear-gradient(to top, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0) 38%)",
              }}
            />
            <span className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l border-t border-lime/80" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b border-r border-lime/80" />
          </div>
          <div className="hero-tag absolute -bottom-1 left-0 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint">
            <span className="h-1.5 w-1.5 bg-lime" />
            {t.hero.portraitTag}
          </div>
        </div>
      </div>
    </section>
  );
}
