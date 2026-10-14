"use client"

// The video block of a case page: one screen and, when there are several videos, the list
// that changes it. A still with a play button is shown first; the YouTube player only loads
// when the visitor asks for it.
import { useState } from "react"
import { stillOf, ui, type L, type Lang, type Video } from "../_content/site"
import { Mark } from "./name"

export function Reel({ videos, lang, alt, eager = false }: { videos: Video[]; lang: Lang; alt?: L; eager?: boolean }) {
  const [at, setAt] = useState(0)
  const [playing, setPlaying] = useState(false)
  const video = videos[at]
  if (!video) return null

  const choose = (index: number) => {
    setAt(index)
    setPlaying(true)
  }

  return (
    <div className="player" data-sway="">
      <div className="player__screen">
        {playing ? (
          <iframe
            key={video.videoId}
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button type="button" className="player__btn" onClick={() => setPlaying(true)} aria-label={`${ui.play[lang]}: ${video.title[lang]}`}>
            <span className="still">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={video.videoId}
                src={stillOf(video.videoId)}
                alt={at === 0 && alt ? alt[lang] : ""}
                width={1280}
                height={720}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
              />
            </span>
            <span className="player__cta" aria-hidden="true">
              <i />
              {ui.play[lang]}
            </span>
          </button>
        )}
      </div>
      <div className="player__cap">
        <p>
          <strong>{video.title[lang]}</strong>
          {video.note ? ` ${video.note[lang]}` : ""}
        </p>
        <a className="link" href={`https://youtu.be/${video.videoId}`} target="_blank" rel="noopener noreferrer">
          {ui.watchOn[lang]}
        </a>
      </div>
      {videos.length > 1 ? (
        <ol className="tracks" style={{ marginTop: "1.5rem" }}>
          {videos.map((item, index) => (
            <li className={`track${index === at ? " is-stressed" : ""}`} key={item.videoId}>
              <button type="button" onClick={() => choose(index)} aria-pressed={index === at}>
                <span className="track__n">{String(index + 1).padStart(2, "0")}</span>
                <span className={`track__t${index === at ? " is-stressed" : ""}`}>
                  <Mark />
                  <span className="stress">{item.title[lang]}</span>
                </span>
                <span className="track__s" aria-hidden="true">
                  {ui.play[lang]}
                </span>
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
