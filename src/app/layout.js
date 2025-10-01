import "./globals.css"

import { Layout } from "@/components/Layout"
import { HeroStateProvider } from "@/context/HeroStateContext"

export const metadata = {
  title: "Gust - We create stop-scrollers",
  description: "Creative agency specialized in attention-grabbing campaigns and stop-scrolling content.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="font-avenir-next font-regular" suppressHydrationWarning={true}>
        <HeroStateProvider>
          <Layout>{children}</Layout>
        </HeroStateProvider>
      </body>
    </html>
  )
}