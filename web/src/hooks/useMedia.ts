import { useEffect, useState } from "react"

export default function useMedia(query: string) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e: MediaQueryListEvent) => {
      setMatch(e.matches)
    }
    media.addEventListener("change", listener)
    setMatch(media.matches)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return match
}
