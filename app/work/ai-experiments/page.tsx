"use client"

import type { ReactNode } from "react"
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
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
import { VideoScreen, VideoWindowFrame, videoCountLabel } from "@/components/video-window"
import { useLanguage } from "@/components/language-context"
import { useVisualMode } from "@/components/visual-mode-context"
import { RetroPanel } from "@/components/retro-panel"
import thumbMessiBK from "./thumb_2026_messi_bk.jpg"
import thumbSubway from "./thumb_2026_subway.jpg"
import thumbAyNotDead from "./thumb_2026_ay_not_dead.jpg"
import thumbAND1 from "./thumb_AND_1.png"
import thumbUGCMODEL1 from "./thumb_UGCMODEL_1.png"
// the8bureau control dashboard (v3 screenshot, 2026-10-22). The v2 images stay in the folder.
import the8bureauThumb from "./thumb_the8bureau_v3.png"
const the8bureauPopupThumb = the8bureauThumb
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
  /** A YouTube video in the gallery: shown with its still and a play mark, plays in the viewer. */
  videoId?: string
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
  /** Shows the "Próximamente / Coming soon" lock over the preview. */
  locked: boolean
  /** Whether the item can open its popup (and any link inside it). */
  opensPopup: boolean
}

type The8BureauFeature = {
  title: string
  description: Record<SupportedLanguage, string>
  deprecated?: boolean
  /** Where to try it or see its code. */
  link?: { href: string; label: Record<SupportedLanguage, string> }
}

type The8BureauV2Tool = {
  title: Record<SupportedLanguage, string>
  description: Record<SupportedLanguage, string>
  href?: string
}

const REEL_VIDEO_ID = "bC8TGT4mD3Q"
const REEL_URL = "https://youtu.be/bC8TGT4mD3Q"

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

// The campaign video goes first among the gallery thumbnails.
modaGallery.unshift({
  id: "moda-video",
  label: "Video",
  gradient: "linear-gradient(135deg, #111, #222)",
  videoId: "44ri50qIiFw",
})

function getWorks2026Items(language: SupportedLanguage): Work2026Item[] {
  return [
    {
      id: "ad-messi-bk",
      kind: "embed",
      mediaTag: "video",
      title: { es: "Ad Messi BURGER KING (WIP)", en: "Messi Ad BURGER KING (WIP)" },
      description: {
        es: "Ad en proceso (work in progress). Click para ver el video.",
        en: "Ad in progress (work in progress). Click to watch the video.",
      },
      videoId: "pAdrOyzmmZs",
      youtubeUrl: "https://youtu.be/pAdrOyzmmZs",
      thumbnail: thumbMessiBK,
      locked: false,
      opensPopup: false,
    },
    {
      id: "demo-producto",
      kind: "embed",
      mediaTag: "video",
      title: { es: "Demo de producto SUBWAY", en: "Product Demo SUBWAY" },
      description: {
        es: "Video embebido de referencia. Usa el mismo espacio visual que una galería.",
        en: "Embedded reference video. It uses the same visual area as a gallery.",
      },
      videoId: "zW8DP4fr7xA",
      youtubeUrl:
        "https://www.youtube.com/watch?v=zW8DP4fr7xA&list=PLTai-gQI1os01OvFV9Xid5OXWWgoM9FCP&index=2",
      thumbnail: thumbSubway,
      locked: false,
      opensPopup: false,
    },
    {
      id: "campana-moda",
      kind: "gallery",
      mediaTag: "imagen",
      title: { es: "Campaña Moda AY NOT DEAD", en: "Fashion Campaign AY NOT DEAD" },
      description: {
        es: "Galería placeholder de 16 imágenes en grilla 4x4. Click para abrir en pantalla completa.",
        en: "16-image placeholder gallery in a 4x4 grid. Click to open in fullscreen.",
      },
      galleryImages: modaGallery,
      thumbnail: thumbAyNotDead,
      locked: false,
      opensPopup: true,
    },
    {
      id: "ugc-content",
      kind: "youtube-link",
      mediaTag: "video",
      title: { es: "UGC content", en: "UGC content" },
      description: {
        es: "Contenido UGC generado con IA. El video final se suma más adelante.",
        en: "AI-generated UGC content. The final video will be added later.",
      },
      thumbnail: thumbUGCMODEL1,
      locked: false,
      opensPopup: true,
    },
  ]
}

const the8BureauIntro: Record<SupportedLanguage, string> = {
  es: "the8bureau es mi marca personal de IA y mi sandbox para testear herramientas, skills y workflows. Comparto un set de herramientas que corre de manera local en mi computadora, de manera privada y offline.",
  en: "the8bureau is my personal AI brand and my sandbox for testing tools, skills and workflows. I share a set of tools that runs locally on my computer, privately and offline.",
}

const the8BureauFeatures: The8BureauFeature[] = [
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
    link: { href: "/comparador_imagenes", label: { es: "Probalo en esta web", en: "Try it on this site" } },
  },
  {
    title: "MAPS LEAD EXTRACTOR",
    description: {
      es: "Determiná un punto en un mapa, un radio en km, una categoría, y extraé LEADS.",
      en: "Set a point on a map, a radius in km and a category, and extract LEADS.",
    },
    link: {
      href: "https://github.com/tpportfolio/maps-lead-extractor",
      label: { es: "Código abierto en GitHub", en: "Open source on GitHub" },
    },
  },
  {
    title: "AUTONOMOUS AD AGENCY",
    description: {
      es: "Sistema de agentes que reciben un brief y lo trabajan con inputs humanos. Estado: Deprecated.",
      en: "Agent system that receives a brief and works it with human inputs. Status: Deprecated.",
    },
    deprecated: true,
  },
]

const the8BureauV2Tools: The8BureauV2Tool[] = [
  {
    title: { es: "PROMPT STUDIO", en: "PROMPT STUDIO" },
    description: {
      es: "Estudio de prompt engineering para generación de imagen y video.",
      en: "Prompt engineering studio for image and video generation.",
    },
  },
  {
    title: { es: "PDF TOOLKIT", en: "PDF TOOLKIT" },
    description: {
      es: "Kit de herramientas para PDF que corre en local.",
      en: "Local PDF toolkit.",
    },
    href: "/pdf_toolkit",
  },
  {
    title: { es: "CALCULADORA DE COSTOS", en: "COST CALCULATOR" },
    description: {
      es: "Calculadora de costos de producción con IA.",
      en: "AI production cost calculator.",
    },
  },
  {
    title: { es: "BRAND ANALYZER", en: "BRAND ANALYZER" },
    description: {
      es: "Analizador de identidad de marca y restyler.",
      en: "Brand identity analyzer and restyler.",
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
      aria-label={language === "es" ? "Abrir la imagen del dashboard v2 de the8bureau" : "Open the8bureau v2 dashboard image"}
      className={`block w-full max-w-[300px] overflow-hidden rounded-sm border text-left shadow-[0_0_24px_rgba(0,0,0,0.22)] transition-transform hover:scale-[1.01] ${
        isLight ? "border-[#c57b45] bg-[#fff5e8]" : "border-neon-green/30 bg-[#03190f]"
      }`}
    >
      <div className={`relative aspect-[477/827] w-full ${isLight ? "bg-[#f7ead8]" : "bg-[#04150d]"}`}>
        <Image
          src={the8bureauThumb}
          alt={
            language === "es"
              ? "Dashboard v2 de the8bureau con las herramientas locales, entre ellas Prompt Studio, PDF Toolkit, Calculadora de costos y Brand Analyzer"
              : "the8bureau v2 dashboard with the local tools, including Prompt Studio, PDF Toolkit, Cost Calculator and Brand Analyzer"
          }
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
  const dashboardLabel = language === "es" ? "Dashboard v2 de the8bureau" : "the8bureau v2 dashboard"
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
                style={{ background: image.imageSrc || image.videoId ? undefined : image.gradient }}
              >
                {image.videoId ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${image.videoId}/hqdefault.jpg`}
                      alt={language === "es" ? "Video de la campaña" : "Campaign video"}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                      <Play className="h-6 w-6 fill-current text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" aria-hidden="true" />
                    </span>
                  </>
                ) : image.imageSrc ? (
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

// Videos of the 2026 block play right where the preview is: the custom still first, then YouTube.
function InlineVideoStage({ item, isLight }: { item: Work2026Item; isLight: boolean }) {
  const { language } = useLanguage()
  const [playing, setPlaying] = useState(false)
  if (playing && item.videoId) {
    return (
      <div className="relative aspect-[16/8] overflow-hidden rounded-sm bg-black md:aspect-[16/6.2]">
        <iframe
          src={`https://www.youtube.com/embed/${item.videoId}?rel=0&autoplay=1`}
          title={item.title[language]}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${language === "es" ? "Reproducir" : "Play"}: ${item.title[language]}`}
      className="group relative block w-full rounded-sm bg-transparent p-0 text-left"
    >
      <PreviewStage item={item} isLight={isLight} />
      <span className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="vw-play-mark grid h-14 w-20 place-items-center rounded-2xl transition-transform group-hover:scale-105">
          <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
        </span>
      </span>
    </button>
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

  if (item.kind !== "gallery") {
    return (
      <div
        className="fixed inset-3 z-[90] md:bottom-6 md:right-6 md:top-6 md:left-[13.5rem] lg:left-[14rem]"
        role="dialog"
        aria-modal="true"
        aria-label={item.title[language]}
      >
        <button className="absolute inset-0 bg-black/80" onClick={onClose} aria-label={language === "es" ? "Cerrar popup" : "Close popup"} />
        <VideoWindowFrame
          title={item.title[language]}
          className="vw--modal relative mx-auto w-full md:w-[88%]"
          footRight={item.kind === "embed" ? videoCountLabel(1) : "YouTube"}
          barEnd={
            <button
              type="button"
              className="vw-close"
              onClick={onClose}
              aria-label={language === "es" ? "Cerrar popup" : "Close popup"}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          }
        >
          {item.kind === "embed" ? (
            <VideoScreen video={{ videoId: item.videoId ?? "" }} title={item.title[language]} />
          ) : (
            <PreviewStage item={item} isLight={isLight} />
          )}
          {item.youtubeUrl ? (
            <div>
              <a
                href={item.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="vw-link inline-flex items-center gap-2"
              >
                {language === "es" ? "Abrir en YouTube" : "Open on YouTube"}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : null}
        </VideoWindowFrame>
      </div>
    )
  }

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
                    if (image.imageSrc || image.videoId) setSelectedGalleryImage(image)
                  }}
                  className={`aspect-square overflow-hidden rounded-sm border p-3 ${
                    isLight ? "border-[#c57b45]" : "border-neon-green/30"
                  }`}
                  style={{ background: image.gradient }}
                >
                  <div className="relative flex h-full items-end overflow-hidden rounded-sm border border-white/20 bg-black/10 p-3">
                    {image.videoId ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${image.videoId}/hqdefault.jpg`}
                          alt={language === "es" ? "Video de la campaña" : "Campaign video"}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 grid place-items-center">
                          <Play className="h-8 w-8 fill-current text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" aria-hidden="true" />
                        </span>
                      </>
                    ) : image.imageSrc ? (
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
          ) : null}
        </div>

        {selectedGalleryImage?.imageSrc || selectedGalleryImage?.videoId ? (
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
              {selectedGalleryImage.videoId ? (
                <div className="relative mx-auto aspect-video w-full max-w-[min(92vw,1120px,calc((78vh)*16/9))] bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedGalleryImage.videoId}?rel=0&autoplay=1`}
                    title={language === "es" ? "Campaña Moda AY NOT DEAD: video" : "Fashion Campaign AY NOT DEAD: video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              ) : selectedGalleryImage.imageSrc ? (
                <div className="relative h-[min(64vh,960px)] w-full sm:h-[min(78vh,960px)]">
                  <Image
                    src={selectedGalleryImage.imageSrc}
                    alt={selectedGalleryImage.label}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
              ) : null}
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

/* ── Music Lab cover flow ───────────────────────────────────────────────
   The whole row is driven by ONE floating-point position (3.42 = 42% of the
   way from cover 3 to cover 4). Every cover's pose is a pure function of
   `index - position`. A requestAnimationFrame loop writes transforms and
   opacities straight to the DOM; React state only changes when the selected
   track changes. Everything the loop reads lives in refs. */

type FlowMetrics = {
  /** Edge of the centre cover, in px. */
  size: number
  /** Distance from the centre cover to its first neighbour, in px. Also the px of drag per cover. */
  gap: number
  /** Distance between covers inside the side stacks, in px. */
  step: number
  /** How far back the side stacks sit, in px. */
  depth: number
  /** Extra recession per cover of distance, in px. */
  far: number
  perspective: number
  halfWidth: number
  labelWidth: number
}

type FlowDrag = {
  id: number
  startX: number
  startY: number
  /** Position at the start of the drag, before rubber-banding. */
  startRaw: number
  moved: boolean
  /** The pointer went down while the row was still in flight. */
  caught: boolean
  /** A finger or pen that caught the row also stops it dead until it lifts. */
  frozen: boolean
  samples: { t: number; x: number }[]
}

type FlowMotion = {
  pos: number
  prevPos: number
  /** Covers per second. */
  vel: number
  target: number
  /** Angular frequency of the critically damped spring pulling pos to target. */
  omega: number
  /** Smoothed |velocity|, used to hide the labels while the row flies past. */
  speed: number
  flip: number[]
  flipVel: number[]
  /** Mirror of the selected track index, readable from the rAF loop. */
  selected: number
  /** The selection must be committed once the row arrives at its target. */
  pending: boolean
  drag: FlowDrag | null
  /** Index a wheel / trackpad gesture started from; null when there is none. */
  wheelStart: number | null
  wheelPx: number
  keyHeld: boolean
  edgeNudged: boolean
  lastKeyStep: number
  running: boolean
  dirty: boolean
  raf: number
  last: number
  inView: boolean
  reduced: boolean
}

const FLOW_ANGLE = 56
/** rad/s. Critically damped: one step is visually settled in about 0.55s. */
const FLOW_SPRING = 12.5
const FLOW_WHEEL_SPRING = 28
const FLOW_FLIP_SPRING = 13
/** 1/s. Release velocity divided by this is how many covers a flick travels. */
const FLOW_FLICK_DECAY = 5.5
const FLOW_MAX_VELOCITY = 24
const FLOW_RUBBER = 0.55
const FLOW_RUBBER_LIMIT = 0.9

function getFlowMetrics(stageWidth: number): FlowMetrics {
  const size = stageWidth < 420 ? 132 : stageWidth < 560 ? 148 : stageWidth < 820 ? 176 : 210
  // The title card may be wider than the cover; an even difference keeps it on whole pixels.
  const spare = Math.max(0, Math.min(size * 0.3, stageWidth - 32 - size))
  return {
    size,
    gap: size * 0.8,
    step: size * 0.3,
    depth: size * 0.55,
    far: size * 0.1,
    perspective: Math.round(size * 4.6),
    halfWidth: stageWidth / 2,
    labelWidth: size + 2 * Math.floor(spare / 2),
  }
}

function createFlowMotion(count: number): FlowMotion {
  return {
    pos: 0,
    prevPos: 0,
    vel: 0,
    target: 0,
    omega: FLOW_SPRING,
    speed: 0,
    flip: Array.from({ length: count }, (_, index) => (index === 0 ? 180 : 0)),
    flipVel: Array.from({ length: count }, () => 0),
    selected: 0,
    pending: false,
    drag: null,
    wheelStart: null,
    wheelPx: 0,
    keyHeld: false,
    edgeNudged: false,
    lastKeyStep: 0,
    running: false,
    dirty: false,
    raf: 0,
    last: 0,
    inView: true,
    reduced: false,
  }
}

/** Linear near zero, saturating smoothly at ±1 (no kink anywhere). */
function flowSoftClamp(value: number) {
  return value / Math.pow(1 + value * value * value * value, 0.25)
}

function flowSmooth(from: number, to: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - from) / (to - from)))
  return t * t * (3 - 2 * t)
}

/** Pose of a cover that sits `offset` covers away from the centre (negative = left). */
function computeFlowPose(offset: number, metrics: FlowMetrics, speed: number) {
  const distance = Math.abs(offset)
  const slide = flowSoftClamp(offset)
  const turn = flowSoftClamp(offset * 1.5)
  const turned = turn * turn
  const beyond = distance - Math.abs(slide)
  const x = metrics.step * offset + (metrics.gap - metrics.step) * slide
  const z = -(metrics.depth * turned + metrics.far * beyond)
  const screenX = (Math.abs(x) * metrics.perspective) / (metrics.perspective - z)
  const fadeEnd = metrics.halfWidth + metrics.size * 0.15
  return {
    transform: `translate3d(${x.toFixed(2)}px,0,${z.toFixed(2)}px) rotateY(${(-FLOW_ANGLE * turn).toFixed(2)}deg) scale(${(1 - 0.08 * turned).toFixed(4)})`,
    /** Covers fade out as they reach the edge of the stage. */
    opacity: 1 - flowSmooth(fadeEnd - metrics.size * 0.6, fadeEnd, screenX),
    /** Fallback order for engines that do not depth-sort; it only flips where two covers do not overlap. */
    zIndex: 40 - Math.min(30, Math.round(distance)),
    shade: Math.min(0.78, 0.3 * turned + 0.07 * beyond),
    glow: 1 - flowSmooth(0.05, 0.7, distance),
    /** Title card and play button: only the centre cover shows them, and never mid-flick. */
    chrome: (1 - flowSmooth(0.08, 0.55, distance)) * (1 - flowSmooth(3, 6.5, speed)),
  }
}

/** iOS-style resistance past the first and last cover. */
function flowRubberBand(raw: number, max: number) {
  const band = (over: number) =>
    (over * FLOW_RUBBER * FLOW_RUBBER_LIMIT) / (FLOW_RUBBER_LIMIT + FLOW_RUBBER * over)
  if (raw < 0) return -band(-raw)
  if (raw > max) return max + band(raw - max)
  return raw
}

/** Inverse of flowRubberBand, so a drag can start from an overshot position without a jump. */
function flowRubberRelease(pos: number, max: number) {
  const unband = (banded: number) => {
    const b = Math.min(banded, FLOW_RUBBER_LIMIT * 0.95)
    return (b * FLOW_RUBBER_LIMIT) / (FLOW_RUBBER * (FLOW_RUBBER_LIMIT - b))
  }
  if (pos < 0) return -unband(-pos)
  if (pos > max) return max + unband(pos - max)
  return pos
}

/** Softer spring for long glides so a nine-cover jump does not whip past. */
function flowSpringFor(distance: number) {
  return FLOW_SPRING / (1 + 0.15 * Math.max(0, distance - 1))
}

/** Pointer velocity in px/ms over the last ~90ms before release; 0 if the pointer had stopped. */
function flowReleaseVelocity(samples: { t: number; x: number }[], releasedAt: number) {
  const count = samples.length
  if (count < 2) return 0
  const last = samples[count - 1]
  if (releasedAt - last.t > 70) return 0
  let first = last
  for (let i = count - 2; i >= 0; i--) {
    if (last.t - samples[i].t > 90) break
    first = samples[i]
  }
  const elapsed = last.t - first.t
  if (elapsed < 8) return 0
  return (last.x - first.x) / elapsed
}

function SpotifyGallery({ language, isLight }: { language: SupportedLanguage; isLight: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [coversReady, setCoversReady] = useState<Record<string, boolean>>({})
  const [coversArmed, setCoversArmed] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  /** 0 until the stage has been measured. */
  const [stageWidth, setStageWidth] = useState(0)
  const currentTrack = IA_AUDIO_TRACKS[currentIndex]
  const accent = isLight ? "#f59e0b" : "#39ff14"
  const total = IA_AUDIO_TRACKS.length
  const lastIndex = total - 1

  const metrics = getFlowMetrics(stageWidth || 960)
  const metricsRef = useRef(metrics)
  metricsRef.current = metrics

  const motionRef = useRef<FlowMotion | null>(null)
  if (motionRef.current === null) motionRef.current = createFlowMotion(total)
  const motion = motionRef.current

  const itemEls = useRef<(HTMLDivElement | null)[]>([])
  const flipEls = useRef<(HTMLDivElement | null)[]>([])
  const shadeEls = useRef<(HTMLDivElement | null)[]>([])
  const glowEls = useRef<(HTMLDivElement | null)[]>([])
  const playEls = useRef<(HTMLButtonElement | null)[]>([])
  const labelEls = useRef<(HTMLDivElement | null)[]>([])
  const suppressClickUntil = useRef(0)
  const lastPickAt = useRef(0)
  const wheelTimer = useRef(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      void audio.play().catch((error: unknown) => {
        // Interrupted by a newer track or by pause(): this effect already ran again for that.
        if (error instanceof DOMException && error.name === "AbortError") return
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentIndex])

  const togglePlay = () => setIsPlaying((playing) => !playing)

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

  /* ── Motion engine. These functions are also called from the rAF loop, from
     timers and from listeners attached once, so they must only touch refs,
     state setters and each other: never props or state directly. ── */

  const clampIndex = (value: number) => Math.min(lastIndex, Math.max(0, value))

  /** The pointer owns the position (dragging, or a finger holding a row it caught mid-glide). */
  const holding = () => motion.drag !== null && (motion.drag.moved || motion.drag.frozen)

  /** The vinyl only shows on the selected cover, and only while it sits in the centre. */
  const flipTargetFor = (index: number) =>
    index === motion.selected ? 180 * (1 - flowSmooth(0.2, 0.6, Math.abs(index - motion.pos))) : 0

  const applyLayout = () => {
    const m = metricsRef.current
    for (let i = 0; i < total; i++) {
      const item = itemEls.current[i]
      if (!item) continue
      const pose = computeFlowPose(i - motion.pos, m, motion.speed)
      item.style.transform = pose.transform
      item.style.opacity = pose.opacity.toFixed(3)
      item.style.zIndex = String(pose.zIndex)
      const flipper = flipEls.current[i]
      if (flipper) flipper.style.transform = `rotateY(${motion.flip[i].toFixed(2)}deg)`
      const shade = shadeEls.current[i]
      if (shade) shade.style.opacity = pose.shade.toFixed(3)
      const glow = glowEls.current[i]
      if (glow) glow.style.opacity = pose.glow.toFixed(3)
      const chrome = pose.chrome.toFixed(3)
      const play = playEls.current[i]
      if (play) play.style.opacity = chrome
      const label = labelEls.current[i]
      if (label) label.style.opacity = chrome
    }
  }

  const commitSelection = (index: number) => {
    if (index === motion.selected) return
    motion.selected = index
    setCurrentIndex(index)
    setProgress(0)
    playClack()
  }

  const cancelWheel = () => {
    window.clearTimeout(wheelTimer.current)
    motion.wheelStart = null
    motion.wheelPx = 0
  }

  /** Jump to the target with no animation: reduced motion, off-screen or background tab. */
  const finishNow = (fade: boolean) => {
    cancelAnimationFrame(motion.raf)
    motion.running = false
    motion.dirty = false
    if (!holding()) motion.pos = motion.target
    motion.prevPos = motion.pos
    motion.vel = 0
    motion.speed = 0
    if (motion.pending && !holding() && !motion.keyHeld && motion.wheelStart === null) {
      motion.pending = false
      commitSelection(clampIndex(Math.round(motion.target)))
    }
    for (let i = 0; i < total; i++) {
      motion.flip[i] = flipTargetFor(i)
      motion.flipVel[i] = 0
    }
    applyLayout()
    if (fade) {
      viewportRef.current?.animate?.([{ opacity: 0.35 }, { opacity: 1 }], { duration: 180, easing: "ease-out" })
    }
  }

  const tick = (now: number) => {
    if (motion.reduced || !motion.inView) {
      finishNow(false)
      return
    }
    const dt = Math.min(0.05, Math.max(0.001, (now - motion.last) / 1000))
    motion.last = now
    let active = motion.dirty
    motion.dirty = false

    if (!holding()) {
      const x = motion.pos - motion.target
      if (Math.abs(x) < 0.0004 && Math.abs(motion.vel) < 0.004) {
        motion.pos = motion.target
        motion.vel = 0
      } else {
        // Exact step of a critically damped spring: stable for any dt.
        const decay = Math.exp(-motion.omega * dt)
        const temp = (motion.vel + motion.omega * x) * dt
        motion.pos = Math.min(lastIndex + 1.5, Math.max(-1.5, motion.target + (x + temp) * decay))
        motion.vel = (motion.vel - motion.omega * temp) * decay
        active = true
      }
    }

    const instant = Math.abs(motion.pos - motion.prevPos) / dt
    motion.prevPos = motion.pos
    motion.speed += (instant - motion.speed) * (1 - Math.exp(-dt / 0.09))
    if (motion.speed > 2.9) active = true

    const flipDecay = Math.exp(-FLOW_FLIP_SPRING * dt)
    for (let i = 0; i < total; i++) {
      const goal = flipTargetFor(i)
      const fx = motion.flip[i] - goal
      const fv = motion.flipVel[i]
      if (Math.abs(fx) < 0.15 && Math.abs(fv) < 1.5) {
        motion.flip[i] = goal
        motion.flipVel[i] = 0
      } else {
        const temp = (fv + FLOW_FLIP_SPRING * fx) * dt
        motion.flip[i] = goal + (fx + temp) * flipDecay
        motion.flipVel[i] = (fv - FLOW_FLIP_SPRING * temp) * flipDecay
        active = true
      }
    }

    // The selection changes once, when the row is arriving at its final cover.
    if (
      motion.pending &&
      !holding() &&
      !motion.keyHeld &&
      motion.wheelStart === null &&
      Math.abs(motion.pos - motion.target) < 0.5
    ) {
      motion.pending = false
      commitSelection(clampIndex(Math.round(motion.target)))
      active = true
    }

    applyLayout()
    if (active) {
      motion.raf = requestAnimationFrame(tick)
    } else {
      motion.running = false
      motion.speed = 0
    }
  }

  const kick = () => {
    if (motion.running) return
    motion.running = true
    motion.last = performance.now()
    motion.raf = requestAnimationFrame(tick)
  }

  /** Glide to a cover from wherever the row is, keeping its current velocity. */
  const glideTo = (index: number, pending: boolean) => {
    if (motion.wheelStart !== null) cancelWheel()
    const travels = Math.abs(index - motion.pos) > 0.001
    motion.target = index
    motion.pending = pending
    motion.omega = flowSpringFor(Math.abs(index - motion.pos))
    if (motion.reduced || !motion.inView || document.hidden) {
      finishNow(travels && motion.reduced && motion.inView && !document.hidden)
    } else {
      kick()
    }
  }

  const selectTrack = (index: number) => {
    if (index === motion.selected) {
      setIsPlaying((playing) => !playing)
    } else {
      // The second click of a double-click lands on whichever cover slid under the pointer: ignore it.
      const now = performance.now()
      if (now - lastPickAt.current < 400) return
      lastPickAt.current = now
      commitSelection(index)
      setIsPlaying(true)
    }
    glideTo(index, false)
  }

  const stepTrack = (direction: 1 | -1) => {
    const base = clampIndex(Math.round(holding() ? motion.pos : motion.target))
    const next = (base + direction + total) % total
    commitSelection(next)
    glideTo(next, false)
  }

  const advanceAfterEnd = () => {
    const next = (motion.selected + 1) % total
    commitSelection(next)
    glideTo(next, false)
  }

  const wheelBy = (px: number) => {
    if (motion.wheelStart === null) {
      motion.wheelStart = clampIndex(Math.round(motion.target))
      motion.wheelPx = 0
      if (!motion.reduced) motion.target = motion.pos
    }
    motion.wheelPx += px
    if (!motion.reduced) {
      motion.target = Math.min(
        lastIndex + 0.35,
        Math.max(-0.35, motion.target + px / metricsRef.current.gap)
      )
      motion.omega = FLOW_WHEEL_SPRING
      motion.pending = false
      kick()
    }
    window.clearTimeout(wheelTimer.current)
    wheelTimer.current = window.setTimeout(() => flowApi.current.settleWheel(), 110)
  }

  const settleWheel = () => {
    const start = motion.wheelStart
    if (start === null) return
    let next = start
    if (motion.reduced) {
      if (Math.abs(motion.wheelPx) > 24) next = start + (motion.wheelPx > 0 ? 1 : -1)
    } else {
      next = Math.round(motion.target)
      const travelled = motion.target - start
      // A short but deliberate swipe still moves one cover.
      if (next === start && Math.abs(travelled) > 0.18) next = start + (travelled > 0 ? 1 : -1)
    }
    cancelWheel()
    glideTo(clampIndex(next), true)
  }

  const flowApi = useRef({ finishNow, wheelBy, settleWheel })
  flowApi.current = { finishNow, wheelBy, settleWheel }

  const releaseKeyHold = () => {
    if (!motion.keyHeld) return
    motion.keyHeld = false
    motion.edgeNudged = false
    if (motion.pending) kick()
  }

  const onStageKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    const el = event.target as HTMLElement
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return
    const key = event.key
    if (key === "ArrowRight" || key === "ArrowLeft") {
      event.preventDefault()
      if (motion.drag) return
      const direction = key === "ArrowRight" ? 1 : -1
      // A cover's own button is about to move away: keep focus on the stage.
      if (el.closest("[data-flow-item]")) event.currentTarget.focus({ preventScroll: true })
      ensureMechCtx()
      if (!event.repeat) {
        motion.keyHeld = false
        motion.edgeNudged = false
        stepTrack(direction)
        return
      }
      // Key held down: keep gliding, one cover ahead of the row, and select on release.
      motion.keyHeld = true
      if (motion.reduced) {
        if (event.timeStamp - motion.lastKeyStep < 220) return
        motion.lastKeyStep = event.timeStamp
      } else if (Math.abs(motion.target - motion.pos) > 0.5) {
        return
      }
      const next = clampIndex(Math.round(motion.target)) + direction
      if (next < 0 || next > lastIndex) {
        if (!motion.reduced && !motion.edgeNudged && Math.abs(motion.vel) < 0.5) {
          motion.edgeNudged = true
          motion.vel += direction * 2.6
          kick()
        }
        return
      }
      glideTo(next, true)
    } else if (key === "Home" || key === "End") {
      event.preventDefault()
      if (motion.drag) return
      const next = key === "Home" ? 0 : lastIndex
      ensureMechCtx()
      commitSelection(next)
      glideTo(next, false)
    } else if ((key === " " || key === "Enter") && event.target === event.currentTarget) {
      event.preventDefault()
      if (!event.repeat) togglePlay()
    }
  }

  const onStageKeyUp = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") releaseKeyHold()
  }

  const onStageBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) releaseKeyHold()
  }

  const onStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    if ((event.target as HTMLElement).closest("[data-flow-control]")) return
    // A second finger is ignored; the same pointer going down again means the last press was never closed.
    if (motion.drag && motion.drag.id !== event.pointerId) return
    event.currentTarget.focus({ preventScroll: true })
    suppressClickUntil.current = 0
    if (motion.wheelStart !== null) settleWheel()
    // A press on a row that is still in flight is not a click on whatever cover is passing under it.
    const caught =
      !motion.reduced && (Math.abs(motion.vel) > 1.2 || Math.abs(motion.target - motion.pos) > 0.2)
    // A finger also stops the row dead, like a scroll view; the mouse lets it run until it really drags.
    const frozen = caught && event.pointerType !== "mouse"
    if (frozen) {
      motion.vel = 0
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        /* noop */
      }
    }
    motion.drag = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRaw: flowRubberRelease(motion.pos, lastIndex),
      moved: false,
      caught,
      frozen,
      samples: [{ t: event.timeStamp, x: event.clientX }],
    }
  }

  const onStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dr = motion.drag
    if (!dr || event.pointerId !== dr.id) return
    if (event.pointerType === "mouse" && event.buttons === 0) {
      // The button was released somewhere this element could not see.
      finishStageDrag(event, true)
      return
    }
    dr.samples.push({ t: event.timeStamp, x: event.clientX })
    while (dr.samples.length > 2 && event.timeStamp - dr.samples[0].t > 200) dr.samples.shift()
    if (!dr.moved) {
      const dx = event.clientX - dr.startX
      const dy = event.clientY - dr.startY
      if (Math.abs(dx) < (event.pointerType === "mouse" ? 5 : 9)) return
      if (event.pointerType !== "mouse" && Math.abs(dx) <= Math.abs(dy)) return
      dr.moved = true
      // Re-anchor here so the row does not jump by the distance it took to recognise the drag.
      dr.startX = event.clientX
      dr.startRaw = flowRubberRelease(motion.pos, lastIndex)
      motion.vel = 0
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        /* noop */
      }
    }
    if (motion.reduced) return
    // 1:1 with the pointer: no spring, no smoothing.
    motion.pos = flowRubberBand(
      dr.startRaw - (event.clientX - dr.startX) / metricsRef.current.gap,
      lastIndex
    )
    motion.dirty = true
    kick()
  }

  const finishStageDrag = (event: ReactPointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const dr = motion.drag
    if (!dr || event.pointerId !== dr.id) return
    motion.drag = null
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
    } catch {
      /* noop */
    }
    if (!dr.moved && !dr.caught) return
    // This gesture moved the row: the click that follows must not select anything.
    suppressClickUntil.current = performance.now() + 400
    ensureMechCtx()
    if (motion.reduced) {
      const dx = event.clientX - dr.startX
      if (dr.moved && !cancelled && Math.abs(dx) > 24) {
        glideTo(clampIndex(Math.round(motion.target) + (dx < 0 ? 1 : -1)), true)
      }
      return
    }
    if (!dr.moved) {
      // Tap on a row in flight: a flick brakes onto the next cover; a glide to a cover that is
      // already selected carries on to it.
      if (motion.pending) glideTo(clampIndex(Math.round(motion.pos + motion.vel / FLOW_SPRING)), true)
      else if (dr.frozen) glideTo(motion.target, false)
      return
    }
    let velocity = 0
    if (!cancelled && motion.pos >= 0 && motion.pos <= lastIndex) {
      velocity = (-flowReleaseVelocity(dr.samples, event.timeStamp) * 1000) / metricsRef.current.gap
      velocity = Math.min(FLOW_MAX_VELOCITY, Math.max(-FLOW_MAX_VELOCITY, velocity))
    }
    motion.vel = velocity
    // Project the release velocity: a flick travels several covers, a slow drag settles on the nearest.
    glideTo(clampIndex(Math.round(motion.pos + velocity / FLOW_FLICK_DECAY)), true)
  }

  const onStagePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    // A press that leaves the stage before it became a drag is not captured: its release never arrives here.
    const dr = motion.drag
    if (dr && dr.id === event.pointerId && !dr.moved && !dr.frozen) motion.drag = null
  }

  const onStageMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    // Keeps focus on the stage and stops native image dragging / text selection.
    if (!(event.target as HTMLElement).closest("[data-flow-control]")) event.preventDefault()
  }

  const onStageClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (performance.now() < suppressClickUntil.current) {
      suppressClickUntil.current = 0
      event.preventDefault()
      event.stopPropagation()
    }
  }

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotionPreference = () => {
      motion.reduced = media.matches
      if (media.matches) flowApi.current.finishNow(false)
    }
    syncMotionPreference()
    media.addEventListener("change", syncMotionPreference)

    let observer: IntersectionObserver | null = null
    if (typeof IntersectionObserver === "undefined") {
      setCoversArmed(true)
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1]
          if (!entry) return
          // Off-screen the loop stops itself on its next frame and lands on the target.
          motion.inView = entry.isIntersecting
          if (entry.isIntersecting) setCoversArmed(true)
        },
        { rootMargin: "240px 0px" }
      )
      observer.observe(stage)
    }

    // Native listener: React's wheel listener is passive, and horizontal gestures must not navigate back.
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || motion.drag) return
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? metricsRef.current.halfWidth * 2 : 1
      const dx = event.deltaX * unit
      // Vertical scrolling stays with the page.
      if (dx === 0 || Math.abs(dx) <= Math.abs(event.deltaY * unit)) return
      event.preventDefault()
      flowApi.current.wheelBy(dx)
    }
    stage.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      media.removeEventListener("change", syncMotionPreference)
      observer?.disconnect()
      stage.removeEventListener("wheel", onWheel)
      window.clearTimeout(wheelTimer.current)
      cancelAnimationFrame(motion.raf)
      motion.running = false
      motion.wheelStart = null
      motion.keyHeld = false
      if (motion.drag) {
        try {
          stage.releasePointerCapture(motion.drag.id)
        } catch {
          /* noop */
        }
        motion.drag = null
      }
      const ctx = mechCtx.current
      mechCtx.current = null
      if (ctx) void ctx.close().catch(() => undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const update = () => {
      if (stage.clientWidth > 0) setStageWidth(stage.clientWidth)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const statusText = buffering
    ? language === "es" ? "CARGANDO" : "LOADING"
    : isPlaying
      ? language === "es" ? "SONANDO" : "PLAYING"
      : progress > 0
        ? language === "es" ? "PAUSA" : "PAUSED"
        : language === "es" ? "LISTO" : "READY"

  const currentTag = localizeTrackTag(currentTrack.tag, language)
  const liveText =
    language === "es"
      ? `Pista ${currentIndex + 1} de ${total}: ${currentTrack.title} (${currentTag})`
      : `Track ${currentIndex + 1} of ${total}: ${currentTrack.title} (${currentTag})`

  return (
    <div className="space-y-4">
      <style>{`
        .coverflow-stage { touch-action: pan-y; overflow: hidden; overflow: clip; outline: none; }
        .coverflow-stage:focus-visible { outline: 2px solid var(--flow-accent, #39ff14); outline-offset: 3px; }
        .coverflow-track { transform-style: preserve-3d; }
        .flow-item {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flipper-inner { will-change: transform; }
        .flow-fade { will-change: opacity; }
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
          .spinning-disc, .card-live, .cover-shimmer::after { animation: none; }
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
        onEnded={advanceAfterEnd}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveText}
      </p>

      <div className="flex items-center justify-between gap-2">
        <div
          className={`rounded-full border px-3 py-1 font-mono text-xs ${
            isLight ? "border-[#d9a06b]/60 bg-[#fff8f1] text-[#8b4315]" : "border-neon-green/30 bg-black/40 text-neon-green/80"
          }`}
        >
          Track <span className="font-bold" style={{ color: accent }}>{currentIndex + 1}</span> / {total}
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
        tabIndex={0}
        role="group"
        aria-roledescription={language === "es" ? "carrusel" : "carousel"}
        aria-label={
          language === "es"
            ? "Reproductor Music Lab: flechas izquierda y derecha para cambiar de pista, espacio para reproducir o pausar"
            : "Music Lab player: left and right arrows change track, space plays or pauses"
        }
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={(event) => finishStageDrag(event, false)}
        onPointerCancel={(event) => finishStageDrag(event, true)}
        onLostPointerCapture={(event) => finishStageDrag(event, true)}
        onPointerLeave={onStagePointerLeave}
        onMouseDown={onStageMouseDown}
        onClickCapture={onStageClickCapture}
        onKeyDown={onStageKeyDown}
        onKeyUp={onStageKeyUp}
        onBlur={onStageBlur}
        onScroll={(event) => {
          event.currentTarget.scrollLeft = 0
          event.currentTarget.scrollTop = 0
        }}
        className={`coverflow-stage relative isolate h-[360px] w-full cursor-grab select-none rounded-sm border active:cursor-grabbing sm:h-[440px] ${
          isLight ? "border-[#d9a06b]/60 bg-[#170f05]" : "border-neon-green/20 bg-black/60"
        }`}
        style={{ "--flow-accent": accent } as CSSProperties}
      >
        <StageBackdrop isLight={isLight} isPlaying={isPlaying} />
        <div
          ref={viewportRef}
          className="absolute inset-0"
          style={{ perspective: `${metrics.perspective}px`, perspectiveOrigin: "50% 35%" }}
        >
          {/* 35% of either stage height and half of the measured width are whole pixels: the centre cover stays sharp. */}
          <div
            className="coverflow-track absolute h-0 w-0"
            style={{ top: "35%", left: stageWidth ? Math.floor(stageWidth / 2) : "50%" }}
          >
            {IA_AUDIO_TRACKS.map((track, index) => {
              const isActive = index === currentIndex
              const pose = computeFlowPose(index - motion.pos, metrics, motion.speed)
              const glow = trackGlowColor(track.gradient, isLight ? "rgba(245,158,11,0.5)" : "rgba(57,255,20,0.4)")
              const playLabel =
                language === "es"
                  ? isActive && isPlaying ? `Pausar ${track.title}` : `Reproducir ${track.title}`
                  : isActive && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`
              return (
                <div
                  key={track.id}
                  ref={(el) => {
                    itemEls.current[index] = el
                  }}
                  data-flow-item
                  role="group"
                  aria-label={`${index + 1} / ${total}: ${track.title}`}
                  aria-current={isActive ? "true" : undefined}
                  className="flow-item absolute"
                  style={{
                    left: -metrics.size / 2,
                    top: -metrics.size / 2,
                    width: metrics.size,
                    height: metrics.size,
                    transform: pose.transform,
                    opacity: pose.opacity,
                    zIndex: pose.zIndex,
                  }}
                >
                  <div
                    ref={(el) => {
                      glowEls.current[index] = el
                    }}
                    aria-hidden="true"
                    className="flow-fade pointer-events-none absolute inset-[5%] rounded-sm"
                    style={{ boxShadow: `0 14px 44px 8px ${glow}`, opacity: pose.glow }}
                  />
                  <div className="relative h-full w-full" style={{ perspective: "800px" }}>
                    <div
                      ref={(el) => {
                        flipEls.current[index] = el
                      }}
                      className="flipper-inner relative h-full w-full"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${motion.flip[index].toFixed(2)}deg)`,
                      }}
                    >
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={() => selectTrack(index)}
                        className={`absolute inset-0 block cursor-pointer overflow-hidden rounded-sm border shadow-2xl transition-colors duration-300 ${
                          isActive
                            ? isLight
                              ? "border-[#f59e0b] shadow-[#f59e0b]/30"
                              : "border-neon-green/70 shadow-neon-green/25"
                            : isLight
                              ? "border-[#d9a06b]/50"
                              : "border-white/15"
                        }`}
                        style={{
                          background: track.gradient,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <div
                          aria-hidden
                          className={`cover-shimmer absolute inset-0 transition-opacity duration-500 ${coversReady[track.id] ? "opacity-0" : "opacity-100"}`}
                          style={{ background: track.gradient }}
                        />
                        <img
                          src={track.cover}
                          alt={track.title}
                          draggable={false}
                          onLoad={() => setCoversReady((prev) => (prev[track.id] ? prev : { ...prev, [track.id]: true }))}
                          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${coversReady[track.id] ? "opacity-100" : "opacity-0"}`}
                          loading={coversArmed ? "eager" : "lazy"}
                        />
                      </button>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={() => selectTrack(index)}
                        className="absolute inset-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-white/15 bg-[#0a0a0c] shadow-2xl"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
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
                      <div
                        ref={(el) => {
                          shadeEls.current[index] = el
                        }}
                        aria-hidden="true"
                        className="flow-fade pointer-events-none absolute inset-0 rounded-sm bg-black"
                        style={{ opacity: pose.shade }}
                      />
                    </div>
                  </div>
                  <button
                    ref={(el) => {
                      playEls.current[index] = el
                    }}
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectTrack(index)}
                    aria-label={playLabel}
                    className="flow-fade absolute left-1/2 top-1/2 z-30 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border bg-black/60 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                    style={{
                      opacity: pose.chrome,
                      ...(isActive
                        ? { borderColor: accent, color: accent, boxShadow: `0 0 18px ${trackGlowColor(track.gradient, accent)}` }
                        : { borderColor: "rgba(255,255,255,0.35)", color: "#fff" }),
                    }}
                  >
                    {isActive && isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5" />
                    )}
                  </button>
                  <div
                    ref={(el) => {
                      labelEls.current[index] = el
                    }}
                    className="flow-fade pointer-events-none absolute top-full mt-2"
                    style={{
                      left: (metrics.size - metrics.labelWidth) / 2,
                      width: metrics.labelWidth,
                      opacity: pose.chrome,
                    }}
                  >
                    <div
                      className={`rounded-sm border px-2 py-1.5 text-center transition-colors duration-300 ${
                        isActive && isPlaying ? "card-live" : ""
                      } ${
                        isActive
                          ? isLight
                            ? "border-[#f59e0b]/70 bg-[#0b0d0c]/95"
                            : "border-neon-green/50 bg-[#0b0d0c]/95"
                          : "border-white/10 bg-[#0b0d0c]/85"
                      }`}
                      style={{ "--card-glow": trackGlowColor(track.gradient, accent) } as CSSProperties}
                    >
                      <p
                        className={`on-dark-stage font-cyber text-[12px] font-bold leading-snug [overflow-wrap:anywhere] sm:text-[13px] ${
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
                        className={`on-dark-stage mt-0.5 font-cyber text-[10px] uppercase tracking-[0.18em] sm:text-[11px] ${
                          isLight ? "text-[#f5b942]" : "text-neon-cyan"
                        }`}
                        style={isLight ? { textShadow: "0 0 8px rgba(245,158,11,0.65)" } : undefined}
                      >
                        {localizeTrackTag(track.tag, language)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <button
          type="button"
          data-flow-control
          onClick={() => stepTrack(-1)}
          aria-label={language === "es" ? "Anterior" : "Previous"}
          className={`absolute left-2 z-[60] inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-black/50 backdrop-blur-sm transition-colors sm:left-3 ${
            isLight
              ? "border-[#8b4315] text-[#f59e0b] hover:bg-[#8b4315]/30"
              : "border-neon-green/50 text-neon-green hover:bg-neon-green/15"
          }`}
          style={{ top: "35%" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          data-flow-control
          onClick={() => stepTrack(1)}
          aria-label={language === "es" ? "Siguiente" : "Next"}
          className={`absolute right-2 z-[60] inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-black/50 backdrop-blur-sm transition-colors sm:right-3 ${
            isLight
              ? "border-[#8b4315] text-[#f59e0b] hover:bg-[#8b4315]/30"
              : "border-neon-green/50 text-neon-green hover:bg-neon-green/15"
          }`}
          style={{ top: "35%" }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
        <div
          data-flow-control
          role="group"
          aria-label={language === "es" ? "Controles de reproducción" : "Playback controls"}
          className={`absolute bottom-3 left-1/2 z-[60] flex w-[min(22rem,calc(100%-1.5rem))] -translate-x-1/2 cursor-default items-center gap-2 rounded-sm border bg-[#0b0d0c]/95 px-2 py-1.5 ${
            isLight ? "border-[#f59e0b]/70" : "border-neon-green/50"
          }`}
        >
          <button
            type="button"
            onClick={() => setVolume((current) => (current === 0 ? 0.85 : 0))}
            aria-label={
              language === "es"
                ? volume === 0 ? "Activar sonido" : "Silenciar"
                : volume === 0 ? "Unmute" : "Mute"
            }
            className={`inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border ${
              isLight ? "border-[#d9a06b]/70 text-[#f5b942]" : "border-white/20 text-white/80"
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
            className="h-1 w-12 shrink-0 cursor-pointer sm:w-16"
            style={{ accentColor: accent }}
            aria-label={language === "es" ? "Volumen" : "Volume"}
          />
          <span
            className={`shrink-0 font-mono text-[10px] tabular-nums ${
              isLight ? "text-[#f5b942]/80" : "text-white/70"
            }`}
          >
            {formatTrackTime(progress)}
          </span>
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
            className="h-1 min-w-0 flex-1 cursor-pointer"
            style={{ accentColor: accent }}
            aria-label={language === "es" ? "Progreso" : "Progress"}
          />
          <span
            className={`shrink-0 font-mono text-[10px] tabular-nums ${
              isLight ? "text-[#f5b942]/80" : "text-white/70"
            }`}
          >
            {formatTrackTime(duration)}
          </span>
        </div>
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
      <VideoWindowFrame
        title={language === "es" ? "2026 TRABAJOS Y EXPERIMENTOS" : "2026 WORKS AND EXPERIMENTS"}
        meta={`${safeIndex + 1}/${items.length}`}
        footRight="2026"
        titleOverlay={<UpdatesPendingBadge isLight={isLight} compact />}
      >
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_212px] xl:items-stretch">
              {activeItem.kind === "embed" && activeItem.videoId ? (
                <InlineVideoStage key={activeItem.id} item={activeItem} isLight={isLight} />
              ) : activeItem.opensPopup ? (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="block w-full rounded-sm bg-transparent p-0 text-left"
                >
                  <PreviewStage item={activeItem} isLight={isLight} lockedPreview={activeItem.locked} />
                </button>
              ) : (
                <div className="block w-full rounded-sm">
                  <PreviewStage item={activeItem} isLight={isLight} lockedPreview={activeItem.locked} />
                </div>
              )}

              <div className="grid gap-3 xl:h-full xl:grid-rows-[40px_repeat(4,minmax(0,1fr))]">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={goPrev}
                    type="button"
                    className="vw-btn"
                    aria-label={language === "es" ? "Anterior" : "Previous"}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={goNext}
                    type="button"
                    className="vw-btn"
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
                        {item.locked ? (
                          <span className="sr-only">{language === "es" ? " (Próximamente)" : " (Coming soon)"}</span>
                        ) : null}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="font-cyber text-lg text-neon-cyan">{activeItem.title[language]}</div>
              {activeItem.kind === "embed" && activeItem.youtubeUrl ? (
                <a
                  href={activeItem.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vw-link mt-2 inline-flex items-center gap-2"
                >
                  {language === "es" ? "Ver en YouTube" : "Watch on YouTube"}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : activeItem.opensPopup ? (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="vw-link mt-2 inline-flex items-center gap-2"
                >
                  {language === "es" ? "Abrir popup" : "Open popup"}
                </button>
              ) : (
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-neon-green/70">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{language === "es" ? "Próximamente" : "Coming soon"}</span>
                </p>
              )}
            </div>
        </div>
      </VideoWindowFrame>

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

  const B = ({ children }: { children: ReactNode }) => (
    <strong className={isLight ? "font-bold text-[#2e1305]" : "font-bold text-white"}>{children}</strong>
  )
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
              <h1 className="mb-3 font-cyber text-[1.65rem] sm:text-3xl font-bold text-neon-green lg:text-4xl">
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
                  A finales de <B>2022</B> empecé de forma autodidacta a aprender sobre IA, en <B>2023</B> generé un
                  LoRA de mi persona. Desde junio de <B>2024</B> participo del curso y comunidad de IA generativa{" "}
                  <B>Morfeo Academy</B>. Desde <B>2024</B> hasta principios de <B>2026</B> fui AI & Content Consultant &
                  Producer en <B>Paradise.la</B>, donde trabajé en la transición hacia una productora audiovisual
                  impulsada por IA. Trabajo como creative technologist: uso un stack de IA todos los días para
                  prototipar ideas y acelerar la producción de contenido. En <B>Paradise.la</B> el resultado fue pasar
                  de ciclos de concepto a entrega de más de 2 semanas a 3–4 días. Exploro herramientas y workflows para
                  marcas y equipos, con foco en acelerar, iterar, reducir fricción y mejorar la calidad. Trabajo con IA en:{" "}
                  <span className="font-cyber text-neon-cyan">IMAGEN</span>: Nanobanana, GPT2, Flux, Midjourney.{" "}
                  <span className="font-cyber text-neon-cyan">VIDEO</span>: Flow / Veo, Kling, Runway,
                  Higgsfield/Freepik. <span className="font-cyber text-neon-cyan">AUDIO</span>: ElevenLabs,
                  fish.audio, Suno, Udio. <span className="font-cyber text-neon-cyan">LLMS</span>: Claude,
                  ChatGPT, Gemini, Perplexity, Kimi.
                </>
              ) : (
                <>
                  In late <B>2022</B> I started teaching myself about AI, and in <B>2023</B> I generated a LoRA of
                  myself. Since June <B>2024</B> I have been part of the generative AI course and community{" "}
                  <B>Morfeo Academy</B>. From <B>2024</B> to early <B>2026</B> I was AI & Content Consultant & Producer
                  at <B>Paradise.la</B>, where I worked on its transition toward an AI-driven audiovisual production
                  company. I work as a creative technologist: I use an AI stack every day to prototype ideas and speed
                  up content production. At <B>Paradise.la</B> the result was going from concept-to-delivery cycles of
                  2+ weeks to 3–4 days. I explore tools and workflows for brands and teams, focused on accelerating,
                  iterating, reducing friction and improving quality. I work with AI across{" "}
                  <span className="font-cyber text-neon-cyan">IMAGE</span>: Nanobanana, GPT2, Flux, Midjourney.{" "}
                  <span className="font-cyber text-neon-cyan">VIDEO</span>: Flow / Veo, Kling, Runway,
                  Higgsfield/Freepik. <span className="font-cyber text-neon-cyan">AUDIO</span>: ElevenLabs,
                  fish.audio, Suno, Udio. <span className="font-cyber text-neon-cyan">LLMS</span>: Claude,
                  ChatGPT, Gemini, Perplexity, Kimi.
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

          {showVideoSections ? (
            <VideoWindowFrame title="REEL 2025/2026" meta="REEL" footRight={videoCountLabel(1)}>
              <VideoScreen video={{ videoId: REEL_VIDEO_ID }} title="Reel 2025/2026" />
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="vw-video-desc">
                  {currentLanguage === "es"
                    ? "Reel 2025/2026: selección de trabajos y experimentos con IA."
                    : "Reel 2025/2026: a selection of AI works and experiments."}
                </p>
                <a
                  href={REEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vw-link"
                >
                  {currentLanguage === "es" ? "Ver en YouTube ↗" : "Watch on YouTube ↗"}
                </a>
              </div>
            </VideoWindowFrame>
          ) : null}

          {showImageVideo2026 ? (
            <Works2026Carousel language={currentLanguage} isLight={isLight} filter={activeFilter} />
          ) : null}

          {showAudioSection ? (
            <div className="space-y-3">
              <RetroPanel
                title={currentLanguage === "es" ? "AUDIO IA — MUSIC LAB" : "AI AUDIO — MUSIC LAB"}
                statusRight={`${IA_AUDIO_TRACKS.length} TRACKS`}
                highlight
                accent={isLight ? "amber" : "blue"}
              >
                <SpotifyGallery language={currentLanguage} isLight={isLight} />
              </RetroPanel>

              <div
                className={`flex flex-col gap-3 rounded-sm border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                  isLight ? "border-[#d9a06b] bg-[#fff4e6]" : "border-neon-green/30 bg-black/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/magaibacoin.gif"
                    alt=""
                    aria-hidden="true"
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full"
                  />
                  <p className="text-sm leading-relaxed text-neon-green/90">
                    {currentLanguage === "es"
                      ? "RADIO MAGAIBA: el canal 24/7 con canciones generadas con IA que armé para $MAGAIBA, la memecoin argentina comunitaria."
                      : "RADIO MAGAIBA: the 24/7 channel with AI-generated songs I built for $MAGAIBA, the community-driven Argentine memecoin."}
                  </p>
                </div>
                <Link
                  href="/magaiba"
                  className={`inline-flex shrink-0 items-center justify-center rounded-sm border px-4 py-2 font-cyber text-xs uppercase tracking-[0.16em] transition-colors ${
                    isLight
                      ? "border-[#8b4315] text-[#8b4315] hover:bg-[#f6e6d2]"
                      : "border-neon-cyan/60 text-neon-cyan hover:bg-neon-cyan/10"
                  }`}
                >
                  {currentLanguage === "es" ? "VER MAGAIBA →" : "VIEW MAGAIBA →"}
                </Link>
              </div>
            </div>
          ) : null}

          {showVideoSections ? (
          <div id="ejemplos-trabajos-ia-2025">
            <VideoWindowFrame
              title={currentLanguage === "es" ? "2025 TRABAJOS Y EXPERIMENTOS" : "2025 WORKS AND EXPERIMENTS"}
              meta="PITCH"
              footRight={videoCountLabel(2)}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="h-full rounded-md border border-neon-green/30 bg-black/30 p-4">
                  <div className="mb-2 font-cyber text-lg text-neon-cyan">
                    {currentLanguage === "es" ? "Pitch Jugos México - Animatic" : "Mexico Juice Pitch - Animatic"}
                  </div>
                  <div className="whitespace-pre-line text-base leading-relaxed text-neon-green/90">
                    {currentLanguage === "es"
                      ? "Animatic de técnica mixta: footage + contenido IA (esto último a mi cargo).\nPipeline IA end-to-end: im\u00e1genes -> video -> voz."
                      : "Mixed-technique animatic: footage + AI content (the AI part was my responsibility).\nEnd-to-end AI pipeline: images -> video -> voice."}
                  </div>
                  <a href={jumexLink[currentLanguage]} target="_blank" rel="noreferrer" className="mt-3 block">
                    <div className="aspect-video w-full overflow-hidden rounded-md border border-neon-green/30 bg-black">
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
                    className="vw-link mt-3 inline-block"
                  >
                    Video: YouTube
                  </a>
                </div>

                <div className="h-full rounded-md border border-neon-green/30 bg-black/30 p-4">
                  <div className="mb-2 font-cyber text-lg text-neon-cyan">
                    {currentLanguage === "es" ? "Pitch Sandwiches México - Animatic" : "Mexico Sandwich Pitch - Animatic"}
                  </div>
                  <div className="whitespace-pre-line text-base leading-relaxed text-neon-green/90">
                    {currentLanguage === "es"
                      ? "Animatic de técnica mixta: footage + contenido IA (esto último a mi cargo).\nPipeline IA end-to-end: im\u00e1genes -> video."
                      : "Mixed-technique animatic: footage + AI content (the AI part was my responsibility).\nEnd-to-end AI pipeline: images -> video."}
                  </div>
                  <a href={subwayLink[currentLanguage]} target="_blank" rel="noreferrer" className="mt-3 block">
                    <div className="aspect-video w-full overflow-hidden rounded-md border border-neon-green/30 bg-black">
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
                    className="vw-link mt-3 inline-block"
                  >
                    Video: YouTube
                  </a>
                </div>
              </div>
            </VideoWindowFrame>
          </div>
          ) : null}

          {showSystemSections ? (
            <RetroPanel title="the8bureau" statusRight="PRIVATE / OFFLINE" highlight>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
                <div>
                  <The8BureauScreenshotThumb isLight={isLight} onOpen={() => setIsThe8BureauModalOpen(true)} />
                </div>

                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-neon-green/90">{the8BureauIntro[currentLanguage]}</p>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {the8BureauFeatures.map((feature) => (
                      <div
                        key={feature.title}
                        className={`rounded-sm border p-4 ${
                          feature.deprecated
                            ? isLight
                              ? "border-dashed border-[#d9a06b]/45 bg-[#fff4e6]/60 opacity-75"
                              : "border-dashed border-neon-green/20 bg-black/15 opacity-75"
                            : isLight
                              ? "border-[#d9a06b]/55 bg-[#fff4e6]"
                              : "border-neon-green/25 bg-black/25"
                        }`}
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <div className="font-cyber text-sm uppercase tracking-[0.16em] text-neon-cyan">
                            {feature.title}
                          </div>
                          {feature.deprecated ? (
                            <span
                              className={`rounded-full border px-2 py-0.5 font-cyber text-[10px] uppercase tracking-[0.16em] ${
                                isLight ? "border-[#8b4315]/50 text-[#8b4315]" : "border-neon-magenta/60 text-neon-magenta"
                              }`}
                            >
                              DEPRECATED
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm leading-relaxed text-neon-green/85">{feature.description[currentLanguage]}</p>
                        {feature.link ? (
                          <a
                            href={feature.link.href}
                            {...(feature.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="vw-link mt-2 inline-flex items-center gap-1.5 text-sm"
                          >
                            {feature.link.label[currentLanguage]}
                            {feature.link.href.startsWith("http") ? <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-cyber text-xs uppercase tracking-[0.2em] text-neon-cyan">
                        {currentLanguage === "es" ? "NUEVO EN V2" : "NEW IN V2"}
                      </h3>
                      <div className={`h-px flex-1 ${isLight ? "bg-[#d9a06b]/50" : "bg-neon-green/25"}`} />
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-4">
                      {the8BureauV2Tools.map((tool) => (
                        <div
                          key={tool.title.en}
                          className={`rounded-sm border p-3 ${
                            isLight ? "border-[#d9a06b]/55 bg-[#fff4e6]" : "border-neon-green/25 bg-black/25"
                          }`}
                        >
                          <div className="mb-1 font-cyber text-xs uppercase tracking-[0.14em] text-neon-cyan">
                            {tool.title[currentLanguage]}
                          </div>
                          <p className="text-xs leading-relaxed text-neon-green/85">{tool.description[currentLanguage]}</p>
                          {tool.href ? (
                            <a href={tool.href} className="vw-link mt-1.5 inline-block text-xs">
                              {currentLanguage === "es" ? "Probalo en esta web" : "Try it on this site"}
                            </a>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RetroPanel>
          ) : null}

          {isThe8BureauModalOpen ? <The8BureauImageModal isLight={isLight} onClose={() => setIsThe8BureauModalOpen(false)} /> : null}

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

              <div>
                <a
                  href="/comparador_imagenes"
                  className="block rounded-sm border border-neon-cyan/60 px-3 py-2 text-center font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
                >
                  COMPARADOR_IMAGENES
                </a>
                <a
                  href="/comparador_imagenes"
                  className="mt-3 block overflow-hidden rounded border border-neon-green/40 bg-black/20 transition-colors hover:border-neon-cyan/60"
                >
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">{currentLanguage === "es" ? "vista previa" : "preview"}</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/comparador_imagenes/index.html"
                      title={`COMPARADOR_IMAGENES ${currentLanguage === "es" ? "vista previa" : "preview"}`}
                      loading="lazy"
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Comparador de 2 imágenes con zoom y pan sincronizados, lado a lado o con slider. Las imágenes no salen de tu navegador."
                    : "Compare 2 images with synced zoom and pan, side by side or with a slider. Your images never leave the browser."}
                </p>
              </div>

              <div>
                <a
                  href="/pdf_toolkit"
                  className="block rounded-sm border border-neon-cyan/60 px-3 py-2 text-center font-cyber text-sm text-neon-cyan hover:bg-neon-cyan/10"
                >
                  PDF_TOOLKIT
                </a>
                <a
                  href="/pdf_toolkit"
                  className="mt-3 block overflow-hidden rounded border border-neon-green/40 bg-black/20 transition-colors hover:border-neon-cyan/60"
                >
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">{currentLanguage === "es" ? "vista previa" : "preview"}</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/pdf_toolkit/index.html"
                      title={`PDF_TOOLKIT ${currentLanguage === "es" ? "vista previa" : "preview"}`}
                      loading="lazy"
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Kit para PDF: convertir páginas a imagen con calidad ajustable, combinar 2 PDF en 1 imagen y unir varios PDF en uno. Corre en tu navegador, sin subir archivos."
                    : "PDF kit: convert pages to images with adjustable quality, combine 2 PDFs into 1 image and merge several PDFs into one. Runs in your browser, with no uploads."}
                </p>
              </div>
            </div>
          </RetroPanel>
          ) : null}

          {showVideoSections ? (
            <VideoCarousel
              items={aiArchiveVideos}
              title={currentLanguage === "es" ? "EXPERIMENTOS IA (2022-2024)" : "AI EXPERIMENTS (2022-2024)"}
              className=""
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
