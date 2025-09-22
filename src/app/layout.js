import Script from "next/script"
import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from "@/prismicio"
import './globals.css'
 
export default function RootLayout({ children, settings }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html>
      <head>
        <Script
          id="gtm-head"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[] 
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'})
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'' 
              j.async=true
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl
              f.parentNode.insertBefore(j,f)
            })(window,document,'script','dataLayer','${gtmId}')
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <PrismicPreview repositoryName={repositoryName} />
        {children}
      </body>
    </html>
  )
}