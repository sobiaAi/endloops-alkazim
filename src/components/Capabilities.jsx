import { MARKS, Reveal, SectionIntro } from './ui.jsx'

/*
  The technology, named rather than explained: the demo above already shows it working.
  One strip of six columns: five things the software does, then the step that stays with people.
  Each column: an auditor's mark, one big verb, a few words.
*/

const ITEMS = [
  { mark: 'extracted', verb: 'Reads', note: 'Invoices, POs, contracts, statements' },
  { mark: 'traced', verb: 'Matches', note: 'Documents against ledgers and quotes' },
  { mark: 'exception', verb: 'Flags', note: 'Gaps, duplicates, totals, limits' },
  { mark: 'cast', verb: 'Drafts', note: 'Schedules, working papers, reports' },
  { mark: 'batch', verb: 'Scales', note: 'Hundreds of documents at once' },
  { mark: 'signed', verb: 'You decide', note: 'A person reviews and approves every result' },
]

export default function Capabilities() {
  return (
    <section aria-labelledby="abilities-title" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[66rem]">
        <SectionIntro id="abilities-title" number="03" accent="violet" label="The technology" title="One engine behind every product." />

        <Reveal as="ul" className="mt-14 grid grid-cols-2 border-t border-line sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map((item, i) => {
            const m = MARKS[item.mark]
            const human = item.mark === 'signed'
            return (
              <li
                key={item.verb}
                className={`border-b border-line py-8 pr-4 lg:border-b-0 ${i > 0 ? 'lg:border-l lg:pl-6' : ''} ${
                  human ? 'lg:bg-violet/[0.04]' : ''
                }`}
              >
                <span className={`text-lg font-semibold ${m.color}`} aria-hidden="true">
                  {m.glyph}
                </span>
                <p className={`mt-4 text-h3 font-medium ${human ? 'text-violet' : 'text-ink'}`}>{item.verb}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.note}</p>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
