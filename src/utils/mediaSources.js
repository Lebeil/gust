export function getOptimizedSources(source) {
  if (!source || typeof source !== "string") {
    return []
  }

  const normalized = source.trim()
  const sources = []

  const addSource = (src, type) => {
    if (!src) return
    const key = `${type || "unknown"}-${src}`
    if (!sources.some((entry) => entry.key === key)) {
      sources.push({ key, src, type })
    }
  }

  const buildWebmVariant = (basePath) => {
    if (!basePath) return null
    if (!basePath.endsWith(".mp4")) return null

    return basePath.replace(/\.mp4$/, ".webm")
  }

  if (normalized.endsWith(".mp4")) {
    const webmVariant = buildWebmVariant(normalized)
    addSource(normalized, "video/mp4")
    return sources
  }

  if (normalized.endsWith(".webm")) {
    addSource(normalized, "video/webm")
    const fallbackMp4 = normalized.replace(/\.webm$/, ".mp4")
    addSource(fallbackMp4, "video/mp4")
    return sources
  }

  addSource(normalized, undefined)
  return sources
}
