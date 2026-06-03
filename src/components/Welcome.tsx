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
  const imgA = useRef<HTMLDivElement>(null)
  const imgB = useRef<HTMLDivElement>(null)
  const imgC = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      gsap.fromTo(bigWord.current, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: st })
      gsap.fromTo(ghostWord.current, { xPercent: 7 }, { xPercent: -11, ease: 'none', scrollTrigger: st })
      gsap.fromTo(monogram.current, { yPercent: -14 }, { yPercent: 14, ease: 'none', scrollTrigger: st })
      // gentle parallax on the inner <img> (overscanned), so full-fill panels never show gaps
      gsap.fromTo(imgA.current?.querySelector('img') ?? null, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: st })
      gsap.fromTo(imgB.current?.querySelector('img') ?? null, { yPercent: 5 }, { yPercent: -5, ease: 'none', scrollTrigger: st })
      gsap.fromTo(imgC.current?.querySelector('img') ?? null, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: st })
      gsap.utils.toArray<HTMLElement>('.wc-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const outline = { WebkitTextStroke: '1px rgba(255,255,255,0.55)', color: 'transparent' }
  const goldOutline = { WebkitTextStroke: '2px rgba(187,156,80,0.55)', color: 'transparent' }
  const script = { fontFamily: "'Pinyon Script', cursive" }

  return (
    <section
      ref={sectionRef}
      id={t('section.welcome')}
      className="relative overflow-hidden bg-warmwhite dark:bg-bg-primary transition-colors duration-500"
    >
      {/* ---- overlapping double title (drifts on scroll) ---- */}
      <div className="pointer-events-none select-none absolute top-[5%] left-0 right-0 z-20" aria-hidden>
        <div ref={ghostWord} className="absolute left-[6%] top-2 whitespace-nowrap">
          <span className="font-serif font-light uppercase leading-none text-[20vw] lg:text-[15vw] tracking-[0.02em]" style={outline}>
            {t('welcome.bigWord')}
          </span>
        </div>
        <div ref={bigWord} className="absolute left-[10%] whitespace-nowrap mix-blend-difference">
          <span className="font-serif font-light uppercase leading-none text-[20vw] lg:text-[15vw] tracking-[0.02em] text-white">
            {t('welcome.bigWord')}
          </span>
        </div>
      </div>

      {/* ---- gold P monogram with ring ---- */}
      <div ref={monogram} className="pointer-events-none select-none absolute left-[1%] top-[46%] z-0 hidden md:block" aria-hidden>
        <div className="relative">
          <div className="absolute left-[14%] top-1/2 -translate-y-1/2 w-[16vw] h-[16vw] rounded-full border border-accent/25" />
          <span className="relative font-serif font-light leading-none text-[24vw] lg:text-[20vw]" style={goldOutline}>P</span>
        </div>
      </div>

      {/* ============ SCREEN 1 — intro (left full-fill photos, right text) ============ */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 min-h-screen grid lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-[20vh] pb-16">
        <div className="relative lg:col-span-8 h-[64vh] md:h-[86vh] order-2 lg:order-1">
          <div ref={imgA} className="absolute top-0 inset-x-0 h-[calc(50%-6px)] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10 z-10">
            <img src="/images/exterior-aerial-1.webp" alt={t('welcome.img1Alt')} className="w-full h-full object-cover scale-110 will-change-transform" loading="lazy" />
          </div>
          <div ref={imgB} className="absolute bottom-0 inset-x-0 h-[calc(50%-6px)] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-accent/30 z-10">
            <img src="/images/room-living-1.webp" alt={t('welcome.img3Alt')} className="w-full h-full object-cover scale-110 will-change-transform" loading="lazy" />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
          <p className="wc-reveal text-sage dark:text-accent text-[12px] font-medium tracking-[0.3em] uppercase">
            {t('welcome.label')}
          </p>
          <h2 className="wc-reveal font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light leading-[1.05] tracking-[-0.01em]">
            {t('welcome.title1')}<br />
            <span className="italic text-forest dark:text-accent">{t('welcome.title2')}</span>
          </h2>
          <p className="wc-reveal text-charcoal/70 dark:text-text-secondary leading-relaxed max-w-lg">{t('welcome.text1')}</p>
          <p className="wc-reveal text-charcoal/70 dark:text-text-secondary leading-relaxed max-w-lg">{t('welcome.text2')}</p>
          <div className="wc-reveal flex flex-wrap gap-10 pt-2">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <span className="font-serif text-3xl md:text-4xl text-forest dark:text-accent font-light">{t(`welcome.stat${n}.value`)}</span>
                <p className="text-charcoal/50 dark:text-text-tertiary text-[12px] tracking-[0.1em] uppercase mt-1">{t(`welcome.stat${n}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ SCREEN 2 — full-size image + premium text box ============ */}
      <div className="relative z-10 min-h-screen w-full flex items-center">
        <div ref={imgC} className="absolute inset-0 overflow-hidden">
          <img src="/images/room-suite-1.webp" alt={t('welcome.img3Alt')} className="w-full h-full object-cover scale-110 will-change-transform" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/45" />
        </div>

        <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex justify-center lg:justify-end">
          <div className="wc-reveal w-full max-w-md lg:max-w-lg bg-bg-primary/85 backdrop-blur-xl ring-1 ring-white/12 border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] p-8 md:p-12">
            <p className="text-accent text-[12px] tracking-[0.3em] uppercase mb-6">{t('welcome.label')}</p>
            <p className="font-serif italic text-2xl md:text-3xl text-white leading-snug mb-6">
              {t('welcome.closing')}
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              {t('welcome.text2')}
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-white/60 text-[12px] tracking-[0.2em] uppercase">{t('welcome.signature')}</p>
              <p className="text-accent text-5xl md:text-6xl leading-none mt-3" style={script}>{t('welcome.signatureName')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
