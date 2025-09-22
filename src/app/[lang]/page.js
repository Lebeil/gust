import { Layout } from "@/components/Layout"
import { homePageContent } from "@/data/content"
import Hero from "@/components/Hero"

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
      <Hero content={homePageContent.hero} />
    </Layout>
  )
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'en' }
  ]
}