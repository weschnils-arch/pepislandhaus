import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import DatePicker from './DatePicker'
import { useTranslation } from '../i18n'

export default function Hero() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const bookingRef = useRef<HTMLDivElement>(null)

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      )
      gsap.fromTo(
        bookingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!overlayRef.current) return
      const scrollY = window.scrollY
      const opacity = Math.min(scrollY / 600, 0.6)
      overlayRef.current.style.backgroundColor = `rgba(0,0,0,${0.3 + opacity})`
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <section ref={heroRef} id={t('section.book')} className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bedroom.webp"
          alt="Pepi's Landhaus im Tannheimer Tal"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/30 transition-colors duration-300"
      />

      <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-0 grain" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          ref={subtitleRef}
          className="text-white/80 text-[11px] md:text-sm font-medium tracking-[0.3em] uppercase mb-3 md:mb-6"
        >
          {t('hero.location')}
        </p>

        <h1
          ref={titleRef}
          className="font-serif text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-light leading-[0.95] tracking-[-0.02em] mb-4 md:mb-8"
        >
          {t('hero.title')}
        </h1>

        <p className="text-white/70 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed mb-8 md:mb-16">
          {t('hero.tagline')}
        </p>

        <div
          ref={bookingRef}
          className="w-full max-w-3xl mx-auto"
        >
          <p className="font-serif text-white text-lg md:text-2xl italic mb-4">
            {t('hero.bookingPrompt')}
          </p>

          <div className="bg-forest/40 backdrop-blur-xl border border-white/10 rounded-sm p-3 md:p-4 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 items-end">
              <DatePicker
                value={checkIn}
                onChange={setCheckIn}
                label={t('hero.checkIn')}
              />

              <DatePicker
                value={checkOut}
                onChange={setCheckOut}
                label={t('hero.checkOut')}
                minDate={checkIn || undefined}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-white/60 text-[11px] font-medium tracking-[0.15em] uppercase mb-2 text-left">
                    {t('hero.guests')}
                  </label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-white text-charcoal px-4 py-3 text-sm rounded-sm outline-none appearance-none focus:ring-2 focus:ring-sage/50 transition-shadow"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? t('hero.guestSingular') : t('hero.guestPlural')}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="sm:self-end bg-sage hover:bg-sage-light text-white text-[13px] font-medium tracking-[0.15em] uppercase px-6 md:px-8 py-3 transition-colors duration-300 whitespace-nowrap w-full sm:w-auto"
                >
                  {t('hero.continue')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href={`#${t('section.welcome')}`}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <div className="w-px h-[60px] md:h-[80px] bg-gradient-to-b from-transparent via-sage/60 to-sage/80 animate-pulse" />
      </a>
    </section>
  )
}
