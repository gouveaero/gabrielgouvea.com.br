import { useI18n } from "../i18n/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-paper">GABRIEL&nbsp;GOUVEA</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint">{t.footer.note}</span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-paper-faint">© 2026 {t.footer.rights}</span>
      </div>
    </footer>
  );
}
