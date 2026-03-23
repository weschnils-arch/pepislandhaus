import { useState, useEffect } from 'react'
import clsx from 'clsx'

const navLinks = [
  { label: 'Willkommen', href: '#willkommen' },
  { label: 'Zimmer', href: '#zimmer' },
  { label: 'Erlebnisse', href: '#erlebnisse' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Lage', href: '#lage' },
  { label: 'Kontakt', href: '#kontakt' },
]

interface NavbarProps {
  darkMode: boolean
  onToggleDark: () => void
}

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const textColor = scrolled
    ? darkMode ? 'text-text-primary' : 'text-charcoal'
    : 'text-white'

  const hamburgerColor = mobileOpen
    ? 'bg-white'
    : scrolled
      ? darkMode ? 'bg-text-primary' : 'bg-charcoal'
      : 'bg-white'

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? darkMode
            ? 'bg-bg-primary/95 backdrop-blur-md shadow-sm'
            : 'bg-warmwhite/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20 md:h-24">
          <a href="#" className="relative z-50 font-serif text-xl md:text-2xl font-light tracking-wide leading-none">
            <span className={clsx('transition-colors duration-300', textColor)}>
              Pepi's Landhaus
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8 leading-none">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-70',
                  textColor
                )}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={onToggleDark}
              className={clsx(
                'w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:opacity-70',
                textColor
              )}
              aria-label={darkMode ? 'Hellmodus' : 'Dunkelmodus'}
            >
              {darkMode ? (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <a
              href="#buchen"
              className={clsx(
                'text-[13px] font-medium tracking-[0.15em] uppercase px-6 py-2.5 transition-all duration-300',
                scrolled
                  ? darkMode
                    ? 'bg-accent text-bg-primary hover:bg-accent-hover'
                    : 'bg-forest text-white hover:bg-forest-light'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
              )}
            >
              Buchen
            </a>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onToggleDark}
              className={clsx('relative z-50 w-9 h-9 flex items-center justify-center', mobileOpen ? 'text-white' : textColor)}
              aria-label={darkMode ? 'Hellmodus' : 'Dunkelmodus'}
            >
              {darkMode ? (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menü"
            >
              <span className={clsx('w-6 h-[1.5px] transition-all duration-300', mobileOpen ? 'rotate-45 translate-y-[4.5px]' : '', hamburgerColor)} />
              <span className={clsx('w-6 h-[1.5px] transition-all duration-300', mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : '', hamburgerColor)} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 lg:hidden',
          darkMode ? 'bg-bg-primary' : 'bg-forest',
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                'text-2xl font-serif tracking-wider transition-colors',
                darkMode ? 'text-text-primary hover:text-accent' : 'text-white hover:text-sage-light'
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#buchen"
            onClick={() => setMobileOpen(false)}
            className={clsx(
              'mt-4 text-sm font-medium tracking-[0.15em] uppercase px-8 py-3 transition-colors',
              darkMode ? 'bg-accent text-bg-primary hover:bg-accent-hover' : 'bg-sage text-white hover:bg-sage-light'
            )}
          >
            Jetzt Buchen
          </a>
        </div>
      </div>
    </nav>
  )
}
