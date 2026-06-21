import { useRef } from "react";
import { useI18n, RT } from "../i18n/i18n";
import { useReveal } from "../lib/useReveal";

export default function About() {
  const { t } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  useReveal(root);

  return (
    <section ref={root} id="about" className="shell scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <div data-reveal className="flex items-center gap-2.5">
        <span className="inline-block h-px w-5 bg-lime/60" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">{t.about.kicker}</span>
      </div>

      <RT
        html={t.about.headline}
        as="h2"
        data-reveal
        className="mt-6 max-w-4xl font-display font-semibold leading-[1.02] tracking-tighter2 text-[clamp(1.9rem,4.6vw,3.3rem)] text-balance"
      />

      <div className="mt-12 grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        {/* podcast / authority portrait */}
        <figure data-reveal className="relative mx-auto w-full max-w-[340px] md:mx-0">
          <div className="relative overflow-hidden rounded-[4px]" style={{ aspectRatio: "0.8 / 1" }}>
            <img
              src="/podcast.jpg"
              alt="Gabriel Gouvea recording in studio"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover [object-position:55%_28%]"
              style={{ filter: "saturate(0.72) contrast(1.06) brightness(0.94)" }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(205,245,100,0.10) 0%, rgba(205,245,100,0) 40%), linear-gradient(to top, rgba(10,10,11,0.6) 0%, rgba(10,10,11,0) 45%)",
              }}
            />
            <span className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l border-t border-lime/70" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b border-r border-lime/70" />
          </div>
          <figcaption className="mt-3 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint">
            <span className="h-1.5 w-1.5 bg-lime" />
            {t.about.photoCaption}
          </figcaption>
        </figure>

        {/* narrative */}
        <div>
          <RT
            html={t.about.body}
            as="p"
            data-reveal
            className="max-w-prose2 text-[clamp(1.05rem,1.7vw,1.28rem)] leading-[1.7] text-paper-dim [&_strong]:font-medium [&_strong]:text-paper text-pretty"
          />

          <blockquote
            data-reveal
            className="mt-8 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-tight tracking-tight text-paper"
          >
            <span className="mr-1 text-lime">“</span>
            <RT html={t.about.quote} as="span" />
          </blockquote>

          <p data-reveal className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-paper-faint">
            {t.about.tagline}
          </p>

          <a
            href="https://www.linkedin.com/in/gabriel-aero"
            target="_blank"
            rel="noreferrer"
            data-reveal
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-paper-dim transition-colors duration-300 hover:text-lime"
          >
            <span className="inline-block h-px w-4 bg-paper-faint transition-all duration-300 group-hover:w-7 group-hover:bg-lime" />
            {t.about.linkLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
