import { useEffect, useRef } from 'react'
import { useTranslation } from '../i18n'
import { ensureKbe } from '../lib/seekda'

// dd.mm.yyyy (widget format) -> yyyy-mm-dd (booking engine format)
function toISO(v: string): string {
  const m = v.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  const iso = v.match(/\d{4}-\d{2}-\d{2}/)
  return iso ? iso[0] : ''
}

export default function BookingBar() {
  const { t, lang } = useTranslation()
  const wrapRef = useRef<HTMLDivElement>(null)

  // Embed the real Seekda (KBE) booking search widget — propertyCode S001697.
  // The widget renders a nice live-availability date picker, but its own
  // "Suchen" button is dead (the booking-engine domain isn't wired into the
  // Seekda backend) and it swallows click events, so we can't intercept it.
  // Instead we hide that button and drive the booking with our own button below.
  useEffect(() => {
    ensureKbe().searchbar({ id: 'BOOKINGWIDGET' })

    const wrap = wrapRef.current
    if (!wrap) return

    // Hide the widget's dead submit button whenever it (re)appears.
    const hideDeadButton = () => {
      wrap.querySelectorAll('[data-kbe-searchbar] button').forEach((b) => {
        if (/such|search|zoek/i.test(b.textContent || '')) {
          ;(b as HTMLElement).style.display = 'none'
        }
      })
    }
    hideDeadButton()
    const obs = new MutationObserver(hideDeadButton)
    obs.observe(wrap, { childList: true, subtree: true })
    return () => obs.disconnect()
  }, [])

  const handleBook = () => {
    const sb = wrapRef.current?.querySelector('[data-kbe-searchbar]')
    const inputs = sb ? sb.querySelectorAll('input') : []
    const checkin = toISO((inputs[0] as HTMLInputElement)?.value || '')
    const checkout = toISO((inputs[1] as HTMLInputElement)?.value || '')

    const txt = sb?.textContent || ''
    const rooms = (txt.match(/(\d+)\s*(Zimmer|room|kamer)/i) || [])[1] || '1'
    const adults = (txt.match(/(\d+)\s*(Erwachsene|adult|volwassene|Gäste|guest)/i) || [])[1] || '2'
    const engLang = lang === 'nl' ? 'en' : lang

    const params = new URLSearchParams({
      channelId: 'ibe',
      totalRooms: rooms,
      language: engLang,
      currencyCode: 'EUR',
      propertyCode: 'S001697',
      widgetId: 'BOOKINGWIDGET',
      widgetSection: 'rates',
      activeBookingEngine: 'KBE',
      adult_room1: adults,
      priceType: 'asInPricelist',
      priceTimeBase: 'stay',
      coupon: '',
    })
    if (checkin) params.set('checkin', checkin)
    if (checkout) params.set('checkout', checkout)

    window.open(`https://s001697.officialbookings.com/?${params.toString()}`, '_blank', 'noopener')
  }

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

        {/* real Seekda booking search widget (live availability date picker) */}
        <div
          ref={wrapRef}
          className="mt-12 bg-warmwhite dark:bg-bg-tertiary border border-charcoal/10 dark:border-white/10 rounded-sm p-4 md:p-6 shadow-xl text-left min-h-[88px]"
        >
          <div data-kbe-searchbar="BOOKINGWIDGET" />
        </div>

        {/* our own search button — opens the Seekda booking engine with the chosen dates */}
        <button
          type="button"
          onClick={handleBook}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-forest dark:bg-accent text-white dark:text-charcoal font-medium text-[13px] tracking-[0.18em] uppercase px-10 py-4 rounded-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {t('booking.searchCta')}
        </button>

        <a
          href={`#${t('section.contact')}`}
          className="block mt-8 text-[12px] font-medium tracking-[0.2em] uppercase text-forest dark:text-accent border-b border-forest/30 dark:border-accent/30 pb-1 hover:border-forest dark:hover:border-accent transition-colors w-fit mx-auto"
        >
          {t('booking.requestForm')}
        </a>
      </div>
    </section>
  )
}
