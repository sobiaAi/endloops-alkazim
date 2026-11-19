import { useId, useState } from 'react'
import { EMAIL_PATTERN, Reveal, SectionIntro, press } from './ui.jsx'

/*
  Contact form with validation.
  Errors show after the first submit, then update live as fields are fixed.
  There is no backend yet: a valid submit only shows the confirmation.
*/

const INTERESTS = ['An end-to-end solution', 'A standalone tool', 'Not sure yet']

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) e.email = 'Please enter your work email.'
  else if (!EMAIL_PATTERN.test(v.email.trim())) e.email = 'That doesn’t look like an email address.'
  if (!v.company.trim()) e.company = 'Please enter your company.'
  if (!v.interest) e.interest = 'Please choose one.'
  return e
}

export default function Contact() {
  const id = useId()
  const [values, setValues] = useState({ name: '', email: '', company: '', interest: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)

  function update(field, value) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (submitted) setErrors(validate(next))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setSubmitted(true)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) document.getElementById(`${id}-${first}`)?.focus()
    else setSent(true)
  }

  const fieldClass = (name) =>
    `mt-1 w-full border-0 border-b bg-transparent px-0 py-3 text-[17px] text-ink placeholder:text-ink-soft transition-[border-color] duration-200 focus:border-ink focus:outline-none ${
      errors[name] ? 'border-red-600' : 'border-ink/25'
    }`

  const errorText = (name) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="fade-in mt-1.5 text-sm text-red-700">
        {errors[name]}
      </p>
    ) : null

  const a11y = (name) => ({
    id: `${id}-${name}`,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  })

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[66rem]">
        <SectionIntro
          id="contact-title"
          number="05" accent="blue"
          label="Talk to us"
          title="Tell us which task takes the most time."
          lead="We’ll show you how Endloops would handle it, using examples close to your own work."
        />
        <div className="mt-14 lg:ml-[calc(5/12*100%)]">

        <Reveal delay={0.1}>
          {sent ? (
            <div role="status" className="fade-up flex h-full flex-col justify-center rounded-2xl border border-brand/25 bg-brand/[0.06] p-8">
              <p className="text-h3 font-medium text-ink">Thank you, {values.name.trim().split(' ')[0]}.</p>
              <p className="mt-2 text-ink-soft">
                We’ll be in touch at <span className="font-semibold text-ink">{values.email.trim()}</span>. <span className="text-sm">(Demo build: nothing is actually sent.)</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="text-sm font-semibold text-ink">Name</label>
                <input {...a11y('name')} autoComplete="name" value={values.name} onChange={(e) => update('name', e.target.value)} className={fieldClass('name')} />
                {errorText('name')}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="text-sm font-semibold text-ink">Work email</label>
                <input {...a11y('email')} type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => update('email', e.target.value)} className={fieldClass('email')} />
                {errorText('email')}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-company`} className="text-sm font-semibold text-ink">Company</label>
                <input {...a11y('company')} autoComplete="organization" value={values.company} onChange={(e) => update('company', e.target.value)} className={fieldClass('company')} />
                {errorText('company')}
              </div>
              <fieldset className="sm:col-span-2" aria-describedby={errors.interest ? `${id}-interest-error` : undefined}>
                <legend className="text-sm font-semibold text-ink">I’m interested in</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {INTERESTS.map((option, i) => (
                    <label key={option} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${id}-interest`}
                        id={i === 0 ? `${id}-interest` : undefined}
                        value={option}
                        checked={values.interest === option}
                        onChange={() => update('interest', option)}
                        className="peer sr-only"
                      />
                      <span className="inline-block rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-[color,background-color,border-color] duration-200 hover:border-ink/30 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {errorText('interest')}
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-message`} className="text-sm font-semibold text-ink">
                  What would you like to automate? <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <textarea id={`${id}-message`} rows={4} value={values.message} onChange={(e) => update('message', e.target.value)} className={`${fieldClass('message')} resize-y`} />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className={`inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-[#0b1420] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${press}`}>
                  Send message
                </button>
              </div>
            </form>
          )}
        </Reveal>
        </div>
      </div>
    </section>
  )
}
