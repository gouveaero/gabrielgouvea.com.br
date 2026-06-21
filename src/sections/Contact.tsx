import { useRef } from "react";
import { useI18n, RT } from "../i18n/i18n";
import { useReveal } from "../lib/useReveal";

export default function Contact() {
  const { t } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  useReveal(root);

  return (
    <section ref={root} id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      {/* the global flow-field shows through (calm pattern); a soft top scrim only */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/60" aria-hidden="true" />

      <div className="shell relative z-10 py-28 sm:py-32 lg:py-44">
        <RT
          html={t.contact.title}
          as="h2"
          data-reveal
          className="font-display font-semibold leading-[0.95] tracking-tightest text-[clamp(3rem,11vw,8rem)] text-balance"
        />
        <p data-reveal className="mt-6 max-w-xl text-[clamp(1.05rem,1.7vw,1.3rem)] leading-relaxed text-paper-dim text-pretty">
          {t.contact.sub}
        </p>

        <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-lg border border-line">
          {t.contact.links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-reveal
              className="group flex items-center justify-between gap-4 bg-ink-2/60 px-5 py-5 backdrop-blur-sm transition-colors duration-300 hover:bg-ink-3 sm:px-7"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-faint sm:w-28">{l.label}</span>
              <span className="flex-1 font-display text-lg font-medium tracking-tight text-paper sm:text-xl">{l.value}</span>
              <span className="text-paper-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-lime">↗</span>
            </a>
          ))}
        </div>

        <a
          href={t.contact.links[0].href}
          data-reveal
          className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-lime px-7 py-3.5 font-medium text-ink transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
        >
          {t.contact.cta}
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}
