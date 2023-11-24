import useMedia from "./useMedia"

export default function useTheme() {
  const match = useMedia("(prefers-color-scheme: dark)")
  return match ? "dark" : "light"
}