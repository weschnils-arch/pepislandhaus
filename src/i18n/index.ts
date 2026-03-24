import { createContext, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import de from './de.json'
import nl from './nl.json'
import en from './en.json'

export type Lang = 'de' | 'nl' | 'en'

const translations: Record<Lang, Record<string, string>> = { de, nl, en }

export const SUPPORTED_LANGS: Lang[] = ['de', 'nl', 'en']
export const DEFAULT_LANG: Lang = 'de'

interface I18nContext {
  lang: Lang
  t: (key: string) => string
  setLang: (lang: Lang) => void
}

export const LanguageContext = createContext<I18nContext>({
  lang: DEFAULT_LANG,
  t: (key: string) => key,
  setLang: () => {},
})

export function useTranslation() {
  return useContext(LanguageContext)
}

export function useLangFromParams(): Lang {
  const { lang } = useParams<{ lang: string }>()
  if (lang && SUPPORTED_LANGS.includes(lang as Lang)) {
    return lang as Lang
  }
  return DEFAULT_LANG
}

export function createT(lang: Lang) {
  const dict = translations[lang] || translations[DEFAULT_LANG]
  return (key: string): string => dict[key] ?? key
}

export function useLanguageNavigation() {
  const navigate = useNavigate()
  const currentLang = useLangFromParams()

  const setLang = (newLang: Lang) => {
    if (newLang !== currentLang) {
      navigate(`/${newLang}/`, { replace: true })
    }
  }

  return { setLang, currentLang }
}
