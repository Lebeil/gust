import { Layout } from "@/components/Layout"
import { workData } from "@/data/content"
import WorkGrid from "@/components/WorkGrid"

export async function generateMetadata() {
  return {
    title: "Our Work - Gust",
    description: "Discover our portfolio of stop-scrolling campaigns and creative projects.",
  }
}

export default function WorkPage() {
  return (
    <Layout>
      <div className="pt-24 px-4 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
          Our Work
        </h1>
        <WorkGrid projects={workData.projects} />
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