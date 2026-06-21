import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/i18n";
import type { Lang } from "../i18n/dict";
import { useReveal } from "../lib/useReveal";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";
import SectionHead from "../components/SectionHead";

// Per-milestone media. Photos are graded to near-monochrome (see .duo) and
// reveal full colour on hover. Brand marks (Vhoe, HEG) and the AI motif are
// rendered as marks, not forced into photo frames. Captions are bilingual.
type Cap = { en: string; pt: string };
type Shot = { src: string; cap: Cap; pos?: string };
type Media =
  | { kind: "photo"; images: Shot[] }
  | { kind: "logo"; src: string; cap: Cap; light?: boolean }
  | { kind: "icon"; cap: Cap };

const MEDIA: (Media | null)[] = [
  {
    kind: "photo",
    images: [
      { src: "/trajectory/cefet-1.jpg", cap: { en: "Visit to the Brazilian nuclear submarine shipyard", pt: "Visita ao estaleiro do submarino nuclear brasileiro" } },
      { src: "/trajectory/cefet-2.jpg", cap: { en: "Presenting SolMar research at a conference", pt: "Apresentando a pesquisa do SolMar em congresso" } },
      { src: "/trajectory/cefet-3.jpg", cap: { en: "Coordinating the SolMar competition, CEFET/RJ", pt: "Coordenação da competição SolMar, CEFET/RJ" } },
      { src: "/trajectory/cefet-4.jpg", cap: { en: "SolMar competition at CEFET/RJ", pt: "Competição SolMar no CEFET/RJ" } },
    ],
  },
  {
    kind: "photo",
    images: [{ src: "/trajectory/farias-1.jpg", cap: { en: "Preparation years for the military academies, Fortaleza", pt: "Anos de preparação para as academias militares, Fortaleza" } }],
  },
  {
    kind: "photo",
    images: [
      { src: "/trajectory/ufmg-1.jpg", cap: { en: "Pitching a startup in an entrepreneurship class, UFMG", pt: "Pitch de startup numa disciplina de empreendedorismo, UFMG" } },
      { src: "/trajectory/ufmg-2.jpg", cap: { en: "Aerospace Engineering reception, UFMG", pt: "Recepção do curso de Engenharia Aeroespacial, UFMG" } },
    ],
  },
  {
    kind: "photo",
    images: [
      { src: "/trajectory/lasc-1.jpg", cap: { en: "Team Fênix, 1st place in the 1 km class, with the trophies", pt: "Equipe Fênix, 1º lugar na categoria 1 km, com os troféus" } },
      { src: "/trajectory/lasc-2.jpg", cap: { en: "Team Fênix at the LASC 2023 competition", pt: "Equipe Fênix na competição LASC 2023" } },
      { src: "/trajectory/lasc-3.jpg", cap: { en: "Recovery of rocket Guará after the flight", pt: "Recuperação do foguete Guará após o voo" } },
      { src: "/trajectory/lasc-4.jpg", cap: { en: "Final assembly of rocket Guará", pt: "Montagem final do foguete Guará" } },
    ],
  },
  {
    kind: "photo",
    images: [
      { src: "/trajectory/exos-1.jpg", pos: "center 20%", cap: { en: "US$1M in revenue with Exos", pt: "US$1M em faturamento com a Exos" } },
      { src: "/trajectory/exos-2.jpg", pos: "center 22%", cap: { en: "R$100k in 7 days, alongside Erico Rocha", pt: "R$100k em 7 dias, ao lado de Erico Rocha" } },
      { src: "/trajectory/exos-3.jpg", pos: "center 16%", cap: { en: "With Pedro Sobral and Priscila Zilo", pt: "Com Pedro Sobral e Priscila Zilo" } },
      { src: "/trajectory/exos-4.jpg", pos: "center 15%", cap: { en: "R$1M in 12 months, alongside Leandro Ladeira", pt: "R$1M em 12 meses, ao lado de Leandro Ladeira" } },
    ],
  },
  { kind: "logo", src: "/trajectory/vhoe.png", cap: { en: "Vhoe, premium aviation apparel brand", pt: "Vhoe, marca premium de vestuário de aviação" } },
  { kind: "icon", cap: { en: "Local AI, autonomous agents and proprietary tooling", pt: "IA local, agentes autônomos e ferramentas proprietárias" } },
  { kind: "logo", src: "/trajectory/heg.png", light: true, cap: { en: "International Business Management, Geneva", pt: "International Business Management, Genebra" } },
];

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

// neural motif for the "building with AI" milestone (no photo)
function AIMotif() {
  const nodes = [
    [30, 28],
    [78, 20],
    [120, 44],
    [54, 60],
    [98, 76],
    [34, 92],
    [128, 100],
    [76, 110],
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [1, 4],
    [3, 5],
    [4, 6],
    [4, 7],
    [5, 7],
    [2, 6],
  ];
  return (
    <svg viewBox="0 0 158 132" className="h-2/3 w-2/3" fill="none" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#CDF564" strokeOpacity="0.32" strokeWidth="1" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.4 : 2.2} fill="#CDF564" fillOpacity={i % 3 === 0 ? 0.95 : 0.55} />
      ))}
    </svg>
  );
}

function MediaFrame({ media, lang }: { media: Media | null; lang: Lang; }) {
  const [shot, setShot] = useState(0);
  // reset to the first image whenever the media (milestone) changes
  const key = media && media.kind === "photo" ? media.images[0]?.src : media && media.kind === "logo" ? media.src : "icon";
  useEffect(() => {
    setShot(0);
  }, [key]);

  if (!media) {
    return <div className="aspect-[4/3] w-full rounded-2xl border border-line bg-ink-2/40" />;
  }

  if (media.kind === "photo") {
    const cur = media.images[Math.min(shot, media.images.length - 1)];
    return (
      <div className="w-full">
        <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-ink-2/40">
          {/* blurred fill of the same image so nothing is cropped, frame still feels full */}
          <img src={cur.src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl" loading="lazy" />
          <img src={cur.src} alt={cur.cap[lang]} className="duo absolute inset-0 h-full w-full object-contain" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4">
            <span className="font-mono text-[11px] leading-snug tracking-[0.02em] text-paper-dim">{cur.cap[lang]}</span>
          </figcaption>
        </figure>
        {media.images.length > 1 && (
          <div className="mt-3 flex gap-2.5">
            {media.images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                onClick={() => setShot(i)}
                aria-label={im.cap[lang]}
                aria-pressed={i === shot}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md border transition-all duration-300 ${
                  i === shot ? "border-lime opacity-100" : "border-line opacity-50 hover:opacity-90"
                }`}
              >
                <img src={im.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (media.kind === "logo") {
    return (
      <div className="w-full">
        <div className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink-2/40">
          {media.light ? (
            <div className="rounded-xl bg-paper px-10 py-8">
              <img src={media.src} alt={media.cap[lang]} className="h-24 w-auto object-contain" loading="lazy" />
            </div>
          ) : (
            <img src={media.src} alt={media.cap[lang]} className="w-[66%] max-w-[340px] object-contain opacity-90" loading="lazy" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] leading-snug tracking-[0.02em] text-paper-dim">{media.cap[lang]}</span>
        </div>
      </div>
    );
  }

  // icon
  return (
    <div className="w-full">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink-2/40">
        <AIMotif />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] leading-snug tracking-[0.02em] text-paper-dim">{media.cap[lang]}</span>
      </div>
    </div>
  );
}

// compact media for the mobile timeline
function MiniMedia({ media, lang }: { media: Media | null; lang: Lang }) {
  if (!media) return null;
  if (media.kind === "photo") {
    const im = media.images[0];
    return (
      <div className="group relative mt-3 h-44 overflow-hidden rounded-lg border border-line bg-ink-2/40">
        <img src={im.src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl" loading="lazy" />
        <img src={im.src} alt={im.cap[lang]} className="duo absolute inset-0 h-full w-full object-contain" loading="lazy" />
      </div>
    );
  }
  if (media.kind === "logo") {
    return (
      <div className="mt-3 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-line bg-ink-2/40">
        {media.light ? (
          <div className="rounded-lg bg-paper px-5 py-3">
            <img src={media.src} alt={media.cap[lang]} className="h-9 w-auto object-contain" loading="lazy" />
          </div>
        ) : (
          <img src={media.src} alt={media.cap[lang]} className="h-12 w-auto object-contain opacity-90" loading="lazy" />
        )}
      </div>
    );
  }
  return (
    <div className="mt-3 flex h-28 items-center justify-center rounded-lg border border-line bg-ink-2/40">
      <AIMotif />
    </div>
  );
}

export default function Trajectory() {
  const { t, lang } = useI18n();
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

      {/* desktop scrollytelling: rocket climbs the line, content + media crossfade */}
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

            {/* media frame */}
            <div key={`i${active}`} style={fade}>
              <MediaFrame media={MEDIA[active]} lang={lang} />
            </div>
          </div>
        </div>
      </div>

      {/* mobile: stacked timeline with media */}
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
              <MiniMedia media={MEDIA[i]} lang={lang} />
            </li>
          ))}
        </ol>
      </div>

      <div className="h-24 lg:h-36" />
    </section>
  );
}
