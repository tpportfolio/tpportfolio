"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-context"

export default function Contact() {
  const { t, language } = useLanguage()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  // Texts
  const sectionTitle = language === "es" ? "CONTACTO" : "CONTACT"
  const sectionSubtitle = language === "es" ? "Envíame un mensaje" : "Send me a message"
  const nameLabel = language === "es" ? "Nombre" : "Name"
  const emailLabel = language === "es" ? "Correo electrónico" : "Email"
  const messageLabel = language === "es" ? "Mensaje" : "Message"
  const submitLabel = language === "es" ? "Enviar" : "Send"
  const successMsg = language === "es"
    ? "¡Gracias por tu mensaje! Te responderé pronto."
    : "Thank you for your message! I will reply soon."

  return (
    <main className="py-8 px-4 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>CONTACT // TOMÁS PERÓ // GET IN TOUCH // MENSAJE // EMAIL</span>
        </div>
      </div>

      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neon-green font-cyber glitch" data-text={sectionTitle}>
          {sectionTitle}
        </h1>
        <h2 className="text-xl text-neon-cyan mb-4 font-cyber">{sectionSubtitle}</h2>
      </section>

      <section className="max-w-xl mx-auto">
        <div className="terminal">
          <div className="terminal-header">
            <span>CONTACT_FORM</span>
          </div>
          <div className="terminal-content">
            {submitted ? (
              <div className="text-neon-green text-center py-8 text-lg">{successMsg}</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col text-left">
                  <span className="text-neon-green mb-1">{nameLabel}</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="input input-bordered bg-black text-white border-neon-green focus:border-neon-cyan"
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="text-neon-green mb-1">{emailLabel}</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="input input-bordered bg-black text-white border-neon-green focus:border-neon-cyan"
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="text-neon-green mb-1">{messageLabel}</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input input-bordered bg-black text-white border-neon-green focus:border-neon-cyan"
                  />
                </label>
                <button
                  type="submit"
                  className="btn bg-neon-green text-black font-bold py-2 px-4 rounded hover:bg-neon-cyan transition"
                >
                  {submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="max-w-xl mx-auto mt-8 text-center">
        <p className="text-neon-cyan font-cyber text-base">
          {language === "es"
            ? "¿Prefieres enviar un email directo? "
            : "Prefer to send an email directly? "}
          <a
            href="mailto:tomaspero@gmail.com"
            className="text-neon-green underline hover:text-neon-cyan transition font-bold"
            style={{ wordBreak: "break-all" }}
          >
            tomaspero@gmail.com
          </a>
        </p>
      </section>
    </main>
  )
}
