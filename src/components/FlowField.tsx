import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap";

type P = { x: number; y: number; life: number; age: number; sp: number; w: number; lime: boolean };

// each section gives the flow a different behaviour (all keep the cursor aerofoil)
type Mode = "organic" | "stream" | "ascend" | "converge" | "vortex" | "calm";
const SECTION_MODE: Record<string, Mode> = {
  top: "organic",
  about: "stream",
  path: "ascend",
  services: "converge",
  vision: "vortex",
  contact: "calm",
};
const STRENGTH: Record<Mode, number> = { organic: 0, stream: 0.72, ascend: 0.7, converge: 0.58, vortex: 0.8, calm: 0.18 };
const ORDER = ["top", "about", "path", "services", "vision", "contact"];

export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0,
      H = 0;
    let particles: P[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let t = 0;
    let booted = 0;
    let intensity = 1;
    let limeRatio = 0.06;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false, str: 0 };
    const reduced = prefersReducedMotion();

    // mode state (crossfaded on section change)
    let curMode: Mode = "organic";
    let prevMode: Mode = "organic";
    let trans = 1;

    const hash = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const smooth = (v: number) => v * v * (3 - 2 * v);
    const valueNoise = (x: number, y: number) => {
      const xi = Math.floor(x),
        yi = Math.floor(y);
      const xf = x - xi,
        yf = y - yi;
      const a = hash(xi, yi),
        b = hash(xi + 1, yi),
        c = hash(xi, yi + 1),
        d = hash(xi + 1, yi + 1);
      const u = smooth(xf),
        v = smooth(yf);
      return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
    };
    const noiseAngle = (x: number, y: number, time: number) => {
      const s1 = 0.0016,
        s2 = 0.0042;
      let n = valueNoise(x * s1 + time * 0.04, y * s1 - time * 0.03);
      n += 0.5 * valueNoise(x * s2 - time * 0.05, y * s2 + time * 0.02);
      return n * Math.PI * 3.2;
    };
    // unit vector for a given mode at (x,y)
    const modeVec = (mode: Mode, x: number, y: number, time: number) => {
      const cx = W / 2,
        cy = H / 2;
      if (mode === "stream") {
        const a = 0.2 + Math.sin(y * 0.004 + time * 0.01) * 0.25;
        return [Math.cos(a), Math.sin(a)];
      }
      if (mode === "ascend") {
        const a = -Math.PI / 2 + Math.sin(x * 0.006 + time * 0.02) * 0.4;
        return [Math.cos(a), Math.sin(a)];
      }
      if (mode === "converge") {
        const dx = cx - x,
          dy = cy - y,
          m = Math.hypot(dx, dy) || 1;
        // spiral inwards a touch
        return [dx / m - dy / m * 0.4, dy / m + dx / m * 0.4];
      }
      if (mode === "vortex") {
        const dx = cx - x,
          dy = cy - y,
          m = Math.hypot(dx, dy) || 1;
        return [-dy / m, dx / m];
      }
      return [1, 0];
    };
    const fieldAngle = (x: number, y: number, time: number) => {
      const na = noiseAngle(x, y, time);
      const s = STRENGTH[prevMode] * (1 - trans) + STRENGTH[curMode] * trans;
      if (s < 0.002) return na;
      const [ax, ay] = modeVec(curMode, x, y, time);
      const [px, py] = modeVec(prevMode, x, y, time);
      const tvx = ax * trans + px * (1 - trans);
      const tvy = ay * trans + py * (1 - trans);
      const fx = Math.cos(na) * (1 - s) + tvx * s;
      const fy = Math.sin(na) * (1 - s) + tvy * s;
      return Math.atan2(fy, fx);
    };

    const count = () => {
      let c = Math.round((W * H) / 5400);
      c = Math.max(180, Math.min(c, 820));
      if (window.innerWidth < 700) c = Math.min(c, 340);
      return c;
    };
    const spawn = (p: Partial<P>): P => {
      p.x = Math.random() * W;
      p.y = Math.random() * H;
      p.life = 60 + Math.random() * 220;
      p.age = Math.random() * (p.life as number);
      p.sp = 0.5 + Math.random() * 1.3;
      p.w = Math.random() < 0.5 ? 0.6 : 1.0;
      p.lime = Math.random() < limeRatio;
      return p as P;
    };
    const build = () => {
      const n = count();
      particles = new Array(n);
      for (let i = 0; i < n; i++) particles[i] = spawn({});
    };
    const resize = () => {
      const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
      ctx.fillStyle = "#0A0A0B";
      ctx.fillRect(0, 0, W, H);
    };

    const updateMode = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let found: Mode = "organic";
      for (const id of ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (mid >= top && mid < bottom) {
          found = SECTION_MODE[id];
          break;
        }
        if (mid >= top) found = SECTION_MODE[id]; // fallback to last passed
      }
      if (found !== curMode) {
        prevMode = curMode;
        curMode = found;
        trans = 0;
      }
    };

    const drawParticles = (time: number) => {
      const reveal = booted;
      const speedMul = 0.7 + intensity * 0.9;
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let ang = fieldAngle(p.x, p.y, time);
        if (pointer.str > 0.01) {
          // cursor as an aerofoil body: streamlines part and stream around it
          const a = 210,
            b = 80;
          const dx = p.x - pointer.x,
            dy = p.y - pointer.y;
          const ed = Math.sqrt((dx * dx) / (a * a) + (dy * dy) / (b * b)) + 0.0001;
          if (ed < 1.9) {
            const f = 1 - ed / 1.9;
            const ff = f * f;
            let nx = dx / (a * a),
              ny = dy / (b * b);
            const nl = Math.hypot(nx, ny) || 1;
            nx /= nl;
            ny /= nl;
            const tx = -ny,
              ty = nx;
            ang = ang * (1 - ff * 0.95 * pointer.str) + Math.atan2(ty, tx) * (ff * 0.95 * pointer.str);
            const inside = ed < 1 ? 1 - ed : 0;
            p.x += (tx * 2.2 + nx * (0.5 + inside * 3.2)) * ff * pointer.str;
            p.y += (ty * 2.2 + ny * (0.5 + inside * 3.2)) * ff * pointer.str;
          }
        }
        const px = p.x,
          py = p.y;
        p.x += Math.cos(ang) * p.sp * speedMul;
        p.y += Math.sin(ang) * p.sp * speedMul;
        p.age++;
        const alpha = reveal * (0.18 + 0.55 * Math.min(1, p.sp));
        if (p.lime) {
          ctx.strokeStyle = "rgba(205,245,100," + (alpha * (0.7 + 0.5 * pointer.str)).toFixed(3) + ")";
          ctx.lineWidth = p.w * 1.1;
        } else {
          ctx.strokeStyle = "rgba(180,184,170," + (alpha * 0.5).toFixed(3) + ")";
          ctx.lineWidth = p.w;
        }
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        if (p.age > p.life || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) spawn(p);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const step = () => {
      if (!running) return;
      raf = requestAnimationFrame(step);
      if (!visible) return;
      t += 1;
      if (t % 6 === 0) updateMode();
      if (trans < 1) trans = Math.min(1, trans + 0.012);
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.str += ((pointer.active ? 1 : 0) - pointer.str) * 0.12;
      if (booted < 1) booted = Math.min(1, booted + 0.012);
      // long, smooth tails -> low-alpha trail fade
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(10,10,11,0.034)";
      ctx.fillRect(0, 0, W, H);
      drawParticles(t);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const prog = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      intensity = 1 + prog * 0.85;
      limeRatio = 0.05 + prog * 0.07;
    };
    const onVis = () => {
      visible = document.visibilityState === "visible";
    };

    resize();
    updateMode();

    if (reduced) {
      booted = 0.85;
      trans = 1;
      ctx.fillStyle = "#0A0A0B";
      ctx.fillRect(0, 0, W, H);
      for (let k = 0; k < 120; k++) drawParticles(k * 3);
      const onResizeStatic = () => {
        resize();
        booted = 0.85;
        for (let k = 0; k < 120; k++) drawParticles(k * 3);
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    running = true;
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 h-full w-full" />;
}
