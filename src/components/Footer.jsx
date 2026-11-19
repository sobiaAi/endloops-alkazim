import logo from '../assets/endloops-logo.png'

const LINKS = [
  ['Solutions', '#solutions'],
  ['Tools', '#tools'],
  ['How it works', '#how-it-works'],
  ['About', '#about'],
  ['Talk to us', '#contact'],
]

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[66rem] flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <img src={logo} alt="Endloops" width="392" height="73" className="h-7 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">Automation for accountants, auditors, finance teams and property managers.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-ink-soft">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="rounded-sm transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-[66rem] flex-col gap-2 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:justify-between">
        <p>© 2026 Endloops. Built inside Alkazim, Dubai.</p>
        <a href="#top" className="rounded-sm transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-blue">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
