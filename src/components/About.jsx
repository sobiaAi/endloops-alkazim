import { Reveal, SectionIntro } from './ui.jsx'

const AUDIENCES = [
  ['Accountants', 'Less time keying and ticking, more time with clients.'],
  ['Auditors', 'Documents read, matched and checked before you start reviewing.'],
  ['Finance teams', 'Month-end tasks prepared, not piled up.'],
  ['Property management companies', 'Budgets, service charges and escrow, handled with care.'],
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 bg-mist/60 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[66rem]">
        <SectionIntro
          id="about-title"
          number="04" accent="green"
          label="About us"
          title="Built inside an audit firm, for people who do the work."
          lead="Endloops started as the technology department of Alkazim, an accounting and audit firm in Dubai. Software built to automate the firm’s own work became a company of its own."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="space-y-4 text-[17px] leading-relaxed text-ink-soft lg:col-span-5">
            <p>
              Every product is shaped by daily audit and accounting practice, where detail and deadlines matter and tools
              have to be trusted.
            </p>
            <p className="border-l-2 border-blue pl-4 text-ink">
              <span className="font-semibold">Where we’re heading:</span> automation that finance teams across the Gulf can rely on, from first document to final sign-off.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Who it’s for</p>
            <ol className="mt-4 border-t border-ink/70">
              {AUDIENCES.map(([who, why], i) => (
                <li key={who} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[2.5rem_15rem_1fr]">
                  <span className="text-[13px] font-semibold tabular-nums text-teal">0{i + 1}</span>
                  <span className="font-semibold text-ink">{who}</span>
                  <span className="col-start-2 text-[15px] text-ink-soft sm:col-start-auto">{why}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
