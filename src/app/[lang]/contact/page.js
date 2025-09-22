import * as prismic from "@prismicio/client"
import { createClient } from "@/prismicio"
import { SliceZone } from "@prismicio/react"
import { Layout } from "@/components/Layout"
import { components } from "@/slices"
import { getLocales } from "@/lib/getLocales"

export async function generateMetadata({ params }) {
    const { lang } = params
    const client = createClient()
    const page = await client.getByUID("page", "contact", { lang })
    const settings = await client.getSingle("settings", { lang })
    const seo = page.data

    return {
        title: seo?.meta_title || prismic.asText(page.data.title),
        description: seo?.meta_description || "",
        keywords: seo?.meta_keywords || "",
        openGraph: {
            title: seo?.meta_title || prismic.asText(page.data.title),
            description: seo?.meta_description || "",
            images: [
                {
                    url: settings.data.favicon.url,
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
    const page = await client.getByUID("page", "contact", { lang })
    const header = await client.getSingle("header", { lang })
    const footer = await client.getSingle("footer", { lang })
    const settings = await client.getSingle("settings", { lang })
    const locales = await getLocales(page, client)
    const isContactPage = true


    return (
        <Layout
            header={header}
            footer={footer}
            settings={settings}
            locales={locales}
            isContactPage={isContactPage}
        >
            <SliceZone slices={page.data.slices} components={components} />
        </Layout>
    )
}

export async function generateStaticParams() {
    const client = createClient()

    const pages = await client.getAllByType("page", {
        lang: "*",
        filters: [prismic.filter.at("my.page.uid", "contact")],
    })

    return pages.map((page) => {
        return {
            page: page,
            lang: page.lang
        }
    })
}