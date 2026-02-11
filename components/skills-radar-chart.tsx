"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

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

const CAREER_STAGES = [
  {
    key: "2007-2011",
    color: "#d1d5db", // Light Gray
    label: "2007-2011",
  },
  {
    key: "2011-2015",
    color: "#64748b", // Blue Gray
    label: "2011-2015",
  },
  {
    key: "2015-2020",
    color: "#1e293b", // Dark Blue
    label: "2015-2020",
  },
  {
    key: "2020-2024",
    color: "#22c55e", // Green
    label: "2020-2024",
  },
  {
    key: "2024-Present",
    color: "#a3ff12", // Bright Green
    label: "2024-Present",
  },
]

// Example skill data for each stage (replace with your real data)
const data = SKILLS.map(skill => ({
  skill,
  "2007-2011": Math.floor(Math.random() * 3),
  "2011-2015": Math.floor(Math.random() * 4),
  "2015-2020": Math.floor(Math.random() * 5),
  "2020-2024": Math.floor(Math.random() * 5),
  "2024-Present": Math.floor(Math.random() * 6),
}))

export default function SkillsRadarChart() {
  return (
    <section className="py-12 px-4 bg-[#fafbfc] rounded-xl shadow-md flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 font-sans text-gray-800">Evolution of My Skills</h2>
      <div className="w-full max-w-3xl h-[400px] md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" tick={{ fontFamily: 'Inter, Open Sans, sans-serif', fontSize: 12, fill: '#222' }} />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} tick={{ fontFamily: 'Inter, Open Sans, sans-serif', fontSize: 11, fill: '#888' }} />
            {CAREER_STAGES.map(stage => (
              <Radar
                key={stage.key}
                name={stage.label}
                dataKey={stage.key}
                stroke={stage.color}
                fill={stage.color}
                fillOpacity={0.3 + 0.1 * CAREER_STAGES.findIndex(s => s.key === stage.key)}
                dot={false}
                isAnimationActive={false}
              />
            ))}
            <Legend wrapperStyle={{ fontFamily: 'Inter, Open Sans, sans-serif', fontSize: 13 }} />
            <Tooltip contentStyle={{ fontFamily: 'Inter, Open Sans, sans-serif' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-6 text-sm text-gray-500 text-center max-w-xl">
        Each axis represents a key skill area. The colored lines show your growth and focus across different stages of your career. Scale: 0 (no experience) to 5 (expert).
      </p>
    </section>
  )
}
