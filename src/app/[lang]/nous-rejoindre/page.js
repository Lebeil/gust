/* eslint-disable react/no-unescaped-entities */
import { Layout } from "@/components/Layout"
import { getSettings, getHeader, getFooter, getLocales } from "@/lib/dataLoader"

export async function generateMetadata() {

  try {
    const settings = getSettings({})
    
    return {
      title: "Nous Rejoindre - Gust Agence Créative",
      description: "Rejoignez l'équipe Gust et participez à la création de stop-scrollers et d'expériences digitales innovantes",
      keywords: "emploi, carrière, recrutement, agence créative, stop-scrollers",
    }
  } catch (error) {
    return {
      title: "Nous Rejoindre - Gust",
      description: "Rejoignez notre équipe créative",
    }
  }
}

export default async function NousRejoindre({ params }) {

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
        page_type="carriere"
      >
        <div className="h-full text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-6xl font-bold mb-12 text-center animate-fade-in">
              NOUS REJOINDRE
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 animate-slide-up">
                <h2 className="text-3xl font-bold mb-6">Créons ensemble les stop-scrollers de demain</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Chez Gust, nous cherchons des talents passionnés pour révolutionner 
                  la création de contenus digitaux qui marquent les esprits.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="animate-slide-in-left">
                  <h3 className="text-2xl font-bold mb-4">Pourquoi Gust ?</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-white mt-1">•</span>
                      <span>Projets innovants avec des marques prestigieuses</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-white mt-1">•</span>
                      <span>Équipe créative et bienveillante</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-white mt-1">•</span>
                      <span>Technologies de pointe (3D, AR, IA)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-white mt-1">•</span>
                      <span>Formation continue et évolution</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-white mt-1">•</span>
                      <span>Télétravail flexible</span>
                    </li>
                  </ul>
                </div>

                <div className="animate-slide-in-right">
                  <h3 className="text-2xl font-bold mb-4">Nos valeurs</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-white/20 rounded-lg">
                      <h4 className="font-bold mb-2">🚀 Innovation</h4>
                      <p className="text-gray-300 text-sm">Repousser les limites du possible</p>
                    </div>
                    <div className="p-4 border border-white/20 rounded-lg">
                      <h4 className="font-bold mb-2">🎨 Créativité</h4>
                      <p className="text-gray-300 text-sm">Imaginer l'extraordinaire</p>
                    </div>
                    <div className="p-4 border border-white/20 rounded-lg">
                      <h4 className="font-bold mb-2">🤝 Collaboration</h4>
                      <p className="text-gray-300 text-sm">Réussir ensemble</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-3xl font-bold mb-8 text-center">Postes ouverts</h3>
                <div className="space-y-6">
                  <div className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold">Creative Developer</h4>
                        <p className="text-gray-400">CDI • Paris • Hybride</p>
                      </div>
                      <span className="bg-white/10 px-3 py-1 rounded-full text-sm">Urgent</span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Développeur créatif spécialisé en animations 3D et expériences immersives. 
                      Maîtrise de React, Three.js et GSAP requise.
                    </p>
                    <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      Postuler
                    </button>
                  </div>

                  <div className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold">Motion Designer</h4>
                        <p className="text-gray-400">CDI • Paris • Présentiel</p>
                      </div>
                      <span className="bg-white/10 px-3 py-1 rounded-full text-sm">Nouveau</span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Expert en création de stop-scrollers et contenus animés pour réseaux sociaux. 
                      After Effects, Cinema 4D et créativité débordante exigés.
                    </p>
                    <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      Postuler
                    </button>
                  </div>

                  <div className="border border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold">UX/UI Designer</h4>
                        <p className="text-gray-400">Freelance • Remote • Projet 6 mois</p>
                      </div>
                      <span className="bg-white/10 px-3 py-1 rounded-full text-sm">Freelance</span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Designer d'expériences utilisateur pour applications mobiles innovantes. 
                      Portfolio exceptionnel et vision avant-gardiste requis.
                    </p>
                    <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      Postuler
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h3 className="text-2xl font-bold mb-4">Candidature spontanée</h3>
                <p className="text-gray-300 mb-6">
                  Vous ne trouvez pas le poste idéal ? Envoyez-nous votre candidature spontanée !
                </p>
                <a 
                  href="mailto:recrutement@agencegust.com?subject=Candidature spontanée"
                  className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Envoyer ma candidature
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  } catch (error) {
    console.error("Error loading nous-rejoindre page:", error)
    
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Erreur de chargement</h1>
          <p>Impossible de charger la page nous rejoindre.</p>
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