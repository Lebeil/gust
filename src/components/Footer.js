"use client"
import Link from "next/link"

export function Footer({ content, pageType }) {
  if (!content) return null

  return (
    <footer className="relative z-10 px-4 py-8 md:px-12 md:py-12 bg-black/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-sm text-white/60">
          {content.copyright}
        </p>
        
        <nav className="flex gap-6">
          {content.links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}