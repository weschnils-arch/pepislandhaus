import { useState } from 'react'
import DatePicker from './DatePicker'
import { useTranslation } from '../i18n'

export default function BookingBar() {
  const { t } = useTranslation()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const handleBooking = () => {
    const baseUrl = 'https://www.seekda.com/de/booking'
    const params = new URLSearchParams({
      propertyCode: 'S001697',
      ...(checkIn && { arrival: checkIn }),
      ...(checkOut && { departure: checkOut }),
      adults: guests.toString(),
    })
    window.open(`${baseUrl}?${params.toString()}`, '_blank')
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

        <div className="mt-12 bg-warmwhite dark:bg-bg-tertiary border border-charcoal/10 dark:border-white/10 rounded-sm p-4 md:p-5 shadow-xl text-left">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <DatePicker value={checkIn} onChange={setCheckIn} label={t('hero.checkIn')} />
            <DatePicker value={checkOut} onChange={setCheckOut} label={t('hero.checkOut')} minDate={checkIn || undefined} />
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-charcoal/50 dark:text-text-secondary text-[11px] font-medium tracking-[0.15em] uppercase mb-2">
                  {t('hero.guests')}
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-white dark:bg-bg-primary text-charcoal dark:text-text-primary px-4 py-3 text-sm rounded-sm outline-none appearance-none focus:ring-2 focus:ring-accent/40 transition-shadow border border-charcoal/10 dark:border-white/10"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? t('hero.guestSingular') : t('hero.guestPlural')}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 dark:text-text-secondary pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleBooking}
                className="sm:self-end bg-accent hover:bg-accent-hover text-bg-primary text-[13px] font-medium tracking-[0.15em] uppercase px-6 md:px-8 py-3 transition-colors duration-300 whitespace-nowrap w-full sm:w-auto"
              >
                {t('hero.continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
