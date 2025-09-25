"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./CinematicFooter.module.css";

/**
 * Footer Cinématographique - Format Letterbox
 * Design ultra-allégé pour l'effet cinéma
 */
export default function CinematicFooter() {
  return (
    <footer className={styles.cinematicFooter}>
      <div className={styles.whiteOverlay} />
      <div className={styles.edgeBlend} />
      <div className={styles.topFade} />
      <div className={styles.footerContainer}>
        <div className={styles.grid}>
          {/* Colonne 1: Logo + baseline */}
          <div className={styles.brandCol}>
            <div className={styles.brandLogoWrap}>
              <Image src="/images/footer-logo.png" alt="Gust" width={120} height={120} className={styles.brandLogo} />
            </div>
            <p className={styles.baseline}>L’agence du Stop-Scroll.</p>
          </div>

          {/* Colonne 2: Coordonnées */}
          <div>
            <h4 className={styles.colTitle}>Coordonnées</h4>
            <address className={styles.addr}>
            58 rue de Monceau <br />
              75008 Paris<br />
              <a href="tel:+33659964366" className={styles.linkMuted}>06 59 96 43 66</a><br />
              <a href="mailto:contact@agencegust.com" className={styles.linkMuted}>contact@agencegust.com</a>
            </address>
          </div>

          {/* Colonne 3: Pages */}
          <div>
            <h4 className={styles.colTitle}>Pages</h4>
            <ul className={styles.linkList}>
              <li><Link href="/mentions-legales" className={styles.linkMuted}>Mentions Légales</Link></li>
              <li><Link href="/mentions-legales" className={styles.linkMuted}>Politique de confidentialité</Link></li>
              <li><Link href="/nous-rejoindre" className={styles.linkMuted}>Nous rejoindre</Link></li>
              <li><Link href="/blog" className={styles.linkMuted}>Blog</Link></li>
            </ul>
          </div>

          {/* Colonne 4: Social Medias */}
          <div>
            <h4 className={styles.colTitle}>Social Medias</h4>
            <ul className={styles.linkList}>
              <li><a className={styles.linkMuted} href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className={styles.linkMuted} href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><Link href="/contact" className={styles.linkMuted}>News</Link></li>
              <li><a className={styles.linkMuted} href="mailto:contact@agencegust.com">Mail</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.legalRow}>Gust 2025 © – tout droits réservés</div>
      </div>
    </footer>
  );
}