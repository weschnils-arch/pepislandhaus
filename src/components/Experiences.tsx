import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    title: 'Skifahren & Snowboard',
    description: 'Erstklassige Skigebiete direkt vor der Haustür. Das Tannheimer Tal bietet perfekte Pisten für Anfänger und Profis.',
    image: '/images/winter-2.webp',
    season: 'Winter',
  },
  {
    title: 'Wandern & Bergtouren',
    description: 'Über 300 km markierte Wanderwege durch die spektakuläre Berglandschaft der Tannheimer Berge.',
    image: '/images/exterior-summer-1.webp',
    season: 'Sommer',
  },
  {
    title: 'Kulinarik & Genuss',
    description: 'Traditionelle Tiroler Küche und regionale Spezialitäten in den Gasthöfen und Almhütten der Umgebung.',
    image: '/images/room-dining-1.webp',
    season: 'Ganzjährig',
  },
  {
    title: 'Erholung & Wellness',
    description: 'Entspannen Sie in der Natur. Ruhige Spaziergänge, Yoga im Grünen und heilende Bergluft für Körper und Seele.',
    image: '/images/garden-1.webp',
    season: 'Ganzjährig',
  },
]

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-header', start: 'top 85%' },
        }
      )

      document.querySelectorAll('.exp-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="erlebnisse" className="pt-8 md:pt-12 pb-24 md:pb-36 px-6 md:px-10 lg:px-16 bg-warmwhite dark:bg-bg-primary transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto">
        <div className="exp-header text-center mb-16 md:mb-20">
          <p className="text-sage dark:text-accent text-[12px] font-medium tracking-[0.25em] uppercase mb-4">
            Erlebnisse
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light tracking-[-0.02em]">
            Das Tannheimer Tal <span className="italic text-forest dark:text-accent">erleben</span>
          </h2>
          <p className="text-charcoal/60 dark:text-text-secondary mt-6 max-w-xl mx-auto leading-relaxed">
            Ob Sommer oder Winter — das Tannheimer Tal bietet zu jeder Jahreszeit
            unvergessliche Erlebnisse für Naturliebhaber und Aktivurlauber.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="exp-card group relative h-[400px] md:h-[480px] overflow-hidden cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-500" />

              <div className="absolute top-5 left-5">
                <span className="text-white/50 text-[10px] font-medium tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm px-3 py-1.5">
                  {exp.season}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl md:text-2xl text-white font-light mb-2">
                  {exp.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-24 overflow-hidden">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.tannheimertal.at"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.15em] uppercase text-forest dark:text-accent border border-forest/20 dark:border-accent/20 px-8 py-3.5 hover:bg-forest hover:text-white dark:hover:bg-accent dark:hover:text-bg-primary transition-all duration-300"
          >
            Mehr Aktivitäten entdecken
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
