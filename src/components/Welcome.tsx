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
  const img1 = useRef<HTMLDivElement>(null)
  const img2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      // overlapping words drift horizontally as you scroll
      gsap.fromTo(bigWord.current, { xPercent: -10 }, { xPercent: 10, ease: 'none', scrollTrigger: st })
      gsap.fromTo(ghostWord.current, { xPercent: 14 }, { xPercent: -14, ease: 'none', scrollTrigger: st })
      // large photos parallax diagonally
      gsap.fromTo(img1.current, { yPercent: -9 }, { yPercent: 9, ease: 'none', scrollTrigger: st })
      gsap.fromTo(img2.current, { yPercent: 11 }, { yPercent: -11, ease: 'none', scrollTrigger: st })
      // copy reveal
      gsap.fromTo('.welcome-copy > *',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.welcome-copy', start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={t('section.welcome')}
      className="relative overflow-hidden bg-warmwhite dark:bg-bg-primary py-24 md:py-36 transition-colors duration-500"
    >
      {/* faint ghost word drifting behind everything (left photo zone) */}
      <div ref={ghostWord} aria-hidden className="pointer-events-none select-none absolute top-[40%] left-0 w-full lg:w-[60%] z-0 flex justify-center overflow-visible">
        <span className="font-serif font-light uppercase whitespace-nowrap leading-none text-[22vw] lg:text-[15vw] text-charcoal/[0.04] dark:text-white/[0.055]">
          {t('welcome.scrollWord')}
        </span>
      </div>

      {/* huge word — left-anchored, sits high so it overlaps the Willkommen row and
          only grazes the top of the photos; blends over whatever is behind it */}
      <div
        ref={bigWord}
        aria-hidden
        className="pointer-events-none select-none absolute top-[6%] md:top-[8%] left-[28%] md:left-[36%] z-30 mix-blend-difference"
      >
        <span className="font-serif font-light uppercase whitespace-nowrap leading-none text-white text-[18vw] lg:text-[14vw] tracking-[0.01em]">
          {t('welcome.bigWord')}
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* large overlapping photos — full size */}
          <div className="relative lg:col-span-8 h-[70vh] min-h-[520px] md:h-[94vh] order-2 lg:order-1">
            <div ref={img1} className="welcome-photo absolute left-0 top-0 w-[78%] h-[82%] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10 will-change-transform z-10">
              <img src="/images/exterior-aerial-1.webp" alt={t('welcome.img1Alt')} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div ref={img2} className="welcome-photo absolute right-0 bottom-0 w-[78%] h-[82%] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-accent/30 will-change-transform z-20">
              <img src="/images/room-living-1.webp" alt={t('welcome.img3Alt')} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* copy */}
          <div className="welcome-copy lg:col-span-4 space-y-6 order-1 lg:order-2">
            <p className="text-sage dark:text-accent text-[12px] font-medium tracking-[0.3em] uppercase">
              {t('welcome.label')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light leading-[1.05] tracking-[-0.01em]">
              {t('welcome.title1')}
              <br />
              <span className="italic text-forest dark:text-accent">{t('welcome.title2')}</span>
            </h2>
            <div className="space-y-5 max-w-lg">
              <p className="text-charcoal/70 dark:text-text-secondary leading-relaxed">{t('welcome.text1')}</p>
              <p className="text-charcoal/70 dark:text-text-secondary leading-relaxed">{t('welcome.text2')}</p>
            </div>

            <div className="flex flex-wrap gap-10 pt-2">
              {[1, 2, 3].map((n) => (
                <div key={n}>
                  <span className="font-serif text-3xl md:text-4xl text-forest dark:text-accent font-light">
                    {t(`welcome.stat${n}.value`)}
                  </span>
                  <p className="text-charcoal/50 dark:text-text-tertiary text-[12px] tracking-[0.1em] uppercase mt-1">
                    {t(`welcome.stat${n}.label`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="font-serif italic text-xl md:text-2xl text-charcoal/80 dark:text-text-primary/90">
                {t('welcome.closing')}
              </p>
              <p className="text-sage dark:text-accent text-[12px] tracking-[0.2em] uppercase mt-3">
                {t('welcome.signature')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
