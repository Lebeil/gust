"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('navLight');
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

  // Détection du thème selon la section
  useEffect(() => {
    const NAVBAR_HEIGHT = Math.max(56, Math.floor(window.innerHeight * 0.05));

    const computeTheme = () => {
      const sections = document.querySelectorAll('[data-nav-contrast]');
      if (!sections.length) return;
      const y = window.scrollY + NAVBAR_HEIGHT + 1;
      
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + el.offsetHeight;
        if (y >= top && y < bottom) {
          const attr = el.getAttribute('data-nav-contrast');
          setTheme(attr === 'dark' ? 'navDark' : 'navLight');
          return;
        }
      }
    };

    computeTheme();
    window.addEventListener('scroll', computeTheme, { passive: true });
    window.addEventListener('resize', computeTheme);
    return () => {
      window.removeEventListener('scroll', computeTheme);
      window.removeEventListener('resize', computeTheme);
    };
  }, []);

  return (
    <nav className={`${styles.cinematicNavbar} ${styles[theme]}`}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src={logoGust}
            alt="Gust"
            width={56}
            height={17}
            className={styles.logo}
            priority
            fetchPriority="high"
          />
        </Link>
      </div>

      {/* Navigation Desktop */}
      <div className={styles.desktopMenu}>
        {navLinks.map((link) => (
          <div key={link.href} className={styles.navItem}>
            {link.isDropdown ? (
              <>
                <span className={styles.navLink}>
                  <span className={styles.navLinkInner}>
                    {link.label}
                    <svg
                      className={styles.chevronDown}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                
                <div className={styles.dropdownPanel}>
                  {link.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={styles.dropdownItem}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link href={link.href} className={styles.navLink}>
                <span className={styles.navLinkInner}>
                  {link.label}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Section droite : EN + Horloge */}
      <div className={styles.rightSection}>
        <div className={styles.languageSelector}>
          EN
        </div>
        <div className={styles.digitalClock}>
          {currentTime}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span className={mobileMenuOpen ? styles.menuIconOpen : styles.menuIcon}>☰</span>
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileDropdown}>
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
              {link.isDropdown && link.subItems.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={styles.mobileLink}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ paddingLeft: '2rem', fontSize: '0.8rem' }}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}