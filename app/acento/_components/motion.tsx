"use client"

import { Engine } from "../_engine/next"
import { setupMotion } from "../_motion/setup"
import { BASE } from "../_content/site"

export function Motion() {
  return <Engine setup={setupMotion} scope={BASE} />
}
