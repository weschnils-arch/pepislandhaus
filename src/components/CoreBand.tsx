import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CoreBandProps {
  src: string
  /** large word shown centred over the band */
  title: string
  subtitle?: string
  objectPosition?: string
}

/**
 * Full-bleed immersive band split by a diagonal cut — the reference site's
 * "core" pattern. Each half (image + the title together) slides diagonally in
 * the opposite direction, so the seam shears straight through the letters while
 * entering. Both halves converge to perfect alignment exactly when the band is
 * centred in the viewport — and HOLD there, so you see the full, whole picture
 * and word once it's fully on screen.
 */
export default function CoreBand({ src, title, subtitle, objectPosition }: CoreBandProps) {
  const ref = useRef<HTMLDivElement>(null)
  const topLayer = useRef<HTMLDivElement>(null)
  const botLayer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // animate from sheared → aligned, finishing as soon as the band is fully
      // in frame (its bottom reaches the viewport bottom), then it HOLDS aligned
      // for the rest of the scroll so the full, whole picture shows.
      const st = { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: 1 }
      const D = 12 // diagonal travel
      gsap.fromTo(topLayer.current, { xPercent: D, yPercent: D }, { xPercent: 0, yPercent: 0, ease: 'none', scrollTrigger: st })
      gsap.fromTo(botLayer.current, { xPercent: -D, yPercent: -D }, { xPercent: 0, yPercent: 0, ease: 'none', scrollTrigger: st })
    }, ref)
    return () => ctx.revert()
  }, [])

  // diagonal seam from top-right to bottom-left → top layer keeps the upper-left wedge
  const topClip = 'polygon(0 0, 100% 0, 0 100%)'

  const Layer = ({
    layerRef, clip, overlay,
  }: { layerRef: RefObject<HTMLDivElement | null>; clip?: string; overlay: string }) => (
    <div className="absolute inset-0" style={clip ? { clipPath: clip, WebkitClipPath: clip } : undefined}>
      {/* moving wrapper holds BOTH the image and the title so the cut shears the word */}
      <div ref={layerRef} className="absolute -inset-[18%] w-[136%] h-[136%] will-change-transform">
        <img
          src={src}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ backgroundColor: overlay }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {subtitle && (
            <p className="text-white/85 text-[11px] md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-6">
              {subtitle}
            </p>
          )}
          <h2 className="font-serif font-light uppercase text-white leading-[0.85] tracking-[0.03em] text-[19vw] md:text-[15vw] lg:text-[12vw]">
            {title}
          </h2>
        </div>
      </div>
    </div>
  )

  return (
    <section ref={ref} className="relative h-[82vh] min-h-[500px] w-full overflow-hidden bg-bg-primary">
      <Layer layerRef={botLayer} overlay="rgba(0,0,0,0.34)" />
      <Layer layerRef={topLayer} clip={topClip} overlay="rgba(0,0,0,0.5)" />
    </section>
  )
}
