import clsx from 'clsx'
import { useTranslation, SUPPORTED_LANGS, type Lang } from '../i18n'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'light' | 'dark' | 'auto'
}

export default function LanguageSwitcher({ className, variant = 'auto' }: LanguageSwitcherProps) {
  const { lang, setLang } = useTranslation()

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {SUPPORTED_LANGS.map((l: Lang, i: number) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            className={clsx(
              'text-[12px] font-medium tracking-[0.08em] uppercase transition-all duration-300 px-1',
              l === lang
                ? variant === 'light'
                  ? 'text-white'
                  : variant === 'dark'
                    ? 'text-charcoal dark:text-text-primary'
                    : 'text-white'
                : variant === 'light'
                  ? 'text-white/40 hover:text-white/70'
                  : variant === 'dark'
                    ? 'text-charcoal/40 dark:text-text-tertiary hover:text-charcoal/70 dark:hover:text-text-secondary'
                    : 'text-white/40 hover:text-white/70'
            )}
          >
            {l.toUpperCase()}
          </button>
          {i < SUPPORTED_LANGS.length - 1 && (
            <span className={clsx(
              'text-[10px] mx-0.5',
              variant === 'light'
                ? 'text-white/20'
                : variant === 'dark'
                  ? 'text-charcoal/20 dark:text-text-tertiary/30'
                  : 'text-white/20'
            )}>
              |
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
