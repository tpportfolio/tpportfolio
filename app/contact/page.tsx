"use client"

import { useState } from "react"
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"
import { WindowFrame } from "@/components/video-window"

const LINKEDIN_URL = "https://www.linkedin.com/in/tomaspero"
const CONTACT_EMAIL = "tomaspero@gmail.com"

type ContactCopy = {
  title: string
  subtitle: string
  linksHeader: string
  formHeader: string
  linkedinLabel: string
  linkedinValue: string
  linkedinAria: string
  emailLabel: string
  locationLabel: string
  location: string
  locationNodes: string[]
  noteLabel: string
  note: string
  whenLabel: string
  when: string[]
  formIntro: string
  nameLabel: string
  formEmailLabel: string
  messageLabel: string
  submitLabel: string
  successMsg: string
}

const copyEs: ContactCopy = {
  title: "CONTACTO",
  subtitle: "CONTACT_CHANNELS.exe",
  linksHeader: "LINKS / CONTACT",
  formHeader: "SEND_MESSAGE",
  linkedinLabel: "LINKEDIN",
  linkedinValue: "linkedin.com/in/tomaspero",
  linkedinAria: "LinkedIn: perfil de Tomás Peró (se abre en una pestaña nueva)",
  emailLabel: "EMAIL",
  locationLabel: "LOCATION",
  location: "Buenos Aires, Argentina",
  locationNodes: ["ARG", "BA", "CABA"],
  noteLabel: "PROFILE_NOTE",
  note: "Disponible para roles de liderazgo de marca y para proyectos de consultoría con marcas, agencias y equipos lean.",
  whenLabel: "Cuándo tiene sentido hablar",
  when: [
    "Si estás lanzando una marca o una línea nueva en Latinoamérica.",
    "Si tu marca está en transición y necesita reposicionarse.",
    "Si tu equipo quiere producir más rápido con IA sin perder criterio de marca.",
  ],
  formIntro: "Escribime un mensaje",
  nameLabel: "Nombre",
  formEmailLabel: "Correo electrónico",
  messageLabel: "Mensaje",
  submitLabel: "Enviar",
  successMsg:
    "Se abrió tu app de correo con el mensaje listo: mandalo desde ahí. Si no se abrió, escribime a tomaspero@gmail.com.",
}

const copyEn: ContactCopy = {
  title: "CONTACT",
  subtitle: "CONTACT_CHANNELS.exe",
  linksHeader: "LINKS / CONTACT",
  formHeader: "SEND_MESSAGE",
  linkedinLabel: "LINKEDIN",
  linkedinValue: "linkedin.com/in/tomaspero",
  linkedinAria: "LinkedIn: Tomás Peró's profile (opens in a new tab)",
  emailLabel: "EMAIL",
  locationLabel: "LOCATION",
  location: "Buenos Aires, Argentina",
  locationNodes: ["ARG", "BA", "CABA"],
  noteLabel: "PROFILE_NOTE",
  note: "Available for brand leadership roles and for consulting projects with brands, agencies and lean teams.",
  whenLabel: "When it makes sense to talk",
  when: [
    "You are launching a brand or a new line in Latin America.",
    "Your brand is in transition and needs to be repositioned.",
    "Your team wants to produce faster with AI without losing brand judgment.",
  ],
  formIntro: "Send me a message",
  nameLabel: "Name",
  formEmailLabel: "Email",
  messageLabel: "Message",
  submitLabel: "Send",
  successMsg:
    "Your email app should have opened with the message ready: send it from there. If it did not open, write to me at tomaspero@gmail.com.",
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
      {children}
    </div>
  )
}

export default function Contact() {
  const { language } = useLanguage()
  const { mode } = useVisualMode()
  const copy = language === "es" ? copyEs : copyEn
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // No backend: the form hands the message to the visitor's own mail app.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject =
      language === "es" ? `Contacto desde el portfolio: ${form.name}` : `Portfolio contact: ${form.name}`
    const body = `${form.message}\n\n${form.name}\n${form.email}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  const tileClass =
    mode === "light"
      ? "border-[#c57b45]/60 bg-[#fff2e3]/70 hover:bg-[#f5e4d2]"
      : "border-neon-green/40 bg-black/20 hover:border-neon-cyan hover:bg-neon-green/5"
  const fieldClass =
    mode === "light"
      ? "w-full rounded-sm border border-[#c57b45] bg-[#fffaf3] px-3 py-2 text-[#2e1305] outline-none focus:border-[#8b4315]"
      : "w-full rounded-sm border border-neon-green/60 bg-black px-3 py-2 text-white outline-none focus:border-neon-cyan"
  const submitClass =
    mode === "light"
      ? "bg-[#8b4315] text-[#fff2e3] hover:bg-[#6d3410]"
      : "bg-neon-green text-black hover:bg-neon-cyan"

  return (
    <main className="px-4 py-8 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>CONTACT // TOMÁS PERÓ // GET IN TOUCH // MENSAJE // EMAIL</span>
        </div>
      </div>

      <section className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold font-cyber text-neon-green glitch md:text-5xl" data-text={copy.title}>
          {copy.title}
        </h1>
        <h2 className="mb-4 text-xl font-cyber text-neon-cyan">{copy.subtitle}</h2>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          <WindowFrame title={copy.linksHeader} className="flex flex-col xl:col-span-7">
            <div className="flex-1">
              <div className="grid h-full grid-cols-1 gap-4 xl:auto-rows-min">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={copy.linkedinAria}
                    className={`group flex min-h-[148px] flex-col justify-between rounded-sm border p-5 text-neon-green transition-colors ${tileClass}`}
                  >
                    <div className="flex items-start justify-between">
                      <Linkedin className="h-8 w-8" aria-hidden />
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </div>
                    <div className="mt-6">
                      <div className="mb-1 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
                        {copy.linkedinLabel}
                      </div>
                      <div className="break-all text-sm md:text-base">{copy.linkedinValue}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className={`group flex min-h-[148px] flex-col justify-between rounded-sm border p-5 text-neon-green transition-colors ${tileClass}`}
                  >
                    <div className="flex items-start justify-between">
                      <Mail className="h-8 w-8" aria-hidden />
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </div>
                    <div className="mt-6">
                      <div className="mb-1 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
                        {copy.emailLabel}
                      </div>
                      <div className="break-all text-sm md:text-base">{CONTACT_EMAIL}</div>
                    </div>
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-sm border border-neon-green/20 bg-black/20 p-5">
                    <BlockLabel>
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {copy.locationLabel}
                    </BlockLabel>
                    <p className="text-sm leading-relaxed text-neon-green/90 md:text-[15px]">{copy.location}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {copy.locationNodes.map((node) => (
                        <span
                          key={node}
                          className="rounded-sm border border-neon-green/20 px-2.5 py-1 font-cyber text-[10px] uppercase tracking-[0.18em] text-neon-cyan"
                        >
                          {node}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-sm border border-neon-green/20 bg-black/20 p-5">
                    <BlockLabel>{copy.noteLabel}</BlockLabel>
                    <p className="text-sm leading-relaxed text-neon-green/90 md:text-[15px]">{copy.note}</p>
                  </div>
                </div>

                <section aria-labelledby="contact-when" className="rounded-sm border border-neon-green/20 bg-black/20 p-5">
                  <h3 id="contact-when" className="mb-3 font-cyber text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
                    {copy.whenLabel}
                  </h3>
                  <ul className="space-y-2">
                    {copy.when.map((line) => (
                      <li key={line} className="flex gap-2 text-sm leading-relaxed text-neon-green/90 md:text-[15px]">
                        <span aria-hidden="true" className="text-neon-cyan">&gt;</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </WindowFrame>

          <WindowFrame title={copy.formHeader} className="flex flex-col xl:col-span-5">
            <div className="flex-1">
              {submitted ? (
                <div className="py-8 text-center text-lg text-neon-green">{copy.successMsg}</div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <p className="font-cyber text-base text-neon-cyan">{copy.formIntro}</p>
                  <label className="flex flex-col text-left">
                    <span className="mb-1 text-sm text-neon-green">{copy.nameLabel}</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="flex flex-col text-left">
                    <span className="mb-1 text-sm text-neon-green">{copy.formEmailLabel}</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="flex flex-col text-left">
                    <span className="mb-1 text-sm text-neon-green">{copy.messageLabel}</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={fieldClass}
                    />
                  </label>
                  <button
                    type="submit"
                    className={`rounded-sm px-4 py-3 font-cyber text-sm font-bold uppercase tracking-[0.18em] transition-colors ${submitClass}`}
                  >
                    {copy.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </WindowFrame>
        </div>
      </section>
    </main>
  )
}
