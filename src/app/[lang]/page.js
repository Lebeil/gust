import { Layout } from "@/components/Layout"
import { homePageContent } from "@/data/content"
import Hero from "@/components/Hero"
import LogoBanner from "@/components/LogoBanner"

export async function generateMetadata({ params }) {
  const { lang } = params
  
  return {
    title: "Gust - We create stop-scrollers",
    description: "L'attention, l'essentiel pour les marques. Nous créons des campagnes qui capturent l'attention.",
    keywords: "creative agency, stop scrollers, marketing, campaigns",
    openGraph: {
      title: "Gust - We create stop-scrollers",
      description: "L'attention, l'essentiel pour les marques. Nous créons des campagnes qui capturent l'attention.",
    },
  }
}

export default async function Page({ params }) {
  const { lang } = await params
  
  return (
    <Layout>
      <div className="h-screen flex flex-col overflow-hidden relative">
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <Hero content={homePageContent.hero} />
        </div>
        <div className="flex-shrink-0 h-auto">
          <LogoBanner />
        </div>
      </div>
    </Layout>
  )
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'en' }
  ]
}