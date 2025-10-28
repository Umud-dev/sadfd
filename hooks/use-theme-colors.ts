"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useThemeColors() {
  const { theme } = useTheme()
  const [colors, setColors] = useState({
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: "hsl(var(--card))",
    border: "hsl(var(--border))",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)

      setColors({
        primary: computedStyle.getPropertyValue("--primary").trim(),
        secondary: computedStyle.getPropertyValue("--secondary").trim(),
        background: computedStyle.getPropertyValue("--background").trim(),
        foreground: computedStyle.getPropertyValue("--foreground").trim(),
        card: computedStyle.getPropertyValue("--card").trim(),
        border: computedStyle.getPropertyValue("--border").trim(),
      })
    }
  }, [theme])

  return colors
}
