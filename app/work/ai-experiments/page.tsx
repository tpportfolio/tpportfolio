"use client"

import { useState } from "react"
import Image, { type StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink, Lock, Play, X } from "lucide-react"
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

type GalleryImage = {
  id: string
  label: string
  gradient: string
  imageSrc?: StaticImageData
}

type Work2026Item = {
  id: string
  kind: "youtube-link" | "gallery" | "embed"
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
    label: `Moda ${String(index + 1).padStart(2, "0")}`,
    gradient: `linear-gradient(135deg, hsl(${hue} 82% 62%), hsl(${hue + 20} 78% 26%))`,
    imageSrc: modaGalleryImages[index],
  }
})

function getWorks2026Items(language: SupportedLanguage): Work2026Item[] {
  return [
    {
      id: "ad-30-40",
      kind: "youtube-link",
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
      title: { es: "Demo de producto", en: "Product Demo" },
      description: {
        es: "Video embebido de referencia. Usa el mismo espacio visual que una galeria.",
        en: "Embedded reference video. It uses the same visual area as a gallery.",
      },
      videoId: "zW8DP4fr7xA",
      youtubeUrl:
        "https://www.youtube.com/watch?v=zW8DP4fr7xA&list=PLTai-gQI1os01OvFV9Xid5OXWWgoM9FCP&index=2",
    },
    {
      id: "campana-moda",
      kind: "gallery",
      title: { es: "Campana Moda", en: "Fashion Campaign" },
      description: {
        es: "Galeria placeholder de 16 imagenes en grilla 4x4. Click para abrir fullscreen.",
        en: "16-image placeholder gallery in a 4x4 grid. Click to open fullscreen.",
      },
      galleryImages: modaGallery,
      thumbnail: thumbAND1,
    },
    {
      id: "ugc-content",
      kind: "youtube-link",
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
  es: "the8bureau es mi marca personal de IA y también es mi sistema operativo: la idea es convertirlo en un set de herramientas que pueda correr de manera local en mi computadora, de manera privada y offline.",
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
      es: "Análisis de tu marca online, reportes de posicionamiento en Google (SEO) y LLM's (AEO/GEO).",
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
                : feature.title === "NEURAL OPTIMIZATION SUITE"
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
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open the8bureau dashboard image"
      className={`block h-full w-full max-w-[300px] overflow-hidden rounded-sm border text-left shadow-[0_0_24px_rgba(0,0,0,0.22)] transition-transform hover:scale-[1.01] ${
        isLight ? "border-[#c57b45] bg-[#fff5e8]" : "border-neon-green/30 bg-[#03190f]"
      }`}
    >
      <div className={`relative h-full min-h-[220px] w-full ${isLight ? "bg-[#f7ead8]" : "bg-[#04150d]"}`}>
        <Image
          src={the8bureauThumb}
          alt="the8bureau dashboard"
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
  return (
    <div
      className="fixed inset-3 z-[90] md:bottom-6 md:right-6 md:top-6 md:left-[13.5rem] lg:left-[14rem]"
      role="dialog"
      aria-modal="true"
      aria-label="the8bureau dashboard"
    >
      <button type="button" className="absolute inset-0 bg-black/80" onClick={onClose} aria-label="Close image preview" />
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
            aria-label="Close image preview"
          >
            X
          </button>
        </div>
        <div className={`relative flex-1 p-4 ${isLight ? "bg-[#fff8f1]" : "bg-black"}`}>
          <div className="relative h-full w-full">
            <Image src={the8bureauPopupThumb} alt="the8bureau dashboard" fill sizes="90vw" className="object-contain" />
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
        <span>{isLight ? "Proximamente" : "Coming soon"}</span>
      </div>
    </div>
  ) : null

  if (item.thumbnail) {
    return (
      <div className={`aspect-[16/8] md:aspect-[16/6.2] overflow-hidden rounded-sm border ${frameClass}`}>
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title.es}
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
            alt={item.title.es}
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
            <div className="font-cyber text-xl text-neon-cyan">{item.title.es}</div>
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
      <button className="absolute inset-0 bg-black/80" onClick={onClose} aria-label="Close popup" />
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
            aria-label="Close popup"
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
            <button className="absolute inset-0" onClick={() => setSelectedGalleryImage(null)} aria-label="Close image preview" />
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
                aria-label="Close image preview"
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

function Works2026Carousel({ language, isLight }: { language: SupportedLanguage; isLight: boolean }) {
  const items = getWorks2026Items(language)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const activeItem = items[activeIndex]

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

  const aiArchiveVideos: VideoItem[] = [
    {
      id: "luma-testing",
      type: "youtube",
      videoId: "PLTai-gQI1os2Pz82VXGrAZ9Jov1dujRCl",
      isPlaylist: true,
      title: {
        es: "JUN'24 - LUMA TESTING. El mato a un policia motorizado animated artworks.",
        en: "JUN'24 - LUMA TESTING. El mato a un policia motorizado animated artworks.",
      },
      description: {
        es: 'Probe Luma Labs en los artworks de "El mato a un policia motorizado".',
        en: 'Tests performed with Luma Labs on the artworks of "El mato a un policia motorizado".',
      },
    },
    {
      id: "playground-endless",
      type: "youtube",
      videoId: "1wRmJKLHZ5A",
      title: {
        es: "JUN'24 - Playground Endless: recomendacion del vocero presidencial",
        en: "JUN'24 - Playground Endless: recommendation from the presidential spokesman",
      },
      description: {
        es: "Probe la plataforma Endless (un playground creativo). Use clonacion de voz de Manuel Adorni y edite el video.",
        en: "Testing of the Endless platform, a creative playground. Use of voice cloning of Manuel Adorni and video editing.",
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
        es: "Probe Google NotebookLM y genere un podcast a partir de mi propio curriculum vitae.",
        en: "Testing of Google NotebookLM, creating a podcast from my own curriculum vitae.",
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
        es: "Hice mis primeras pruebas con Suno en creacion de canciones: un freestyle/hip-hop sobre mi CV. Trabaje parte de la letra con ChatGPT.",
        en: "First tests with Suno in song creation: a freestyle/hip-hop based on my CV. Part of the lyrics was developed with ChatGPT.",
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
        es: "Hice mis primeras pruebas con Stable Diffusion. Desde aca empece a entusiasmarme y profundizar a diario.",
        en: "First tests with Stable Diffusion. From there I got excited and started going deeper every day.",
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
                  transición hacia una productora audiovisual impulsada por IA. Exploro herramientas y workflows para
                  marcas y equipos, con foco en acelerar, iterar, reducir fricción y mejorar la calidad. Trabajo con IA en:{" "}
                  <span className="font-cyber text-neon-cyan">IMAGEN</span>: Nanobanana, GPT-2, Flux, Midjourney.{" "}
                  <span className="font-cyber text-neon-cyan">VIDEO</span>: Flow / Veo, Kling, Runway,
                  Higgsfield/Freepik. <span className="font-cyber text-neon-cyan">AUDIO</span>: ElevenLabs,
                  fish.audio, Suno, Udio. <span className="font-cyber text-neon-cyan">LLM&apos;S</span>: ChatGPT,
                  Kimi, Gemini, Perplexity, Claude.
                </>
              ) : (
                <>
                  I began exploring AI as a self-taught practitioner in late 2022. In 2023, I generated a LoRA of
                  myself. Since June 2024, I have been part of Morfeo Academy's course and community. My professional
                  AI experience is my work as AI & Content Consultant & Producer at Paradise.la (July 2024 to January
                  2026), where I worked on its transition toward
                  an AI-driven audiovisual production company. I explore tools and workflows for brands and teams,
                  focused on accelerating, iterating, reducing friction and improving quality. I work with AI across{" "}
                  <span className="font-cyber text-neon-cyan">IMAGE</span>: Nanobanana, GPT-2, Flux, Midjourney.{" "}
                  <span className="font-cyber text-neon-cyan">VIDEO</span>: Flow / Veo, Kling, Runway,
                  Higgsfield/Freepik. <span className="font-cyber text-neon-cyan">AUDIO</span>: ElevenLabs,
                  fish.audio, Suno, Udio. <span className="font-cyber text-neon-cyan">LLM&apos;S</span>: ChatGPT,
                  Kimi, Gemini, Perplexity, Claude.
                </>
              )}
            </p>
          </div>
          <style>{`@keyframes blink { 0%,40%{opacity:1;} 60%,100%{opacity:0.25;} } .animate-blink { animation: blink 1.2s steps(2, start) infinite; }`}</style>
        </div>

        <div className="mt-8 space-y-8">
          <Works2026Carousel language={currentLanguage} isLight={isLight} />

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

          {isThe8BureauModalOpen ? <The8BureauImageModal isLight={isLight} onClose={() => setIsThe8BureauModalOpen(false)} /> : null}

          <div id="ejemplos-trabajos-ia-2025">
            <RetroPanel
              title={currentLanguage === "es" ? "2025 TRABAJOS Y EXPERIMENTOS" : "2025 WORKS AND EXPERIMENTS"}
              statusRight="PITCH"
              highlight
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="h-full rounded-sm border border-neon-green/30 bg-black/30 p-4">
                  <div className="mb-2 font-cyber text-lg text-neon-cyan">Pitch Jugos Mexico - Animatic</div>
                  <div className="whitespace-pre-line text-base leading-relaxed text-neon-green/90">
                    {currentLanguage === "es"
                      ? "Animatic tecnica mixta footage + contenido IA (esto ultimo a mi cargo).\nPipeline IA end-to-end: im\u00e1genes -> video -> voz."
                      : "Mixed-technique animatic (footage + AI content, AI part by me).\nEnd-to-end AI pipeline: images -> video -> voice."}
                  </div>
                  <a href={jumexLink[currentLanguage]} target="_blank" rel="noreferrer" className="mt-3 block">
                    <div className="aspect-video w-full overflow-hidden rounded-sm border border-neon-green/30">
                      <img
                        src="https://img.youtube.com/vi/U6_3OB7ljvY/hqdefault.jpg"
                        alt="Jumex animatic thumbnail"
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
                  <div className="mb-2 font-cyber text-lg text-neon-cyan">Pitch Sandwiches Mexico - Animatic</div>
                  <div className="whitespace-pre-line text-base leading-relaxed text-neon-green/90">
                    {currentLanguage === "es"
                      ? "Animatic tecnica mixta footage + contenido IA (esto ultimo a mi cargo).\nPipeline IA end-to-end: im\u00e1genes -> video."
                      : "Mixed-technique animatic (footage + AI content, AI part by me).\nEnd-to-end AI pipeline: images -> video."}
                  </div>
                  <a href={subwayLink[currentLanguage]} target="_blank" rel="noreferrer" className="mt-3 block">
                    <div className="aspect-video w-full overflow-hidden rounded-sm border border-neon-green/30">
                      <img
                        src="https://img.youtube.com/vi/zW8DP4fr7xA/hqdefault.jpg"
                        alt="Subway animatic thumbnail"
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

          <RetroPanel title="VIBE-CODING: WEBAPPS" statusRight="TOOLS">
            <p className="mb-4 text-base leading-relaxed text-neon-green/90">
              {currentLanguage === "es"
                ? "de the8bureau, marca personal para proyectos IA: Mini apps utiles, gratuitas y livianas para trabajo de produccion. Corren offline (abris el HTML en tu Mac/PC) o las podes usar desde esta misma web."
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
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">preview</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/canva_productora/index.html"
                      title="CANVA_PRODUCTORA preview"
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Canva ad-hoc para Paradise. Propuesta de grilla 3: (1) placa intro -CANVA- (2) foto/screen del video (3) placa negra con marca/ano."
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
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">preview</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/unyellower/index.html"
                      title="UNYELLOWER preview"
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Correccion de color para imagenes (por ejemplo, imagenes de ChatGPT con tinte amarillo). Incluye preset de auto-correccion mas azulado."
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
                  <div className="border-b border-neon-green/30 px-3 py-2 text-xs text-neon-green/80">preview</div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      src="/comparador_videos/index.html"
                      title="COMPARADOR_VIDEOS preview"
                      className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                </a>
                <p className="mt-3 text-base leading-relaxed text-neon-green/90">
                  {currentLanguage === "es"
                    ? "Comparador lado a lado de 2 versiones de un video. Feature no disponible en Dropbox Replay o Frame.io, herramientas pagas de productora."
                    : "Side-by-side comparison of 2 video versions. Not available in Dropbox Replay or Frame.io (paid tools)."}
                </p>
              </div>
            </div>
          </RetroPanel>

          <VideoCarousel
            items={aiArchiveVideos}
            title={currentLanguage === "es" ? "EXPERIMENTOS IA (2022-2024)" : "AI EXPERIMENTS (2022-2024)"}
            variant="retro"
          />
        </div>

        <div className="mt-12 text-center">
          <div
            className={`mb-6 h-px bg-gradient-to-r from-transparent ${isLight ? "via-[#b45309]" : "via-neon-green"} to-transparent`}
          ></div>
          <p className="mt-6 text-xs text-neon-green">
            &copy; 1986-{new Date().getFullYear()} TOMAS PERO // SESSION_TIMEOUT: 30:00 // END_TRANSMISSION
          </p>
        </div>
      </div>
    </main>
  )
}
