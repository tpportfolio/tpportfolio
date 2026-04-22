"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VideoCarousel, type VideoItem } from "@/components/video-carousel"
import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"
import { RetroPanel } from "@/components/retro-panel"

export default function AIExperimentsPage() {
  const { t, language } = useLanguage()
  const { mode } = useVisualMode()
  const isLight = mode === "light"

  // 2022–2024 archive (existing)
  const aiArchiveVideos: VideoItem[] = [
    {
      id: "luma-testing",
      type: "youtube",
      videoId: "PLTai-gQI1os2Pz82VXGrAZ9Jov1dujRCl", // This is a playlist ID
      isPlaylist: true,
      title: {
        es: "JUN'24 - LUMA TESTING. Él mató a un policía motorizado animated artworks.",
        en: "JUN'24 - LUMA TESTING. Él mató a un policía motorizado animated artworks.",
      },
      description: {
        es: 'Probé Luma Labs en los artworks de "El mató a un policía motorizado".',
        en: 'Tests performed with Luma Labs on the artworks of "El mató a un policía motorizado"',
      },
    },
    {
      id: "playground-endless",
      type: "youtube",
      videoId: "1wRmJKLHZ5A",
      title: {
        es: "JUN'24 - Playground Endless: recomendación del vocero presidencial",
        en: "JUN'24 - Playground Endless: recommendation from the presidential spokesman",
      },
      description: {
        es: "Probé la plataforma Endless (un playground creativo). Usé clonación de voz de Manuel Adorni y edité el video.",
        en: "Testing of the Endless platform, a creative playground. Use of voice cloning of Manuel Adorni, presidential spokesman, and video editing.",
      },
    },
    {
      id: "google-notebooklm",
      type: "youtube",
      videoId: "zli0MrIhFbY",
      title: {
        es: "SEP'24 - Google NotebookLM Podcast",
        en: "SEP'24 - Google NotebookLM Podcast",
      },
      description: {
        es: "Probé Google NotebookLM y generé un podcast a partir de mi propio Currículum Vitae.",
        en: "Testing of the Google NotebookLM platform, creation of a podcast from my own Curriculum Vitae.",
      },
    },
    {
      id: "suno-freestyle",
      type: "youtube",
      videoId: "7qeZzxRU1cs",
      title: {
        es: "MAR'24 - Suno freestyle CV song",
        en: "MAR'24 - Suno freestyle CV song",
      },
      description: {
        es: "Hice mis primeras pruebas con Suno en creación de canciones: un freestyle/hip-hop sobre mi CV. Trabajé parte de la letra con ChatGPT.",
        en: "First tests with Suno in song creation, in this case it's a freestyle/hip-hop about my CV. The lyrics were partly worked with ChatGPT.",
      },
    },
    {
      id: "stable-diffusion",
      type: "youtube",
      videoId: "AkQSUr4Z3S4",
      title: {
        es: "NOV'22 - Stable Diffusion Testing",
        en: "NOV'22 - Stable Diffusion Testing",
      },
      description: {
        es: "Hice mis primeras pruebas con Stable Diffusion (de mis primeras incursiones con IA). Desde acá empecé a entusiasmarme y profundizar a diario.",
        en: "First tests with Stable Diffusion, perhaps one of my first incursions with AI, from here I started to get excited and to go deeper on a daily basis.",
      },
    },
  ]

  const jumexLink = {
    es: "https://www.youtube.com/watch?v=U6_3OB7ljvY&list=PLTai-gQI1os0TbsVxwy7hfGDe_eOUIPJO",
    en: "https://www.youtube.com/watch?v=U6_3OB7ljvY&list=PLTai-gQI1os0TbsVxwy7hfGDe_eOUIPJO",
  }

  const subwayLink = {
    es: "https://www.youtube.com/watch?v=zW8DP4fr7xA&list=PLTai-gQI1os01OvFV9Xid5OXWWgoM9FCP&index=1",
    en: "https://www.youtube.com/watch?v=zW8DP4fr7xA&list=PLTai-gQI1os01OvFV9Xid5OXWWgoM9FCP&index=1",
  }

  return (
    <main className={`ai-page min-h-screen py-8 px-4 md:px-12 ${isLight ? "ai-page--light" : ""}`}>
      <div className="w-full">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>PROJECT_ID: AI EXPERIMENTS // TIMESTAMP: 2020-PRESENT // SECURITY_CLEARANCE: GRANTED</span>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center text-neon-cyan hover:text-neon-magenta mb-8 font-cyber text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("return_to_mainframe")}
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-neon-green font-cyber">
          {language === "es" ? "/INTELIGENCIA_ARTIFICIAL" : "/ARTIFICIAL_INTELLIGENCE"}
        </h1>
        <div className="text-xl text-neon-cyan mb-2 font-cyber">2020-PRESENT</div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-green to-transparent mb-6"></div>

        {/* WIP Win95 Banner */}
        <div className="flex justify-center mb-8">
          <div className={`max-w-[420px] border-2 shadow-[3px_3px_0_#000] font-[\'MS_Sans_Serif\'],system-ui,sans-serif text-[13px] ${isLight ? "border-[#8b4315] bg-[#f6e6d2] shadow-[3px_3px_0_#8b4315]" : "border-black bg-[#c0c0c0]"}`}>
            <div className={`flex justify-between items-center px-2 py-1 ${isLight ? "bg-gradient-to-r from-[#6f3210] to-[#b85a17] text-[#f7d7a0]" : "bg-gradient-to-r from-[#000080] to-[#1e4aa8] text-white"}`}>
              <span className="uppercase tracking-wider font-bold animate-blink">UPDATES PENDING</span>
              <span className={`ml-2 space-x-1 ${isLight ? "text-[#3d1b09]" : ""}`}>
                <span className="inline-block px-1 bg-[#c0c0c0] text-black border border-black text-[10px]">▢</span>
                <span className="inline-block px-1 bg-[#c0c0c0] text-black border border-black text-[10px]">✖</span>
              </span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 border-t ${isLight ? "bg-[#fff4e8] border-[#8b4315]" : "bg-[#e5e5e5] border-black"}`}>
              <span className="text-lg">⚠️</span>
              <span className="text-[12px] text-black leading-tight">
                NEW AI EXPERIMENTS COMING…<br />WORK IN PROGRESS
              </span>
            </div>
          </div>
        </div>
        <style>{`@keyframes blink { 0%,40%{opacity:1;} 60%,100%{opacity:0.25;} } .animate-blink { animation: blink 1.2s steps(2, start) infinite; }`}</style>

        <RetroPanel title={language === "es" ? "RESUMEN" : "OVERVIEW"} statusRight="STACK">
          <p className="whitespace-pre-line text-base text-neon-green/90 leading-relaxed">
            {language === "es"
              ? "Desde 2020 vengo aprendiendo como autodidacta y mediante cursos (por ej: Morfeo Academy) sobre el mundo IA. Con el interés de explorar herramientas que agreguen valor directo al workflow de producción de contenido. Mi enfoque es ser práctico: acelerar, iterar, reducir fricción y mejorar calidad en pipelines reales de producción y generación de contenido.\n\nExploré decenas de plataformas; destaco las más importantes con las que trabajo en la actualidad:"
              : "Since 2020 I’ve been learning about AI both self‑taught and through courses (e.g., Morfeo Academy), focused on tools that add direct value to real content production workflows. My approach is practical: speed up, iterate, reduce friction, and improve quality in real production pipelines.\n\nI explored dozens of platforms; here are the key ones I work with today:"}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="border border-neon-green/30 rounded-sm p-4 bg-black/30 h-full">
              <div className="text-neon-cyan font-cyber mb-2">{language === "es" ? "IMAGEN" : "IMAGE"}</div>
              <ul className="list-disc pl-5 space-y-2 text-base text-neon-green/90">
                <li>Nanobanana, Seedream, Leonardo, Flux, Ideogram, GoogleFX, Midjourney.</li>
              </ul>
            </div>

            <div className="border border-neon-green/30 rounded-sm p-4 bg-black/30 h-full">
              <div className="text-neon-cyan font-cyber mb-2">VIDEO</div>
              <ul className="list-disc pl-5 space-y-2 text-base text-neon-green/90">
                <li>Sora2, Veo3, Higgsfield, Kling, Hailuo, Runway</li>
              </ul>
            </div>

            <div className="border border-neon-green/30 rounded-sm p-4 bg-black/30 h-full">
              <div className="text-neon-cyan font-cyber mb-2">AUDIO</div>
              <ul className="list-disc pl-5 space-y-2 text-base text-neon-green/90">
                <li>ElevenLabs, fish.audio, Suno, Udio</li>
              </ul>
            </div>

            <div className="border border-neon-green/30 rounded-sm p-4 bg-black/30 h-full">
              <div className="text-neon-cyan font-cyber mb-2">LLM&apos;s</div>
              <ul className="list-disc pl-5 space-y-2 text-base text-neon-green/90">
                <li>ChatGPT, Kimi, Gemini, Perplexity, y algo de Claude (todavía no instalé ClawdBot / OpenClaw)</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 border-t border-neon-green/30 pt-4">
            <div className="text-neon-cyan font-cyber mb-2">HIGHLIGHTS</div>
            <ul className="list-disc pl-5 space-y-2 text-base text-neon-green/90">
              <li>
                {language === "es"
                  ? "Hago curaduría de herramientas y flujos IA para contenido de marca, social y audiovisual."
                  : "Curation of AI tools and workflows for branded, social, and audiovisual content."}
              </li>
              <li>
                {language === "es"
                  ? "Genero material para campañas, pruebas de concepto y visuales de pitch."
                  : "Generation of material for campaigns, proof-of-concepts, and pitch visuals."}
              </li>
              <li>
                {language === "es"
                  ? "Experimento de forma continua con prompts avanzados, workflows y automatización low-code."
                  : "Ongoing experimentation with advanced prompts, workflows, and low-code automation."}
              </li>
            </ul>
          </div>
        </RetroPanel>

      </div>

      <div className="space-y-8 mt-8">
        <div id="ejemplos-trabajos-ia-2025">
          <RetroPanel
            title={language === "es" ? "EJEMPLOS TRABAJOS IA 2025" : "AI WORK EXAMPLES 2025"}
            statusRight="PITCH"
            highlight
          >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neon-green/30 rounded-sm p-4 bg-black/30 h-full">
              <div className="text-neon-cyan font-cyber text-lg mb-2">Pitch Jumex Mexico – Animatic</div>
              <div className="text-base text-neon-green/90 leading-relaxed whitespace-pre-line">
                {language === "es"
                  ? "Animatic técnica mixta footage + contenido IA (esto último a mi cargo).\nPipeline IA end-to-end: imágenes → video → voz."
                  : "Mixed-technique animatic (footage + AI content, AI part by me).\nEnd-to-end AI pipeline: images → video → voice."}
              </div>
              <a href={jumexLink[language]} target="_blank" rel="noreferrer" className="block mt-3">
                <div className="w-full aspect-video overflow-hidden rounded-sm border border-neon-green/30">
                  <img
                    src="https://img.youtube.com/vi/U6_3OB7ljvY/hqdefault.jpg"
                    alt="Jumex animatic thumbnail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>

              <div className="text-base text-neon-cyan/80 mt-3 whitespace-pre-line">
                {language === "es"
                  ? "Herramientas: Google Nano Banana (Imágenes) · Higgsfield: Kling + Veo (Video) · ElevenLabs (Clonación de voces de jugadores de fútbol mexicano)"
                  : "Tools: Google Nano Banana (Images) · Higgsfield: Kling + Veo (Video) · ElevenLabs (Voice cloning)"}
              </div>
              <div className="text-base text-neon-green/80 mt-2 whitespace-pre-line">
                {language === "es"
                  ? "Skills utilizados: generación de imágenes, videos, clonación de voces.\nEdición a cargo de Editor de Paradise."
                  : "Skills: image generation, video generation, voice cloning.\nEditing by Paradise editor."}
              </div>
              <a href={jumexLink[language]} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm text-neon-magenta hover:text-neon-cyan underline">
                Video: YouTube
              </a>
            </div>

            <div className="border border-neon-green/30 rounded-sm p-4 bg-black/30 h-full">
              <div className="text-neon-cyan font-cyber text-lg mb-2">Pitch Subway Mexico – Animatic</div>
              <div className="text-base text-neon-green/90 leading-relaxed whitespace-pre-line">
                {language === "es"
                  ? "Animatic técnica mixta footage + contenido IA (esto último a mi cargo).\nPipeline IA end-to-end: imágenes → video."
                  : "Mixed-technique animatic (footage + AI content, AI part by me).\nEnd-to-end AI pipeline: images → video."}
              </div>
              <a href={subwayLink[language]} target="_blank" rel="noreferrer" className="block mt-3">
                <div className="w-full aspect-video overflow-hidden rounded-sm border border-neon-green/30">
                  <img
                    src="https://img.youtube.com/vi/zW8DP4fr7xA/hqdefault.jpg"
                    alt="Subway animatic thumbnail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>

              <div className="text-base text-neon-cyan/80 mt-3 whitespace-pre-line">
                {language === "es"
                  ? "Herramientas: Google Nano Banana Pro (Image) · Higgsfield: Kling + Veo (Video)"
                  : "Tools: Google Nano Banana Pro (Image) · Higgsfield: Kling + Veo (Video)"}
              </div>
              <div className="text-base text-neon-green/80 mt-2">{language === "es" ? "Skills: generación de imágenes y videos." : "Skills: image + video generation."}</div>
              <a href={subwayLink[language]} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm text-neon-magenta hover:text-neon-cyan underline">
                Video: YouTube
              </a>
            </div>
          </div>
          </RetroPanel>
        </div>

                <RetroPanel
          title={language === "es" ? "VIBE-CODING: WEBAPPS" : "VIBE-CODING: WEBAPPS"}
          statusRight="TOOLS"
        >
          <p className="text-base text-neon-green/90 leading-relaxed mb-4">
            {language === "es"
              ? "Mini apps útiles, gratuitas y livianas para trabajo de producción. Corren offline (abrís el HTML en tu Mac/PC) o las podés usar desde esta misma web."
              : "Lightweight, free mini-apps for production work. They run offline (open the HTML on your Mac/PC) or you can use them from this website."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <a
                href="/canva_productora"
                className="block text-center border border-neon-cyan/60 rounded-sm px-3 py-2 font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
              >
                CANVA_PRODUCTORA
              </a>
              <a href="/canva_productora" className="block mt-3 border border-neon-green/40 rounded bg-black/20 overflow-hidden hover:border-neon-cyan/60 transition-colors">
                <div className="px-3 py-2 border-b border-neon-green/30 text-xs text-neon-green/80">preview</div>
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <iframe
                    src="/canva_productora/index.html"
                    title="CANVA_PRODUCTORA preview"
                    className="absolute left-0 top-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                  />
                </div>
              </a>
              <p className="text-base text-neon-green/90 leading-relaxed mt-3">
                {language === "es"
                  ? "Canva ad-hoc para Paradise. Propuesta de grilla 3: (1) placa intro -CANVA- (2) foto/screen del video (3) placa negra con marca/año."
                  : "Custom Canva for Paradise. 3-tile Instagram grid: (1) intro card -CANVA- (2) video still (3) black card with brand/year."}
              </p>
            </div>

            <div>
              <a
                href="/unyellower"
                className="block text-center border border-neon-cyan/60 rounded-sm px-3 py-2 font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
              >
                UNYELLOWER
              </a>
              <a href="/unyellower" className="block mt-3 border border-neon-green/40 rounded bg-black/20 overflow-hidden hover:border-neon-cyan/60 transition-colors">
                <div className="px-3 py-2 border-b border-neon-green/30 text-xs text-neon-green/80">preview</div>
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <iframe
                    src="/unyellower/index.html"
                    title="UNYELLOWER preview"
                    className="absolute left-0 top-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                  />
                </div>
              </a>
              <p className="text-base text-neon-green/90 leading-relaxed mt-3">
                {language === "es"
                  ? "Corrección de color para imágenes (por ejemplo, imágenes de ChatGPT con tinte amarillo). Incluye preset de auto-corrección más azulado."
                  : "Color correction tool (e.g., ChatGPT images with yellow tint). Includes a cooler auto-correction preset."}
              </p>
            </div>

            <div>
              <a
                href="/comparador_videos"
                className="block text-center border border-neon-cyan/60 rounded-sm px-3 py-2 font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
              >
                COMPARADOR_VIDEOS
              </a>
              <a href="/comparador_videos" className="block mt-3 border border-neon-green/40 rounded bg-black/20 overflow-hidden hover:border-neon-cyan/60 transition-colors">
                <div className="px-3 py-2 border-b border-neon-green/30 text-xs text-neon-green/80">preview</div>
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <iframe
                    src="/comparador_videos/index.html"
                    title="COMPARADOR_VIDEOS preview"
                    className="absolute left-0 top-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                  />
                </div>
              </a>
              <p className="text-base text-neon-green/90 leading-relaxed mt-3">
                {language === "es"
                  ? "Comparador lado a lado de 2 versiones de un video. Feature no disponible en Dropbox Replay o Frame.io, herramientas pagas de productora."
                  : "Side-by-side comparison of 2 video versions. Not available in Dropbox Replay or Frame.io (paid tools)."}
              </p>
            </div>
          </div>
        </RetroPanel>

        <VideoCarousel
          items={aiArchiveVideos}
          title={language === "es" ? "EXPERIMENTOS IA (2022–2024)" : "AI EXPERIMENTS (2022–2024)"}
          variant="retro"
        />
      </div>

      <div className="mt-12 text-center">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>
        <p className="mt-6 text-xs text-neon-green">
          &copy; 1986-{new Date().getFullYear()} TOMÁS PERÓ // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION
        </p>
      </div>
      </div>
    </main>
  )
}








