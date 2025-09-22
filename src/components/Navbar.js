"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import logoGust from "../../public/images/logo.avif";

const navLinks = [
  { 
    href: "/nos-offres", 
    label: "OFFRES", 
    isDropdown: true,
    subItems: [
      { href: "/influence", label: "Influence" },
      { href: "/celebrity", label: "Celebrity" },
      { href: "/production", label: "Production" },
      { href: "/social-media", label: "Social Media" },
      { href: "/ugc", label: "UGC" }
    ]
  },
  { href: "/work", label: "CASE STUDIES" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Horloge numérique temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}.${milliseconds}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, []);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownToggle = (href, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === href ? null : href);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <Link href="/" className="navbar__logo-link">
          <Image
            src={logoGust}
            alt="Gust"
            width={56}
            height={17}
            priority
            fetchPriority="high"
          />
        </Link>
      </div>

      {/* Navigation Desktop */}
      <div className="navbar__menu">
        {navLinks.map((link) => (
          <div key={link.href} className="navbar__item">
            {link.isDropdown ? (
              <>
                <button
                  className={`navbar__link ${pathname.startsWith(link.href) ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleDropdownToggle(link.href, e)}
                  aria-expanded={activeDropdown === link.href}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg
                    className={`navbar__chevron ${activeDropdown === link.href ? 'navbar__chevron--open' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </button>
                
                {/* Dropdown */}
                <div className={`navbar__dropdown ${activeDropdown === link.href ? 'navbar__dropdown--open' : ''}`}>
                  {link.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`navbar__dropdown-item ${pathname === subItem.href ? 'navbar__dropdown-item--active' : ''}`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                href={link.href}
                className={`navbar__link ${pathname === link.href ? 'navbar__link--active' : ''}`}
              >
                  {link.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Section droite : EN + Horloge */}
      <div className="navbar__right">
        <button className="navbar__lang" aria-label="Changer de langue">
          EN
        </button>
        <div className="navbar__time">
          {currentTime}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="navbar__mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={mobileMenuOpen}
      >
        <span className={`navbar__hamburger ${mobileMenuOpen ? 'navbar__hamburger--open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-content">
          {navLinks.map((link) => (
            <div key={link.href} className="navbar__mobile-item">
            <Link 
              href={link.href} 
                className="navbar__mobile-link"
                onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
              {link.isDropdown && (
                <div className="navbar__mobile-sub">
                  {link.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="navbar__mobile-sub-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay pour mobile */}
      {mobileMenuOpen && (
        <div 
          className="navbar__overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 3rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar__logo {
          flex-shrink: 0;
          z-index: 1001;
        }

        .navbar__logo-link {
          display: block;
          transition: opacity 0.3s ease;
        }

        .navbar__logo-link:hover {
          opacity: 0.8;
        }

        .navbar__menu {
          display: none;
          align-items: center;
          gap: 3rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .navbar__item {
          position: relative;
        }

        .navbar__link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
          font-family: "Avenir Next", sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .navbar__link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .navbar__link--active {
          color: #60A5FA;
        }

        .navbar__chevron {
          transition: transform 0.3s ease;
        }

        .navbar__chevron--open {
          transform: rotate(180deg);
        }

        .navbar__dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 0.5rem;
        }

        .navbar__dropdown--open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .navbar__dropdown-item {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-family: "Avenir Next", sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          margin-bottom: 0.25rem;
        }

        .navbar__dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .navbar__dropdown-item--active {
          color: #60A5FA;
          background: rgba(96, 165, 250, 0.1);
        }

        .navbar__right {
          display: none;
          align-items: center;
          gap: 2rem;
          flex-shrink: 0;
        }

        .navbar__lang {
          color: white;
          background: none;
          border: none;
          font-family: "Avenir Next", sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .navbar__lang:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar__time {
          color: rgba(255, 255, 255, 0.8);
          font-family: "Avenir Next", monospace;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          user-select: none;
        }

        .navbar__mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
        }

        .navbar__hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: transform 0.3s ease;
        }

        .navbar__hamburger span {
          width: 20px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .navbar__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
        }

        .navbar__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .navbar__mobile {
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.98);
          backdrop-filter: blur(20px);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
        }

        .navbar__mobile--open {
          transform: translateX(0);
        }

        .navbar__mobile-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          gap: 2rem;
          padding: 2rem;
        }

        .navbar__mobile-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .navbar__mobile-link {
          color: white;
          text-decoration: none;
          font-family: "Avenir Next", sans-serif;
          font-weight: 600;
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          text-align: center;
        }

        .navbar__mobile-link:hover {
          color: #60A5FA;
        }

        .navbar__mobile-sub {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .navbar__mobile-sub-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-family: "Avenir Next", sans-serif;
          font-weight: 400;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .navbar__mobile-sub-link:hover {
          color: white;
        }

        .navbar__overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        /* Responsive */
        @media (min-width: 1024px) {
          .navbar__menu {
            display: flex;
          }
          
          .navbar__right {
            display: flex;
          }
          
          .navbar__mobile-toggle {
            display: none;
          }
        }

        @media (max-width: 1023px) {
          .navbar {
            padding: 1rem 2rem;
          }
        }

        /* Animations et micro-interactions */
        .navbar__item:hover .navbar__dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* États focus pour l'accessibilité */
        .navbar__link:focus,
        .navbar__lang:focus,
        .navbar__mobile-toggle:focus {
          outline: 2px solid #60A5FA;
          outline-offset: 2px;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </nav>
  );
} 