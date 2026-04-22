"use client"

export type HomeVariantMode = "dark" | "light"

interface HomeVariantControlsProps {
  mode: HomeVariantMode
  onModeChange: (mode: HomeVariantMode) => void
}

export function HomeVariantControls({ mode, onModeChange }: HomeVariantControlsProps) {
  const nextMode = mode === "dark" ? "light" : "dark"

  return (
    <div className="home-variant-toolbar">
      <div className="home-variant-toggle-row">
        <span className={`home-variant-toggle-label ${mode === "light" ? "home-variant-toggle-label--active" : ""}`}>
          LIGHT
        </span>
        <button
          type="button"
          className={`home-variant-toggle home-variant-toggle--${mode}`}
          aria-label={`Switch to ${nextMode} mode`}
          aria-pressed={mode === "light"}
          onClick={() => onModeChange(nextMode)}
        >
          <span className="home-variant-toggle__track" aria-hidden>
            <span className="home-variant-toggle__icon home-variant-toggle__icon--sun">{"\u25cf"}</span>
            <span className="home-variant-toggle__icon home-variant-toggle__icon--moon">{"\u25cf"}</span>
            <span className="home-variant-toggle__thumb" />
          </span>
        </button>
        <span className={`home-variant-toggle-label ${mode === "dark" ? "home-variant-toggle-label--active" : ""}`}>
          DARK
        </span>
      </div>

      <a
        href="/agents.md"
        target="_blank"
        rel="noopener noreferrer"
        className="home-variant-agent-link"
      >
        AGENT_MODE
      </a>
    </div>
  )
}