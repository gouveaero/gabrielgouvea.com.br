import { useEffect, useRef } from "react";
import { useI18n } from "../i18n/i18n";
import { gsap, prefersReducedMotion } from "../lib/gsap";

/**
 * Trajectory ticker — a looping mini-summary of the journey (year + milestone),
 * in chronological order. Replaces the bare-numbers track record.
 */
export default function Marquee() {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, { xPercent: -50, ease: "none", duration: 42, repeat: -1 });
    });
    return () => ctx.revert();
  }, [t]);

  const items = [...t.path.milestones, ...t.path.milestones];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2/30 py-6">
      <div className="shell mb-4 flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">{t.credentials.label}</span>
      </div>
      <div
        className="flex w-max items-stretch gap-3 pl-5 sm:pl-8"
        ref={trackRef}
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        {items.map((m, i) => (
          <div
            key={i}
            className="flex min-w-[240px] shrink-0 flex-col justify-center gap-1 rounded-xl border border-line bg-ink-2/50 px-5 py-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-lg font-semibold tracking-tighter2 text-lime">{m.year}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-paper-faint">{m.tag}</span>
            </div>
            <div className="text-[13px] leading-tight text-paper-dim">{m.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
