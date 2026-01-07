import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400, // Slightly longer duration for smoother feel
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Check the theme on page load
  useEffect(() => {
    // Check localStorage first, then fallback to class
    let isDarkTheme = false
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark") {
      isDarkTheme = true
      document.documentElement.classList.add("dark")
    } else if (storedTheme === "light") {
      isDarkTheme = false
      document.documentElement.classList.remove("dark")
    } else {
      isDarkTheme = document.documentElement.classList.contains("dark")
    }
    setIsDark(isDarkTheme)
  }, [])

  const toggleTheme = useCallback(async () => {
    const isAppearanceTransition =
      // @ts-ignore: Browser support check
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const newTheme = !document.documentElement.classList.contains("dark")
    // Always update localStorage and class
    if (!isAppearanceTransition) {
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark", newTheme)
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      return
    }

    // Capture button coordinates before starting the transition
    const button = buttonRef.current
    let x = 0
    let y = 0
    let maxRadius = 0

    if (button) {
      const { top, left, width, height } = button.getBoundingClientRect()
      x = left + width / 2
      y = top + height / 2
      maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      )
    }

    // Start view transition
    const transition = document.startViewTransition(async () => {
      flushSync(() => {
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark", newTheme)
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    })

    // Play animation after the DOM updates
    await transition.ready

    // Animation
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: duration,
        easing: "ease-in-out", // More natural transition curve
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn("relative flex items-center justify-center", className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      {...props}
    >
      <div className="relative size-6">
        <Sun
          className={cn(
            "absolute inset-0 size-6 transition-all duration-300",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 size-6 transition-all duration-300",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}