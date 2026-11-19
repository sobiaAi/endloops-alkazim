import { useEffect, useState } from 'react'
import logo from '../assets/endloops-logo.png'

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Tools', href: '#tools' },
  { label: 'About', href: '#about' },
]

// Shared feel for every button: colours ease, and a slight press-in on click.
const press = 'transition-[color,background-color,border-color,scale] duration-200 ease-out active:scale-[0.97]'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Add a hairline border and frosted background once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with Escape, or when the screen grows to desktop size.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onResize = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [open])

  const solid = scrolled || open
  const close = () => setOpen(false)

  return (
    <header

      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? 'border-b border-line bg-white/90 shadow-[0_1px_12px_rgba(18,28,43,0.04)] backdrop-blur-md'
          : 'border-b border-transparent bg-white'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        {/* Left: logo */}
        <a href="#top" className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue">
          <img src={logo} alt="Endloops home" width="392" height="73" className="h-7 w-auto sm:h-8" />
        </a>

        {/* Centre: page links (desktop) */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-full px-4 py-2 text-[15px] font-medium text-ink-soft hover:bg-mist hover:text-ink focus-visible:outline-2 focus-visible:outline-blue ${press}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: two actions (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contact"
            className={`rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${press}`}
          >
            Talk to us
          </a>
          <a
            href="#how-it-works"
            className={`group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b1420] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${press}`}
          >
            Watch it work
            <ArrowIcon className="size-4 text-brand transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile menu button: the two bars turn into an X */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-mist focus-visible:outline-2 focus-visible:outline-blue lg:hidden ${press}`}
        >
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.8px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-glide)] ${
                open ? 'translate-y-[6.1px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.8px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-glide)] ${
                open ? '-translate-y-[6.1px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu panel: slides open by animating its height (grid 0fr → 1fr) */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-glide)] lg:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line bg-white px-5 pb-6 pt-2 sm:px-8">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={close} className="block border-b border-line py-4 text-base font-medium text-ink transition-colors hover:text-blue">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href="#contact" onClick={close} className={`rounded-full border border-ink/15 px-5 py-3 text-center text-sm font-semibold text-ink ${press}`}>
                Talk to us
              </a>
              <a
                href="#how-it-works"
                onClick={close}
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white ${press}`}
              >
                Watch it work
                <ArrowIcon className="size-4 text-brand" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function ArrowIcon({ className }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
