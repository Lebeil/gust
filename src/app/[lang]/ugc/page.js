import { Layout } from "@/components/Layout"
import UGCClient from "./UGCClient"
import { getSettings, getHeader, getFooter, getLocales } from "@/lib/dataLoader"

export async function generateMetadata() {
  try {
    const settings = getSettings({})
    return {
      title: "UGC • User-Generated Content authentique et performant - Gust",
      description: "Solutions UGC: Standard & Premium. Contenus authentiques créés par de vrais utilisateurs. 2.4x plus d'engagement, -60% vs influence classique.",
      keywords: "ugc, user generated content, contenu authentique, micro influence, créateurs ugc, content factory, social ads, roas",
      openGraph: {
        title: "UGC • Gust",
        description: "L'authenticité qui convertit. 2.4x plus d'engagement.",
        images: [{ url: settings?.data?.favicon?.url || "/images/logo.avif" }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "UGC • Gust",
        description: "Contenus authentiques qui convertissent.",
      },
    }
  } catch {
    return { title: "UGC - Gust", description: "User-Generated Content" }
  }
}

export default async function UGCPage({ params }) {
  const header = getHeader({})
  const footer = getFooter({})
  const settings = getSettings({})
  const locales = getLocales()

  return (
    <Layout header={header} footer={footer} settings={settings} locales={locales}>
      <UGCClient />
    </Layout>
  )
}

export async function generateStaticParams() {
  const locales = getLocales()
  return locales.map((locale) => ({ lang: locale.id }))
}
