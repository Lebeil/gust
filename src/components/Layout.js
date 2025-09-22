"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { BottomBar } from "./BottomBar"
import ScrollingBackgroundShaderPage from "./scrollingBackgroundGradient/ScrollingBackgroundGradientPage"
import { Leva } from 'leva'
import Template from "./Template"
import FadeObserver from "./FadeObserver"

export function Layout({
  locales,
  page_type,
  header,
  footer,
  settings,
  children,
  maintenance,
}) {
  const pathname = usePathname()
  const pageType = pathname.split('/')[1]
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLang = pathSegments.length === 0 ? "fr-fr" : pathSegments[0]
  const faviconUrl = settings?.data?.favicon?.url

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {faviconUrl ? (
        <link rel="icon" href={faviconUrl} type="image/png" />
      ) : (
        <link rel="icon" href="/favicon.ico" type="image/png" />
      )}

      <Leva hidden/>
      <ScrollingBackgroundShaderPage />
      <FadeObserver />

      <Header
        page_type={page_type}
        pageType={pageType}
        header={header}
        footer={footer}
        settings={settings}
        locales={locales}
      />
      <Template>

        <div className="relative w-full h-full">
          <main
            className={`${pageType ? `main ${pageType}` : ""
              } ${pageType === "contact" ? "h-screen" : ""} ${pageType === "work" || pageType === "contact" ? "pt-[var(--tw-64)]" : ""
              }`}
              lang={currentLang}
          >
            {children}
          </main>
        </div>

      </Template>
      <BottomBar locales={locales} />
      <Footer footer={footer} settings={settings} pageType={pageType} />
    </>
  )
}