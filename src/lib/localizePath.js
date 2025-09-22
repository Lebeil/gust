export function getLocalizedPath(path = "/", lang = "", defaultLang = "fr-fr") {
  if (!lang) return path

  const isDefault = lang === defaultLang
  const normalized = path.replace(/^\/+/, "")

  if (isDefault) {
    return normalized ? `/${normalized}` : "/"
  }

  return `/${lang}${normalized ? "/" + normalized : ""}`
}