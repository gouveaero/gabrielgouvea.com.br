import { useEffect, useRef, useState } from "react";
import { useI18n, RT } from "../i18n/i18n";
import { useReveal } from "../lib/useReveal";
import { SplineScene } from "../components/SplineScene";
import { Spotlight } from "../components/Spotlight";
import { prefersReducedMotion } from "../lib/gsap";

const ROBOT = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// feather top + left + right edges so the canvas box is invisible;
// bottom stays solid (legs are cut by the section, which reads as natural).
const EDGE_MASK = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 12%, #000 100%), linear-gradient(to right, transparent 0%, #000 11%, #000 90%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 12%, #000 100%), linear-gradient(to right, transparent 0%, #000 11%, #000 90%, transparent 100%)",
  maskComposite: "intersect",
} as const;

export default function Vision() {
  const { t } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  const robotWrap = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<{ rotation: { x: number; y: number } } | null>(null);
  const baseRot = useRef<{ x: number; y: number } | null>(null);
  const [show3d, setShow3d] = useState(false);
  useReveal(root);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow3d(true);
          io.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // subtle, fully-controlled interaction: parallax + tilt toward the cursor
  // (the robot keeps its clean idle pose; no scene look-at).
  useEffect(() => {
    if (!show3d || prefersReducedMotion()) return;
    const wrap = robotWrap.current;
    if (!wrap) return;
    let cx = 0,
      cy = 0,
      raf = 0;
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      // origin = the robot's head on screen (it sits in the right column), so the
      // look direction is computed relative to the robot, not the viewport centre.
      const host = wrap.parentElement ?? wrap;
      const r = host.getBoundingClientRect();
      const ox = r.left + r.width * 0.5;
      const oy = r.top + r.height * 0.34;
      const tx = Math.max(-1, Math.min(1, (mx - ox) / (window.innerWidth * 0.42)));
      const ty = Math.max(-1, Math.min(1, (my - oy) / (window.innerHeight * 0.42)));
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      // subtle body parallax (kept small so the head turn reads)
      wrap.style.transform = `translate3d(${(cx * 9).toFixed(1)}px, ${(cy * 6).toFixed(1)}px, 0) rotateY(${(cx * 2.2).toFixed(2)}deg) rotateX(${(-cy * 1.4).toFixed(2)}deg)`;
      // the head turns toward the cursor, RELATIVE to its rest pose so the
      // swing is symmetric (no bias toward the side it was authored facing).
      const head = headRef.current;
      if (head) {
        if (!baseRot.current) baseRot.current = { x: head.rotation.x, y: head.rotation.y };
        const base = baseRot.current;
        head.rotation.y = base.y + cx * 0.95;
        head.rotation.x = base.x + Math.max(-0.2, Math.min(0.32, cy * 0.42));
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [show3d]);

  return (
    <section ref={root} id="vision" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      {/* robot, anchored bottom-right; box invisible (feathered), legs cut by the section */}
      <div className="absolute bottom-0 right-0 top-20 hidden w-[48%] lg:block" style={{ perspective: "1200px" }} aria-hidden="true">
        <Spotlight className="left-1/2 -top-24 -translate-x-1/2" fill="#CDF564" />
        <div ref={robotWrap} className="absolute inset-0" style={EDGE_MASK}>
          {show3d ? (
            <SplineScene
              scene={ROBOT}
              className="h-full w-full"
              onLoad={(spline) => {
                const s = spline as { findObjectByName?: (n: string) => { rotation: { x: number; y: number } } | undefined };
                headRef.current = s.findObjectByName?.("Head") ?? null;
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-paper-faint border-t-lime" />
            </div>
          )}
        </div>
      </div>

      {/* text */}
      <div className="shell relative z-10 py-24 lg:py-32">
        <div className="max-w-xl">
          <div data-reveal className="flex items-center gap-2.5">
            <span className="inline-block h-px w-5 bg-lime/60" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">{t.vision.kicker}</span>
          </div>
          <RT
            html={t.vision.title}
            as="h2"
            data-reveal
            className="mt-5 font-display font-semibold leading-[1.0] tracking-tighter2 text-[clamp(2rem,4.6vw,3.2rem)] text-balance"
          />
          <p data-reveal className="mt-2 font-mono text-[12px] uppercase tracking-[0.16em] text-lime">
            {t.vision.lede}
          </p>

          <div className="mt-7 space-y-4">
            {t.vision.paragraphs.map((p, i) => (
              <p key={i} data-reveal className="text-[1.02rem] leading-relaxed text-paper-dim text-pretty">
                {p}
              </p>
            ))}
          </div>

          <p
            data-reveal
            className="mt-7 border-l border-lime/40 pl-5 font-display text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-snug text-paper"
          >
            {t.vision.close}
          </p>
        </div>
      </div>
    </section>
  );
}
