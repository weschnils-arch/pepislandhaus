import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Welcome() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const bigWord = useRef<HTMLDivElement>(null)
  const ghostWord = useRef<HTMLDivElement>(null)
  const monogram = useRef<HTMLDivElement>(null)
  const imgBg = useRef<HTMLDivElement>(null)
  const imgA = useRef<HTMLDivElement>(null)
  const imgB = useRef<HTMLDivElement>(null)
  const c1 = useRef<HTMLDivElement>(null)
  const c2 = useRef<HTMLDivElement>(null)
  const c3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      gsap.fromTo(bigWord.current, { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: st })
      gsap.fromTo(ghostWord.current, { xPercent: 8 }, { xPercent: -8, ease: 'none', scrollTrigger: st })
      gsap.fromTo(monogram.current, { yPercent: -60 }, { yPercent: 90, ease: 'none', scrollTrigger: st })
      gsap.fromTo(imgBg.current?.querySelector('img') ?? null, { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: st })
      gsap.fromTo(imgA.current?.querySelector('img') ?? null, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: st })
      gsap.fromTo(imgB.current?.querySelector('img') ?? null, { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: st })
      gsap.fromTo(c1.current, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: st })
      gsap.fromTo(c2.current, { yPercent: 9 }, { yPercent: -9, ease: 'none', scrollTrigger: st })
      gsap.fromTo(c3.current, { yPercent: -16 }, { yPercent: 16, ease: 'none', scrollTrigger: st })
      gsap.utils.toArray<HTMLElement>('.wc-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const outline = { WebkitTextStroke: '1px rgba(255,255,255,0.5)', color: 'transparent' }
  const goldOutline = { WebkitTextStroke: '2px rgba(187,156,80,0.85)', color: 'transparent' }
  const script = { fontFamily: "'Pinyon Script', cursive" }
  const titleSize = 'text-[15vw] lg:text-[11.5vw]'

  return (
    <section
      ref={sectionRef}
      id={t('section.welcome')}
      className="relative overflow-hidden bg-warmwhite dark:bg-bg-primary transition-colors duration-500"
    >
      {/* gold P monogram — sits between the two screens */}
      <div ref={monogram} className="pointer-events-none select-none absolute left-[1%] top-1/2 -translate-y-1/2 z-30 hidden md:block" aria-hidden>
        <div className="relative">
          <div className="absolute left-[16%] top-1/2 -translate-y-1/2 w-[14vw] h-[14vw] rounded-full border border-accent/45" />
          <span className="relative font-serif font-light leading-none text-[22vw] lg:text-[18vw]" style={goldOutline}>P</span>
        </div>
      </div>

      {/* ============ SCREEN 1 — reference section 2 (photos left, CHARME-style title + text right) ============ */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-stretch pt-[14vh] lg:pt-0">
        {/* two overlapping photos, flush left */}
        <div className="relative w-full lg:w-[52%] h-[60vh] lg:h-auto order-2 lg:order-1 px-4 lg:px-0">
          <div ref={imgBg} className="absolute left-0 bottom-0 w-[40%] h-[46%] overflow-hidden ring-1 ring-white/10 z-0 opacity-70 will-change-transform">
            <img src="/images/welcome-back.webp" alt="" aria-hidden className="w-full h-full object-cover grayscale" loading="lazy" />
          </div>
          <div ref={imgA} className="absolute left-0 lg:left-[3%] top-[6%] lg:top-[12%] w-[74%] h-[54%] lg:h-[56%] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10 z-10">
            <img src="/images/exterior-aerial-1.webp" alt={t('welcome.img1Alt')} className="w-full h-full object-cover grayscale scale-110 will-change-transform" loading="lazy" />
          </div>
          <div ref={imgB} className="absolute right-0 lg:right-[-12%] bottom-[6%] lg:bottom-[14%] w-[78%] h-[56%] lg:h-[58%] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] ring-1 ring-accent/30 z-20">
            <img src="/images/tirol-color.webp" alt={t('welcome.img3Alt')} className="w-full h-full object-cover scale-110 will-change-transform" loading="lazy" />
          </div>
        </div>

        {/* right: huge double title (overflows left, ON TOP of photos) + text */}
        <div className="relative z-40 w-full lg:w-[48%] flex flex-col justify-center px-6 md:px-10 lg:pr-[5vw] lg:pl-0 py-16 lg:py-0 order-1 lg:order-2">
          {/* double title */}
          <div className="relative mb-8 lg:mb-12 lg:-ml-[34%] leading-none" aria-hidden>
            <div ref={ghostWord} className="absolute left-[3%] top-[16%] whitespace-nowrap">
              <span className={`font-serif font-light uppercase ${titleSize} tracking-[0.01em]`} style={outline}>{t('welcome.bigWord')}</span>
            </div>
            <div ref={bigWord} className="relative whitespace-nowrap">
              <span className={`font-serif font-light uppercase ${titleSize} tracking-[0.01em] text-charcoal dark:text-white`}>{t('welcome.bigWord')}</span>
            </div>
          </div>

          <div className="lg:max-w-md lg:ml-auto space-y-5">
            <h2 className="wc-reveal font-serif text-3xl md:text-4xl text-charcoal dark:text-text-primary font-medium leading-snug">
              {t('welcome.title1')} <span className="italic font-light text-forest dark:text-accent">{t('welcome.title2')}</span>
            </h2>
            <p className="wc-reveal text-charcoal/70 dark:text-text-secondary leading-relaxed">{t('welcome.text1')}</p>
            <p className="wc-reveal text-charcoal/70 dark:text-text-secondary leading-relaxed">{t('welcome.text2')}</p>
            <div className="wc-reveal flex flex-wrap gap-8 pt-2">
              {[1, 2, 3].map((n) => (
                <div key={n}>
                  <span className="font-serif text-3xl md:text-4xl text-forest dark:text-accent font-light">{t(`welcome.stat${n}.value`)}</span>
                  <p className="text-charcoal/50 dark:text-text-tertiary text-[12px] tracking-[0.1em] uppercase mt-1">{t(`welcome.stat${n}.label`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ SCREEN 2 — overlapping collage + closing ============ */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 min-h-screen grid lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-[18vh]">
        <div className="relative lg:col-span-8 h-[66vh] md:h-[86vh] order-2 lg:order-1">
          <div ref={c3} className="absolute right-0 top-0 w-[58%] h-[72%] overflow-hidden ring-1 ring-white/10 z-0 opacity-55 will-change-transform">
            <img src="/images/room-dining-1.webp" alt="" aria-hidden className="w-full h-full object-cover grayscale" loading="lazy" />
          </div>
          <div ref={c1} className="absolute left-0 top-[8%] w-[46%] h-[90%] overflow-hidden ring-1 ring-white/10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] z-10 opacity-[0.85] will-change-transform">
            <img src="/images/winter-1.webp" alt={t('welcome.img4Alt')} className="w-full h-full object-cover grayscale" loading="lazy" />
          </div>
          <div ref={c2} className="absolute left-[30%] bottom-0 w-[58%] h-[82%] overflow-hidden ring-1 ring-accent/30 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] z-20 will-change-transform">
            <img src="/images/welcome-front.webp" alt={t('welcome.img3Alt')} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
          <p className="wc-reveal font-serif italic text-2xl md:text-3xl text-charcoal/85 dark:text-text-primary/90 leading-snug">
            {t('welcome.closing')}
          </p>
          <p className="wc-reveal text-charcoal/65 dark:text-text-secondary leading-relaxed max-w-lg">
            {t('welcome.text2')}
          </p>
          <div className="wc-reveal pt-4">
            <p className="text-sage dark:text-accent text-[12px] tracking-[0.2em] uppercase">{t('welcome.signature')}</p>
            <p className="text-accent text-5xl md:text-6xl leading-none mt-3" style={script}>{t('welcome.signatureName')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
