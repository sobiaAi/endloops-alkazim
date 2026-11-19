import InvoiceDemo from './InvoiceDemo.jsx'
import { SectionIntro } from './ui.jsx'

// The one navy band on the page: just the product on navy, nothing decorative around it.
export default function DemoSection() {
  return (
    <section id="how-it-works" aria-labelledby="demo-title" className="scroll-mt-16 bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[66rem]">
        <SectionIntro
          id="demo-title"
          tone="dark"
          number="01" accent="blue"
          label="Product demo"
          title="It does the checking. You make the call."
          lead="Watch Endloops read an invoice, match it to its purchase order and flag what doesn’t fit. Then you decide what happens next."
        />
        <div className="mt-12 lg:mt-16">
          <InvoiceDemo />
        </div>
        <p className="mt-6 text-sm text-white/55">Sample data. One invoice here; in practice Endloops works through hundreds at once.</p>
      </div>
    </section>
  )
}
