import pagesData from '@/data/pages.json';
import settingsData from '@/data/settings.json';

/**
 * Simule les fonctions de récupération de données Prismic avec des données locales
 */

// Fonction utilitaire pour normaliser les codes de langue
const normalizeLang = (lang) => {
  if (!lang) return 'fr';
  
  // Mapper les codes de langue vers nos données disponibles
  const langMap = {
    'fr': 'fr',
    'fr-fr': 'fr-fr',
    'en': 'en-us',
    'en-us': 'en-us',
    'favicon.ico': 'fr' // Fallback pour les erreurs de parsing
  };
  
  return langMap[lang] || 'fr';
};

// Fonction utilitaire pour obtenir des données avec fallback
const getDataWithFallback = (data, lang, fallbackLang = 'fr') => {
  const normalizedLang = normalizeLang(lang);
  
  // Essayer la langue demandée
  if (data[normalizedLang]) {
    return data[normalizedLang];
  }
  
  // Essayer le fallback
  if (data[fallbackLang]) {
    return data[fallbackLang];
  }
  
  // Retourner la première langue disponible
  const availableLangs = Object.keys(data);
  if (availableLangs.length > 0) {
    return data[availableLangs[0]];
  }
  
  return null;
};

export const getPageByUID = (type, uid, options = {}) => {
  const lang = options.lang || 'fr';
  
  if (type === 'page' && pagesData[uid]) {
    const pageData = getDataWithFallback(pagesData[uid], lang);
    
    if (pageData) {
      return {
        data: pageData,
        lang: normalizeLang(lang),
        type: 'page',
        uid
      };
    }
  }
  
  throw new Error(`Page not found: ${type}/${uid} for lang ${lang}`);
};

export const getSettings = (options = {}) => {
  const lang = options.lang || 'fr';
  
  const settingsDataForLang = getDataWithFallback(settingsData, lang);
  
  if (settingsDataForLang) {
    return {
      data: settingsDataForLang,
      lang: normalizeLang(lang),
      type: 'settings'
    };
  }
  
  throw new Error(`Settings not found for lang ${lang}`);
};

export const getHeader = (options = {}) => {
  const lang = options.lang || 'fr';
  const settings = getSettings({ lang });
  
  return {
    data: settings.data.header,
    lang: normalizeLang(lang),
    type: 'header'
  };
};

export const getFooter = (options = {}) => {
  const lang = options.lang || 'fr';
  const settings = getSettings({ lang });
  
  return {
    data: settings.data.footer,
    lang: normalizeLang(lang),
    type: 'footer'
  };
};

export const getLocales = () => {
  try {
    // Vérifier que les données sont disponibles
    if (!pagesData || !pagesData.home || !settingsData) {
      console.warn("Data not available, using fallback locales");
      return [
        { id: 'fr', name: 'Français', lang_name: 'Français' },
        { id: 'fr-fr', name: 'Français', lang_name: 'Français' },
        { id: 'en-us', name: 'English', lang_name: 'English' }
      ];
    }

    // Retourne les langues disponibles basées sur les données réelles
    const availablePageLangs = Object.keys(pagesData.home || {});
    const availableSettingsLangs = Object.keys(settingsData || {});
    
    // Intersection des langues disponibles
    const availableLangs = availablePageLangs.filter(lang => 
      availableSettingsLangs.includes(lang)
    );
    
    if (availableLangs.length === 0) {
      // Fallback si aucune langue n'est trouvée
      return [
        { id: 'fr', name: 'Français', lang_name: 'Français' }
      ];
    }
    
    return availableLangs.map(langId => ({
      id: langId,
      name: langId === 'fr' || langId === 'fr-fr' ? 'Français' : 'English',
      lang_name: langId === 'fr' || langId === 'fr-fr' ? 'Français' : 'English'
    }));
  } catch (error) {
    console.error("Error in getLocales:", error);
    // Fallback en cas d'erreur
    return [
      { id: 'fr', name: 'Français', lang_name: 'Français' }
    ];
  }
};

/**
 * Fonction utilitaire pour convertir du texte riche
 */
export const asText = (richText) => {
  if (typeof richText === 'string') return richText;
  if (Array.isArray(richText)) {
    return richText.map(item => item.text || '').join(' ');
  }
  return richText?.text || '';
}; 