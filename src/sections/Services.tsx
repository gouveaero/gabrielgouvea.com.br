import { useRef } from "react";
import { useI18n } from "../i18n/i18n";
import { useReveal } from "../lib/useReveal";
import SectionHead from "../components/SectionHead";

export default function Services() {
  const { t } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  useReveal(root);

  return (
    <section ref={root} id="services" className="scroll-mt-24 border-t border-line bg-ink-2/40 py-24 sm:py-28 lg:py-36">
      <div className="shell">
        <div data-reveal>
          <SectionHead title={t.services.title} kicker={t.services.kicker} />
        </div>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {t.services.items.map((s, i) => (
            <div
              key={i}
              data-reveal
              className="group grid items-baseline gap-3 py-7 transition-colors duration-300 sm:grid-cols-[0.4fr_0.6fr] sm:gap-10"
            >
              <h3 className="flex items-start gap-4 font-display text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                <span className="font-mono text-[12px] text-lime">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h3>
              <p className="text-[1.02rem] leading-relaxed text-paper-dim text-pretty">{s.desc}</p>
            </div>
          ))}
        </div>

        <a
          href={t.services.linkHref}
          target="_blank"
          rel="noreferrer"
          data-reveal
          className="group mt-8 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-paper-dim transition-colors duration-300 hover:text-lime"
        >
          <span className="inline-block h-px w-4 bg-paper-faint transition-all duration-300 group-hover:w-7 group-hover:bg-lime" />
          {t.services.linkLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>
    </section>
  );
}
