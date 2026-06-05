import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n'
import { ensureKbe } from '../lib/seekda'

gsap.registerPlugin(ScrollTrigger)

export default function Offers() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.offers-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.offers-header', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Seekda offers widget (data-kbe-offers)
  useEffect(() => {
    ensureKbe().offers({ id: 'BOOKINGWIDGET' })
  }, [])

  return (
    <section
      ref={sectionRef}
      id={t('section.offers')}
      className="pt-8 md:pt-12 pb-24 md:pb-36 px-6 md:px-10 lg:px-16 bg-warmwhite dark:bg-bg-primary transition-colors duration-500"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="offers-header text-center mb-16 md:mb-20">
          <p className="text-sage dark:text-accent text-[12px] font-medium tracking-[0.25em] uppercase mb-4">
            {t('offers.label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light tracking-[-0.02em]">
            {t('offers.title1')}<span className="italic text-forest dark:text-accent">{t('offers.title2')}</span>
          </h2>
          <p className="text-charcoal/60 dark:text-text-secondary mt-6 max-w-xl mx-auto leading-relaxed">
            {t('offers.subtitle')}
          </p>
        </div>

        <div className="bg-cream dark:bg-bg-secondary border border-charcoal/10 dark:border-white/10 rounded-sm p-4 md:p-6 shadow-sm">
          <div data-kbe-offers="BOOKINGWIDGET" />
        </div>
      </div>
    </section>
  )
}
