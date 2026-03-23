import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrival: '',
    departure: '',
    guests: '',
    message: '',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-header', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 88%' },
        }
      )
      gsap.fromTo(
        '.contact-info',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-info', start: 'top 88%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Anfrage - Pepi\'s Landhaus')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\nAnreise: ${formData.arrival}\nAbreise: ${formData.departure}\nGäste: ${formData.guests}\n\nNachricht:\n${formData.message}`
    )
    window.location.href = `mailto:info@pepis-landhaus.at?subject=${subject}&body=${body}`
  }

  const inputClasses = 'w-full bg-transparent border border-charcoal/15 dark:border-text-primary/12 px-4 py-3 text-sm text-charcoal dark:text-text-primary outline-none focus:border-forest dark:focus:border-accent transition-colors placeholder:text-charcoal/30 dark:placeholder:text-text-tertiary'

  return (
    <section ref={sectionRef} id="kontakt" className="pt-8 md:pt-12 pb-24 md:pb-36 bg-cream dark:!bg-[#0A0A0A] relative transition-colors duration-500">
      <div className="absolute inset-0 grain" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="contact-header text-center mb-16 md:mb-20">
          <p className="text-sage dark:text-accent text-[12px] font-medium tracking-[0.25em] uppercase mb-4">
            Anfrage
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-text-primary font-light tracking-[-0.02em]">
            Kontaktieren <span className="italic text-forest dark:text-accent">Sie uns</span>
          </h2>
          <p className="text-charcoal/60 dark:text-text-secondary mt-6 max-w-xl mx-auto leading-relaxed">
            Haben Sie Fragen oder möchten eine individuelle Anfrage stellen?
            Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <form onSubmit={handleSubmit} className="contact-form lg:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
              />
              <input
                type="email"
                placeholder="E-Mail *"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
              />
            </div>

            <input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClasses}
            />

            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-charcoal/50 dark:text-text-tertiary text-[11px] tracking-[0.1em] uppercase mb-2">
                  Anreise
                </label>
                <input
                  type="date"
                  value={formData.arrival}
                  onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-charcoal/50 dark:text-text-tertiary text-[11px] tracking-[0.1em] uppercase mb-2">
                  Abreise
                </label>
                <input
                  type="date"
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-charcoal/50 dark:text-text-tertiary text-[11px] tracking-[0.1em] uppercase mb-2">
                  Anzahl Gäste
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className={`${inputClasses} appearance-none`}
                >
                  <option value="">Wählen</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              placeholder="Ihre Nachricht..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClasses} resize-none`}
            />

            <button
              type="submit"
              className="bg-forest dark:bg-accent text-white dark:text-bg-primary text-[13px] font-medium tracking-[0.15em] uppercase px-10 py-4 hover:bg-forest-light dark:hover:bg-accent-hover transition-colors duration-300"
            >
              Anfrage senden
            </button>
          </form>

          <div className="contact-info lg:col-span-2 space-y-10">
            <div>
              <h3 className="font-serif text-xl text-charcoal dark:text-text-primary font-light mb-4">Direkt buchen</h3>
              <p className="text-charcoal/60 dark:text-text-secondary text-sm leading-relaxed mb-4">
                Buchen Sie direkt über unsere Website und profitieren Sie von den besten Preisen
                ohne Vermittlungsgebühren.
              </p>
              <a
                href="#buchen"
                className="inline-block text-[12px] font-medium tracking-[0.15em] uppercase text-forest dark:text-accent border border-forest/20 dark:border-accent/20 px-6 py-3 hover:bg-forest hover:text-white dark:hover:bg-accent dark:hover:text-bg-primary transition-all duration-300"
              >
                Verfügbarkeit prüfen
              </a>
            </div>

            <div className="border-t border-charcoal/10 dark:border-text-primary/10 pt-8">
              <h3 className="font-serif text-xl text-charcoal dark:text-text-primary font-light mb-4">Kontaktdaten</h3>
              <div className="space-y-3 text-sm text-charcoal/60">
                <p>
                  <span className="text-charcoal/40 dark:text-text-tertiary text-[11px] tracking-[0.1em] uppercase block mb-1">Telefon</span>
                  +43 (0) 5675 XXXXX
                </p>
                <p>
                  <span className="text-charcoal/40 dark:text-text-tertiary text-[11px] tracking-[0.1em] uppercase block mb-1">E-Mail</span>
                  info@pepis-landhaus.at
                </p>
                <p>
                  <span className="text-charcoal/40 dark:text-text-tertiary text-[11px] tracking-[0.1em] uppercase block mb-1">Adresse</span>
                  Tannheimer Tal, Tirol, Österreich
                </p>
              </div>
            </div>

            <div className="border-t border-charcoal/10 dark:border-text-primary/10 pt-8">
              <h3 className="font-serif text-xl text-charcoal dark:text-text-primary font-light mb-4">Auch buchbar über</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.booking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.08em] uppercase text-charcoal/50 dark:text-text-tertiary bg-charcoal/5 dark:bg-text-primary/5 px-4 py-2 hover:bg-charcoal/10 dark:hover:bg-text-primary/10 transition-colors"
                >
                  Booking.com
                </a>
                <a
                  href="https://buchung.tannheimertal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.08em] uppercase text-charcoal/50 dark:text-text-tertiary bg-charcoal/5 dark:bg-text-primary/5 px-4 py-2 hover:bg-charcoal/10 dark:hover:bg-text-primary/10 transition-colors"
                >
                  Tannheimertal.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
