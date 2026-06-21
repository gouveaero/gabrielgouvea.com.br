import { RT } from "../i18n/i18n";

/** Editorial section header: large display title + a mono "instrument" meta label beside it. */
export default function SectionHead({ title, kicker, id }: { title: string; kicker: string; id?: string }) {
  return (
    <div id={id} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <RT
        html={title}
        as="h2"
        className="hero-line-none font-display font-semibold leading-[0.98] tracking-tighter2 text-[clamp(2rem,5vw,3.4rem)] text-balance"
      />
      <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint sm:pb-2">
        <span className="inline-block h-px w-5 bg-lime/60" />
        {kicker}
      </div>
    </div>
  );
}
