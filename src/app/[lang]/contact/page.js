import { Layout } from "@/components/Layout"
import CinematicFooter from "@/components/CinematicFooter"
import dynamic from "next/dynamic"

export async function generateMetadata() {
  return {
    title: "Contact - Gust Agence Créative",
    description: "Contactez-nous pour discuter de votre projet créatif et digital",
    keywords: "contact, agence, projet, devis, collaboration",
  }
}

const ProjectSelectMobile = dynamic(() => import("@/components/ProjectSelectMobile"), {
  ssr: false,
})

export default async function ContactPage({ params }) {
  try {
    return (
      <Layout>
        <div className="min-h-screen text-white flex items-start justify-center pt-16 pb-12 md:items-center md:pt-0 md:pb-0">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <form className="grid gap-10 mt-6 items-start md:grid-cols-2">
              {/* Ligne 1 gauche: titre + texte */}
              <div className="animate-slide-in-left">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">Parlons de votre projet</h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Vous avez une idée créative ? Un projet digital ?
                  Contactez-nous pour en discuter et créer ensemble quelque chose d&apos;exceptionnel.
                </p>
              </div>

              {/* Ligne 1 droite: champs Nom / Email / Projet */}
              <div className="space-y-6 animate-slide-in-right">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-5 py-3 bg-white/15 border border-white/35 rounded-[12px] focus:border-white/60 focus:outline-none transition-colors placeholder-white/60 shadow-inner"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-5 py-3 bg-white/15 border border-white/35 rounded-[12px] focus:border-white/60 focus:outline-none transition-colors placeholder-white/60 shadow-inner"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-medium mb-2">
                    Votre projet
                  </label>
                  <div className="hidden md:block">
                    <div className="relative">
                      <select
                        id="project"
                        name="project"
                        className="w-full appearance-none px-5 py-3 bg-white/15 border border-white/35 rounded-[12px] focus:border-white/60 focus:outline-none transition-colors pr-10 shadow-inner placeholder-white/60 md:text-base text-sm"
                      >
                        <option value="">Selectionnez un type de projet</option>
                        <option value="stop-scrollers">Stop-Scrollers</option>
                        <option value="site-web">Site Web</option>
                        <option value="app-mobile">Application Mobile</option>
                        <option value="branding">Branding</option>
                        <option value="autre">Autre</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="md:hidden">
                    <ProjectSelectMobile
                      id="project"
                      name="project"
                      placeholder="Selectionnez un type de projet"
                    />
                  </div>
                </div>
              </div>

              {/* Ligne 2 gauche: Email / Adresse alignés au message */}
              <div className="animate-slide-in-left space-y-6 text-sm md:text-base md:mt-1">
                <div>
                  <p className="font-semibold mb-0">Email</p>
                  <p className="text-white">Contact@agencegust.com</p>
                </div>
                <div>
                  <p className="font-semibold mb-0">Adresse</p>
                  <p className="text-white">Agence Gust - 58 rue de Monceau,
                  75008 Paris</p>
                </div>
              </div>

              {/* Ligne 2 droite: Message + bouton */}
              <div className="animate-slide-in-right">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-5 py-3 bg-white/15 border border-white/35 rounded-[12px] focus:border-white/60 focus:outline-none transition-colors resize-none placeholder-white/60 shadow-inner"
                    placeholder="Décrivez nous votre projet..."
                  ></textarea>
                </div>
                <div className="flex justify-center pt-4 pb-12 md:pb-0">
                  <button
                    type="submit"
                    className="relative group text-white/95 text-sm md:text-base font-medium tracking-wide"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Envoyer mon message
                      <span aria-hidden>→</span>
                    </span>
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white/70 group-hover:bg-white transition-colors duration-200"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <CinematicFooter />
      </Layout>
    )
  } catch (error) {
    console.error("Error loading contact page:", error)
    
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Erreur de chargement</h1>
          <p>Impossible de charger la page contact.</p>
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