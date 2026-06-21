import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/i18n";
import { useReveal } from "../lib/useReveal";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import SectionHead from "../components/SectionHead";

// trajectory images, one per milestone (filled in when Gabriel sends them)
const IMAGES: (string | null)[] = [null, null, null, null, null, null, null, null];

function RocketIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CDF564"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 drop-shadow-[0_0_6px_rgba(205,245,100,0.5)]"
      style={{ transform: "rotate(-45deg)" }}
      aria-hidden="true"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export default function Trajectory() {
  const { t } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  const scrolly = useRef<HTMLDivElement | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  useReveal(root);

  const ms = t.path.milestones;
  const N = ms.length;
  const lascIndex = ms.findIndex((m) => m.tag === "LASC");

  useEffect(() => {
    const sc = scrolly.current;
    if (!sc || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sc,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          if (rocketRef.current) rocketRef.current.style.bottom = `calc(${(p * 100).toFixed(2)}% - 12px)`;
          if (trailRef.current) trailRef.current.style.height = `${(p * 100).toFixed(2)}%`;
          const idx = Math.min(N - 1, Math.floor(p * N + 0.0001));
          setActive((a) => (a === idx ? a : idx));
        },
      });
    }, sc);
    return () => ctx.revert();
  }, [N]);

  const m = ms[active];
  const img = IMAGES[active];
  // inline styles override the CSS reduced-motion rule, so gate the crossfade here too
  const fade = prefersReducedMotion() ? undefined : { animation: "fadeUp 0.5s ease" };

  return (
    <section ref={root} id="path" className="scroll-mt-24">
      {/* header */}
      <div className="shell pt-24 sm:pt-28 lg:pt-36">
        <div data-reveal>
          <SectionHead title={t.path.title} kicker={t.path.kicker} />
        </div>
        <p data-reveal className="mt-8 max-w-2xl text-[clamp(1.02rem,1.6vw,1.25rem)] leading-relaxed text-paper-dim text-pretty">
          {t.path.lede}
        </p>
      </div>

      {/* desktop scrollytelling: rocket climbs the line, content + image crossfade */}
      <div ref={scrolly} className="relative hidden lg:block" style={{ height: `${N * 46}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="shell grid w-full grid-cols-[40px_1fr_1.1fr] items-center gap-10">
            {/* rail + rocket */}
            <div className="relative mx-auto h-[60vh] w-6">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
              <div ref={trailRef} className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-lime/70" style={{ height: 0 }} />
              {ms.map((_, i) => {
                const bottomPct = N > 1 ? (i / (N - 1)) * 100 : 0;
                return (
                  <span
                    key={i}
                    className={`absolute left-1/2 block h-2 w-2 -translate-x-1/2 rounded-full transition-colors duration-300 ${
                      i === active ? "bg-lime" : i < active ? "bg-lime/50" : "bg-paper-faint/40"
                    }`}
                    style={{ bottom: `calc(${bottomPct}% - 4px)` }}
                  />
                );
              })}
              <div ref={rocketRef} className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 0 }}>
                <RocketIcon />
              </div>
            </div>

            {/* milestone card */}
            <div key={`c${active}`} style={fade}>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-lime">
                {m.year} · {m.tag}
              </div>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-paper">{m.title}</h3>
              <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-paper-dim text-pretty">{m.desc}</p>
            </div>

            {/* image frame (placeholder until images provided) */}
            <div key={`i${active}`} style={fade} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-ink-2/40">
              {img ? (
                <img src={img} alt={m.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="select-none font-display text-7xl font-semibold text-paper-faint/15">{m.year}</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint">{m.tag}</span>
            </div>
          </div>
        </div>
      </div>

      {/* mobile: simple stacked timeline */}
      <div className="shell pb-24 lg:hidden">
        <ol className="relative mt-12 space-y-10 border-l border-line pl-7">
          {ms.map((mm, i) => (
            <li key={i} data-reveal className="relative">
              <span
                className={`absolute -left-[34px] top-1 h-3 w-3 rounded-full border-2 ${
                  i === lascIndex ? "border-lime bg-lime" : "border-paper-faint bg-ink"
                }`}
              />
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-lime">
                {mm.year} · {mm.tag}
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-paper">{mm.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-paper-dim text-pretty">{mm.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="h-24 lg:h-36" />
    </section>
  );
}
