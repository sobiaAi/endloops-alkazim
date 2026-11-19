import { useState } from 'react'
import { Reveal, SectionIntro, press } from './ui.jsx'

/*
  "What we build", shown rather than told.
  Top tile: end-to-end solutions as a flow (documents in → Endloops steps → you sign off → draft out).
            Pick a solution and the inputs and output change.
  Bottom tiles: each standalone tool as a tiny picture of what it does.
  Inspired by bento layouts (Stripe), product fragments on a light canvas (Ramp)
  and connected-node diagrams (Alkazim).
*/

const SOLUTIONS = [
  { name: 'Financial audit', input: ['Trial balance', 'Ledgers', 'Invoices'], output: 'Draft working papers' },
  { name: 'Interim audit', input: ['Mid-year ledgers', 'Sample documents'], output: 'Interim findings' },
  { name: 'Escrow audit', input: ['Escrow statements', 'Payment records'], output: 'Escrow audit draft' },
  { name: 'Budget review', input: ['Proposed budget', 'Past actuals'], output: 'Review notes' },
  { name: 'Budget preparation', input: ['Past costs', 'Service contracts'], output: 'Draft annual budget' },
]

const STEPS = [
  ['Read', 'text-blue'],
  ['Match', 'text-brand-deep'],
  ['Check', 'text-amber-700'],
  ['Draft', 'text-ink'],
]

export default function Offerings() {
  const [active, setActive] = useState(0)
  const solution = SOLUTIONS[active]

  return (
    <section id="solutions" aria-labelledby="offerings-title" className="scroll-mt-16 bg-mist px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[66rem]">
        <SectionIntro
          id="offerings-title"
          number="02" accent="teal"
          label="What we build"
          title="Hand over a whole process, or one task."
          lead="End-to-end solutions run a full service. Standalone tools do one job well. Either way, you sign off."
        />

        {/* End-to-end solutions */}
        <Reveal className="mt-14 rounded-3xl border border-line bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-soft">End-to-end solutions</p>
              <h3 className="mt-2 text-h3 font-medium text-ink">We run the whole process.</h3>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a solution">
              {SOLUTIONS.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${press} ${
                    i === active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft hover:border-ink/30 hover:text-ink'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* The flow */}
          <div className="mt-10 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            {/* In */}
            <div key={`in-${active}`} className="fade-in rounded-2xl border border-line p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Documents in</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {solution.input.map((doc) => (
                  <li key={doc} className="flex items-center gap-2 rounded-lg bg-mist px-3 py-2 text-sm text-ink">
                    <DocIcon />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Endloops steps, joined by a dashed line with a travelling dot */}
            <div className="relative px-1 py-6 lg:px-0">
              <div aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/25" />
              {/* Each step takes its turn, in order, like a checklist being worked through */}
              <ol className="relative flex justify-between gap-2 sm:gap-3" aria-label="What Endloops does">
                {STEPS.map(([step, color], i) => (
                  <li
                    key={step}
                    style={{ '--i': i }}
                    className="flow-step flex flex-col items-center rounded-xl border border-line bg-white px-3 py-2.5 sm:px-4"
                  >
                    <span className={`text-[11px] font-semibold tabular-nums ${color}`}>0{i + 1}</span>
                    <span className="text-sm font-semibold text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Out: always passes through the professional */}
            <div key={`out-${active}`} className="fade-in rounded-2xl border border-violet/25 bg-violet/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet">You sign off</p>
              <p className="mt-3 flex items-center gap-2.5 text-[15px] font-semibold text-ink">
                <span className="flex size-6 items-center justify-center rounded-full bg-violet text-xs text-white" aria-hidden="true">
                  ✓
                </span>
                {solution.output}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Standalone tools */}
        {/* Same frame, label style and heading size as the solutions card: both offers are equals. */}
        <Reveal id="tools" className="mt-5 scroll-mt-24 rounded-3xl border border-line bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Standalone tools</p>
              <h3 className="mt-2 text-h3 font-medium text-ink">One job, done well.</h3>
            </div>
            <p className="text-[15px] text-ink-soft">Use one on its own, inside the way you already work.</p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Warm grey cards with no border; on hover the card lifts, lightens and casts a soft shadow. */}
            {TOOLS.map((tool) => (
              <li
                key={tool.name}
                className="flex flex-col rounded-2xl bg-sand p-5 transition-[translate,background-color,box-shadow] duration-500 ease-[var(--ease-glide)] hover:-translate-y-1 hover:bg-[#f8f7f5] hover:shadow-[0_28px_60px_-28px_rgba(18,28,43,0.35)]"
              >
                <div aria-hidden="true" className="flex h-36 items-center justify-center p-4">
                  {tool.visual}
                </div>
                <p className="mt-4 font-semibold text-ink">{tool.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{tool.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mt-8 text-sm text-ink-soft">The list grows as more everyday finance work gets automated.</p>
      </div>
    </section>
  )
}

/* ---------- Tiny pictures, one per tool (decorative; the name and line carry the meaning) ---------- */

const card ='w-full max-w-[15rem] rounded-xl border border-line bg-white p-3 text-[11px] shadow-[0_8px_24px_-14px_rgba(18,28,43,0.3)]'
const bar = (w) => <span className={`block h-1.5 rounded-full bg-ink/10 ${w}`} />

const TOOLS = [
  {
    name: 'Purchase-order extraction',
    line: 'Pulls supplier, items and prices out of POs.',
    visual: (
      <div className={card}>
        <p className="font-semibold text-ink">PO-2041</p>
        <div className="mt-2 space-y-1.5">
          {[
            ['Supplier', 'Palm Grove'],
            ['Items', '3 lines'],
            ['Total', 'AED 47,880'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-ink-soft">{k}</span>
              <span className="rounded bg-blue/10 px-1.5 py-0.5 font-semibold text-blue">{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Vouching',
    line: 'Traces ledger entries to the documents behind them.',
    visual: (
      <div className="flex w-full max-w-[15rem] items-center gap-2">
        <div className={`${card} flex-1`}>
          <p className="text-ink-soft">Ledger</p>
          <p className="mt-1 font-semibold tabular-nums text-ink">AED 5,000</p>
        </div>
        <span className="font-semibold text-brand-deep">↔</span>
        <div className={`${card} flex-1`}>
          <p className="text-ink-soft">Receipt</p>
          <p className="mt-1 font-semibold text-brand-deep">✓ found</p>
        </div>
      </div>
    ),
  },
  {
    name: 'Expense working',
    line: 'Sorts and checks expenses into a working paper.',
    visual: (
      <div className={`${card} space-y-2`}>
        {[
          ['Taxi, airport', 'Travel', 'bg-blue/10 text-blue'],
          ['DEWA bill', 'Utilities', 'bg-teal/10 text-teal'],
          ['Printer ink', 'Office', 'bg-violet/10 text-violet'],
        ].map(([item, tag, c]) => (
          <div key={item} className="flex items-center justify-between gap-2">
            <span className="text-ink">{item}</span>
            <span className={`rounded px-1.5 py-0.5 font-semibold ${c}`}>{tag}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Financial report review',
    line: 'Catches errors before the report goes out.',
    visual: (
      <div className={`${card} space-y-2`}>
        {bar('w-full')}
        {bar('w-5/6')}
        <div className="-mx-1 flex items-center gap-1.5 rounded bg-amber-50 px-1 py-0.5 text-amber-900">
          <span className="font-semibold text-amber-700">⚑</span> Note 7 total ≠ balance sheet
        </div>
        {bar('w-4/6')}
      </div>
    ),
  },
  {
    name: 'Tender verification',
    line: 'Compares quotes and checks the choice holds up.',
    visual: (
      <div className={`${card} space-y-2`}>
        {[
          ['Quote A', 'w-[85%]', 'bg-ink/15', ''],
          ['Quote B', 'w-[62%]', 'bg-brand', '✓'],
          ['Quote C', 'w-[94%]', 'bg-ink/15', ''],
        ].map(([q, w, c, tick]) => (
          <div key={q} className="flex items-center gap-2">
            <span className="w-12 text-ink-soft">{q}</span>
            <span className="h-2 flex-1 rounded-full bg-mist">
              <span className={`block h-2 rounded-full ${w} ${c}`} />
            </span>
            <span className="w-3 font-semibold text-brand-deep">{tick}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Reconciliation',
    line: 'Finds and explains gaps between two records.',
    visual: (
      <div className={card}>
        <div className="flex justify-between">
          <span className="text-ink-soft">Books</span>
          <span className="tabular-nums text-ink">100,000</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-ink-soft">Bank</span>
          <span className="tabular-nums text-ink">97,000</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-line pt-2 font-semibold">
          <span className="text-amber-700">Difference</span>
          <span className="tabular-nums text-amber-700">3,000</span>
        </div>
        <p className="mt-1.5 text-brand-deep">✓ Explained: deposit in transit</p>
      </div>
    ),
  },
]

function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5 text-ink-soft">
      <path d="M4 1.5h5l3 3v10H4z M9 1.5v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}
