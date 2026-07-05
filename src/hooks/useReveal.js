import { useEffect } from "react"

/* Adds a `visible` class to any element with the `reveal` class
   once it scrolls into view — powers the subtle fade-up animations.
   Re-runs whenever `deps` change (e.g. after filtering the gallery). */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)")
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
