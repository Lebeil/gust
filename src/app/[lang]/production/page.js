import { Layout } from "@/components/Layout"
import ProductionClient from "./ProductionClient"
import {
    getSettings,
    getHeader,
    getFooter,
    getLocales
} from "@/lib/dataLoader"

export async function generateMetadata() {
  try {
    const settings = getSettings({})
    return {
      title: "Studio Production Créative • Contenus Viraux - Gust",
      description: "🎬 Studio de production innovant : Pack Reboot, Studio & Craft. ✓ Contenus viraux garantis ✓ 3D & Motion Design ✓ Livraison 7 jours ✓ Droits illimités",
      keywords: "production video, studio créatif, contenus viraux, production tiktok, production instagram, motion design, 3d animation, brand content, production paris, agence production, storytelling video, tournage professionnel, post production, sound design",
      authors: [{ name: "Gust Agency" }],
      creator: "Gust Agency",
      publisher: "Gust Agency",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://www.agencegust.com'),
      alternates: {
        canonical: '/production',
        languages: {
          'fr-FR': '/fr/production',
          'en-US': '/en/production',
        },
      },
      openGraph: {
        title: "Studio Production Créative | Gust",
        description: "Transformez vos idées en contenus viraux avec notre studio de production. 3D, motion design, sound design. Pack Reboot dès 2500€. Livraison garantie en 7 jours.",
        url: 'https://www.agencegust.com/production',
        siteName: 'Gust Agency',
        images: [
          {
            url: settings?.data?.favicon?.url || "/images/logo.avif",
            width: 1200,
            height: 630,
            alt: 'Gust Production Studio',
          }
        ],
        locale: 'fr_FR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Studio Production | Gust",
        description: "🎬 Créez des contenus qui arrêtent le scroll. Studio de production créative nouvelle génération. Devis gratuit en 24h.",
        images: [settings?.data?.favicon?.url || "/images/logo.avif"],
        creator: '@gustagency',
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: 'google-site-verification-code',
        yandex: 'yandex-verification-code',
      },
    }
  } catch {
    return {
      title: "Production | Gust",
      description: "Studio de production créative spécialisé dans les contenus viraux et innovants."
    }
  }
}

export default async function ProductionPage({ params }) {
  try {
    const header = getHeader({})
    const footer = getFooter({})
    const settings = getSettings({})
    const locales = getLocales()

    return (
      <Layout
        header={header}
        footer={footer}
        settings={settings}
        locales={locales}
      >
        <ProductionClient />
      </Layout>
    )
  } catch (error) {
    console.error("Failed to load Production page data:", error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur de chargement</h1>
          <p>La page Production n'a pas pu être chargée. Veuillez réessayer.</p>
        </div>
      </div>
    )
  }
}

export async function generateStaticParams() {
  const locales = getLocales()
  return locales.map((locale) => ({ lang: locale.id }))
}
