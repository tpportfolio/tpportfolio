// Add a fallback for SSR/Next.js environments where window is not defined
import React from "react"

export const isBrowser = typeof window !== "undefined"
