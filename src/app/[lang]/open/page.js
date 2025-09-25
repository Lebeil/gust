import { Layout } from "@/components/Layout"

export async function generateMetadata({ params }) {
  const { lang } = params
  
  return {
    title: "Open - Gust",
    description: "Découvrez notre approche ouverte et collaborative pour vos projets créatifs.",
    keywords: "open, collaboration, gust, créatif",
    openGraph: {
      title: "Open - Gust",
      description: "Découvrez notre approche ouverte et collaborative pour vos projets créatifs.",
    },
  }
}

export default async function OpenPage({ params }) {
  const { lang } = await params
  
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Open
          </h1>
          
          <p className="text-xl text-white/80 mb-12">
            Une approche ouverte et collaborative pour créer ensemble des campagnes exceptionnelles.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Collaboration</h3>
              <p className="text-white/80">
                Nous travaillons main dans la main avec nos clients pour une création authentique.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Transparence</h3>
              <p className="text-white/80">
                Un processus créatif transparent du brief à la livraison finale.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Innovation</h3>
              <p className="text-white/80">
                Toujours à la pointe des tendances pour des résultats qui marquent.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Expertise</h3>
            <p className="text-white/80">
              Une équipe d&apos;experts passionnés au service de votre vision.
            </p>
            </div>
          </div>
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