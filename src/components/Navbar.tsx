import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTranslation } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'

interface NavbarProps {
  darkMode: boolean
  onToggleDark: () => void
}

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // cross-fading photo for the menu (same moving images as the hero)
  const menuImages = [
    '/images/hero-bedroom.webp',
    '/images/hero-exterior.webp',
    '/images/room-living-1.webp',
    '/images/exterior-summer-1.webp',
    '/images/room-suite-1.webp',
    '/images/winter-1.webp',
  ]
  const [mSlide, setMSlide] = useState(0)

  const navLinks = [
    { label: t('nav.welcome'), href: `#${t('section.welcome')}` },
    { label: t('nav.rooms'), href: `#${t('section.rooms')}` },
    { label: t('nav.offers'), href: `#${t('section.offers')}` },
    { label: t('nav.experiences'), href: `#${t('section.experiences')}` },
    { label: t('nav.gallery'), href: `#${t('section.gallery')}` },
    { label: t('nav.location'), href: `#${t('section.location')}` },
    { label: t('nav.contact'), href: `#${t('section.contact')}` },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    if (!open) return
    const id = setInterval(() => setMSlide((s) => (s + 1) % menuImages.length), 4000)
    return () => clearInterval(id)
  }, [open, menuImages.length])

  const onBar = !scrolled || open // white text state
  const textColor = onBar ? 'text-white' : darkMode ? 'text-text-primary' : 'text-charcoal'

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-[60] transition-all duration-500',
          open
            ? 'bg-transparent'
            : scrolled
              ? darkMode ? 'bg-bg-primary/95 backdrop-blur-md shadow-sm' : 'bg-warmwhite/95 backdrop-blur-md shadow-sm'
              : 'bg-transparent'
        )}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* MENU trigger (left) */}
            <button
              onClick={() => setOpen((v) => !v)}
              className={clsx('relative z-[70] flex items-center gap-3 group', textColor)}
              aria-label={t('nav.menu')}
            >
              <span className="relative w-6 h-[14px] flex flex-col justify-between">
                <span className={clsx('block h-[1.5px] w-full bg-current transition-all duration-300', open && 'rotate-45 translate-y-[6px]')} />
                <span className={clsx('block h-[1.5px] w-full bg-current transition-all duration-300', open && 'opacity-0')} />
                <span className={clsx('block h-[1.5px] w-full bg-current transition-all duration-300', open && '-rotate-45 -translate-y-[6px]')} />
              </span>
              <span className="text-[12px] font-medium tracking-[0.25em] uppercase">{t('nav.menu')}</span>
            </button>

            {/* logo (center) */}
            <a
              href={`#${t('section.welcome')}`}
              onClick={() => setOpen(false)}
              className={clsx('hidden sm:block absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-2xl font-light tracking-wide leading-none transition-colors duration-300', textColor)}
            >
              Pepi's Landhaus
            </a>

            {/* actions (right) */}
            <div className="flex items-center gap-4 md:gap-5 relative z-[70]">
              <LanguageSwitcher variant={onBar ? 'light' : scrolled ? 'dark' : 'light'} />
              <button
                onClick={onToggleDark}
                className={clsx('hidden sm:flex w-9 h-9 items-center justify-center transition-all duration-300 hover:opacity-70', textColor)}
                aria-label={darkMode ? t('nav.lightMode') : t('nav.darkMode')}
              >
                {darkMode ? (
                  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                ) : (
                  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                )}
              </button>
              <a
                href={`#${t('section.book')}`}
                onClick={() => setOpen(false)}
                className={clsx(
                  'text-[12px] font-medium tracking-[0.2em] uppercase px-5 md:px-6 py-2.5 border transition-all duration-300',
                  onBar
                    ? 'border-white/45 text-white hover:bg-white hover:text-charcoal'
                    : 'border-accent text-accent hover:bg-accent hover:text-bg-primary'
                )}
              >
                {t('nav.book')}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ---- full-screen overlay menu ---- */}
      <div
        className={clsx(
          'fixed inset-0 z-50 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-[#0d0d0d] transition-[clip-path] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ clipPath: open ? 'inset(0 0% 0 0%)' : 'inset(0 12% 0 54%)' }}
        />
        {/* diagonal photo — cross-fading carousel, slides in */}
        <div
          className={clsx(
            'absolute inset-y-0 right-0 w-[60%] md:w-[52%] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            open ? 'translate-x-0' : 'translate-x-[18%]'
          )}
          style={{ clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          {menuImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out"
              style={{ opacity: i === mSlide ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-bg-primary/55" />
        </div>
        <div className="absolute inset-0 grain opacity-60" />

        {/* links */}
        <div className="relative h-full max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col justify-center">
          <nav className="flex flex-col gap-1 md:gap-2">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'group font-serif font-light text-white leading-[1.05] tracking-[-0.01em] text-5xl md:text-7xl transition-all duration-500 hover:text-accent hover:pl-4',
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`#${t('section.book')}`}
              onClick={() => setOpen(false)}
              className={clsx(
                'mt-8 self-start text-[12px] font-medium tracking-[0.25em] uppercase text-bg-primary bg-accent hover:bg-accent-hover px-8 py-4 transition-all duration-500',
                open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: open ? `${120 + navLinks.length * 70}ms` : '0ms' }}
            >
              {t('nav.bookNow')}
            </a>
          </nav>

          <div className="absolute bottom-10 left-6 md:left-10 lg:left-16 text-white/50 text-sm space-y-1">
            <p className="text-white/70">{t('contact.info.email')}</p>
            <p>{t('location.address.region')}</p>
          </div>
        </div>
      </div>
    </>
  )
}
