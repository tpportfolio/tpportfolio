"use client"

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react"
import Image, { type StaticImageData } from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  LayoutGrid,
  ListMusic,
  Lock,
  Pause,
  Play,
  Video,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"
import { VideoCarousel, type VideoItem } from "@/components/video-carousel"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"
import { RetroPanel } from "@/components/retro-panel"
import thumbMCBK1 from "./thumb_MCBK_1.png"
import thumbAND1 from "./thumb_AND_1.png"
import thumbUGCMODEL1 from "./thumb_UGCMODEL_1.png"
import the8bureauPopupThumb from "./thumb_the8bureau_1.png"
import the8bureauThumb from "./thumb_the8bureau_2.png"
import andRefe1 from "./and_refe1.png"
import andRefe2 from "./and_refe2.png"
import andRefe3 from "./and_refe3.png"
import andRefe4 from "./and_refe4.png"
import andRefe5 from "./and_refe5.png"
import andRefe6 from "./and_refe6.png"
import andRefe7 from "./and_refe7.png"
import andRefe8 from "./and_refe8.png"
import andRefe9 from "./and_refe9.png"
import andRefe10 from "./and_refe10.png"
import andRefe11 from "./and_refe11.png"
import andRefe12 from "./and_refe12.png"

type SupportedLanguage = "es" | "en"

type ContentFilter = "all" | "imagen" | "video" | "audio"

type AudioTrack = {
  id: string
  title: string
  tag: string
  file: string
  cover: string
  gradient: string
}

const IA_AUDIO_TRACKS: AudioTrack[] = [
  { id: "indie-vc-la-pari", title: "INDIE ARG Tribute - Bandalos Chinos lyrics", tag: "Indie", file: "/audio/ia-tracks/indie-vc-la-pari.mp3", cover: "/audio/ia-tracks/covers/indie-vc-la-pari.jpg", gradient: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { id: "indie-hacerla-silvestre", title: "INDIE ARG Tribute - Silvestre y la naranja", tag: "Indie", file: "/audio/ia-tracks/indie-hacerla-silvestre-y-la-naranja.mp3", cover: "/audio/ia-tracks/covers/indie-hacerla-silvestre-y-la-naranja.jpg", gradient: "linear-gradient(135deg,#a21caf,#f59e0b)" },
  { id: "quetomas-rap-2", title: "QueTomas Rap", tag: "Rap", file: "/audio/ia-tracks/quetomas-rap-2.mp3", cover: "/audio/ia-tracks/covers/quetomas-rap-2.jpg", gradient: "linear-gradient(135deg,#22d3ee,#a3e635)" },
  { id: "ad-parfum-1", title: "AD Parfum - Spike Jonze tribute", tag: "Ad / Fragancia", file: "/audio/ia-tracks/ad-parfum-1.mp3", cover: "/audio/ia-tracks/covers/ad-parfum-1.jpg", gradient: "linear-gradient(135deg,#7c3aed,#db2777)" },
  { id: "mogmaxxing-anthem", title: "Mogmaxxing Anthem", tag: "Anthem", file: "/audio/ia-tracks/mogmaxxing-anthem.mp3", cover: "/audio/ia-tracks/covers/mogmaxxing-anthem.jpg", gradient: "linear-gradient(135deg,#111827,#6b21a8)" },
  { id: "humming-deals", title: "Electronic Humming Deals", tag: "Jingle", file: "/audio/ia-tracks/humming-deals.mp3", cover: "/audio/ia-tracks/covers/humming-deals.jpg", gradient: "linear-gradient(135deg,#0ea5e9,#22c55e)" },
  { id: "jingle-the8bureau-indie", title: "the8bureau - Indie Jingle", tag: "Jingle", file: "/audio/ia-tracks/jingle-the8bureau-indie-version.mp3", cover: "/audio/ia-tracks/covers/jingle-the8bureau-indie-version.jpg", gradient: "linear-gradient(135deg,#065f46,#39ff14)" },
  { id: "parody-herbon", title: "Parody — Deja que entre Herbon", tag: "Parodia", file: "/audio/ia-tracks/parody-deja-que-entre-herbon.mp3", cover: "/audio/ia-tracks/covers/parody-deja-que-entre-herbon.jpg", gradient: "linear-gradient(135deg,#16a34a,#84cc16)" },
  { id: "parody-todos", title: "Parody — Todos dicen todo", tag: "Parodia", file: "/audio/ia-tracks/parody-todos-dicen-todo.mp3", cover: "/audio/ia-tracks/covers/parody-todos-dicen-todo.jpg", gradient: "linear-gradient(135deg,#0891b2,#6366f1)" },
  { id: "parody-chacal", title: "Parody — La cumbia del chacal", tag: "Parodia / Cumbia", file: "/audio/ia-tracks/parody-la-cumbia-del-chacal.mp3", cover: "/audio/ia-tracks/covers/parody-la-cumbia-del-chacal.jpg", gradient: "linear-gradient(135deg,#dc2626,#f59e0b)" },
]

function localizeTrackTag(tag: string, language: SupportedLanguage) {
  if (language === "es") return tag
  return tag.replace("Fragancia", "Fragrance").replace("Parodia", "Parody")
}

function formatTrackTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const minutes = Math.floor(seconds / 60)
  const rest = Math.floor(seconds % 60)
  return `${minutes}:${String(rest).padStart(2, "0")}`
}

type GalleryImage = {
  id: string
  label: string
  gradient: string
  imageSrc?: StaticImageData
}

type Work2026Item = {
  id: string
  kind: "youtube-link" | "gallery" | "embed"
  mediaTag: "imagen" | "video"
  title: Record<SupportedLanguage, string>
  description: Record<SupportedLanguage, string>
  youtubeUrl?: string
  videoId?: string
  galleryImages?: GalleryImage[]
  thumbnail?: StaticImageData
}

type The8BureauFeature = {
  title: string
  description: Record<SupportedLanguage, string>
}

const modaGallery: GalleryImage[] = Array.from({ length: 16 }, (_, index) => {
  const hue = 18 + index * 7
  const modaGalleryImages: StaticImageData[] = [
    thumbAND1,
    andRefe1,
    andRefe5,
    andRefe9,
    andRefe2,
    andRefe6,
    andRefe10,
    andRefe3,
    andRefe7,
    andRefe11,
    andRefe4,
    andRefe8,
    andRefe12,
  ]
  return {
    id: `moda-${index + 1}`,
    label: `Look ${String(index + 1).padStart(2, "0")}`,
    gradient: `linear-gradient(135deg, hsl(${hue} 82% 62%), hsl(${hue + 20} 78% 26%))`,
    imageSrc: modaGalleryImages[index],
  }
})

function getWorks2026Items(language: SupportedLanguage): Work2026Item[] {
  return [
    {
      id: "ad-30-40",
      kind: "youtube-link",
      mediaTag: "video",
      title: { es: "Ad 30-40", en: "Ad 30-40" },
      description: {
        es: "Placeholder de video. El popup deja el CTA para abrir YouTube hasta definir el link final.",
        en: "Video placeholder. The popup keeps a YouTube CTA until the final URL is defined.",
      },
      youtubeUrl: "https://www.youtube.com/results?search_query=Ad+30-40",
      thumbnail: thumbMCBK1,
    },
    {
      id: "demo-producto",
      kind: "embed",
      mediaTag: "video",
      title: { es: "Demo de producto", en: "Product Demo" },
      description: {
        es: "Video embebido de referencia. Usa el mismo espacio visual que una galería.",
        en: "Embedded reference video. It uses the same visual area as a gallery.",
      },
      videoId: "zW8DP4fr7xA",
      youtubeUrl:
        "https://www.youtube.com/watch?v=zW8DP4fr7xA&list=PLTai-gQI1os01OvFV9Xid5OXWWgoM9FCP&index=2",
    },
    {
      id: "campana-moda",
      kind: "gallery",
      mediaTag: "imagen",
      title: { es: "Campaña Moda", en: "Fashion Campaign" },
      description: {
        es: "Galería placeholder de 16 imágenes en grilla 4x4. Click para abrir en pantalla completa.",
        en: "16-image placeholder gallery in a 4x4 grid. Click to open in fullscreen.",
      },
      galleryImages: modaGallery,
      thumbnail: thumbAND1,
    },
    {
      id: "ugc-content",
      kind: "youtube-link",
      mediaTag: "video",
      title: { es: "UGC content", en: "UGC content" },
      description: {
        es: "Placeholder de video. El popup deja el CTA para abrir YouTube hasta definir el link final.",
        en: "Video placeholder. The popup keeps a YouTube CTA until the final URL is defined.",
      },
      youtubeUrl: "https://www.youtube.com/results?search_query=UGC+content",
      thumbnail: thumbUGCMODEL1,
    },
  ]
}

const the8BureauIntro: Record<SupportedLanguage, string> = {
  es: "the8bureau es mi marca personal de IA y también es mi sistema operativo: la idea es convertirlo en un set de herramientas que pueda correr de manera local en mi computadora, de manera privada y offline. Quiero que sea una capa práctica para experimentar, orquestar y ejecutar sin depender de flujos de trabajo que solo funcionan en la nube.",
  en: "the8bureau is my personal AI brand and also my operating system: the idea is to turn it into a set of tools that can run locally on my computer, privately and offline. I want it to become a practical layer for experimentation, orchestration and execution without depending on cloud-only workflows.",
}

const the8BureauFeatures: The8BureauFeature[] = [
  {
    title: "AUTONOMOUS AD AGENCY",
    description: {
      es: "Sistema de agentes que reciben un brief y lo trabajan con inputs humanos. Estado: en construcción.",
      en: "Agent system that receives a brief and works it with human inputs. Status: under construction.",
    },
  },
  {
    title: "NEURAL OPTIMIZATION SUITE (SEO/AEO/GEO)",
    description: {
      es: "Análisis de tu marca online, reportes de posicionamiento en Google (SEO) y en LLMs (AEO/GEO).",
      en: "Analysis of your brand online, with positioning reports for Google (SEO) and LLMs (AEO/GEO).",
    },
  },
  {
    title: "VIDEO SUBTITLE SUITE",
    description: {
      es: "Agregá subtítulos a tus videos: transcripción automática y edición gráfica.",
      en: "Add subtitles to your videos: automatic transcription and graphic editing.",
    },
  },
  {
    title: "TRANSCRIBE ANYTHING NOW",
    description: {
      es: "Transcriptor de audios, para cuando no podés parar a escuchar audios, o para transcribir videos.",
      en: "Audio transcription tool for when you cannot stop to listen to voice notes, or to transcribe videos.",
    },
  },
  {
    title: "SIDE-BY-SIDE IMAGE COMPARE",
    description: {
      es: "Comparador de dos imágenes para ver el antes y después de cambios, side by side o con slider.",
      en: "Compare two images to review before/after changes, side by side or with a slider.",
    },
  },
  {
    title: "MAPS LEAD EXTRACTOR",
    description: {
      es: "Determiná un punto en un mapa, un radio en km, una categoría, y extraé LEADS.",
      en: "Set a point on a map, a radius in km and a category, and extract LEADS.",
    },
  },
]

function The8BureauThumbnail({ isLight }: { isLight: boolean }) {
  const shellClass = isLight
    ? "border-[#c57b45] bg-[#fff5e8]"
    : "border-neon-green/30 bg-[#03190f]"
  const textMain = isLight ? "text-[#1d281f]" : "text-white"
  const textMuted = isLight ? "text-[#6f5b4a]" : "text-white/70"
  const chipClass = isLight
    ? "border-[#c57b45]/60 bg-[#fff9f2] text-[#8b4315]"
    : "border-neon-green/35 bg-[#062215] text-neon-green"
  const cardClass = isLight
    ? "border-[#d9a06b]/60 bg-[#fffaf5]"
    : "border-neon-green/25 bg-[#051b12]"

  return (
    <div className={`w-full max-w-[360px] overflow-hidden rounded-sm border p-4 shadow-[0_0_24px_rgba(0,0,0,0.22)] ${shellClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full border font-cyber text-lg ${chipClass}`}>8</div>
          <div>
            <div className={`font-cyber text-[2rem] leading-none ${textMain}`}>the8bureau</div>
            <div className={`mt-1 font-cyber text-xs uppercase tracking-[0.2em] ${isLight ? "text-[#b45309]" : "text-neon-green"}`}>
              Control dashboard
            </div>
          </div>
        </div>
        <div className={`rounded-full border px-3 py-1 font-cyber text-[10px] uppercase tracking-[0.18em] ${chipClass}`}>
          Terminal
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["HOME", "APPS", "RUNNING", "BLOCKED"].map((chip) => (
          <span key={chip} className={`rounded-full border px-2.5 py-1 font-cyber text-[10px] uppercase tracking-[0.16em] ${chipClass}`}>
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {the8BureauFeatures.map((feature) => (
          <div key={feature.title} className={`rounded-sm border p-3 ${cardClass}`}>
            <div className={`font-cyber text-[11px] uppercase leading-tight tracking-[0.14em] ${textMain}`}>{feature.title}</div>
            <div className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
              {feature.title === "AUTONOMOUS AD AGENCY"
                ? "Autonomous advertising + CEO agent"
                : feature.title === "NEURAL OPTIMIZATION SUITE (SEO/AEO/GEO)"
                  ? "AEO / GEO / SEO visibility"
                  : feature.title === "VIDEO SUBTITLE SUITE"
                    ? "Subtitle editor"
                    : feature.title === "TRANSCRIBE ANYTHING NOW"
                      ? "Audio to text"
                      : feature.title === "SIDE-BY-SIDE IMAGE COMPARE"
                        ? "Before / after"
                        : "Maps lead extraction"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function The8BureauScreenshotThumb({ isLight, onOpen }: { isLight: boolean; onOpen: () => void }) {
  const { language } = useLanguage()
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={language === "es" ? "Abrir la imagen del dashboard de the8bureau" : "Open the8bureau dashboard image"}
      className={`block h-full w-full max-w-[300px] overflow-hidden rounded-sm border text-left shadow-[0_0_24px_rgba(0,0,0,0.22)] transition-transform hover:scale-[1.01] ${
        isLight ? "border-[#c57b45] bg-[#fff5e8]" : "border-neon-green/30 bg-[#03190f]"
      }`}
    >
      <div className={`relative h-full min-h-[220px] w-full ${isLight ? "bg-[#f7ead8]" : "bg-[#04150d]"}`}>
        <Image
          src={the8bureauThumb}
          alt={language === "es" ? "Dashboard de the8bureau" : "the8bureau dashboard"}
          fill
          sizes="(max-width: 1280px) 300px, 300px"
          className="object-contain object-top"
          priority={false}
        />
      </div>
    </button>
  )
}

function The8BureauImageModal({ isLight, onClose }: { isLight: boolean; onClose: () => void }) {
  const { language } = useLanguage()
  const closePreviewLabel = language === "es" ? "Cerrar vista previa de la imagen" : "Close image preview"
  const dashboardLabel = language === "es" ? "Dashboard de the8bureau" : "the8bureau dashboard"
  return (
    <div
      className="fixed inset-3 z-[90] md:bottom-6 md:right-6 md:top-6 md:left-[13.5rem] lg:left-[14rem]"
      role="dialog"
      aria-modal="true"
      aria-label={dashboardLabel}
    >
      <button type="button" className="absolute inset-0 bg-black/80" onClick={onClose} aria-label={closePreviewLabel} />
      <div
        className={`relative mx-auto flex h-full max-h-[90vh] w-full md:w-[88%] max-w-none flex-col overflow-hidden rounded-sm border-2 ${
          isLight ? "border-[#8b4315] bg-[#fff8f1]" : "border-neon-green bg-black"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b px-4 py-3 ${
            isLight ? "border-[#c57b45] bg-[#fff3e6]" : "border-neon-green/40 bg-[#03190f]"
          }`}
        >
          <div className="font-cyber text-sm uppercase tracking-[0.18em] text-neon-cyan">the8bureau</div>
          <button
            type="button"
            onClick={onClose}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-sm border ${
              isLight ? "border-[#8b4315] text-[#6f3210] hover:bg-[#f6e6d2]" : "border-neon-green/40 text-neon-green hover:bg-neon-green/10"
            }`}
            aria-label={closePreviewLabel}
          >
            X
          </button>
        </div>
        <div className={`relative flex-1 p-4 ${isLight ? "bg-[#fff8f1]" : "bg-black"}`}>
          <div className="relative h-full w-full">
            <Image src={the8bureauPopupThumb} alt={dashboardLabel} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewStage({
  item,
  isLight,
  lockedPreview = false,
}: {
  item: Work2026Item
  isLight: boolean
  lockedPreview?: boolean
}) {
  const { language } = useLanguage()
  const frameClass = isLight
    ? "border-[#d9a06b] bg-[#f8ead9]"
    : "border-neon-green/20 bg-black/40"

  const previewInnerStyle = lockedPreview
    ? { filter: "grayscale(0.5) blur(1.6px)", transform: "scale(1.012)" }
    : undefined

  const previewOverlay = lockedPreview ? (
    <div className="absolute inset-0 z-[1] flex items-center justify-center p-4">
      <div
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-cyber uppercase tracking-[0.2em] shadow-[0_10px_28px_rgba(0,0,0,0.18)] ${
          isLight
            ? "border-[#b45309]/35 bg-[rgba(255,248,241,0.34)] text-[#7a3d08]"
            : "border-[#8dc5ff]/30 bg-[rgba(7,20,47,0.22)] text-[#d8eeff]"
        }`}
        style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      >
        <Lock className="h-3.5 w-3.5" />
        <span>{language === "es" ? "Próximamente" : "Coming soon"}</span>
      </div>
    </div>
  ) : null

  if (item.thumbnail) {
    return (
      <div className={`aspect-[16/8] md:aspect-[16/6.2] overflow-hidden rounded-sm border ${frameClass}`}>
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title[language]}
            fill
            sizes="(max-width: 1280px) 100vw, 900px"
            className="object-contain"
            style={previewInnerStyle}
            priority={false}
          />
          {previewOverlay}
        </div>
      </div>
    )
  }

  if (item.kind === "gallery") {
    return (
      <div className={`aspect-[16/8] md:aspect-[16/6.2] overflow-hidden rounded-sm border p-2 md:p-3 ${frameClass}`}>
        <div className="relative h-full w-full overflow-hidden">
          <div className="grid h-full grid-cols-3 gap-2" style={previewInnerStyle}>
            {item.galleryImages?.slice(0, 6).map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-sm"
                style={{ background: image.imageSrc ? undefined : image.gradient }}
              >
                {image.imageSrc ? (
                  <Image
                    src={image.imageSrc}
                    alt={image.label}
                    fill
                    sizes="(max-width: 1280px) 33vw, 180px"
                    className="object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>
          {previewOverlay}
        </div>
      </div>
    )
  }

  if (item.kind === "embed" && item.videoId) {
    return (
      <div className={`aspect-[16/8] md:aspect-[16/6.2] overflow-hidden rounded-sm border ${frameClass}`}>
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
            alt={item.title[language]}
            className="h-full w-full object-contain"
            style={previewInnerStyle}
            loading="lazy"
          />
          {previewOverlay}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`aspect-[16/8] md:aspect-[16/6.2] overflow-hidden rounded-sm border p-4 md:p-5 ${
        isLight ? "border-[#d9a06b] bg-[#f8ead9]" : "border-neon-green/20 bg-black/40"
      }`}
    >
      <div className="relative h-full overflow-hidden rounded-sm bg-gradient-to-br from-black/70 via-black/30 to-neon-cyan/10 p-5">
        <div className="flex h-full flex-col justify-between" style={previewInnerStyle}>
          <div className="inline-flex w-fit rounded-sm border border-neon-cyan/40 px-2 py-1 font-cyber text-xs uppercase tracking-[0.18em] text-neon-cyan">
            YOUTUBE
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neon-green/40 bg-neon-green/10">
              <Play className="h-5 w-5 fill-current text-neon-green" />
            </div>
            <div className="font-cyber text-xl text-neon-cyan">{item.title[language]}</div>
          </div>
        </div>
        {previewOverlay}
      </div>
    </div>
  )
}

function UpdatesPendingBadge({
  isLight,
  compact = false,
}: {
  isLight: boolean
  compact?: boolean
}) {
  return (
    <div
      className={`border-2 font-['MS_Sans_Serif'],system-ui,sans-serif shadow-[3px_3px_0_#000] ${
        compact ? "w-[292px] text-[11px]" : "max-w-[360px] text-[13px]"
      } ${
        isLight ? "border-[#8b4315] bg-[#f6e6d2] shadow-[3px_3px_0_#8b4315]" : "border-black bg-[#c0c0c0]"
      }`}
    >
      <div
        className={`flex items-center justify-between ${compact ? "px-2 py-[3px]" : "px-2 py-1"} ${
          isLight
            ? "bg-gradient-to-r from-[#6f3210] to-[#b85a17] text-[#f7d7a0]"
            : "bg-gradient-to-r from-[#000080] to-[#1e4aa8] text-white"
        }`}
      >
        <span className={`animate-blink font-bold uppercase tracking-wider whitespace-nowrap ${compact ? "text-[10px]" : ""}`} style={{ textShadow: "none" }}>
          UPDATES PENDING
        </span>
        <span className={`ml-2 space-x-1 ${isLight ? "text-[#3d1b09]" : ""}`} style={{ textShadow: "none" }}>
          <span className="inline-block border border-black bg-[#c0c0c0] px-1 text-[10px] text-black">{"\u25A2"}</span>
          <span className="inline-block border border-black bg-[#c0c0c0] px-1 text-[10px] text-black">{"\u2716"}</span>
        </span>
      </div>
      <div className={`flex items-center gap-2 border-t ${compact ? "px-2.5 py-1.5" : "px-3 py-2"} ${isLight ? "border-[#8b4315] bg-[#fff4e8]" : "border-black bg-[#e5e5e5]"}`}>
        <span className={compact ? "text-base" : "text-lg"} style={{ textShadow: "none" }}>{"\u26A0\uFE0F"}</span>
        <span className={`${compact ? "text-[10px]" : "text-[12px]"} leading-tight text-black`} style={{ textShadow: "none" }}>
          {"NEW AI EXPERIMENTS COMING\u2026"}
          <br />
          WORK IN PROGRESS
        </span>
      </div>
    </div>
  )
}

function Work2026Modal({
  item,
  language,
  isLight,
  onClose,
}: {
  item: Work2026Item
  language: SupportedLanguage
  isLight: boolean
  onClose: () => void
}) {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null)
  const shellClass =
    item.kind === "gallery"
      ? `relative mx-auto flex max-h-[90vh] w-full md:w-[82%] max-w-none flex-col overflow-hidden rounded-sm border-2 ${
          isLight ? "border-[#8b4315] bg-[#fff8f1]" : "border-neon-green bg-black"
        }`
      : `relative mx-auto flex max-h-[90vh] w-full md:w-[88%] max-w-none flex-col overflow-hidden rounded-sm border-2 ${
          isLight ? "border-[#8b4315] bg-[#fff8f1]" : "border-neon-green bg-black"
        }`

  const bodyClass =
    item.kind === "gallery"
      ? "overflow-y-auto p-4 md:p-5"
      : "overflow-y-auto p-3 md:p-4"

  return (
    <div
      className="fixed inset-3 z-[90] md:bottom-6 md:right-6 md:top-6 md:left-[13.5rem] lg:left-[14rem]"
      role="dialog"
      aria-modal="true"
      aria-label={item.title[language]}
    >
      <button className="absolute inset-0 bg-black/80" onClick={onClose} aria-label={language === "es" ? "Cerrar popup" : "Close popup"} />
      <div className={shellClass}>
        <div
          className={`flex items-center justify-between border-b px-4 py-3 ${
            isLight ? "border-[#8b4315] text-[#6f3210]" : "border-neon-green/40 text-neon-green"
          }`}
        >
          <div className="font-cyber text-sm uppercase tracking-[0.2em]">{item.title[language]}</div>
          <button
            onClick={onClose}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-sm border ${
              isLight
                ? "border-[#8b4315] text-[#6f3210] hover:bg-[#f6e6d2]"
                : "border-neon-green/40 text-neon-green hover:bg-neon-green/10"
            }`}
            aria-label={language === "es" ? "Cerrar popup" : "Close popup"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className={bodyClass}>
          {item.kind === "gallery" ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
              {item.galleryImages?.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => {
                    if (image.imageSrc) setSelectedGalleryImage(image)
                  }}
                  className={`aspect-square overflow-hidden rounded-sm border p-3 ${
                    isLight ? "border-[#c57b45]" : "border-neon-green/30"
                  }`}
                  style={{ background: image.gradient }}
                >
                  <div className="relative flex h-full items-end overflow-hidden rounded-sm border border-white/20 bg-black/10 p-3">
                    {image.imageSrc ? (
                      <Image
                        src={image.imageSrc}
                        alt={image.label}
                        fill
                        sizes="(max-width: 1280px) 25vw, 220px"
                        className="object-cover"
                      />
                    ) : null}
                    <span className="relative z-[1] font-cyber text-sm uppercase tracking-[0.18em] text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.65)]">
                      {image.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : item.kind === "embed" ? (
            <div className="space-y-4">
              <div className="mx-auto w-[90%] overflow-hidden rounded-sm border border-neon-green/30">
                <YouTubeEmbed videoId={item.videoId ?? ""} aspectClassName="aspect-[16/9.45]" />
              </div>
              <a
                href={item.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neon-magenta underline hover:text-neon-cyan"
              >
                {language === "es" ? "Abrir en YouTube" : "Open on YouTube"}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <PreviewStage item={item} isLight={isLight} />
              <a
                href={item.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neon-magenta underline hover:text-neon-cyan"
              >
                {language === "es" ? "Abrir en YouTube" : "Open on YouTube"}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>

        {selectedGalleryImage?.imageSrc ? (
          <div className="absolute inset-0 z-[20] flex items-center justify-center bg-black/88 p-2 sm:p-4">
            <button className="absolute inset-0" onClick={() => setSelectedGalleryImage(null)} aria-label={language === "es" ? "Cerrar vista previa de la imagen" : "Close image preview"} />
            <div
              className={`relative z-[1] w-full max-w-[min(92vw,1120px)] overflow-hidden rounded-sm border p-2 sm:p-3 ${
                isLight ? "border-[#c57b45] bg-[#fff8f1]" : "border-neon-green/40 bg-black"
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedGalleryImage(null)}
                className={`absolute right-3 top-3 z-[2] inline-flex h-9 w-9 items-center justify-center rounded-sm border ${
                  isLight
                    ? "border-[#8b4315] text-[#6f3210] hover:bg-[#f6e6d2]"
                    : "border-neon-green/40 text-neon-green hover:bg-neon-green/10"
                }`}
                aria-label={language === "es" ? "Cerrar vista previa de la imagen" : "Close image preview"}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative h-[min(64vh,960px)] w-full sm:h-[min(78vh,960px)]">
                <Image
                  src={selectedGalleryImage.imageSrc}
                  alt={selectedGalleryImage.label}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ContentFilterBar({
  active,
  language,
  isLight,
  onChange,
}: {
  active: ContentFilter
  language: SupportedLanguage
  isLight: boolean
  onChange: (filter: ContentFilter) => void
}) {
  const filters: { id: ContentFilter; label: string; icon: typeof LayoutGrid; count?: string }[] = [
    { id: "all", label: language === "es" ? "Todos" : "All", icon: LayoutGrid },
    { id: "imagen", label: language === "es" ? "Imagen" : "Image", icon: ImageIcon, count: "1" },
    { id: "video", label: "Video", icon: Video, count: "3+" },
    { id: "audio", label: "Audio", icon: ListMusic, count: String(IA_AUDIO_TRACKS.length) },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-cyber text-xs uppercase tracking-[0.2em] text-neon-cyan">
        {language === "es" ? "Filtrar:" : "Filter:"}
      </span>
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = active === filter.id
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-cyber text-xs uppercase tracking-[0.16em] transition-colors ${
              isActive
                ? isLight
                  ? "border-[#8b4315] bg-[#8b4315] text-[#fff4e8]"
                  : "border-neon-green bg-neon-green text-black"
                : isLight
                  ? "border-[#d9a06b] bg-[#fff8f1] text-[#8b4315] hover:border-[#8b4315]"
                  : "border-neon-green/40 bg-black/40 text-neon-green hover:border-neon-green hover:text-neon-cyan"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{filter.label}</span>
            {filter.count ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  isActive ? "bg-black/25 text-inherit" : isLight ? "bg-[#f6e6d2] text-[#8b4315]" : "bg-neon-green/15 text-neon-green"
                }`}
              >
                {filter.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

function trackGlowColor(gradient: string, fallback: string) {
  const match = gradient.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/)
  return match ? `${match[0]}80` : fallback
}

function StageBackdrop({ isLight, isPlaying }: { isLight: boolean; isPlaying: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const playingRef = useRef(isPlaying)
  playingRef.current = isPlaying
  const lightRef = useRef(isLight)
  lightRef.current = isLight

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0

    const resize = () => {
      w = Math.max(1, parent.clientWidth)
      h = Math.max(1, parent.clientHeight)
      canvas.width = Math.floor(w * ratio)
      canvas.height = Math.floor(h * ratio)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(parent)

    type Dust = { x: number; y: number; r: number; s: number; a: number; drift: number }
    const spawn = (anywhere = false): Dust => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      s: 0.15 + Math.random() * 0.5,
      a: 0.15 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.3,
    })
    const dust: Dust[] = Array.from({ length: 70 }, () => spawn(true))

    let rafId = 0
    let running = true
    let t = Math.random() * 1000
    let scanY = -1
    let scanTimer = 200

    const frame = () => {
      if (!running) return
      const playing = playingRef.current
      const ac = lightRef.current ? "245,158,11" : "57,255,20"
      const cy = lightRef.current ? "245,158,11" : "0,255,255"
      t += playing ? 0.03 : 0.008

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const blobs = [
        { x: w * (0.5 + 0.3 * Math.sin(t * 0.4)), y: h * 0.42, r: Math.min(w, h) * 0.45, a: playing ? 0.1 : 0.06 },
        { x: w * (0.5 + 0.35 * Math.cos(t * 0.3 + 2)), y: h * 0.55, r: Math.min(w, h) * 0.35, a: playing ? 0.08 : 0.05 },
      ]
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `rgba(${ac},${b.a})`)
        g.addColorStop(1, `rgba(${ac},0)`)
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }

      const baseY = h * 0.4
      const amp = (playing ? 10 : 5) + Math.sin(t * 0.7) * 2
      const speed = playing ? 2.2 : 0.7
      ctx.save()
      ctx.shadowBlur = playing ? 18 : 10
      ctx.shadowColor = `rgba(${ac},${playing ? 0.8 : 0.45})`
      ctx.strokeStyle = `rgba(${ac},${playing ? 0.55 : 0.3})`
      ctx.lineWidth = playing ? 2 : 1.25
      ctx.beginPath()
      for (let x = -20; x <= w + 20; x += 8) {
        const y =
          baseY +
          Math.sin(x * 0.012 + t * speed) * amp +
          Math.sin(x * 0.03 - t * 1.1) * amp * 0.3
        if (x === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()

      const rise = playing ? 1.6 : 0.6
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i]
        p.y -= p.s * rise
        p.x += p.drift * rise + Math.sin(t * 2 + i) * 0.15
        if (p.y < -12 || p.x < -12 || p.x > w + 12) dust[i] = spawn()
        else {
          ctx.fillStyle = `rgba(${ac},${p.a * (playing ? 1 : 0.6)})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      scanTimer -= 1
      if (scanTimer <= 0 && scanY < 0) {
        scanY = -30
        scanTimer = 240 + Math.random() * 240
      }
      if (scanY >= 0) {
        scanY += h / 90
        const sg = ctx.createLinearGradient(0, scanY - 24, 0, scanY + 24)
        sg.addColorStop(0, `rgba(${cy},0)`)
        sg.addColorStop(0.5, `rgba(${cy},0.1)`)
        sg.addColorStop(1, `rgba(${cy},0)`)
        ctx.fillStyle = sg
        ctx.fillRect(0, scanY - 24, w, 48)
        if (scanY > h + 30) scanY = -1
      }

      if (!prefersReducedMotion) rafId = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(rafId)
      } else if (!prefersReducedMotion) {
        running = true
        rafId = requestAnimationFrame(frame)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    rafId = requestAnimationFrame(frame)
    return () => {
      running = false
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

function SpotifyGallery({ language, isLight }: { language: SupportedLanguage; isLight: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [coversReady, setCoversReady] = useState<Record<string, boolean>>({})
  const [buffering, setBuffering] = useState(false)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [stageWidth, setStageWidth] = useState(960)
  const currentTrack = IA_AUDIO_TRACKS[currentIndex]
  const accent = isLight ? "#f59e0b" : "#39ff14"
  const total = IA_AUDIO_TRACKS.length

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, currentIndex])

  const selectTrack = (index: number) => {
    if (index === currentIndex) {
      setIsPlaying((playing) => !playing)
    } else {
      setCurrentIndex(index)
      setProgress(0)
      setIsPlaying(true)
      playClack()
    }
  }

  const stepTrack = (direction: 1 | -1) => {
    setCurrentIndex((current) => (current + direction + total) % total)
    setProgress(0)
    playClack()
  }

  const togglePlay = () => setIsPlaying((playing) => !playing)

  const posRef = useRef(0)
  const velRef = useRef(0)
  const tiltRef = useRef(0)
  const tiltVelRef = useRef(0)
  const tiltTargetRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef(0)
  const loopOnRef = useRef(false)
  const dragRef = useRef<{
    startX: number
    startPos: number
    id: number
    moved: boolean
    lastX: number
    lastT: number
    vel: number
  } | null>(null)

  const applyLayout = (pos: number) => {
    const stage = stageRef.current
    if (!stage) return
    const items = stage.querySelectorAll(".flow-item")
    items.forEach((el, i) => {
      const item = el as HTMLDivElement
      const s = computeFlowStyle(i, pos)
      item.style.transform = s.transform
      item.style.opacity = String(s.opacity)
      item.style.filter = s.filter
      item.style.zIndex = String(s.zIndex)
    })
    const track = stage.querySelector(".coverflow-track") as HTMLDivElement | null
    if (track) track.style.transform = `rotateY(${tiltRef.current}deg)`
  }

  const runLoop = () => {
    if (loopOnRef.current) return
    loopOnRef.current = true
    let last = performance.now()
    const stepFn = (now: number) => {
      if (!loopOnRef.current) return
      const dt = Math.min(1 / 30, (now - last) / 1000)
      last = now
      const target = targetRef.current
      const acc = (target - posRef.current) * 210 - velRef.current * 25
      velRef.current += acc * dt
      posRef.current += velRef.current * dt
      posRef.current = Math.max(-0.6, Math.min(total - 0.4, posRef.current))
      const tacc = (tiltTargetRef.current - tiltRef.current) * 60 - tiltVelRef.current * 12
      tiltVelRef.current += tacc * dt
      tiltRef.current += tiltVelRef.current * dt
      const settled =
        Math.abs(target - posRef.current) < 0.001 &&
        Math.abs(velRef.current) < 0.02 &&
        Math.abs(tiltTargetRef.current - tiltRef.current) < 0.01 &&
        Math.abs(tiltVelRef.current) < 0.05
      if (settled) {
        posRef.current = target
        velRef.current = 0
        tiltRef.current = tiltTargetRef.current
        tiltVelRef.current = 0
        applyLayout(target)
        loopOnRef.current = false
        return
      }
      applyLayout(posRef.current)
      rafRef.current = requestAnimationFrame(stepFn)
    }
    rafRef.current = requestAnimationFrame(stepFn)
  }

  useEffect(() => {
    targetRef.current = currentIndex
    runLoop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  useEffect(
    () => () => {
      loopOnRef.current = false
      cancelAnimationFrame(rafRef.current)
    },
    []
  )

  const onStagePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement
    if (t.closest("input")) return
    dragRef.current = {
      startX: e.clientX,
      startPos: posRef.current,
      id: e.pointerId,
      moved: false,
      lastX: e.clientX,
      lastT: performance.now(),
      vel: 0,
    }
  }

  const onStagePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const dr = dragRef.current
    if (!dr || e.pointerId !== dr.id) {
      const rect = e.currentTarget.getBoundingClientRect()
      tiltTargetRef.current = ((e.clientX - rect.left) / rect.width - 0.5) * 5
      runLoop()
      return
    }
    const dx = e.clientX - dr.startX
    if (!dr.moved && Math.abs(dx) > 8) {
      dr.moved = true
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
    }
    if (dr.moved) {
      const now = performance.now()
      const dt = Math.max(1, now - dr.lastT)
      dr.vel = 0.8 * dr.vel + 0.2 * (((e.clientX - dr.lastX) / dt) * (1000 / slotStep))
      dr.lastX = e.clientX
      dr.lastT = now
      const next = Math.max(-0.6, Math.min(total - 0.4, dr.startPos - dx / slotStep))
      posRef.current = next
      velRef.current = 0
      targetRef.current = next
      tiltTargetRef.current = 0
      applyLayout(next)
    }
  }

  const endStageDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const dr = dragRef.current
    if (!dr || e.pointerId !== dr.id) return
    dragRef.current = null
    if (!dr.moved) return
    const predicted = posRef.current + dr.vel * 0.18
    const snap = Math.max(0, Math.min(total - 1, Math.round(predicted)))
    velRef.current = dr.vel * 0.6
    if (snap !== currentIndex) {
      setProgress(0)
      setCurrentIndex(snap)
      playClack()
    } else {
      targetRef.current = snap
      runLoop()
    }
  }

  const onStagePointerLeave = () => {
    if (dragRef.current) return
    tiltTargetRef.current = 0
    runLoop()
  }

  const mechCtx = useRef<AudioContext | null>(null)
  const volumeRef = useRef(volume)
  volumeRef.current = volume

  const ensureMechCtx = () => {
    if (typeof window === "undefined") return null
    if (!mechCtx.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return null
      mechCtx.current = new AC()
    }
    if (mechCtx.current.state === "suspended") void mechCtx.current.resume()
    return mechCtx.current
  }

  const playThud = () => {
    try {
      const ctx = ensureMechCtx()
      const vol = volumeRef.current
      if (!ctx || vol === 0) return
      const t0 = ctx.currentTime
      const master = ctx.createGain()
      master.gain.setValueAtTime(Math.min(0.22, vol * 0.22), t0)
      master.connect(ctx.destination)
      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.setValueAtTime(140, t0)
      osc.frequency.exponentialRampToValueAtTime(48, t0 + 0.12)
      const og = ctx.createGain()
      og.gain.setValueAtTime(0.7, t0)
      og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.15)
      osc.connect(og)
      og.connect(master)
      osc.start(t0)
      osc.stop(t0 + 0.16)
    } catch {
      /* noop */
    }
  }

  const playClack = () => {
    try {
      const ctx = ensureMechCtx()
      const vol = volumeRef.current
      if (!ctx || vol === 0) return
      const t0 = ctx.currentTime
      const master = ctx.createGain()
      master.gain.setValueAtTime(Math.min(0.2, vol * 0.2), t0)
      master.connect(ctx.destination)
      const len = Math.floor(ctx.sampleRate * 0.07)
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2)
      const src = ctx.createBufferSource()
      src.buffer = buf
      const bp = ctx.createBiquadFilter()
      bp.type = "bandpass"
      bp.frequency.value = 1800
      bp.Q.value = 1.1
      src.connect(bp)
      bp.connect(master)
      src.start(t0)
      playThud()
    } catch {
      /* noop */
    }
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") stepTrack(1)
      else if (event.key === "ArrowLeft") stepTrack(-1)
      else if (event.key === " ") {
        const target = event.target as HTMLElement | null
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return
        event.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const update = () => setStageWidth(stage.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const itemSize = stageWidth < 520 ? 116 : stageWidth < 820 ? 144 : 172
  const slotStep = Math.max(16, (stageWidth / 2 - 140) / ((total - 1) / 2))
  const centerSlot = (total - 1) / 2

  function computeFlowStyle(index: number, pos: number) {
    const offset = index - pos
    const distance = Math.abs(offset)
    const x = Math.round((index - centerSlot) * slotStep)
    const arc = Math.round(Math.pow(Math.abs(index - centerSlot), 1.5) * (itemSize / 172) * 3)
    const glow = trackGlowColor(
      IA_AUDIO_TRACKS[index].gradient,
      isLight ? "rgba(245,158,11,0.5)" : "rgba(57,255,20,0.4)"
    )
    const close = Math.max(0, 1 - Math.min(1, distance))
    const scale = 0.82 + 0.4 * close
    const rot = -28 * Math.max(-1, Math.min(1, offset))
    const lift = Math.round(-8 * close)
    const bright = 0.75 + 0.25 * close
    const front = close > 0.6
    return {
      transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${lift}px + ${arc}px), 0px) rotateY(${rot}deg) scale(${scale})`,
      zIndex: front ? 50 : 30 - Math.round(distance),
      opacity: Math.max(0.55, 1 - distance * 0.05),
      filter: front ? `drop-shadow(0 14px 26px ${glow})` : `brightness(${bright})`,
    }
  }

  const getFlowStyle = (index: number): CSSProperties =>
    computeFlowStyle(index, posRef.current) as CSSProperties

  const statusText = buffering
    ? language === "es" ? "CARGANDO" : "LOADING"
    : isPlaying
      ? language === "es" ? "SONANDO" : "PLAYING"
      : progress > 0
        ? language === "es" ? "PAUSA" : "PAUSED"
        : language === "es" ? "LISTO" : "READY"

  return (
    <div className="space-y-4">
      <style>{`
        .coverflow-stage { perspective: 900px; perspective-origin: 50% 40%; }
        .coverflow-track { transform-style: preserve-3d; }
        .flow-item {
          transform-style: preserve-3d;
          transition: filter 0.3s ease, opacity 0.3s ease;
          will-change: transform;
        }
        .vinyl-grooves {
          background:
            radial-gradient(circle, transparent 18%, rgba(0,0,0,0.95) 19%, rgba(255,255,255,0.18) 20%, transparent 21%),
            repeating-radial-gradient(circle, rgba(255,255,255,0.08) 0px, rgba(0,0,0,0.65) 2px, rgba(255,255,255,0.05) 4px, rgba(0,0,0,0.95) 6px);
        }
        .vinyl-shine {
          background: conic-gradient(
            from 0deg,
            rgba(255,255,255,0.35) 0deg, rgba(255,255,255,0.01) 45deg,
            rgba(255,255,255,0.4) 90deg, rgba(255,255,255,0.01) 135deg,
            rgba(255,255,255,0.35) 180deg, rgba(255,255,255,0.01) 225deg,
            rgba(255,255,255,0.4) 270deg, rgba(255,255,255,0.01) 315deg,
            rgba(255,255,255,0.35) 360deg
          );
          mix-blend-mode: overlay;
        }
        @keyframes spinDisc {
          to { transform: rotate(360deg); }
        }
        .spinning-disc { animation: spinDisc 2.4s linear infinite; }
        .cover-shimmer { position: relative; overflow: hidden; }
        .cover-shimmer::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%);
          animation: shimmerSweep 1.6s linear infinite;
        }
        @keyframes shimmerSweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 8px transparent; }
          50% { box-shadow: 0 0 26px var(--card-glow, rgba(57,255,20,0.4)); }
        }
        .card-live { animation: cardGlow 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .spinning-disc, .card-live, .flipper-inner { animation: none; transition: none; }
        }
      `}</style>

      <audio
        ref={audioRef}
        src={currentTrack.file}
        preload="metadata"
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onCanPlay={() => setBuffering(false)}
        onEnded={() => stepTrack(1)}
      />

      <div className="flex items-center justify-between gap-2">
        <div
          className={`rounded-full border px-3 py-1 font-mono text-xs ${
            isLight ? "border-[#d9a06b]/60 bg-[#fff8f1] text-[#8b4315]" : "border-neon-green/30 bg-black/40 text-neon-green/80"
          }`}
        >
          Track <span className="font-bold" style={{ color: accent }}>{currentIndex + 1}</span> / {total}
        </div>
        <div className="hidden font-cyber text-[10px] uppercase tracking-[0.2em] opacity-60 sm:block">
          {language === "es" ? "Arrastrá • Click • ← →" : "Drag • Click • ← →"}
        </div>
        <div
          className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: isPlaying ? "#34d399" : undefined, opacity: isPlaying ? 1 : 0.55 }}
        >
          {statusText}
        </div>
      </div>

      <div
        ref={stageRef}
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={endStageDrag}
        onPointerCancel={endStageDrag}
        onPointerLeave={onStagePointerLeave}
        className={`coverflow-stage relative flex h-[360px] w-full touch-pan-y cursor-grab select-none items-center justify-center overflow-hidden rounded-sm border active:cursor-grabbing sm:h-[440px] ${
          isLight ? "border-[#d9a06b]/60 bg-[#170f05]" : "border-neon-green/20 bg-black/60"
        }`}
      >
        <StageBackdrop isLight={isLight} isPlaying={isPlaying} />
        <button
          type="button"
          onClick={() => stepTrack(-1)}
          aria-label={language === "es" ? "Anterior" : "Previous"}
          className={`absolute left-2 top-1/2 z-[60] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-black/50 backdrop-blur-sm transition-colors sm:left-3 ${
            isLight
              ? "border-[#8b4315] text-[#f59e0b] hover:bg-[#8b4315]/30"
              : "border-neon-green/50 text-neon-green hover:bg-neon-green/15"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => stepTrack(1)}
          aria-label={language === "es" ? "Siguiente" : "Next"}
          className={`absolute right-2 top-1/2 z-[60] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-black/50 backdrop-blur-sm transition-colors sm:right-3 ${
            isLight
              ? "border-[#8b4315] text-[#f59e0b] hover:bg-[#8b4315]/30"
              : "border-neon-green/50 text-neon-green hover:bg-neon-green/15"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="coverflow-track relative flex h-0 w-0 items-center justify-center">
          {IA_AUDIO_TRACKS.map((track, index) => {
            const isActive = index === currentIndex
            return (
              <div
                key={track.id}
                role="option"
                aria-selected={isActive}
                data-active={isActive}
                className="flow-item absolute left-1/2 top-[44%] flex flex-col items-center"
                style={{ ...getFlowStyle(index), width: itemSize }}
              >
                <div className="relative" style={{ width: itemSize, height: itemSize, perspective: "800px" }}>
                  <div
                    className="flipper-inner relative h-full w-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isActive ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => selectTrack(index)}
                      aria-label={
                        language === "es"
                          ? isActive && isPlaying ? `Pausar ${track.title}` : `Reproducir ${track.title}`
                          : isActive && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`
                      }
                      className={`absolute inset-0 block cursor-pointer overflow-hidden rounded-sm border shadow-2xl transition-colors ${
                        isActive
                          ? isLight
                            ? "border-[#f59e0b] shadow-[#f59e0b]/30"
                            : "border-neon-green/70 shadow-neon-green/25"
                          : isLight
                            ? "border-[#d9a06b]/50"
                            : "border-white/15"
                      }`}
                      style={{ background: track.gradient, backfaceVisibility: "hidden" }}
                    >
                      <div
                        aria-hidden
                        className={`cover-shimmer absolute inset-0 transition-opacity duration-500 ${coversReady[track.id] ? "opacity-0" : "opacity-100"}`}
                        style={{ background: track.gradient }}
                      />
                      <img
                        src={track.cover}
                        alt={track.title}
                        onLoad={() => setCoversReady((prev) => (prev[track.id] ? prev : { ...prev, [track.id]: true }))}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${coversReady[track.id] ? "opacity-100" : "opacity-0"}`}
                        loading="lazy"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => selectTrack(index)}
                      aria-label={
                        language === "es"
                          ? isActive && isPlaying ? `Pausar ${track.title}` : `Reproducir ${track.title}`
                          : isActive && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`
                      }
                      className="absolute inset-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-white/15 bg-[#0a0a0c] shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        boxShadow: isActive ? `0 0 24px ${trackGlowColor(track.gradient, accent)}` : undefined,
                      }}
                    >
                      <div
                        className={`relative h-[92%] w-[92%] overflow-hidden rounded-full border ${
                          isActive ? "spinning-disc" : ""
                        } ${isLight ? "border-[#f59e0b]/40" : "border-white/20"}`}
                        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                      >
                        <div className="absolute inset-0 rounded-full bg-[#0a0a0c]" />
                        <div className="vinyl-grooves absolute inset-0 rounded-full opacity-85" />
                        <div className="vinyl-shine absolute inset-0 rounded-full" />
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-[7%] h-2 w-2 -translate-x-1/2 rounded-full"
                          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                        />
                        <div
                          className="absolute left-1/2 top-1/2 flex h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black shadow-inner"
                          style={{ background: track.gradient }}
                        >
                          <div className="h-2.5 w-2.5 rounded-full border border-white/40 bg-black" />
                        </div>
                      </div>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectTrack(index)}
                    aria-label={
                        language === "es"
                          ? isActive && isPlaying ? `Pausar ${track.title}` : `Reproducir ${track.title}`
                          : isActive && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`
                      }
                    className="absolute left-1/2 top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-black/60 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                    style={
                      isActive
                        ? { borderColor: accent, color: accent, boxShadow: `0 0 18px ${trackGlowColor(track.gradient, accent)}` }
                        : { borderColor: "rgba(255,255,255,0.35)", color: "#fff" }
                    }
                  >
                    {isActive && isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5" />
                    )}
                  </button>
                </div>

                <div
                  className={`mt-2 rounded-sm border px-2 py-1.5 text-center ${
                    isActive && isPlaying ? "card-live" : ""
                  } ${
                    isActive
                      ? isLight
                        ? "border-[#f59e0b]/70 bg-[#0b0d0c]/95"
                        : "border-neon-green/50 bg-[#0b0d0c]/95"
                      : "border-white/10 bg-[#0b0d0c]/85"
                  }`}
                  style={{ width: itemSize, "--card-glow": trackGlowColor(track.gradient, accent) } as CSSProperties}
                >
                  <p
                    className={`font-cyber text-[11px] font-bold leading-snug [overflow-wrap:anywhere] ${
                      isLight ? "text-[#fff4e8]" : "text-white"
                    }`}
                    style={{
                      textShadow: isLight
                        ? "0 0 10px rgba(245,158,11,0.45), 0 2px 4px #000"
                        : "0 0 10px rgba(57,255,20,0.4), 0 2px 4px #000",
                    }}
                  >
                    {track.title}
                  </p>
                  <p
                    className={`mt-0.5 font-cyber text-[10px] uppercase tracking-[0.18em] ${
                      isLight ? "text-[#f5b942]" : "text-neon-cyan"
                    }`}
                    style={isLight ? { textShadow: "0 0 8px rgba(245,158,11,0.65)" } : undefined}
                  >
                    {localizeTrackTag(track.tag, language)}
                  </p>
                  {isActive ? (
                    <div className="mt-1.5 flex w-full items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setVolume((current) => (current === 0 ? 0.85 : 0))}
                        aria-label={
                          language === "es"
                            ? volume === 0 ? "Activar sonido" : "Silenciar"
                            : volume === 0 ? "Unmute" : "Mute"
                        }
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                          isLight ? "border-[#d9a06b]/70 text-[#8b4315]" : "border-white/20 text-white/80"
                        }`}
                      >
                        {volume === 0 ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(event) => setVolume(Number(event.target.value))}
                        className="h-1 min-w-0 flex-1 cursor-pointer"
                        style={{ accentColor: accent }}
                        aria-label={language === "es" ? "Volumen" : "Volume"}
                      />
                    </div>
                  ) : null}
                  {isActive ? (
                    <div className="mt-1 w-full">
                      <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        value={progress}
                        onChange={(event) => {
                          const next = Number(event.target.value)
                          setProgress(next)
                          if (audioRef.current) audioRef.current.currentTime = next
                        }}
                        className="h-1 w-full min-w-0 cursor-pointer"
                        style={{ accentColor: accent }}
                        aria-label={language === "es" ? "Progreso" : "Progress"}
                      />
                      <div className="mt-0.5 flex items-center justify-between font-mono text-[9px] opacity-60">
                        <span>{formatTrackTime(progress)}</span>
                        <span>{formatTrackTime(duration)}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

    </div>
  )
}

function Works2026Carousel({
  language,
  isLight,
  filter,
}: {
  language: SupportedLanguage
  isLight: boolean
  filter: ContentFilter
}) {
  const allItems = getWorks2026Items(language)
  const items = allItems.filter((item) => filter === "all" || item.mediaTag === filter)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setActiveIndex(0)
    setIsModalOpen(false)
  }, [filter, language])

  if (items.length === 0) return null
  const safeIndex = Math.min(activeIndex, items.length - 1)
  const activeItem = items[safeIndex]

  const goPrev = () => setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1))
  const goNext = () => setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1))

  return (
    <>
      <RetroPanel
        title={language === "es" ? "2026 TRABAJOS Y EXPERIMENTOS" : "2026 WORKS AND EXPERIMENTS"}
        statusRight="2026"
        highlight
        accent={isLight ? "amber" : "blue"}
        headerOverlay={<UpdatesPendingBadge isLight={isLight} compact />}
      >
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_212px] xl:items-stretch">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="block w-full rounded-sm bg-transparent p-0 text-left"
              >
                <PreviewStage item={activeItem} isLight={isLight} lockedPreview />
              </button>

              <div className="grid gap-3 xl:h-full xl:grid-rows-[40px_repeat(4,minmax(0,1fr))]">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={goPrev}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-sm border ${
                      isLight
                        ? "border-[#8b4315] text-[#6f3210] hover:bg-[#f6e6d2]"
                        : "border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                    }`}
                    aria-label={language === "es" ? "Anterior" : "Previous"}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={goNext}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-sm border ${
                      isLight
                        ? "border-[#8b4315] text-[#6f3210] hover:bg-[#f6e6d2]"
                        : "border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                    }`}
                    aria-label={language === "es" ? "Siguiente" : "Next"}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {items.map((item, index) => {
                  const isActive = index === activeIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-sm border px-3 py-3.5 text-left transition-colors xl:h-full ${
                        isActive
                          ? isLight
                            ? "border-[#8b4315] text-[#8b4315]"
                            : "border-neon-green/60 text-neon-cyan"
                          : isLight
                            ? "border-[#d9a06b] text-[#9c6437] hover:border-[#8b4315] hover:text-[#8b4315]"
                            : "border-neon-green/30 text-neon-green/70 hover:border-neon-green/60 hover:text-neon-cyan"
                      }`}
                    >
                      <div className="font-cyber text-sm uppercase tracking-[0.18em] text-neon-cyan">
                        {item.title[language]}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="font-cyber text-lg text-neon-cyan">{activeItem.title[language]}</div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-2 inline-flex items-center gap-2 text-sm text-neon-magenta underline"
              >
                {language === "es" ? "Abrir popup" : "Open popup"}
              </button>
            </div>
        </div>
      </RetroPanel>

      {isModalOpen ? (
        <Work2026Modal item={activeItem} language={language} isLight={isLight} onClose={() => setIsModalOpen(false)} />
      ) : null}
    </>
  )
}

export default function AIExperimentsPage() {
  const { language } = useLanguage()
  const { mode } = useVisualMode()
  const isLight = mode === "light"
  const currentLanguage: SupportedLanguage = language === "en" ? "en" : "es"
  const [isThe8BureauModalOpen, setIsThe8BureauModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<ContentFilter>("all")

  const showImageVideo2026 = activeFilter !== "audio"
  const showVideoSections = activeFilter === "all" || activeFilter === "video"
  const showAudioSection = activeFilter === "all" || activeFilter === "audio"
  const showSystemSections = activeFilter === "all"

  const aiArchiveVideos: VideoItem[] = [
    {
      id: "luma-testing",
      type: "youtube",
      videoId: "PLTai-gQI1os2Pz82VXGrAZ9Jov1dujRCl",
      isPlaylist: true,
      title: {
        es: "JUN'24 - LUMA TESTING. Artworks animados de El mató a un policía motorizado.",
        en: "JUN'24 - LUMA TESTING. El mató a un policía motorizado animated artworks.",
      },
      description: {
        es: 'Probé Luma Labs en los artworks de "El mató a un policía motorizado".',
        en: 'I tested Luma Labs on the artworks of "El mató a un policía motorizado".',
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
        en: "I tested the Endless platform, a creative playground. I used voice cloning of Manuel Adorni and edited the video.",
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
        es: "Probé Google NotebookLM y generé un podcast a partir de mi propio currículum vitae.",
        en: "I tested Google NotebookLM and generated a podcast from my own curriculum vitae.",
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
        en: "My first tests with Suno in song creation: a freestyle/hip-hop track based on my CV. I worked on part of the lyrics with ChatGPT.",
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
        es: "Hice mis primeras pruebas con Stable Diffusion. Desde acá empecé a entusiasmarme y a profundizar a diario.",
        en: "My first tests with Stable Diffusion. From there I got excited and started going deeper every day.",
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
    <main className={`ai-page ai-page--amber min-h-screen px-4 py-6 md:px-12 ${isLight ? "ai-page--light" : ""}`}>
      <div className="w-full">
        <style>{`
          .ai-page--amber.ai-page--light .text-neon-green,
          .ai-page--amber.ai-page--light .text-neon-green\\/90,
          .ai-page--amber.ai-page--light .text-neon-green\\/80,
          .ai-page--amber.ai-page--light .text-neon-green\\/70,
          .ai-page--amber.ai-page--light .text-neon-green\\/60,
          .ai-page--amber.ai-page--light .text-neon-cyan,
          .ai-page--amber.ai-page--light .text-neon-cyan\\/90,
          .ai-page--amber.ai-page--light .text-neon-cyan\\/80,
          .ai-page--amber.ai-page--light .text-neon-cyan\\/70,
          .ai-page--amber.ai-page--light .text-cyan-400 {
            color: #f59e0b !important;
          }

          .ai-page--amber.ai-page--light .border-neon-green,
          .ai-page--amber.ai-page--light .border-neon-green\\/60,
          .ai-page--amber.ai-page--light .border-neon-green\\/50,
          .ai-page--amber.ai-page--light .border-neon-green\\/40,
          .ai-page--amber.ai-page--light .border-neon-green\\/30,
          .ai-page--amber.ai-page--light .border-neon-green\\/20,
          .ai-page--amber.ai-page--light .border-neon-cyan,
          .ai-page--amber.ai-page--light .border-neon-cyan\\/60,
          .ai-page--amber.ai-page--light .border-neon-cyan\\/50,
          .ai-page--amber.ai-page--light .border-neon-cyan\\/40,
          .ai-page--amber.ai-page--light .border-neon-cyan\\/30,
          .ai-page--amber.ai-page--light .border-cyan-400 {
            border-color: rgba(245, 158, 11, 0.48) !important;
          }

          .ai-page--amber.ai-page--light .bg-neon-green\\/10,
          .ai-page--amber.ai-page--light .bg-neon-cyan\\/10,
          .ai-page--amber.ai-page--light .bg-cyan-950 {
            background-color: rgba(245, 158, 11, 0.12) !important;
          }

          .ai-page--amber.ai-page--light .bg-green-500,
          .ai-page--amber.ai-page--light .bg-cyan-400,
          .ai-page--amber.ai-page--light .bg-cyan-600 {
            background-color: #f59e0b !important;
          }

          .ai-page--amber.ai-page--light .bg-cyan-200 {
            background-color: #ffd166 !important;
          }

          .ai-page--amber.ai-page--light .via-neon-green {
            --tw-gradient-via: #f59e0b var(--tw-gradient-via-position) !important;
            --tw-gradient-to: rgb(245 158 11 / 0) var(--tw-gradient-to-position) !important;
          }

          .ai-page--amber.ai-page--light .shadow-neon-green\\/20,
          .ai-page--amber.ai-page--light .shadow-neon-green\\/40,
          .ai-page--amber.ai-page--light .shadow-cyan-400\\/40,
          .ai-page--amber.ai-page--light .shadow-cyan-400\\/70 {
            --tw-shadow-color: rgb(245 158 11 / 0.34) !important;
            --tw-shadow: var(--tw-shadow-colored) !important;
          }

          .ai-page--amber.ai-page--light .hover\\:bg-neon-green\\/10:hover {
            background-color: rgba(245, 158, 11, 0.12) !important;
          }

          .ai-page--amber.ai-page--light .hover\\:border-neon-green\\/60:hover {
            border-color: rgba(245, 158, 11, 0.72) !important;
          }
        `}</style>
        <div className="marquee-container mb-4">
          <div className="marquee">
            <span>PROJECT_ID: AI EXPERIMENTS // TIMESTAMP: 2022-PRESENT // SECURITY_CLEARANCE: GRANTED</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative mb-5 pt-3 md:pt-4 xl:pt-4">
            <div className="max-w-fit">
              <h1 className="mb-3 font-cyber text-3xl font-bold text-neon-green lg:text-4xl">
                {currentLanguage === "es" ? "/INTELIGENCIA_ARTIFICIAL" : "/ARTIFICIAL_INTELLIGENCE"}
              </h1>
              <div className="relative mb-2 min-h-[2rem] font-cyber text-xl text-neon-cyan">
                <span>2022-PRESENT</span>
              </div>
              <div
                className={`mb-6 h-px bg-gradient-to-r from-transparent ${isLight ? "via-[#b45309]" : "via-neon-green"} to-transparent`}
              ></div>
            </div>
          </div>
          <div className="mt-8 text-left text-base leading-relaxed text-neon-green/90">
            <p>
              {currentLanguage === "es" ? (
                <>
                  Empecé a explorar IA de forma autodidacta a fines de 2022. En 2023 generé un LoRA de mi persona.
                  Desde junio de 2024 participo del curso y la comunidad de Morfeo Academy. Mi experiencia profesional
                  directamente vinculada a IA es mi trabajo como AI & Content Consultant & Producer en Paradise.la
                  (julio de 2024 a enero de 2026), donde trabajé en la
                  transición hacia una productora audiovisual impulsada por IA. Trabajo como creative technologist: uso
                  un stack de IA todos los días para prototipar campañas y acelerar la producción de contenido. En
                  Paradise.la el resultado fue pasar de ciclos de concepto a entrega de más de 2 semanas a 3–4 días en
                  producciones piloto. Exploro herramientas y workflows para
                  marcas y equipos, con foco en acelerar, iterar, reducir fricción y mejorar la calidad. Trabajo con IA en:{" "}
                  <span className="font-cyber text-neon-cyan">IMAGEN</span>: Nanobanana, GPT-2, Flux, Midjourney.{" "}
                  <span className="font-cyber text-neon-cyan">VIDEO</span>: Flow / Veo, Kling, Runway,
                  Higgsfield/Freepik. <span className="font-cyber text-neon-cyan">AUDIO</span>: ElevenLabs,
                  fish.audio, Suno, Udio. <span className="font-cyber text-neon-cyan">LLMS</span>: ChatGPT,
                  Kimi, Gemini, Perplexity, Claude.
                </>
              ) : (
                <>
                  I began exploring AI as a self-taught practitioner in late 2022. In 2023, I generated a LoRA of
                  myself. Since June 2024, I have been part of Morfeo Academy's course and community. My professional
                  AI experience is my work as AI & Content Consultant & Producer at Paradise.la (July 2024 to January
                  2026), where I worked on its transition toward
                  an AI-driven audiovisual production company. I work as a creative technologist: I run an AI stack
                  every day to prototype campaigns and speed up content production. At Paradise.la, concept-to-delivery
                  cycles went from 2+ weeks to 3–4 days on pilot productions. I explore tools and workflows for brands and teams,
                  focused on accelerating, iterating, reducing friction and improving quality. I work with AI across{" "}
                  <span className="font-cyber text-neon-cyan">IMAGE</span>: Nanobanana, GPT-2, Flux, Midjourney.{" "}
                  <span className="font-cyber text-neon-cyan">VIDEO</span>: Flow / Veo, Kling, Runway,
                  Higgsfield/Freepik. <span className="font-cyber text-neon-cyan">AUDIO</span>: ElevenLabs,
                  fish.audio, Suno, Udio. <span className="font-cyber text-neon-cyan">LLMS</span>: ChatGPT,
                  Kimi, Gemini, Perplexity, Claude.
                </>
              )}
            </p>
          </div>
          <style>{`@keyframes blink { 0%,40%{opacity:1;} 60%,100%{opacity:0.25;} } .animate-blink { animation: blink 1.2s steps(2, start) infinite; }`}</style>
        </div>

        <div className="mt-8 space-y-8">
          <ContentFilterBar
            active={activeFilter}
            language={currentLanguage}
            isLight={isLight}
            onChange={setActiveFilter}
          />

          {showAudioSection ? (
            <RetroPanel
              title={currentLanguage === "es" ? "AUDIO IA — MUSIC LAB" : "AI AUDIO — MUSIC LAB"}
              statusRight={`${IA_AUDIO_TRACKS.length} TRACKS`}
              highlight
              accent={isLight ? "amber" : "blue"}
            >
              <SpotifyGallery language={currentLanguage} isLight={isLight} />
            </RetroPanel>
          ) : null}

          {showImageVideo2026 ? (
            <Works2026Carousel language={currentLanguage} isLight={isLight} filter={activeFilter} />
          ) : null}

          {showSystemSections ? (
            <RetroPanel title="the8bureau" statusRight={currentLanguage === "es" ? "PRIVATE / OFFLINE" : "PRIVATE / OFFLINE"} highlight>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
              <div className="xl:pt-10">
                <The8BureauScreenshotThumb isLight={isLight} onOpen={() => setIsThe8BureauModalOpen(true)} />
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed text-neon-green/90">{the8BureauIntro[currentLanguage]}</p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {the8BureauFeatures.map((feature) => (
                    <div
                      key={feature.title}
                      className={`rounded-sm border p-4 ${
                        isLight ? "border-[#d9a06b]/55 bg-[#fff4e6]" : "border-neon-green/25 bg-black/25"
                      }`}
                    >
                      <div className="mb-2 font-cyber text-sm uppercase tracking-[0.16em] text-neon-cyan">
                        {feature.title}
                      </div>
                      <p className="text-sm leading-relaxed text-neon-green/85">{feature.description[currentLanguage]}</p>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </RetroPanel>
          ) : null}

          {isThe8BureauModalOpen ? <The8BureauImageModal isLight={isLight} onClose={() => setIsThe8BureauModalOpen(false)} /> : null}

          {showVideoSections ? (
          <div id="ejemplos-trabajos-ia-2025">
            <RetroPanel
              title={currentLanguage === "es" ? "2025 TRABAJOS Y EXPERIMENTOS" : "2025 WORKS AND EXPERIMENTS"}
              statusRight="PITCH"
              highlight
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="h-full rounded-sm border border-neon-green/30 bg-black/30 p-4">
                  <div className="mb-2 font-cyber text-lg text-neon-cyan">
                    {currentLanguage === "es" ? "Pitch Jugos México - Animatic" : "Mexico Juice Pitch - Animatic"}
                  </div>
                  <div className="whitespace-pre-line text-base leading-relaxed text-neon-green/90">
                    {currentLanguage === "es"
                      ? "Animatic de técnica mixta: footage + contenido IA (esto último a mi cargo).\nPipeline IA end-to-end: im\u00e1genes -> video -> voz."
                      : "Mixed-technique animatic: footage + AI content (the AI part was my responsibility).\nEnd-to-end AI pipeline: images -> video -> voice."}
                  </div>
                  <a href={jumexLink[currentLanguage]} target="_blank" rel="noreferrer" className="mt-3 block">
                    <div className="aspect-video w-full overflow-hidden rounded-sm border border-neon-green/30">
                      <img
                        src="https://img.youtube.com/vi/U6_3OB7ljvY/hqdefault.jpg"
                        alt={currentLanguage === "es" ? "Miniatura del animatic del pitch de jugos" : "Juice pitch animatic thumbnail"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </a>

                  <div className="mt-3 whitespace-pre-line text-base text-neon-cyan/80">
                    {currentLanguage === "es"
                      ? "Herramientas: Nano Banana (Im\u00e1genes) + Kling + Veo (Video) + ElevenLabs (Voces)"
                      : "Tools: Nano Banana (Images) + Kling + Veo (Video) + ElevenLabs (Voices)"}
                  </div>
                  <div className="mt-2 whitespace-pre-line text-base text-neon-green/80">
                    {currentLanguage === "es"
                      ? "Skills utilizados: generaci\u00f3n de im\u00e1genes, videos y clonaci\u00f3n de voces.\nEditor: Fede Castro."
                      : "Skills: image generation, video generation, and voice cloning.\nEditor: Fede Castro."}
                  </div>
                  <a
                    href={jumexLink[currentLanguage]}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm text-neon-magenta underline hover:text-neon-cyan"
                  >
                    Video: YouTube
                  </a>
                </div>

                <div className="h-full rounded-sm border border-neon-green/30 bg-black/30 p-4">
                  <div className="mb-2 font-cyber text-lg text-neon-cyan">
                    {currentLanguage === "es" ? "Pitch Sandwiches México - Animatic" : "Mexico Sandwich Pitch - Animatic"}
                  </div>
                  <div className="whitespace-pre-line text-base leading-relaxed text-neon-green/90">
                    {currentLanguage === "es"
                      ? "Animatic de técnica mixta: footage + contenido IA (esto último a mi cargo).\nPipeline IA end-to-end: im\u00e1genes -> video."
                      : "Mixed-technique animatic: footage + AI content (the AI part was my responsibility).\nEnd-to-end AI pipeline: images -> video."}
                  </div>
                  <a href={subwayLink[currentLanguage]} target="_blank" rel="noreferrer" className="mt-3 block">
                    <div className="aspect-video w-full overflow-hidden rounded-sm border border-neon-green/30">
                      <img
                        src="https://img.youtube.com/vi/zW8DP4fr7xA/hqdefault.jpg"
                        alt={currentLanguage === "es" ? "Miniatura del animatic del pitch de sandwiches" : "Sandwich pitch animatic thumbnail"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </a>

                  <div className="mt-3 whitespace-pre-line text-base text-neon-cyan/80">
                    {currentLanguage === "es"
                      ? "Herramientas: Nano Banana Pro (Im\u00e1genes) - Kling + Veo (Video)"
                      : "Tools: Nano Banana Pro (Images) - Kling + Veo (Video)"}
                  </div>
                  <div className="mt-2 whitespace-pre-line text-base text-neon-green/80">
                    {currentLanguage === "es"
                      ? "Skills: generaci\u00f3n de im\u00e1genes y videos.\nEditor: Fede Castro."
                      : "Skills: image and video generation.\nEditor: Fede Castro."}
                  </div>
                  <a
                    href={subwayLink[currentLanguage]}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm text-neon-magenta underline hover:text-neon-cyan"
                  >
                    Video: YouTube
                  </a>
                </div>
              </div>
            </RetroPanel>
          </div>
          ) : null}

          {showSystemSections ? (
          <RetroPanel title="VIBE-CODING: WEBAPPS" statusRight="TOOLS">
            <p className="mb-4 text-base leading-relaxed text-neon-green/90">
              {currentLanguage === "es"
                ? "de the8bureau, marca personal para proyectos de IA: mini apps útiles, gratuitas y livianas para trabajo de producción. Corren offline (abrís el HTML en tu Mac/PC) o las podés usar desde esta misma web."
                : "from the8bureau, personal brand for AI projects: lightweight, free mini-apps for production work. They run offline (open the HTML on your Mac/PC) or you can use them from this website."}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <a
                  href="/canva_productora"
                  className="block rounded-sm border border-neon-cyan/60 px-3 py-2 text-center font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
                >
                  CANVA_PRODUCTORA
                </a>
                <a
                  href="/canva_productora"
                  className="mt-3 block overflow-hidden rounded border border-neon-green/40 bg-black/20 transition-colors hover:border-neon-cyan/60"
                >
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">{currentLanguage === "es" ? "vista previa" : "preview"}</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/canva_productora/index.html"
                      title={`CANVA_PRODUCTORA ${currentLanguage === "es" ? "vista previa" : "preview"}`}
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Canva ad hoc para Paradise. Propuesta de grilla de 3 para Instagram: (1) placa intro -CANVA- (2) foto/captura del video (3) placa negra con marca/año."
                    : "Custom Canva for Paradise. 3-tile Instagram grid: (1) intro card -CANVA- (2) video still (3) black card with brand/year."}
                </p>
              </div>

              <div>
                <a
                  href="/unyellower"
                  className="block rounded-sm border border-neon-cyan/60 px-3 py-2 text-center font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
                >
                  UNYELLOWER
                </a>
                <a
                  href="/unyellower"
                  className="mt-3 block overflow-hidden rounded border border-neon-green/40 bg-black/20 transition-colors hover:border-neon-cyan/60"
                >
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">{currentLanguage === "es" ? "vista previa" : "preview"}</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/unyellower/index.html"
                      title={`UNYELLOWER ${currentLanguage === "es" ? "vista previa" : "preview"}`}
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Corrección de color para imágenes (por ejemplo, imágenes de ChatGPT con tinte amarillo). Incluye un preset de autocorrección más azulado."
                    : "Color correction tool (e.g., ChatGPT images with yellow tint). Includes a cooler auto-correction preset."}
                </p>
              </div>

              <div>
                <a
                  href="/comparador_videos"
                  className="block rounded-sm border border-neon-cyan/60 px-3 py-2 text-center font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
                >
                  COMPARADOR_VIDEOS
                </a>
                <a
                  href="/comparador_videos"
                  className="mt-3 block overflow-hidden rounded border border-neon-green/40 bg-black/20 transition-colors hover:border-neon-cyan/60"
                >
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">{currentLanguage === "es" ? "vista previa" : "preview"}</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/comparador_videos/index.html"
                      title={`COMPARADOR_VIDEOS ${currentLanguage === "es" ? "vista previa" : "preview"}`}
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Comparador lado a lado de 2 versiones de un video. Feature no disponible en Dropbox Replay ni en Frame.io, herramientas pagas de productora."
                    : "Side-by-side comparison of 2 video versions. Not available in Dropbox Replay or Frame.io (paid production-company tools)."}
                </p>
              </div>
            </div>
          </RetroPanel>
          ) : null}

          {showVideoSections ? (
            <VideoCarousel
              items={aiArchiveVideos}
              title={currentLanguage === "es" ? "EXPERIMENTOS IA (2022-2024)" : "AI EXPERIMENTS (2022-2024)"}
              variant="retro"
            />
          ) : null}
        </div>

        <div className="mt-12 text-center">
          <div
            className={`mb-6 h-px bg-gradient-to-r from-transparent ${isLight ? "via-[#b45309]" : "via-neon-green"} to-transparent`}
          ></div>
          <p className="mt-6 text-xs text-neon-green">
            &copy; 1986-{new Date().getFullYear()} TOMÁS PERÓ // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION
          </p>
        </div>
      </div>
    </main>
  )
}
