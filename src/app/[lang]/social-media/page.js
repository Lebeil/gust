import SocialMediaClient from "./SocialMediaClient"
import { getSettings, getLocales } from "@/lib/dataLoader"

export async function generateMetadata() {
  try {
    const settings = getSettings({})
    return {
      title: "Social Media • Packs mensuels & contenus performants - Gust",
      description: "Packs Social Media: Light, Start, Expert. Stratégie éditoriale, production, modération et reporting avancé. Contenus qui arrêtent le scroll.",
      keywords: "social media, contenus réseaux sociaux, community management, stratégie éditoriale, modération, reporting, tiktok, instagram, linkedin",
      openGraph: {
        title: "Social Media • Gust",
        description: "Des contenus qui performent chaque mois. Packs Light/Start/Expert.",
        images: [{ url: settings?.data?.favicon?.url || "/images/logo.avif" }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Social Media • Gust",
        description: "Packs Social Media performants.",
      },
    }
  } catch {
    return { title: "Social Media - Gust", description: "Packs Social Media" }
  }
}

export default async function SocialMediaPage() {
  getSettings({})
  getLocales()

  return <SocialMediaClient />
}

export async function generateStaticParams() {
  const locales = getLocales()
  return locales.map((locale) => ({ lang: locale.id }))
}


