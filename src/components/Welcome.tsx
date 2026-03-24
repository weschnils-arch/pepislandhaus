import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Welcome() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.welcome-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.welcome-label', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.welcome-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.welcome-title', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.welcome-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.welcome-text', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.welcome-img-left',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.welcome-img-left', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.welcome-img-right',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.welcome-img-right', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={t('section.welcome')} className="py-24 md:py-36 lg:py-44 px-6 md:px-10 lg:px-16 bg-warmwhite dark:bg-bg-primary transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <p className="welcome-label text-sage dark:text-accent text-[12px] font-medium tracking-[0.25em] uppercase">
              {t('welcome.label')}
            </p>

            <h2 className="welcome-title font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light leading-[1.1] tracking-[-0.02em]">
              {t('welcome.title1')}
              <br />
              <span className="italic text-forest dark:text-accent">{t('welcome.title2')}</span>
            </h2>

            <div className="welcome-text space-y-5 max-w-lg">
              <p className="text-charcoal/70 dark:text-text-secondary leading-relaxed">
                {t('welcome.text1')}
              </p>
              <p className="text-charcoal/70 dark:text-text-secondary leading-relaxed">
                {t('welcome.text2')}
              </p>
            </div>

            <div className="welcome-text flex flex-wrap gap-12 pt-4">
              <div>
                <span className="font-serif text-3xl md:text-4xl text-forest dark:text-accent font-light">{t('welcome.stat1.value')}</span>
                <p className="text-charcoal/50 dark:text-text-tertiary text-[12px] tracking-[0.1em] uppercase mt-1">{t('welcome.stat1.label')}</p>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-forest dark:text-accent font-light">{t('welcome.stat2.value')}</span>
                <p className="text-charcoal/50 dark:text-text-tertiary text-[12px] tracking-[0.1em] uppercase mt-1">{t('welcome.stat2.label')}</p>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-forest dark:text-accent font-light">{t('welcome.stat3.value')}</span>
                <p className="text-charcoal/50 dark:text-text-tertiary text-[12px] tracking-[0.1em] uppercase mt-1">{t('welcome.stat3.label')}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="welcome-img-left space-y-4">
              <div className="overflow-hidden">
                <img
                  src="/images/exterior-aerial-1.webp"
                  alt={t('welcome.img1Alt')}
                  className="w-full h-[280px] md:h-[340px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  src="/images/room-bedroom-2.webp"
                  alt={t('welcome.img2Alt')}
                  className="w-full h-[200px] md:h-[240px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="welcome-img-right mt-12 space-y-4">
              <div className="overflow-hidden">
                <img
                  src="/images/room-living-1.webp"
                  alt={t('welcome.img3Alt')}
                  className="w-full h-[200px] md:h-[240px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  src="/images/exterior-aerial-2.webp"
                  alt={t('welcome.img4Alt')}
                  className="w-full h-[280px] md:h-[340px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
