"use client"

import { useLanguage } from "@/components/language-context"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import Typewriter from "@/components/typewriter"

export default function About() {
  const { language } = useLanguage()

  const cardClass = "md:min-h-[400px]"

  return (
    <main className="py-8 px-4 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>{"ABOUT // TOM\u00c1S PER\u00d3 // GEN_MARKETER // CREATIVE DIRECTOR // PROFILE"}</span>
        </div>
      </div>

      <section className="mb-12 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 text-neon-green font-cyber glitch"
          data-text={language === "es" ? "ACERCA DE MI" : "ABOUT ME"}
        >
          {language === "es" ? "ACERCA DE MI" : "ABOUT ME"}
        </h1>
        <h2 className="text-xl text-neon-cyan mb-4 font-cyber">PERSONAL_PROFILE.exe</h2>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-stretch">
          <div className={`terminal md:col-span-4 justify-self-start w-full ${cardClass} flex flex-col`}>
            <div className="terminal-header">
              <span>PROFILE_IMAGE</span>
            </div>
            <div className="terminal-content flex-1 flex items-center justify-center p-5 bg-black/20">
              <div className="w-full max-w-[240px] aspect-square overflow-hidden border border-neon-green/40">
                <Image
                  src="/images/cuadrada.jpg"
                  alt={"Tom\u00e1s Per\u00f3"}
                  width={768}
                  height={768}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className={`terminal md:col-span-8 justify-self-start w-full ${cardClass} flex flex-col`}>
            <div className="terminal-header flex justify-between items-center">
              <span>PROFILE_BRIEF</span>
            </div>
            <div className="terminal-content flex flex-1 items-center justify-center text-center">
              <Typewriter
                fontSizePx={16}
                cursorSizePx={12}
                align="center"
                className="mx-auto max-w-3xl text-center"
                textEs={
                  "Trabajo hace 18 a\u00f1os en marketing, publicidad y contenido. Empec\u00e9 en agencias, despu\u00e9s marcas, startups y actualmente trabajo de manera freelance.\n\nEn 2020/21 entr\u00e9 al mundo IA, primero como autodidacta y luego con cursos como Morfeo Academy.\nActualmente ofrezco consultor\u00edas, capacitaciones y generaci\u00f3n de contenido AI profesional.\nHago plug-in a equipos de marketing, marcas o agencias para acelerar producci\u00f3n, iterar, reducir fricci\u00f3n y elevar la calidad en pipelines reales (imagen, video, audio y texto).\n\nTodo lo que ves ac\u00e1 est\u00e1 codeado con IA, hasta la introducci\u00f3n."
                }
                segmentsEs={[
                  {
                    text: "Trabajo hace 18 a\u00f1os en marketing, publicidad y contenido. Empec\u00e9 en agencias, despu\u00e9s marcas, startups y actualmente trabajo de manera freelance.\n\nEn 2020/21 entr\u00e9 al mundo IA, primero como autodidacta y luego con cursos como ",
                  },
                  { text: "Morfeo Academy", href: "https://www.morfeoacademy.com/" },
                  {
                    text: ".\nActualmente ofrezco consultor\u00edas, capacitaciones y generaci\u00f3n de contenido AI profesional.\nHago plug-in a equipos de marketing, marcas o agencias para acelerar producci\u00f3n, iterar, reducir fricci\u00f3n y elevar la calidad en pipelines reales (imagen, video, audio y texto).\n\nTodo lo que ves ac\u00e1 est\u00e1 codeado con IA, hasta la ",
                  },
                  { text: "introducci\u00f3n", bold: true, href: "/intro.html" },
                  { text: "." },
                ]}
                textEn={
                  "I've worked for 18 years in marketing, advertising and content. I started in agencies, then moved into brands and startups, and today I work independently.\n\nIn 2020/21 I entered the AI space, first self-taught and then through courses like Morfeo Academy.\nToday I offer consulting, training and professional AI-driven content creation.\nI plug into marketing teams, brands or agencies to accelerate production, iterate, reduce friction and elevate quality across real-world pipelines (image, video, audio and text).\n\nEverything you see here is coded with AI, even the introduction."
                }
                segmentsEn={[
                  {
                    text: "I've worked for 18 years in marketing, advertising and content. I started in agencies, then moved into brands and startups, and today I work independently.\n\nIn 2020/21 I entered the AI space, first self-taught and then through courses like ",
                  },
                  { text: "Morfeo Academy", href: "https://www.morfeoacademy.com/" },
                  {
                    text: ".\nToday I offer consulting, training and professional AI-driven content creation.\nI plug into marketing teams, brands or agencies to accelerate production, iterate, reduce friction and elevate quality across real-world pipelines (image, video, audio and text).\n\nEverything you see here is coded with AI, even the ",
                  },
                  { text: "introduction", bold: true, href: "/intro.html" },
                  { text: "." },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="terminal mb-12 mt-12">
          <div className="terminal-header">
            <span>PERSONAL_INFO</span>
          </div>
          <div className="terminal-content">
            <h2 className="text-3xl text-neon-green mb-4">{"TOM\u00c1S PER\u00d3"}</h2>
            <h3 className="text-xl text-neon-cyan mb-6">
              {language === "es"
                ? "Marketer trabajando en la intersecci\u00f3n entre marca, estrategia e inteligencia artificial"
                : "Marketer working at the intersection of brand, strategy and artificial intelligence"}
            </h3>

            {language === "es" ? (
              <>
                <p className="mb-4">Marketer. Construyo sistemas narrativos que impulsan crecimiento.</p>
                <p className="mb-4">
                  {"Trabajo en la intersecci\u00f3n entre marca, estrategia y workflows de inteligencia artificial. No solo desarrollo campa\u00f1as; dise\u00f1o estructuras que conectan posicionamiento, partnerships y ejecuci\u00f3n con impacto medible."}
                </p>
                <p className="mb-6">
                  {"18+ a\u00f1os operando en entornos corporativos y startups me permiten traducir visi\u00f3n en acci\u00f3n y creatividad en infraestructura."}
                </p>
                <div className="mt-6">
                  <h4 className="text-neon-green mb-2">ESPECIALIDADES</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Brand & Narrative Systems</li>
                    <li>Go-To-Market LATAM</li>
                    <li>AI-assisted Creative & Content Pipelines</li>
                    <li>PR, Influencer & Cultural Activation</li>
                    <li>Strategic Growth Initiatives</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4">Marketer. I build narrative systems that drive growth.</p>
                <p className="mb-4">
                  I work at the intersection of brand, strategy and AI workflows. I do not just ship campaigns; I design structures that connect positioning, partnerships and execution with measurable impact.
                </p>
                <p className="mb-6">
                  18+ years operating across corporate environments and startups help me translate vision into action and creativity into infrastructure.
                </p>
                <div className="mt-6">
                  <h4 className="text-neon-green mb-2">SPECIALTIES</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Brand & Narrative Systems</li>
                    <li>Go-To-Market LATAM</li>
                    <li>AI-assisted Creative & Content Pipelines</li>
                    <li>PR, Influencer & Cultural Activation</li>
                    <li>Strategic Growth Initiatives</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="terminal md:col-span-3">
          <div className="terminal-header">
            <span>LINKEDIN_PROFILE</span>
          </div>
          <div className="terminal-content p-4">
            <div className="text-center">
              <a
                href="https://www.linkedin.com/in/tomaspero"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-neon-green text-xl hover:text-neon-cyan transition-colors"
              >
                <Linkedin size={32} className="mr-2" />
                <span className="text-2xl">linkedin.com/in/tomaspero</span>
              </a>
              <div className="border border-neon-green p-4 mt-4">
                <h3 className="text-xl text-neon-cyan mb-2">{"TOM\u00c1S PER\u00d3"}</h3>
                <p className="text-neon-green mb-2">
                  {language === "es"
                    ? "Marketer trabajando en la intersecci\u00f3n entre marca, estrategia e inteligencia artificial"
                    : "Marketer working at the intersection of brand, strategy and artificial intelligence"}
                </p>
                <p className="mb-4">Buenos Aires, Argentina</p>
                <p>
                  {language === "es"
                    ? "Tengo experiencia en marketing estrat\u00e9gico con marcas globales como Air New Zealand y Disney, y con agencias de publicidad l\u00edderes."
                    : "I have experience in strategic marketing across global brands like Air New Zealand and Disney, and leading advertising agencies."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

