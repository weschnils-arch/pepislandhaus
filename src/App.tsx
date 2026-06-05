import { useState, useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import CoreBand from './components/CoreBand'
import Rooms from './components/Rooms'
import Offers from './components/Offers'
import Experiences from './components/Experiences'
import Gallery from './components/Gallery'
import Location from './components/Location'
import BookingBar from './components/BookingBar'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import { LanguageContext, useLangFromParams, createT, SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from './i18n'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const lang = useLangFromParams()
  const navigate = useNavigate()

  if (!SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}/`} replace />
  }

  const t = useMemo(() => createT(lang), [lang])

  const setLang = (newLang: Lang) => {
    if (newLang !== lang) {
      navigate(`/${newLang}/`, { replace: true })
    }
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t('meta.title')

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'))

    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]')
    existingHreflangs.forEach(el => el.remove())

    SUPPORTED_LANGS.forEach(l => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = l
      link.href = `${window.location.origin}/${l}/`
      document.head.appendChild(link)
    })

    const xDefault = document.createElement('link')
    xDefault.rel = 'alternate'
    xDefault.hreflang = 'x-default'
    xDefault.href = `${window.location.origin}/${DEFAULT_LANG}/`
    document.head.appendChild(xDefault)
  }, [lang, t])

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      <div className="bg-warmwhite dark:bg-bg-primary transition-colors duration-500">
        <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
        <Hero />
        <Welcome />
        <CoreBand src="/images/natur.webp" title={t('core1.title')} subtitle={t('core1.subtitle')} />
        <Rooms />
        <Offers />
        <CoreBand src="/images/genuss.webp" title={t('core2.title')} subtitle={t('core2.subtitle')} objectPosition="center 55%" />
        <Experiences />
        <Gallery />
        <CoreBand src="/images/room-ruhe.webp" title={t('core3.title')} subtitle={t('core3.subtitle')} objectPosition="center 60%" />
        <Location />
        <BookingBar />
        <Contact />
        <Footer />
        <ChatWidget />
      </div>
    </LanguageContext.Provider>
  )
}
