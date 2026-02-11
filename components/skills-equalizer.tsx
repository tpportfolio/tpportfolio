"use client"

import { useState } from "react"

const SKILL_STAGES = [
  {
    key: "2007-2011",
    color: "#CCCCCC",
    label: "2007-2011",
  },
  {
    key: "2011-2015",
    color: "#00BFFF",
    label: "2011-2015",
  },
  {
    key: "2015-2020",
    color: "#004080",
    label: "2015-2020",
  },
  {
    key: "2020-2024",
    color: "#32CD32",
    label: "2020-2024",
  },
  {
    key: "2024-Present",
    color: "#FFFF00",
    label: "2024-Present",
  },
]

const SKILLS = [
  "Branding & Identity",
  "Growth Marketing & Acquisition",
  "Content Strategy",
  "PR & Communications",
  "Influencer Marketing",
  "Digital & Social Media",
  "AI Content Creation",
  "Strategic Alliances",
  "Innovation & Entrepreneurship",
  "Project Management",
]

// Example skill data: each skill has a value per stage (0-5)
const SKILL_DATA: Record<string, Record<string, number>> = {
  "Branding & Identity": {
    "2007-2011": 2,
    "2011-2015": 3,
    "2015-2020": 4,
    "2020-2024": 5,
    "2024-Present": 5,
  },
  "Growth Marketing & Acquisition": {
    "2007-2011": 1,
    "2011-2015": 2,
    "2015-2020": 3,
    "2020-2024": 4,
    "2024-Present": 5,
  },
  "Content Strategy": {
    "2007-2011": 2,
    "2011-2015": 3,
    "2015-2020": 4,
    "2020-2024": 5,
    "2024-Present": 5,
  },
  "PR & Communications": {
    "2007-2011": 2,
    "2011-2015": 3,
    "2015-2020": 4,
    "2020-2024": 4,
    "2024-Present": 5,
  },
  "Influencer Marketing": {
    "2007-2011": 1,
    "2011-2015": 2,
    "2015-2020": 3,
    "2020-2024": 3,
    "2024-Present": 4,
  },
  "Digital & Social Media": {
    "2007-2011": 2,
    "2011-2015": 3,
    "2015-2020": 4,
    "2020-2024": 5,
    "2024-Present": 5,
  },
  "AI Content Creation": {
    "2007-2011": 0,
    "2011-2015": 0,
    "2015-2020": 2,
    "2020-2024": 4,
    "2024-Present": 5,
  },
  "Strategic Alliances": {
    "2007-2011": 1,
    "2011-2015": 2,
    "2015-2020": 3,
    "2020-2024": 4,
    "2024-Present": 5,
  },
  "Innovation & Entrepreneurship": {
    "2007-2011": 2,
    "2011-2015": 3,
    "2015-2020": 4,
    "2020-2024": 5,
    "2024-Present": 5,
  },
  "Project Management": {
    "2007-2011": 2,
    "2011-2015": 3,
    "2015-2020": 4,
    "2020-2024": 5,
    "2024-Present": 5,
  },
}

const SKILL_ACHIEVEMENTS: Record<string, Record<string, string>> = {
  // Example, fill with real achievements if desired
  "Branding & Identity": {
    "2007-2011": "Started building brand foundations.",
    "2011-2015": "Developed brand guidelines for major campaigns.",
    "2015-2020": "Led rebranding projects for international clients.",
    "2020-2024": "Created award-winning brand identities.",
    "2024-Present": "Mentoring teams in advanced brand strategy.",
  },
  // ...repeat for other skills
}


  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)

  return (
    <section className="w-full min-h-screen bg-[#111] flex flex-col items-center justify-center py-12 px-2">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#FFFF00] font-orbitron tracking-widest drop-shadow-glow">SKILLS</h2>
      <div className="flex flex-wrap justify-center gap-3 w-full max-w-5xl">
        {SKILLS.map((skill, i) => {
          // For animation: sum all stages for this skill
          const total = Object.values(SKILL_DATA[skill]).reduce((a, b) => a + b, 0)
          return (
            <div
              key={skill}
              className="relative flex flex-col items-center group cursor-pointer"
              style={{ width: 36 }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => { setHoveredSkill(null); setHoveredStage(null) }}
            >
              {/* Skill Bar */}
              <div className="relative w-7 h-64 md:h-80 flex flex-col-reverse overflow-visible">
                {SKILL_STAGES.map((stage, j) => {
                  const value = SKILL_DATA[skill][stage.key]
                  if (!value) return null
                  return (
                    <div
                      key={stage.key}
                      className="absolute left-0 w-7 rounded-t-md transition-all duration-700"
                      style={{
                        height: `${(value / 5) * 100}%`,
                        bottom: 0,
                        background: stage.color,
                        boxShadow: `0 0 16px 2px ${stage.color}80, 0 0 2px 1px #fff0`,
                        zIndex: j + 1,
                        opacity: hoveredStage && hoveredStage !== stage.key ? 0.4 : 1,
                        filter: hoveredSkill === skill ? 'brightness(1.1) drop-shadow(0 0 8px #fff)' : 'none',
                        transition: 'opacity 0.2s, filter 0.2s',
                      }}
                      onMouseEnter={() => setHoveredStage(stage.key)}
                      onMouseLeave={() => setHoveredStage(null)}
                    />
                  )
                })}
                {/* Neon Glow Overlay */}
                <div className="absolute left-0 w-7 h-full rounded-t-md pointer-events-none" style={{ boxShadow: hoveredSkill === skill ? '0 0 32px 8px #FFFF0080' : 'none' }} />
              </div>
              {/* Skill Label */}
              <div className="mt-3 text-xs md:text-sm text-[#fff] font-rajdhani text-center w-20 break-words tracking-wide">
                {skill}
              </div>
              {/* Tooltip (Achievements) */}
              {hoveredSkill === skill && hoveredStage && SKILL_ACHIEVEMENTS[skill]?.[hoveredStage] && (
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 min-w-[180px] max-w-[220px] bg-[#222] text-[#FFFF00] text-xs font-rajdhani p-3 rounded-lg shadow-lg border border-[#FFFF00] animate-fade-in pointer-events-none">
                  <div className="mb-1 font-bold text-sm text-[#fff]">{skill}</div>
                  <div className="mb-1 text-[#00BFFF]">{hoveredStage}</div>
                  <div>{SKILL_ACHIEVEMENTS[skill][hoveredStage]}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {SKILL_STAGES.map(stage => (
          <div key={stage.key} className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded bg-[#111] border border-[#fff]" style={{ background: stage.color, boxShadow: `0 0 8px 2px ${stage.color}80` }} />
            <span className="text-xs md:text-sm text-[#fff] font-rajdhani">{stage.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
