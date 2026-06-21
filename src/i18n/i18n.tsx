import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Content, type Lang } from "./dict";

interface I18nValue {
  lang: Lang;
  t: Content;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "gg-lang";

function initialLang(): Lang {
  // English is the default. Honour a prior explicit choice only.
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "pt" || saved === "en" ? saved : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "pt" : "en"), [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang].meta.title;
  }, [lang]);

  const value = useMemo<I18nValue>(() => ({ lang, t: dict[lang], setLang, toggle }), [lang, setLang, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Rich-text: renders a dictionary string that may contain inline accent HTML. */
export function RT({ html, as: Tag = "span", className }: { html: string; as?: keyof JSX.IntrinsicElements; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
