import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FullWidthImageProps {
  src: string
  alt: string
  quote?: string
  objectPosition?: string
}

export default function FullWidthImage({ src, alt, quote, objectPosition }: FullWidthImageProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (clipRef.current) {
        gsap.fromTo(
          clipRef.current,
          { clipPath: 'inset(0 35% 0 35%)' },
          {
            clipPath: 'inset(0 0% 0 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 100%',
              end: 'top 40%',
              scrub: true,
            },
          }
        )
      }

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-warmwhite dark:bg-bg-primary transition-colors duration-500">
      <div ref={clipRef} className="absolute inset-0" style={{ clipPath: 'inset(0 35% 0 35%)' }}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20" />

        {quote && (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="font-serif text-white text-2xl md:text-4xl lg:text-5xl font-light text-center max-w-3xl leading-[1.2] italic">
              "{quote}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
