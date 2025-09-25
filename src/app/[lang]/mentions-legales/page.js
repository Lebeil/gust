import { Layout } from "@/components/Layout"

export async function generateMetadata({ params }) {
  const { lang } = params
  
  return {
    title: "Mentions Légales - Gust",
    description: "Mentions légales et conditions d'utilisation de Gust.",
    keywords: "mentions légales, gust, conditions",
    openGraph: {
      title: "Mentions Légales - Gust",
      description: "Mentions légales et conditions d'utilisation de Gust.",
    },
  }
}

export default async function MentionsLegalesPage({ params }) {
  const { lang } = await params
  
  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
            Mentions Légales
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Éditeur du site</h2>
              <p className="text-white/80">
                Gust<br/>
                Société par actions simplifiée<br/>
                Capital social : XXX euros<br/>
                Siren : XXX XXX XXX<br/>
                Siège social : Paris, France
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Hébergement</h2>
              <p className="text-white/80">
                Ce site est hébergé par Vercel Inc.<br/>
                340 S Lemon Ave #4133<br/>
                Walnut, CA 91789, United States
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
              <p className="text-white/80">
                Email : hello@gust.fr<br/>
                Téléphone : +33 1 23 45 67 89
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
