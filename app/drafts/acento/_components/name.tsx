// The name, set by its prosody: each word is split into syllables and the stressed one is
// heavier and wider. The acute accents are drawn (see .mark), not typed, so they can land,
// lift and move. The text itself stays real: "Tomás Peró" for readers, crawlers and AT.
import type { ElementType } from "react"

export function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <i />
    </span>
  )
}

// A vowel that can carry the accent. `real` is the letter as it is spelled in the name.
function Vowel({ base, real }: { base: string; real: string }) {
  return (
    <span className="v" data-base={base}>
      <span className="sr-only">{real}</span>
      <Mark />
    </span>
  )
}

type Props = {
  as?: ElementType
  className?: string
  // The name before its accents land (the loader).
  bare?: boolean
  // The visitor can move the stress to the wrong syllable; it goes back by itself.
  playable?: boolean
  intro?: boolean
}

export function Name({ as: Tag = "span", className = "", bare = false, playable = false, intro = false }: Props) {
  const tonic = "syl is-stressed"
  return (
    <Tag
      className={`name ${className}${bare ? " name--bare" : ""}`.trim()}
      {...(playable ? { "data-stress": "name", "data-sway": "" } : {})}
      {...(intro ? { "data-name-intro": "" } : {})}
    >
      <span className="name__word" data-word>
        <span className="syl" data-syl>
          T<Vowel base="o" real="o" />
        </span>
        <span className={tonic} data-syl data-tonic>
          m<Vowel base="a" real="á" />s
        </span>
      </span>{" "}
      <span className="name__word" data-word>
        <span className="syl" data-syl>
          P<Vowel base="e" real="e" />
        </span>
        <span className={tonic} data-syl data-tonic>
          r<Vowel base="o" real="ó" />
        </span>
      </span>
    </Tag>
  )
}
