import * as prismic from "@prismicio/client"
import { createClient } from "@/prismicio"
import { SliceZone } from "@prismicio/react"
import { components } from "@/slices"
import { Layout } from "@/components/Layout"
import { getLocales } from "@/lib/getLocales"

export async function generateMetadata({ params: { uid, lang } }) {
    const client = createClient()
    const work = await client.getByUID("work", uid, { lang })
    const settings = await client.getSingle("settings", { lang })
    const seo = work.data

    return {
        title: seo?.meta_title || prismic.asText(seo.title),
        description: seo?.meta_description || "",
        keywords: seo?.meta_keywords || "",
        openGraph: {
            title: seo?.meta_title || prismic.asText(seo.title),
            description: seo?.meta_description || "",
            images: [
                {
                    url: settings.data.favicon?.url || "/default-og-image.jpg",
                },
            ],
        },
        scripts: [
            {
                src: "https://static.cdn.prismic.io/prismic.js?new=true&repo=gustv2",
                async: true,
                defer: true,
            },
        ],
    }
}

export default async function Page({ params }) {
    const { lang } = await params
    const client = createClient()
    const work = await client.getByUID("work", params.uid, { lang })
    const header = await client.getSingle("header", { lang })
    const footer = await client.getSingle("footer", { lang })
    const settings = await client.getSingle("settings", { lang })
    const locales = await getLocales(work, client)
    const resultsData = work.data.slices.filter(slice => slice.slice_type === "results")

    return (
        <Layout
            header={header}
            footer={footer}
            settings={settings}
            locales={locales}
        >
            <SliceZone slices={work.data.slices} components={components} resultsData={resultsData} />
        </Layout>
    )
}

export async function generateStaticParams() {
    const client = createClient()

    const pages = await client.getAllByType("work", {
        lang: "*",
        filters: [prismic.filter.not("my.page.uid", "work")],
    })

    return pages.map((page) => {
        return {
            uid: page.uid,
            lang: page.lang,
        }
    })
}