import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Rooms() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const rooms = [
    {
      name: t('rooms.room1.name'),
      description: t('rooms.room1.description'),
      size: t('rooms.room1.size'),
      guests: t('rooms.room1.guests'),
      features: [t('rooms.room1.feature1'), t('rooms.room1.feature2'), t('rooms.room1.feature3'), t('rooms.room1.feature4')],
      image: '/images/room-living-1.webp',
    },
    {
      name: t('rooms.room2.name'),
      description: t('rooms.room2.description'),
      size: t('rooms.room2.size'),
      guests: t('rooms.room2.guests'),
      features: [t('rooms.room2.feature1'), t('rooms.room2.feature2'), t('rooms.room2.feature3'), t('rooms.room2.feature4')],
      image: '/images/room-bedroom-2.webp',
    },
    {
      name: t('rooms.room3.name'),
      description: t('rooms.room3.description'),
      size: t('rooms.room3.size'),
      guests: t('rooms.room3.guests'),
      features: [t('rooms.room3.feature1'), t('rooms.room3.feature2'), t('rooms.room3.feature3'), t('rooms.room3.feature4')],
      image: '/images/room-suite-1.webp',
    },
    {
      name: t('rooms.room4.name'),
      description: t('rooms.room4.description'),
      size: t('rooms.room4.size'),
      guests: t('rooms.room4.guests'),
      features: [t('rooms.room4.feature1'), t('rooms.room4.feature2'), t('rooms.room4.feature3'), t('rooms.room4.feature4')],
      image: '/images/room-detail-5.webp',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rooms-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.rooms-header', start: 'top 85%' },
        }
      )

      document.querySelectorAll('.room-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={t('section.rooms')} className="pt-8 md:pt-12 pb-24 md:pb-36 bg-cream dark:!bg-[#0A0A0A] relative transition-colors duration-500">

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="rooms-header text-center mb-16 md:mb-20">
          <p className="text-sage dark:text-accent text-[12px] font-medium tracking-[0.25em] uppercase mb-4">
            {t('rooms.label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light tracking-[-0.02em]">
            {t('rooms.title1')}<span className="italic text-forest dark:text-accent">{t('rooms.title2')}</span>
          </h2>
          <p className="text-charcoal/60 dark:text-text-secondary mt-6 max-w-xl mx-auto leading-relaxed">
            {t('rooms.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.name}
              className={`room-card group bg-warmwhite dark:bg-bg-secondary overflow-hidden transition-colors duration-500 ${
                index === 0 ? 'md:row-span-2' : ''
              } ${index === 3 ? 'md:col-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden ${
                index === 0 ? 'h-[300px] md:h-full' : 'h-[260px] md:h-[280px]'
              }`}>
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase">{room.size}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase">{room.guests}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-light">
                    {room.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-charcoal/65 dark:text-text-secondary text-sm leading-relaxed mb-5">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] tracking-[0.08em] uppercase text-forest/70 dark:text-accent/70 bg-forest/5 dark:bg-accent/10 px-3 py-1.5"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <a
                  href={`#${t('section.book')}`}
                  className="inline-block text-[12px] font-medium tracking-[0.15em] uppercase text-forest dark:text-accent border-b border-forest/30 dark:border-accent/30 pb-1 hover:border-forest dark:hover:border-accent transition-colors"
                >
                  {t('rooms.checkAvailability')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
