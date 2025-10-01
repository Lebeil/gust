import CelebrityClient from "./CelebrityClient"
import { getSettings, getLocales } from "@/lib/dataLoader"

export async function generateMetadata() {
    return {
        title: "Celebrity Marketing - Gust",
        description: "Une visibilité maximale grâce aux célébrités. Nous connectons votre marque avec des personnalités reconnues pour générer un impact fort, crédible et immédiat.",
    }
}

export default async function Page() {
    try {
        getSettings({})
        getLocales()

        return <CelebrityClient />
    } catch (error) {
        console.error("Failed to load Celebrity page data:", error)
        return <div>Error loading page.</div>
    }
}
