export default function Footer() {
  return (
    <footer className="bg-forest-dark dark:bg-bg-primary text-white/60 relative transition-colors duration-500">
      <div className="absolute inset-0 grain" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-serif text-2xl font-light tracking-wide text-white/80 block mb-6">
              Pepi's Landhaus
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Luxuriöse Ferienwohnungen mit alpinem Charme im Herzen des Tannheimer Tals.
            </p>
          </div>

          <div>
            <h4 className="text-white/80 text-[12px] font-medium tracking-[0.15em] uppercase mb-5">
              Navigation
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Willkommen', href: '#willkommen' },
                { label: 'Zimmer', href: '#zimmer' },
                { label: 'Erlebnisse', href: '#erlebnisse' },
                { label: 'Galerie', href: '#galerie' },
                { label: 'Lage', href: '#lage' },
                { label: 'Kontakt', href: '#kontakt' },
              ].map((link) => (
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
              Kontakt
            </h4>
            <div className="space-y-3 text-sm text-white/40">
              <p>Tannheimer Tal</p>
              <p>Tirol, Österreich</p>
              <p className="pt-2">+43 (0) 5675 XXXXX</p>
              <p>info@pepis-landhaus.at</p>
            </div>
          </div>

          <div>
            <h4 className="text-white/80 text-[12px] font-medium tracking-[0.15em] uppercase mb-5">
              Entdecken
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://www.tannheimertal.at"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 hover:text-white/70 transition-colors"
              >
                Tannheimer Tal Tourismus
              </a>
              <a
                href="https://www.booking.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 hover:text-white/70 transition-colors"
              >
                Booking.com
              </a>
              <a
                href="https://buchung.tannheimertal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 hover:text-white/70 transition-colors"
              >
                Tannheimertal Buchung
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Pepi's Landhaus. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              Impressum
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              Datenschutz
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
