import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const images = [
    { src: '/images/exterior-1.webp', label: t('gallery.img1') },
    { src: '/images/room-living-1.webp', label: t('gallery.img2') },
    { src: '/images/room-bedroom-1.webp', label: t('gallery.img3') },
    { src: '/images/gallery-2.webp', label: t('gallery.img4') },
    { src: '/images/gallery-3.webp', label: t('gallery.img5') },
    { src: '/images/room-balcony-1.webp', label: t('gallery.img6') },
    { src: '/images/gallery-5.webp', label: t('gallery.img7') },
    { src: '/images/room-panorama-1.webp', label: t('gallery.img8') },
  ]

  useEffect(() => {
    const section = sectionRef.current
    const strip = stripRef.current
    if (!section || !strip) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' },
          }
        )
      }

      const totalScroll = strip.scrollWidth - window.innerWidth
      gsap.fromTo(
        strip,
        { x: 0 },
        {
          x: -totalScroll * 0.35, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        }
      )

      gsap.fromTo(
        strip,
        { opacity: 0 },
        {
          opacity: 1, duration: 1,
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={t('section.gallery')} className="overflow-hidden bg-warmwhite dark:bg-bg-primary transition-colors duration-500 pt-8 md:pt-12">
      <div ref={headerRef} className="text-center mb-10 px-6 md:px-[clamp(2rem,8vw,10rem)]">
        <p className="text-sage dark:text-accent/80 text-[12px] font-medium tracking-[0.25em] uppercase mb-5">
          {t('gallery.label')}
        </p>
        <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary tracking-[-0.02em]">
          {t('gallery.title')}
        </h2>
      </div>

      <div className="pb-0">
        <div ref={stripRef} className="flex gap-3 pl-[clamp(2rem,5vw,5rem)] opacity-0">
          {images.map((img) => (
            <div key={img.src} className="group relative flex-shrink-0 overflow-hidden">
              <div className="relative h-[50vh] w-[32vw] min-w-[280px] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-white/80 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
