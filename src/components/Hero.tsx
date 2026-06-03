import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useTranslation } from '../i18n'

export default function Hero() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const monogramRef = useRef<HTMLDivElement>(null)

  // Cross-fading hero carousel (matches reference: fade effect, ~4.5s autoplay)
  const heroImages = [
    '/images/hero-bedroom.webp',
    '/images/hero-exterior.webp',
    '/images/room-living-1.webp',
    '/images/exterior-summer-1.webp',
    '/images/room-suite-1.webp',
    '/images/winter-1.webp',
  ]
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(id)
  }, [heroImages.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(monogramRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.55 })
      gsap.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.85 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Pepi's Landhaus im Tannheimer Tal"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === slide ? 1 : 0 }}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== slide}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      <div className="absolute inset-0 grain" />

      {/* oversized monogram watermark */}
      <div
        ref={monogramRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative -mt-[4vh]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58vh] h-[58vh] rounded-full border-2 border-accent/30" />
          <span className="relative font-serif font-light leading-none text-[92vh]" style={{ color: 'rgba(187,156,80,0.13)', WebkitTextStroke: '2px rgba(187,156,80,0.4)' }}>P</span>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p ref={subtitleRef} className="text-white/85 text-[11px] md:text-sm font-medium tracking-[0.4em] uppercase mb-4 md:mb-7">
          {t('hero.location')}
        </p>

        <h1 ref={titleRef} className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] font-light leading-[0.95] tracking-[0.01em] mb-8 md:mb-12">
          <span className="text-accent">{t('hero.title').charAt(0)}</span>{t('hero.title').slice(1)}
        </h1>

        <div ref={ctaRef} className="flex flex-col items-center gap-6">
          <p className="text-white/75 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            {t('hero.tagline')}
          </p>
          <a
            href={`#${t('section.book')}`}
            className="inline-block text-[12px] font-medium tracking-[0.25em] uppercase text-white border border-white/45 px-9 py-4 hover:bg-white hover:text-charcoal transition-colors duration-300"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>

      {/* carousel pagination dots — reference style */}
      <div className="absolute bottom-7 left-6 md:left-10 z-20 flex items-center gap-2">
        {heroImages.map((src, i) => (
          <button
            key={src}
            onClick={() => setSlide(i)}
            aria-label={`Bild ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === slide ? '26px' : '6px',
              backgroundColor: i === slide ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      <a href={`#${t('section.welcome')}`} className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group">
        <span className="text-white/70 text-[10px] tracking-[0.25em] uppercase group-hover:text-white transition-colors">{t('hero.scroll')}</span>
        <div className="w-px h-[50px] md:h-[64px] bg-gradient-to-b from-white/70 to-transparent" />
      </a>
    </section>
  )
}
