import { Layout } from "@/components/Layout"

export async function generateMetadata({ params }) {
  const { lang } = params
  
  return {
    title: "Make It - Gust",
    description: "Faisons-le ensemble ! Découvrez notre processus de création collaboratif.",
    keywords: "make it, création, gust, processus créatif",
    openGraph: {
      title: "Make It - Gust",
      description: "Faisons-le ensemble ! Découvrez notre processus de création collaboratif.",
    },
  }
}

export default async function MakeItPage({ params }) {
  const { lang } = await params
  
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Make It
          </h1>
          
          <p className="text-xl text-white/80 mb-12">
            Transformons vos idées en réalité avec notre expertise créative.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Stratégie</h3>
            <p className="text-white/80">
              Définition d&apos;une stratégie créative alignée sur vos objectifs.
            </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Production</h3>
            <p className="text-white/80">
              Création de contenu vidéo premium qui capture l&apos;attention.
            </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Résultats</h3>
            <p className="text-white/80">
              Des campagnes qui génèrent de l&apos;engagement et des résultats.
            </p>
            </div>
          </div>
          
          <div className="mt-12">
            <a 
              href="/contact" 
              className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
            >
              Commencer un projet
            </a>
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