import { useEffect, useState } from "react";
import { useI18n } from "../i18n/i18n";

export default function Nav() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menu = t.nav.menu;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/72 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Gabriel Gouvea">
          <span className="h-1.5 w-1.5 rounded-full bg-lime transition-transform duration-500 group-hover:scale-125" />
          <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-paper sm:text-xs">
            GABRIEL&nbsp;GOUVEA
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {([
            ["#about", menu.about],
            ["#path", menu.path],
            ["#vision", menu.vision],
            ["#contact", menu.contact],
          ] as const).map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[11px] tracking-[0.16em] text-paper-dim transition-colors duration-300 hover:text-paper"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            {t.nav.status}
          </span>
          <div
            className="flex items-center overflow-hidden rounded-full border border-line"
            role="group"
            aria-label="Language"
          >
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors duration-300 ${
                  lang === l ? "bg-lime text-ink" : "text-paper-dim hover:text-paper"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
