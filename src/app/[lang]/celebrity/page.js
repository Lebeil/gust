import { Layout } from "@/components/Layout"
import CelebrityClient from "./CelebrityClient"
import {
    getSettings,
    getHeader,
    getFooter,
    getLocales
} from "@/lib/dataLoader"

export async function generateMetadata() {
    return {
        title: "Celebrity Marketing - Gust",
        description: "Une visibilité maximale grâce aux célébrités. Nous connectons votre marque avec des personnalités reconnues pour générer un impact fort, crédible et immédiat.",
    }
}

export default async function Page({ params }) {
    const { lang } = await params
    try {
        const header = getHeader({ lang })
        const footer = getFooter({ lang })
        const settings = getSettings({ lang })
        const locales = getLocales()

        return (
            <Layout
                header={header}
                footer={footer}
                settings={settings}
                locales={locales}
            >
                <CelebrityClient />
            </Layout>
        )
    } catch (error) {
        console.error("Failed to load Celebrity page data:", error)
        return <div>Error loading page.</div>
    }
}
