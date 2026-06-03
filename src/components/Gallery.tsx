import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null) // native horizontal scroll (manual)
  const trackRef = useRef<HTMLDivElement>(null)     // inner track (scroll-linked drift)
  const spacerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

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
    const track = trackRef.current
    const scroller = scrollerRef.current
    if (!section || !track || !scroller) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' } })
      }
      gsap.fromTo(track, { opacity: 0 }, { opacity: 1, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 85%' } })

      // scroll-linked horizontal drift (extra motion on top of manual scrolling)
      const overflow = Math.max(0, track.scrollWidth - scroller.clientWidth)
      const driftDist = Math.min(overflow * 0.45, 420)
      if (spacerRef.current) spacerRef.current.style.width = driftDist + 'px'
      gsap.fromTo(track, { x: 0 }, {
        x: -driftDist, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // drag-to-scroll for the native scroller
  const onDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current; if (!el) return
    drag.current = { down: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false }
  }
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current; if (!el || !drag.current.down) return
    const dx = e.pageX - drag.current.startX
    if (Math.abs(dx) > 3) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - dx
  }
  const onUp = () => { drag.current.down = false }
  const nudge = (dir: number) =>
    scrollerRef.current?.scrollBy({ left: dir * Math.min(640, window.innerWidth * 0.7), behavior: 'smooth' })

  return (
    <section ref={sectionRef} id={t('section.gallery')} className="overflow-hidden bg-warmwhite dark:bg-bg-primary transition-colors duration-500 pt-8 md:pt-12 pb-24 md:pb-36">
      <div ref={headerRef} className="text-center mb-10 px-6 md:px-[clamp(2rem,8vw,10rem)]">
        <p className="text-sage dark:text-accent/80 text-[12px] font-medium tracking-[0.25em] uppercase mb-5">
          {t('gallery.label')}
        </p>
        <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary tracking-[-0.02em]">
          {t('gallery.title')}
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          data-lenis-prevent
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div ref={trackRef} className="flex gap-3 px-[clamp(1rem,5vw,5rem)] opacity-0 will-change-transform">
            {images.map((img) => (
              <div key={img.src} className="group relative flex-shrink-0 snap-start">
                <div className="relative h-[46vh] md:h-[54vh] w-[82vw] sm:w-[46vw] lg:w-[32vw] min-w-[260px] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.label}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
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
            <div ref={spacerRef} aria-hidden className="flex-shrink-0" />
          </div>
        </div>

        {/* manual scroll arrows */}
        <button onClick={() => nudge(-1)} aria-label="‹"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-warmwhite/80 dark:bg-bg-secondary/80 backdrop-blur-sm border border-charcoal/10 dark:border-white/15 text-charcoal dark:text-text-primary hover:bg-accent hover:text-bg-primary transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => nudge(1)} aria-label="›"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-warmwhite/80 dark:bg-bg-secondary/80 backdrop-blur-sm border border-charcoal/10 dark:border-white/15 text-charcoal dark:text-text-primary hover:bg-accent hover:text-bg-primary transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  )
}
