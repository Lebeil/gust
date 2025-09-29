import { Layout } from "@/components/Layout"
import CaseStudyDetail from "@/components/CaseStudyDetail"
import { getSettings, getHeader, getFooter, getLocales } from "@/lib/dataLoader"
import caseStudies from "@/data/caseStudies"

export async function generateMetadata({ params }) {
    const { uid, lang } = await params
    const slugify = (s) => (s || "")
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    const caseData = caseStudies.find(c => slugify(c.title) === uid || slugify(c.title).includes(uid) || uid.includes(slugify(c.title)))
    
    return {
        title: `${caseData?.title || uid} - Gust Case Study`,
        description: `Découvrez notre collaboration avec ${caseData?.title || uid}`,
    }
}

export default async function CaseStudyPage({ params }) {
    const { uid, lang } = await params
    
    try {
        const header = getHeader({ lang })
        const footer = getFooter({ lang })
        const settings = getSettings({ lang })
        const locales = getLocales()

        // Trouver le case study correspondant
        const slugify = (s) => (s || "")
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        const caseData = caseStudies.find(c => {
            const slug = slugify(c.title)
            return slug === uid || slug.includes(uid) || uid.includes(slug)
        })

        if (!caseData) {
            return (
                <Layout header={header} footer={footer} settings={settings} locales={locales}>
                    <div className="min-h-screen flex items-center justify-center text-white">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4">Case Study non trouvé</h1>
                            <p>Le projet "{uid}" n'existe pas.</p>
                        </div>
                    </div>
                </Layout>
            )
        }

        return (
            <Layout header={header} footer={footer} settings={settings} locales={locales}>
                <CaseStudyDetail caseData={caseData} />
            </Layout>
        )
    } catch (error) {
        console.error("Error loading case study page:", error)
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Erreur de chargement</h1>
                    <p>Impossible de charger le case study.</p>
                </div>
            </div>
        )
    }
}

export async function generateStaticParams() {
    // Générer les paramètres statiques pour tous les case studies
    const params = []
    
    caseStudies.forEach(caseStudy => {
        const uid = caseStudy.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
        // Générer pour toutes les langues
        params.push(
            { lang: 'fr', uid },
            { lang: 'fr-fr', uid },
            { lang: 'en-us', uid }
        )
    })
    
    return params
}