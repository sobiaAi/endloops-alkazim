import DemoRequestForm from './DemoRequestForm.jsx'

/*
  Hero: the message on the left, and behind it a huge infinity sign (the "loop")
  in a tone just a shade darker than the page, cropped by the top and right edges.
*/
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden px-5 sm:px-8 lg:flex lg:min-h-[calc(100svh-4.5rem)] lg:items-center lg:px-12"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        className="absolute -right-[38%] -top-[18%] -z-10 w-[190%] sm:-right-[30%] sm:w-[150%] lg:-right-[22%] lg:-top-[30%] lg:w-[95%]"
      >
        <path
          d="M500 250 C380 62 112 62 112 250 C112 438 380 438 500 250 C620 62 888 62 888 250 C888 438 620 438 500 250 Z"
          fill="none"
          stroke="#eff2f5"
          strokeWidth="64"
          strokeLinejoin="round"
        />
      </svg>

      <div className="mx-auto grid w-full max-w-[66rem] gap-10 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16 lg:py-6">
        <div>
        <h1 id="hero-title" className="fade-up max-w-[16ch] lg:text-[4.25rem] text-display font-medium text-ink">
          End the{' '}
          <span className="bg-gradient-to-r from-brand-deep via-teal to-blue bg-clip-text text-transparent">loop</span> of
          repetitive finance work.
        </h1>
        <p className="fade-up mt-7 max-w-[34rem] text-lead lg:mt-10 lg:text-[1.375rem] text-ink-soft" style={{ '--delay': '0.16s' }}>
          Endloops reads your invoices, ledgers and statements, matches and checks them, and hands you a draft ready for
          review. The final sign-off stays with you.
        </p>
        <p className="fade-up mt-3 text-[13px] font-semibold lg:mt-5 lg:text-sm text-ink-soft" style={{ '--delay': '0.2s' }}>
          For accountants, auditors, finance teams and property managers
        </p>
        </div>
        <div className="lg:pb-1">
        <div id="demo" className="fade-up max-w-[30rem] scroll-mt-32" style={{ '--delay': '0.24s' }}>
          <DemoRequestForm />
        </div>
        <p className="fade-up mt-3 text-sm text-ink-soft" style={{ '--delay': '0.32s' }}>
          Built inside Alkazim, an accounting and audit firm in Dubai.
        </p>
        </div>
      </div>
    </section>
  )
}
