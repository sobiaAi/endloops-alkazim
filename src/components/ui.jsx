import { useEffect, useRef, useState } from 'react'

// Shared feel for every button: colours ease, and a slight press-in on click.
export const press = 'transition-[color,background-color,border-color,scale] duration-200 ease-out active:scale-[0.97]'

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Fades its content in once, the first time it scrolls into view.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-shown' : ''} ${className}`} style={{ '--delay': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  )
}

/*
  Section header in the "working paper" style:
    01 — Label            (small, numbered like a file reference)
    ━━━━━━━━━━━━━━━━━━━━  (heavy rule that draws in, like the top of a schedule)
    Heading               Lead text (right column on desktop)
*/
const ACCENTS = {
  teal: { text: 'text-teal', bar: 'bg-teal' },
  blue: { text: 'text-blue', bar: 'bg-blue' },
  violet: { text: 'text-violet', bar: 'bg-violet' },
  green: { text: 'text-brand-deep', bar: 'bg-brand' },
}

export function SectionIntro({ id, number, label, title, lead, tone = 'light', accent = 'teal' }) {
  const dark = tone === 'dark'
  const a = ACCENTS[accent]
  return (
    <Reveal>
      <p className={`text-[13px] font-semibold tabular-nums ${dark ? 'text-white/60' : 'text-ink-soft'}`}>
        <span className={dark ? 'text-white' : a.text}>{number}</span>
        <span className="px-2" aria-hidden="true">
          —
        </span>
        {label}
      </p>
      {/* the rule starts with a short stroke in the section's accent colour */}
      <div className={`rule-draw relative mt-3 h-0.5 ${dark ? 'bg-white/80' : 'bg-ink'}`} aria-hidden="true">
        <span className={`absolute left-0 top-1/2 h-[3px] w-14 -translate-y-1/2 rounded-full ${a.bar}`} />
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:gap-10">
        <h2 id={id} className={`max-w-[18ch] text-h2 font-medium lg:col-span-7 ${dark ? 'text-white' : 'text-ink'}`}>
          {title}
        </h2>
        {lead && (
          <p className={`text-[17px] leading-relaxed lg:col-span-5 lg:pt-2 ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{lead}</p>
        )}
      </div>
    </Reveal>
  )
}

// Auditors' tick marks, used across the site with one fixed meaning each.
export const MARKS = {
  extracted: { glyph: '↧', label: 'extracted', color: 'text-blue' },
  traced: { glyph: '↔', label: 'traced and matched', color: 'text-brand-deep' },
  exception: { glyph: '⚑', label: 'exception', color: 'text-amber-700' },
  cast: { glyph: 'Σ', label: 'cast and totalled', color: 'text-ink' },
  batch: { glyph: '≡', label: 'batch', color: 'text-ink' },
  signed: { glyph: '✓', label: 'signed off by you', color: 'text-violet' },
}
