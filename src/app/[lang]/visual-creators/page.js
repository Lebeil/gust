export async function generateMetadata({ params }) {
  const { lang } = params
  
  return {
    title: "Visual Creators - Gust",
    description: "Découvrez notre expertise en création visuelle et nos créateurs de contenu.",
    keywords: "visual creators, créateurs visuels, gust, production vidéo",
    openGraph: {
      title: "Visual Creators - Gust",
      description: "Découvrez notre expertise en création visuelle et nos créateurs de contenu.",
    },
  }
}

export default async function VisualCreatorsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Visual Creators
        </h1>
        
        <p className="text-xl text-white/80 mb-12">
          Nous travaillons avec les meilleurs créateurs visuels pour donner vie à vos projets.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Production</h3>
            <p className="text-white/80">
              Création de contenu vidéo professionnel avec nos équipes créatives.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Direction Artistique</h3>
            <p className="text-white/80">
              Conception et supervision créative de vos campagnes visuelles.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Post-Production</h3>
            <p className="text-white/80">
              Montage, étalonnage et finalisation de vos créations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'en' }
  ]
}