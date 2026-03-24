import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Location() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const highlights = [
    { icon: '\u26F7', label: t('location.highlight1.label'), distance: t('location.highlight1.distance') },
    { icon: '\u{1F3D4}', label: t('location.highlight2.label'), distance: t('location.highlight2.distance') },
    { icon: '\u{1F6D2}', label: t('location.highlight3.label'), distance: t('location.highlight3.distance') },
    { icon: '\u{1F37D}', label: t('location.highlight4.label'), distance: t('location.highlight4.distance') },
    { icon: '\u{1F3CA}', label: t('location.highlight5.label'), distance: t('location.highlight5.distance') },
    { icon: '\u26EA', label: t('location.highlight6.label'), distance: t('location.highlight6.distance') },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.loc-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-header', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.loc-map',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-map', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.loc-info',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-info', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={t('section.location')} className="pt-8 md:pt-12 pb-24 md:pb-36 px-6 md:px-10 lg:px-16 bg-warmwhite dark:bg-bg-primary transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto">
        <div className="loc-header text-center mb-16 md:mb-20">
          <p className="text-sage dark:text-accent text-[12px] font-medium tracking-[0.25em] uppercase mb-4">
            {t('location.label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light tracking-[-0.02em]">
            {t('location.title1')}<span className="italic text-forest dark:text-accent">{t('location.title2')}</span>
          </h2>
          <p className="text-charcoal/60 dark:text-text-secondary mt-6 max-w-xl mx-auto leading-relaxed">
            {t('location.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="loc-map lg:col-span-3 overflow-hidden bg-cream h-[350px] md:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10765.2!2d10.52!3d47.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7e1b2f8c5555%3A0x1234567890abcdef!2sTannheimer%20Tal!5e0!3m2!1sde!2sat!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('location.mapTitle')}
            />
          </div>

          <div className="loc-info lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal dark:text-text-primary font-light mb-3">
                  {t('location.address.name')}
                </h3>
                <p className="text-charcoal/60 dark:text-text-secondary text-sm leading-relaxed">
                  {t('location.address.region')}
                  <br />
                  {t('location.address.country')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((h) => (
                  <div key={h.label} className="flex items-center gap-3 py-3 border-b border-charcoal/8 dark:border-text-tertiary/20">
                    <span className="text-lg">{h.icon}</span>
                    <div>
                      <p className="text-charcoal dark:text-text-primary text-sm font-medium">{h.label}</p>
                      <p className="text-charcoal/50 dark:text-text-tertiary text-xs">{h.distance}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <h4 className="text-[12px] font-medium tracking-[0.15em] uppercase text-charcoal/70 dark:text-text-tertiary">
                  {t('location.directions.title')}
                </h4>
                <div className="space-y-2 text-sm text-charcoal/60 dark:text-text-secondary">
                  <p>{t('location.directions.munich')}</p>
                  <p>{t('location.directions.innsbruck')}</p>
                  <p>{t('location.directions.zurich')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
