"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-secondary"></div>
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-16 h-8 rounded-full bg-secondary flex items-center p-1 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDark ? "bg-primary left-1 toggle-switch-animation-reverse" : "bg-primary left-9 toggle-switch-animation"
        }`}
      >
        {isDark ? <Moon className="h-4 w-4 text-background" /> : <Sun className="h-4 w-4 text-background" />}
      </div>
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  )
}
