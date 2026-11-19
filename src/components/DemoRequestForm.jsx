import { useId, useState } from 'react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(value) {
  const email = value.trim()
  if (!email) return 'Please enter your work email.'
  if (!EMAIL_PATTERN.test(email)) return 'That doesn’t look like an email address. Check for typos.'
  return ''
}

/*
  Email + "Get a demo" in one pill.
  Validation runs on submit, then live as the person fixes the field.
  Note: there is no backend yet, so a valid submit only shows the thank-you state.
*/
export default function DemoRequestForm() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const message = validate(email)
    setTouched(true)
    setError(message)
    if (!message) setSent(true)
  }

  function handleChange(e) {
    setEmail(e.target.value)
    if (touched) setError(validate(e.target.value))
  }

  if (sent) {
    return (
      <div role="status" className="fade-up flex max-w-[30rem] items-start gap-3 rounded-2xl border border-brand/25 bg-brand/[0.06] px-5 py-4">
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-[15px] leading-relaxed text-ink">
          <span className="font-semibold">Thanks, request received.</span> We’ll email{' '}
          <span className="font-semibold">{email.trim()}</span> to find a time for your demo. <span className="text-ink-soft">(Demo build: nothing is actually sent.)</span>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-[30rem]">
      <label htmlFor={`${id}-email`} className="sr-only">
        Work email
      </label>
      <div
        className={`flex items-center gap-2 rounded-full border bg-white p-1.5 shadow-[0_2px_20px_rgba(18,28,43,0.06)] transition-[border-color,box-shadow] duration-300 focus-within:border-blue/50 focus-within:shadow-[0_0_0_4px_rgba(47,111,235,0.10)] ${
          error ? 'border-red-500/70' : 'border-line'
        }`}
      >
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your work email"
          value={email}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent pl-4 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none"
        />
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-[background-color,scale] duration-200 ease-out hover:bg-[#0b1420] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          Get a demo
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 text-brand transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p id={`${id}-error`} role="alert" className="min-h-6 pl-5 pt-2 text-sm text-red-700">
        {error && (
          <span key={error} className="fade-in inline-block">
            {error}
          </span>
        )}
      </p>
    </form>
  )
}
