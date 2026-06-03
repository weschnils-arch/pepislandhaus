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
          <div className="loc-map lg:col-span-3 relative overflow-hidden h-[350px] md:h-[450px] ring-1 ring-black/5 dark:ring-white/10 group">
            <img
              src="/images/exterior-summer-1.webp"
              alt={t('location.mapTitle')}
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
              <p className="text-white/75 text-[11px] tracking-[0.3em] uppercase mb-2">
                {t('location.address.region')}
              </p>
              <p className="font-serif text-white text-3xl md:text-4xl font-light mb-5">
                {t('location.address.name')}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Tannheimer+Tal+Tirol"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white border border-white/40 px-6 py-3 hover:bg-white hover:text-charcoal transition-colors duration-300"
              >
                {t('location.openMap')}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
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
