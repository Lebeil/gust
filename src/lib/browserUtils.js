/**
 * Utilitaires pour la détection du navigateur et les correctifs de compatibilité
 */

export const detectSafari = () => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  return /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
};

export const detectWebKit = () => {
  if (typeof window === 'undefined') return false;
  
  return /WebKit/.test(window.navigator.userAgent);
};

export const getSafariVersion = () => {
  if (typeof window === 'undefined') return null;
  
  const userAgent = window.navigator.userAgent;
  const match = userAgent.match(/Version\/(\d+(?:\.\d+)*)/);
  return match ? parseFloat(match[1]) : null;
};

/**
 * Applique des styles de compatibilité Safari
 */
export const getSafariCompatibleStyles = (baseStyles = {}) => {
  const isSafari = detectSafari();
  
  if (!isSafari) return baseStyles;
  
  // Correctifs spécifiques pour Safari
  const safariStyles = { ...baseStyles };
  
  // Problème: backdrop-filter peut ne pas fonctionner correctement
  if (safariStyles.backdropFilter) {
    safariStyles.WebkitBackdropFilter = safariStyles.backdropFilter;
  }
  
  // Problème: will-change peut causer des glitches
  if (safariStyles.willChange) {
    // Réduire la complexité des will-change
    if (safariStyles.willChange.includes('transform')) {
      safariStyles.willChange = 'transform';
    }
  }
  
  // Problème: mask peut ne pas être supporté
  if (safariStyles.maskImage || safariStyles.WebkitMaskImage) {
    // Désactiver les masks sur Safari < 15.4
    const version = getSafariVersion();
    if (version && version < 15.4) {
      delete safariStyles.maskImage;
      delete safariStyles.WebkitMaskImage;
      delete safariStyles.maskRepeat;
      delete safariStyles.WebkitMaskRepeat;
      delete safariStyles.maskSize;
      delete safariStyles.WebkitMaskSize;
    }
  }
  
  return safariStyles;
};

/**
 * Hook pour détecter si on est sur Safari
 */
export const useSafariDetection = () => {
  if (typeof window === 'undefined') return false;
  
  return detectSafari();
};
