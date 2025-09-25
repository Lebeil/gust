import { Layout } from "@/components/Layout"

export async function generateMetadata({ params }) {
  const { lang } = params
  
  return {
    title: "Contact - Gust",
    description: "Contactez l'équipe Gust pour discuter de votre projet créatif.",
    keywords: "contact, gust, creative agency, stop scrollers",
    openGraph: {
      title: "Contact - Gust",
      description: "Contactez l'équipe Gust pour discuter de votre projet créatif.",
    },
  }
}

export default async function ContactPage({ params }) {
  const { lang } = await params
  
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Contactez-nous
          </h1>
          
          <p className="text-xl text-white/80 mb-12">
            Prêt à créer des stop-scrollers ? Parlons de votre projet.
          </p>
          
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Email</h2>
              <a 
                href="mailto:hello@gust.fr" 
                className="text-xl text-white hover:text-white/80 transition-colors"
              >
                hello@gust.fr
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Téléphone</h2>
              <a 
                href="tel:+33123456789" 
                className="text-xl text-white hover:text-white/80 transition-colors"
              >
                +33 1 23 45 67 89
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Adresse</h2>
              <p className="text-xl text-white/80">
                Paris, France
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <a 
              href="mailto:hello@gust.fr" 
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