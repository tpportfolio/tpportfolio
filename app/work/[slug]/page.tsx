"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-context"

// This would typically come from a database or CMS
const getProjectData = (slug: string) => {
  const projects = {
    "ai-experiments": {
      title: "AI EXPERIMENTS",
      year: "2020-PRESENT",
      client: "AI TOOLS & WORKFLOWS",
      description: `Desde 2020, me sumergí en el mundo de la IA, a explorar y utilizar herramientas que simplifiquen y agreguen valor al trabajo que ya venía haciendo, explorando cómo la tecnología redefine la creación de contenido. Mi motivación principal es simple: hacer que las ideas fluyan más rápido, con más impacto y menos fricción. Mi visión sobre la IA es la de ser un copiloto, estas herramientas no reemplazan la creatividad, la amplifican. Y me obsesiona encontrar cuá  estas herramientas no reemplazan la creatividad, la amplifican. Y me obsesiona encontrar cuáles realmente marcan una diferencia para creadores, marcas y equipos.

Exploré decenas de plataformas, destaco algunas con las que trabajé en profundidad:

IMAGEN
Midjourney: generación de conceptos visuales, moodboards, personajes y composiciones.
Flux+ComfyUI: hice un curso en Morfeo Academy para aprender a dominar herramientas ultra personalizadas como ComfyUI utilizando Flux o StableDiffusion.
Ideogram: creación de imágenes, tipografías y gráficos con texto integrado.
Leonardo.ai, Google ImageFX, ChatGPT/DALL·E: pruebas para producción de contenido.Herramientas de FaceSwap.

VIDEO
Runway ML/Kling/Hailuo/LumaLabs: edición de video con IA, inpainting, green screen y generación de video a partir de texto.
Pika: generación de microvideos a partir de imágenes. 

AUDIO Y VOCES
ElevenLabs: locución de piezas con voces sintéticas, clonación de voces para doblaje y personajes virtuales.
Suno/Udio: creación y composición de canciones con y sin vocales. Voicemod / Riffusion: Herramientas de generación y separación de pistas, efectos, doblaje dinámico.  

OTROS (Interfaz, narrativa, automatización)
v0.dev: creación de sitios web y prototipos interactivos con UI generada por IA. También probe lovable.
ChatGPT / Claude / Gemini / DeepSeek / Perplexity: asistencia para copy, guiones, estructuras narrativas y prompts optimizados.  

Highlights: Curaduría de herramientas y flujos de trabajo IA para contenido de marca, social y audiovisual.
Generación de material gráfico y textual para campañas, pruebas de concepto, visuales de pitch.
Formación y experimentación continua con prompts avanzados, workflows y automatización low-code.
`,
      challenge:
        "The client was struggling to differentiate themselves in a saturated market. Their existing brand lacked coherence and failed to communicate their unique value proposition.",
      solution:
        "I developed a distinctive brand strategy that highlighted their innovative approach and technical expertise. This included a new messaging framework, visual identity system, and implementation guidelines.",
      results:
        "The rebrand resulted in a 40% increase in qualified leads, improved brand recognition, and stronger market positioning. The client was able to secure additional funding based on their enhanced market presence.",
      image: "/placeholder.svg?height=800&width=600",
    },
    "brand-strategy-overhaul": {
      title: "Brand Strategy Overhaul",
      year: 2025,
      client: "Independent",
      description:
        "A comprehensive brand strategy overhaul for a tech startup looking to reposition themselves in the market. The project included market research, competitor analysis, brand voice development, and visual identity guidelines.",
      challenge:
        "The client was struggling to differentiate themselves in a saturated market. Their existing brand lacked coherence and failed to communicate their unique value proposition.",
      solution:
        "I developed a distinctive brand strategy that highlighted their innovative approach and technical expertise. This included a new messaging framework, visual identity system, and implementation guidelines.",
      results:
        "The rebrand resulted in a 40% increase in qualified leads, improved brand recognition, and stronger market positioning. The client was able to secure additional funding based on their enhanced market presence.",
      image: "/placeholder.svg?height=800&width=600",
    },
    "digital-campaign": {
      title: "Digital Campaign",
      year: 2024,
      client: "TechCorp",
      description:
        "An integrated digital marketing campaign for a B2B software company launching a new product. The campaign spanned multiple channels including social media, email marketing, content marketing, and paid advertising.",
      challenge:
        "The client needed to generate awareness and leads for their new enterprise software solution in a competitive market with a limited budget.",
      solution:
        "I created a targeted campaign focusing on the unique benefits of their solution, using data-driven insights to optimize channel selection and messaging. The campaign included interactive demos, case studies, and thought leadership content.",
      results:
        "The campaign exceeded targets by 35%, generating over 500 qualified leads and directly contributing to 28 new enterprise customers within the first quarter.",
      image: "/placeholder.svg?height=800&width=600",
    },
    "launch-marketing": {
      title: "Launch Marketing",
      year: 2024,
      client: "StartupX",
      description:
        "A comprehensive launch strategy for a new fintech app targeting millennials. The project included go-to-market strategy, launch event planning, PR outreach, and digital marketing campaigns.",
      challenge:
        "The startup needed to make a significant impact at launch to stand out in the crowded fintech space and acquire their first 10,000 users.",
      solution:
        "I developed a phased launch strategy that built anticipation through an exclusive beta program, influencer partnerships, and a memorable launch event. The campaign emphasized the app's unique features and user benefits.",
      results:
        "The launch exceeded expectations, acquiring 15,000 users in the first month and securing coverage in major tech publications. The app reached #3 in the finance category of the App Store during launch week.",
      image: "/placeholder.svg?height=800&width=600",
    },
    "rebranding-project": {
      title: "Rebranding Project",
      year: 2023,
      client: "Global Brand",
      description:
        "A complete rebranding project for an established company looking to modernize their image and appeal to a younger demographic while retaining their core customer base.",
      challenge:
        "The client had strong brand recognition but was perceived as outdated. They needed to evolve their brand without alienating loyal customers.",
      solution:
        "I led a strategic rebranding that maintained key brand elements while modernizing the visual identity, messaging, and digital presence. The process included extensive customer research and testing to ensure the new brand resonated with both existing and target audiences.",
      results:
        "The rebrand was successfully implemented across all touchpoints, resulting in a 25% increase in engagement from younger demographics while maintaining strong loyalty from existing customers.",
      image: "/placeholder.svg?height=800&width=600",
    },
    "social-media-strategy": {
      title: "Social Media Strategy",
      year: 2023,
      client: "Agency Work",
      description:
        "A comprehensive social media strategy for a luxury lifestyle brand looking to increase engagement and conversions through their social channels.",
      challenge:
        "The client had a strong visual presence but low engagement rates and was struggling to convert followers into customers.",
      solution:
        "I developed a content strategy that balanced aspirational content with practical value, implemented a community management approach that fostered genuine connections, and created targeted campaigns for different segments of their audience.",
      results:
        "Within six months, engagement increased by 78%, follower growth accelerated by 45%, and social media attributable sales increased by 62%.",
      image: "/placeholder.svg?height=800&width=600",
    },
    "seasonal-campaign": {
      title: "Seasonal Campaign",
      year: 2022,
      client: "Retail Chain",
      description:
        "A multi-channel seasonal marketing campaign for a national retail chain, focusing on their holiday collection and special promotions.",
      challenge:
        "The client needed to stand out during the competitive holiday season and drive both in-store and online sales with a cohesive campaign.",
      solution:
        "I created an emotionally resonant campaign concept that translated across digital advertising, social media, email marketing, in-store displays, and packaging. The campaign included user-generated content elements and strategic promotions timed throughout the season.",
      results:
        "The campaign delivered a 32% increase in holiday sales compared to the previous year, with particularly strong performance in their e-commerce channel, which saw a 47% increase.",
      image: "/placeholder.svg?height=800&width=600",
    },
  }

  return projects[slug as keyof typeof projects]
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { t, language } = useLanguage()
  const project = getProjectData(params.slug)

  if (!project) {
    return <div>{language === "es" ? "Proyecto no encontrado" : "Project not found"}</div>
  }

  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>
            PROJECT_ID: {project.title.toUpperCase()} // TIMESTAMP: {project.year} // CLIENT:{" "}
            {project.client.toUpperCase()} // SECURITY_CLEARANCE: GRANTED
          </span>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center text-neon-cyan hover:text-neon-magenta mb-8 font-cyber text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("return_to_mainframe")}
      </Link>

      <div className="flex flex-col lg:flex-row">
        {/* Image section - 30% on desktop */}
        <div className="w-full lg:w-[30%] h-[40vh] lg:h-auto relative border border-neon-green">
          <div className="absolute top-0 left-0 w-full bg-black bg-opacity-70 text-neon-green p-2 text-xs z-10 font-mono">
            IMAGE_DATA.render // resolution: 800x600 // format: jpeg // encryption: enabled
          </div>
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
        </div>

        {/* Content section - 70% on desktop */}
        <div className="w-full lg:w-[70%] p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-neon-green font-cyber">{project.title}</h1>
            <div className="text-xl text-neon-cyan mb-2 font-cyber">
              {project.year} // {project.client}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>
          </div>

          <div className="space-y-8 max-w-3xl">
            <div className="terminal">
              <div className="terminal-header">PROJECT_OVERVIEW</div>
              <div className="terminal-content">
                <p>{project.description}</p>
              </div>
            </div>

            <div className="terminal">
              <div className="terminal-header">CHALLENGE_PARAMETERS</div>
              <div className="terminal-content">
                <p>{project.challenge}</p>
              </div>
            </div>

            <div className="terminal">
              <div className="terminal-header">SOLUTION_PROTOCOL</div>
              <div className="terminal-content">
                <p>{project.solution}</p>
              </div>
            </div>

            <div className="terminal">
              <div className="terminal-header">OUTCOME_METRICS</div>
              <div className="terminal-content">
                <p>{project.results}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
        <div className="web-rings">
          <a href="#" className="web-ring-link">
            NEXT_PROJECT
          </a>
          <span className="mx-4 text-neon-green">|</span>
          <a href="#" className="web-ring-link">
            PREVIOUS_PROJECT
          </a>
          <span className="mx-4 text-neon-green">|</span>
          <a href="#" className="web-ring-link">
            RETURN_HOME
          </a>
        </div>
        <p className="mt-6 text-xs text-neon-green">
          © 1995-2025 TOMÁS PERÓ // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION
        </p>
      </div>
    </main>
  )
}
