import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Divider from './components/Divider'
import Welcome from './components/Welcome'
import FullWidthImage from './components/FullWidthImage'
import Rooms from './components/Rooms'
import Experiences from './components/Experiences'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="bg-warmwhite dark:bg-bg-primary transition-colors duration-500">
      <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      <Hero />
      <div className="relative h-20 -mt-20 z-10 hidden dark:block bg-gradient-to-b from-transparent to-bg-primary" />
      <Divider linesHidden />
      <Welcome />
      <Divider />
      <FullWidthImage
        src="/images/detail-headboard.webp"
        alt="Luxuriöses Detail im Landhaus"
        quote="Wo die Berge den Himmel berühren"
      />
      <Divider />
      <Rooms />
      <Divider />
      <Experiences />
      <Divider />
      <Gallery />
      <Divider />
      <FullWidthImage
        src="/images/detail-antlers.webp"
        alt="Hirschgeweih im Treppenhaus"
        objectPosition="center 65%"
      />
      <Divider />
      <Location />
      <Divider />
      <Contact />
      <Footer />
    </div>
  )
}
