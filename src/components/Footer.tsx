import { useTranslation } from '../i18n'

export default function Footer() {
  const { t } = useTranslation()

  const navLinks = [
    { label: t('nav.welcome'), href: `#${t('section.welcome')}` },
    { label: t('nav.rooms'), href: `#${t('section.rooms')}` },
    { label: t('nav.offers'), href: `#${t('section.offers')}` },
    { label: t('nav.experiences'), href: `#${t('section.experiences')}` },
    { label: t('nav.gallery'), href: `#${t('section.gallery')}` },
    { label: t('nav.location'), href: `#${t('section.location')}` },
    { label: t('nav.contact'), href: `#${t('section.contact')}` },
  ]

  return (
    <footer className="bg-forest-dark dark:bg-bg-primary text-white/60 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 grain" />

      {/* oversized watermark word */}
      <div className="pointer-events-none select-none absolute -bottom-[1.5vw] inset-x-0 flex justify-center" aria-hidden>
        <span className="font-serif font-light uppercase whitespace-nowrap leading-none text-white/[0.05] text-[13vw] tracking-[0.02em]">
          {t('footer.watermark')}
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-serif text-3xl font-light tracking-wide text-white/85 inline-flex items-baseline mb-6">
              <span className="relative inline-block text-accent">
                P
                <span className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[1.45em] h-[1.45em] rounded-full border border-accent/55" />
              </span>
              epi's Landhaus
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-white/80 text-[12px] font-medium tracking-[0.15em] uppercase mb-5">
              {t('footer.nav')}
            </h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/80 text-[12px] font-medium tracking-[0.15em] uppercase mb-5">
              {t('footer.contact')}
            </h4>
            <div className="space-y-3 text-sm text-white/40">
              <p>Tannheimer Tal</p>
              <p>Tirol, {t('location.address.country')}</p>
              <p className="pt-2">{t('contact.info.phone')}</p>
              <p>{t('contact.info.email')}</p>
            </div>
          </div>

          <div>
            <h4 className="text-white/80 text-[12px] font-medium tracking-[0.15em] uppercase mb-5">
              {t('footer.discover')}
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://www.tannheimertal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 hover:text-white/70 transition-colors"
              >
                {t('footer.tannheimerTourism')}
              </a>
              <a
                href="https://www.booking.com/hotel/at/landhaus-strobl.de.html?aid=356980"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 hover:text-white/70 transition-colors"
              >
                Booking.com
              </a>
              <a
                href="https://buchung.tannheimertal.com/de/detail/6-72172/pepi-s-landhaus?adults=2"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 hover:text-white/70 transition-colors"
              >
                {t('footer.booking')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              {t('footer.imprint')}
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
