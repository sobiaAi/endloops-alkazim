import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DemoSection from './components/DemoSection.jsx'
import Offerings from './components/Offerings.jsx'
import Capabilities from './components/Capabilities.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <div id="top" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <DemoSection />
        <Offerings />
        <Capabilities />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
