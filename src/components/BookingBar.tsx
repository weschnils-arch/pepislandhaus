import { useEffect } from 'react'
import { useTranslation } from '../i18n'

export default function BookingBar() {
  const { t } = useTranslation()

  // Embed the real Seekda (KBE) booking search widget — propertyCode S001697
  useEffect(() => {
    const w = window as any
    if (!w['kbe-widgets']) {
      ;(function (t: any, e: any, n: any, s: any) {
        t['kbe-widgets'] = s
        t[s] =
          t[s] ||
          new Proxy(
            { q: [] as any[] },
            { get: (e: any, n: any) => (n in e ? e[n] : function (a: any) { t[s].q.push([n, a]) }) }
          )
        const o = e.createElement(n)
        const r = e.getElementsByTagName(n)[0]
        o.id = s
        o.src = 'https://widget-bf.seekda.com/loader.js'
        o.async = 1
        r.parentNode.insertBefore(o, r)
      })(window, document, 'script', '__KBE')
    }
    w.__KBE.settings({ id: 'BOOKINGWIDGET', propertyCode: 'S001697' })
    w.__KBE.searchbar({ id: 'BOOKINGWIDGET' })
  }, [])

  return (
    <section
      id={t('section.book')}
      className="relative py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream dark:bg-bg-secondary transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sage dark:text-accent text-[12px] font-medium tracking-[0.3em] uppercase mb-4">
          {t('booking.label')}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal dark:text-text-primary tracking-[-0.01em]">
          {t('booking.title')}
        </h2>
        <p className="text-charcoal/60 dark:text-text-secondary mt-5 max-w-xl mx-auto leading-relaxed">
          {t('booking.subtitle')}
        </p>

        {/* real Seekda booking search widget */}
        <div className="mt-12 bg-warmwhite dark:bg-bg-tertiary border border-charcoal/10 dark:border-white/10 rounded-sm p-4 md:p-6 shadow-xl text-left min-h-[88px]">
          <div data-kbe-searchbar="BOOKINGWIDGET" />
        </div>

        <a
          href={`#${t('section.contact')}`}
          className="inline-block mt-8 text-[12px] font-medium tracking-[0.2em] uppercase text-forest dark:text-accent border-b border-forest/30 dark:border-accent/30 pb-1 hover:border-forest dark:hover:border-accent transition-colors"
        >
          {t('booking.requestForm')}
        </a>
      </div>
    </section>
  )
}
