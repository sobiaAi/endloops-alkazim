import { useEffect, useRef, useState } from 'react'

/*
  A small, looping story of one invoice being checked, shown as a product window:
    read it → match each line to the purchase order → flag what doesn't fit → draft ready for review.
  All names and figures are made up for the demo.

  Colour roles (kept consistent so colour means something):
    blue   = Endloops is working on it (reading, in progress)
    green  = matched / done
    amber  = needs attention
    violet = the human decision at the end
    navy   = text and primary actions

  `stage` drives everything. TIMELINE says how long each stage lasts (ms).
  The loop pauses off-screen and on Pause, and never runs for people who prefer reduced motion.
*/

const LINES = [
  { item: 'HVAC maintenance, Q3', amount: 18000 },
  { item: 'Cleaning services, Q3', amount: 21600 },
  { item: 'Pool and gym upkeep', amount: 6000 },
  { item: 'Pest control, extra visit', amount: 1200, notOnPO: true },
]
const SUBTOTAL = LINES.reduce((sum, l) => sum + l.amount, 0) // 46,800
const VAT = SUBTOTAL * 0.05 // 2,340
const TOTAL = SUBTOTAL + VAT // 49,140

// Stages: 0 blank · 1 reading · 2 read · 3–6 matching lines 1–4 · 7 checked · 8 draft ready
const TIMELINE = [700, 2200, 900, 650, 650, 650, 1100, 900, 5200]
const FINAL = TIMELINE.length - 1

const TOOLS = ['Vouching', 'Expense working', 'Reconciliation', 'Report review', 'Tender verification']

const aed = (n) => `AED ${n.toLocaleString('en-US')}`

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function InvoiceDemo() {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [decision, setDecision] = useState(null) // null | 'approved' | 'queried'
  const ref = useRef(null)

  // Each new run of the story starts with no decision made.
  useEffect(() => {
    if (stage === 0) setDecision(null)
  }, [stage])

  // Clicking a decision pauses the loop so the visitor can read the result.
  function decide(choice) {
    setDecision(choice)
    setPaused(true)
  }

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || paused || !visible) return
    const timer = setTimeout(() => setStage((s) => (s >= FINAL ? 0 : s + 1)), TIMELINE[stage])
    return () => clearTimeout(timer)
  }, [stage, paused, visible, reduced])

  const s = reduced ? FINAL : stage
  const reading = s === 1
  const extracted = s >= 2
  const lineState = (i) => (s < 3 + i ? 'pending' : LINES[i].notOnPO ? 'flag' : 'match')
  const matchedCount = LINES.filter((_, i) => lineState(i) === 'match').length

  const steps = [
    {
      title: 'Read the invoice',
      detail: extracted ? `4 lines and a total of ${aed(TOTAL)} extracted` : 'Pulling out vendor, dates, lines and totals',
      state: s === 0 ? 'waiting' : reading ? 'active' : 'done',
    },
    {
      title: 'Match to purchase order PO-2041',
      detail: s >= 3 ? `${matchedCount} of 4 lines match` : 'Comparing every line, quantity and price',
      state: s < 3 ? 'waiting' : s < 7 ? 'active' : 'done',
    },
    {
      title: 'Check against the rules',
      detail: s >= 6 ? '1 line is not on the purchase order' : 'Missing items, duplicates, limits, totals',
      state: s < 6 ? 'waiting' : s === 6 ? 'active' : 'flag',
    },
    {
      title: 'Draft ready for your review',
      detail: s >= FINAL ? 'Working paper prepared with the flag noted' : 'Nothing is final until you approve it',
      state: s < FINAL ? 'waiting' : 'review',
    },
  ]

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
      {/* App chrome */}
      <div className="flex items-center gap-4 border-b border-line bg-white px-4 py-3 sm:px-5">
        <p className="min-w-0 flex-1 truncate text-sm text-ink-soft">
          <span className="hidden sm:inline">PO extraction</span>
          <span className="hidden px-1.5 text-ink/25 sm:inline">/</span>
          <span className="hidden md:inline">Palm Grove Facility Services</span>
          <span className="hidden px-1.5 text-ink/25 md:inline">/</span>
          <span className="font-semibold text-ink">INV-7781</span>
        </p>
        <span className="shrink-0 rounded-full bg-violet/10 px-2.5 py-1 text-xs font-semibold text-violet">
          Sample data
        </span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft transition-[color,border-color,scale] duration-200 hover:border-ink/30 hover:text-ink active:scale-95 focus-visible:outline-2 focus-visible:outline-blue"
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
            {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </div>

      {/* Progress through the check */}
      <div className="h-[3px] bg-line" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-blue via-teal to-violet transition-[width] duration-700 ease-out"
          style={{ width: `${(s / FINAL) * 100}%` }}
        />
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] xl:grid-cols-[12.5rem_1.1fr_1fr]">
        {/* Sidebar: the tools, so the demo reads as part of a product */}
        <nav aria-label="Demo tools (illustration)" className="hidden border-r border-line bg-white p-4 xl:block">
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/80">Tools</p>
          <ul className="space-y-0.5 text-sm">
            <li className="mb-2 flex items-center gap-2.5 rounded-lg bg-blue/[0.08] px-2 py-2 font-semibold text-blue">
              <span className="size-1.5 rounded-full bg-blue" aria-hidden="true" />
              PO extraction
            </li>
            {TOOLS.map((tool) => (
              <li key={tool} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-ink-soft">
                <span className="size-1.5 rounded-full bg-ink/20" aria-hidden="true" />
                {tool}
              </li>
            ))}
          </ul>
        </nav>

        {/* The invoice */}
        <div className="border-b border-line bg-mist/70 p-4 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="relative overflow-hidden rounded-xl border border-line bg-white p-5 shadow-[0_8px_30px_-12px_rgba(18,28,43,0.12)] sm:p-6">
            {reading && (
              <div aria-hidden="true" className="scan-line pointer-events-none absolute inset-0">
                <div className="h-16 bg-gradient-to-b from-transparent via-blue/15 to-transparent" />
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Tax invoice</p>
                <p className={`mt-1 text-base font-semibold text-ink ${field(extracted)}`}>Palm Grove Facility Services LLC</p>
              </div>
              <div className="text-right text-xs leading-5 text-ink-soft">
                <p className={field(extracted)}>INV-7781</p>
                <p className={field(extracted)}>12 Oct 2026</p>
              </div>
            </div>

            <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
              {LINES.map((line, i) => {
                const st = lineState(i)
                return (
                  <li
                    key={line.item}
                    className={`flex items-center gap-3 py-2.5 transition-colors duration-500 ${
                      st === 'flag' ? '-mx-2 rounded-md bg-amber-50 px-2' : ''
                    }`}
                  >
                    <LineMark state={st} />
                    <span className={`flex-1 ${st === 'flag' ? 'text-amber-900' : 'text-ink'}`}>{line.item}</span>
                    <span className={`tabular-nums ${st === 'flag' ? 'font-semibold text-amber-900' : 'text-ink'}`}>
                      {line.amount.toLocaleString('en-US')}
                    </span>
                  </li>
                )
              })}
            </ul>

            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-ink-soft">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{SUBTOTAL.toLocaleString('en-US')}</dd>
              </div>
              <div className="flex justify-between text-ink-soft">
                <dt>VAT 5%</dt>
                <dd className="tabular-nums">{VAT.toLocaleString('en-US')}</dd>
              </div>
              <div className="flex justify-between pt-1 text-base font-semibold text-ink">
                <dt>Total</dt>
                <dd className={`tabular-nums ${field(extracted)}`}>{aed(TOTAL)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* What Endloops is doing */}
        {/* On phones this sits above the invoice, so the steps are visible while they happen. */}
        <div className="order-first flex flex-col border-b border-line bg-white p-5 sm:p-7 lg:order-none lg:border-b-0">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft/80">Endloops activity</p>
          <ol className="space-y-5" aria-label="Checking steps">
            {steps.map((step) => (
              <li key={step.title} className="flex gap-3.5">
                <StepMark state={step.state} />
                <div className={`transition-opacity duration-500 ${step.state === 'waiting' ? 'opacity-45' : 'opacity-100'}`}>
                  <p className="text-[15px] font-semibold text-ink">{step.title}</p>
                  <p
                    className={`mt-0.5 text-sm ${
                      step.state === 'flag' ? 'text-amber-800' : step.state === 'active' ? 'text-blue' : 'text-ink-soft'
                    }`}
                  >
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Review card: the professional makes the final call */}
          <div
            className={`mt-7 rounded-xl border border-violet/25 bg-violet/[0.05] p-4 transition-[opacity,translate] duration-700 ease-[var(--ease-glide)] ${
              s >= FINAL ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
            inert={s < FINAL}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet">Your decision</p>
            <p className="mt-1.5 text-sm text-ink">Pest control, extra visit (AED 1,200) was not on PO-2041.</p>
            {decision ? (
              <p role="status" className="fade-in mt-3.5 flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="flex size-5 items-center justify-center rounded-full bg-brand text-white" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" className="size-3">
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {decision === 'approved' ? 'Approved. Your note is on the working paper.' : 'Query drafted to the vendor for your review.'}
              </p>
            ) : (
              <div className="mt-3.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => decide('approved')}
                  className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-[background-color,scale] duration-200 hover:bg-[#0b1420] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  Approve with note
                </button>
                <button
                  type="button"
                  onClick={() => decide('queried')}
                  className="rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-semibold text-ink transition-[border-color,scale] duration-200 hover:border-ink/40 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  Query vendor
                </button>
              </div>
            )}
          </div>

          <p className="sr-only" aria-live="polite">
            {s >= FINAL ? 'Check complete. 3 of 4 lines matched. 1 line flagged for your decision.' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

// Extracted fields get a soft blue highlight: "Endloops read this".
const field = (on) => `transition-colors duration-500 ${on ? '-mx-1 rounded bg-blue/10 px-1 text-ink' : ''}`

function LineMark({ state }) {
  if (state === 'match')
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white" role="img" aria-label="Matched">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3">
          <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  if (state === 'flag')
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-white" role="img" aria-label="Flagged">
        !
      </span>
    )
  return <span className="size-5 shrink-0 rounded-full border border-dashed border-ink/25" aria-hidden="true" />
}

function StepMark({ state }) {
  const base = 'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-500'
  if (state === 'done')
    return (
      <span className={`${base} bg-brand text-white`}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
          <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  if (state === 'flag') return <span className={`${base} bg-amber-500 text-xs font-bold text-white`}>!</span>
  if (state === 'review')
    return (
      <span className={`${base} bg-violet text-white`}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
          <path d="M8 3.5v5M8 11.5v.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
    )
  if (state === 'active')
    return (
      <span className={`${base} border border-blue`}>
        <span className="size-2 animate-pulse rounded-full bg-blue" />
      </span>
    )
  return <span className={`${base} border border-ink/20`} />
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3">
      <rect x="4" y="3" width="2.6" height="10" rx="1" fill="currentColor" />
      <rect x="9.4" y="3" width="2.6" height="10" rx="1" fill="currentColor" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3">
      <path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5z" fill="currentColor" />
    </svg>
  )
}
