import { stillOf, type Lang, type Project } from "../_content/site"

// The small still of a project in a list. It is decorative there: the link text names the project.
export function ProjectStill({ project, lang }: { project: Project; lang: Lang }) {
  if (project.cover.kind === "figure") {
    return (
      <span className="still still--figure" aria-hidden="true">
        <span>{project.cover.value[lang]}</span>
      </span>
    )
  }
  const src = project.thumb ? project.thumb.src : stillOf(project.cover.video.videoId, true)
  return (
    <span className="still">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={320} height={180} loading="lazy" decoding="async" />
    </span>
  )
}
