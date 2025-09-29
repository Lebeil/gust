import { Layout } from "@/components/Layout"
import {
    getSettings,
    getHeader,
    getFooter,
    getLocales,
} from "@/lib/dataLoader"
import InfluenceClient from "./InfluenceClient"

export async function generateMetadata() {
  try {
    const settings = getSettings({})
    return {
      title: "Agence d'Influence Marketing | Campagnes Créateurs & Célébrités - Gust",
      description: "Transformez votre marque avec des campagnes d'influence qui convertissent. ✓ 2000+ créateurs vérifiés ✓ ROI x2.3 ✓ Recommandation en 10 jours",
      keywords: "agence influence, marketing influence, campagne influenceurs, créateurs contenu, UGC, TikTok marketing, Instagram marketing, influence Paris",
      openGraph: {
        title: "Gust - Agence d'Influence Marketing Nouvelle Génération",
        description: "Des campagnes d'influence qui arrêtent le scroll. Casting créateurs, production, amplification. Recommandation garantie en 10 jours.",
        images: [{ url: settings?.data?.favicon?.url || "/images/logo.avif" }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Gust - Agence d'Influence Marketing",
        description: "Transformez votre marque avec des créateurs triés sur le volet. ROI x2.3 garanti.",
      },
    }
  } catch {
    return {
      title: "Influence – Gust",
      description: "Campagnes d'influence qui arrêtent le scroll."
    }
  }
}

export default async function InfluencePage({ params }) {
  const header = getHeader({})
  const footer = getFooter({})
  const settings = getSettings({})
  const locales = getLocales()

  return (
    <Layout header={header} footer={footer} settings={settings} locales={locales}>
      <InfluenceClient />
    </Layout>
  )
}

export async function generateStaticParams() {
  const locales = getLocales()
  return locales.map((locale) => ({ lang: locale.id }))
}