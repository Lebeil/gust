import { Layout } from "@/components/Layout"
import WorkClient from "@/components/WorkClient"
import CinematicFooter from "@/components/CinematicFooter"
import { getSettings, getHeader, getFooter, getLocales } from "@/lib/dataLoader"
import caseStudies from "@/data/caseStudies"

export async function generateMetadata() {

  try {
    const settings = getSettings({})
    
    return {
      title: "Case Studies - Gust Agence Créative",
      description: "Découvrez nos réalisations et projets créatifs qui ont marqué nos clients",
      keywords: "portfolio, case studies, projets, réalisations, créatif",
    }
  } catch (error) {
    return {
      title: "Case Studies - Gust",
      description: "Nos réalisations créatives",
    }
  }
}

export default async function WorkPage({ params }) {

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
        page_type="work"
      >
        <div className="text-white">
          <WorkClient items={caseStudies} />
        </div>
        <CinematicFooter />
      </Layout>
    )
  } catch (error) {
    console.error("Error loading work page:", error)
    
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Erreur de chargement</h1>
          <p>Impossible de charger la page work.</p>
        </div>
      </div>
    )
  }
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'fr-fr' },
    { lang: 'en-us' }
  ]
}