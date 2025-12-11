import React, { createContext, useState, useContext } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DISPLAY SETTINGS CONTEXT - Gestion des paramètres d'affichage
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Ce Context gère tous les paramètres d'affichage de l'application:
 * - Taille du texte (fontSize)
 * - Couleur du thème (color)
 * - Mode d'affichage (mode: grid/list)
 * - Visibilité des éléments (showImages, showDescriptions)
 * - Langue de l'interface (language)
 * 
 * POURQUOI UTILISER LE CONTEXT POUR LES PARAMÈTRES?
 * ✅ Centralisation: Un seul endroit pour tous les paramètres
 * ✅ Synchronisation: Tous les composants utilisent les mêmes valeurs
 * ✅ Persistance: On peut facilement sauvegarder dans localStorage
 * ✅ Simplicité: Pas besoin de passer les props partout
 */

// ÉTAPE 1: Créer le Context
const DisplaySettingsContext = createContext();

/**
 * ÉTAPE 2: Hook personnalisé pour faciliter l'accès
 * Permet d'utiliser simplement: const { fontSize, setFontSize } = useDisplaySettings()
 */
export const useDisplaySettings = () => {
  const context = useContext(DisplaySettingsContext);
  if (!context) {
    throw new Error('useDisplaySettings doit être utilisé dans DisplaySettingsProvider');
  }
  return context;
};

/**
 * ÉTAPE 3: Créer le Provider avec tous les paramètres
 * 
 * Ce Provider gère PLUSIEURS états indépendants
 * Chaque paramètre a son propre useState()
 */
export const DisplaySettingsProvider = ({ children }) => {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTATS DES PARAMÈTRES D'AFFICHAGE
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * PARAMÈTRE 1: Taille du texte
   * Valeurs possibles: 'small' | 'medium' | 'large'
   * Valeur par défaut: 'medium'
   */
  const [fontSize, setFontSize] = useState('medium');
  
  /**
   * PARAMÈTRE 2: Couleur du thème
   * Valeurs possibles: 'blue' | 'green' | 'purple' | 'orange'
   * Valeur par défaut: 'blue'
   */
  const [themeColor, setThemeColor] = useState('blue');
  
  /**
   * PARAMÈTRE 3: Mode d'affichage
   * Valeurs possibles: 'grid' | 'list'
   * Valeur par défaut: 'grid'
   */
  const [displayMode, setDisplayMode] = useState('grid');
  
  /**
   * PARAMÈTRE 4: Afficher les images
   * Valeurs possibles: true | false
   * Valeur par défaut: true
   */
  const [showImages, setShowImages] = useState(true);
  
  /**
   * PARAMÈTRE 5: Afficher les descriptions
   * Valeurs possibles: true | false
   * Valeur par défaut: true
   */
  const [showDescriptions, setShowDescriptions] = useState(true);
  
  /**
   * PARAMÈTRE 6: Langue de l'interface
   * Valeurs possibles: 'fr' | 'en' | 'es'
   * Valeur par défaut: 'fr'
   */
  const [language, setLanguage] = useState('fr');

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION DES TAILLES DE TEXTE
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Mapping des tailles de texte
   * Permet de convertir 'small' -> '14px', 'medium' -> '16px', etc.
   */
  const fontSizeMap = {
    small: { value: '14px', label: 'Petit' },
    medium: { value: '16px', label: 'Moyen' },
    large: { value: '20px', label: 'Grand' }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION DES COULEURS DE THÈME
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Mapping des couleurs de thème
   * Chaque thème contient: couleur primaire, fond, texte
   */
  const themeColorMap = {
    blue: { primary: '#2196F3', background: '#E3F2FD', text: '#1565C0' },
    green: { primary: '#4CAF50', background: '#E8F5E9', text: '#2E7D32' },
    purple: { primary: '#9C27B0', background: '#F3E5F5', text: '#6A1B9A' },
    orange: { primary: '#FF9800', background: '#FFF3E0', text: '#E65100' }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // TRADUCTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Textes traduits en plusieurs langues
   * Permet de changer la langue de l'interface facilement
   */
  const translations = {
    fr: {
      title: 'Paramètres d\'Affichage',
      fontSize: 'Taille du texte',
      color: 'Couleur du thème',
      mode: 'Mode d\'affichage',
      images: 'Afficher les images',
      descriptions: 'Afficher les descriptions',
      language: 'Langue',
      reset: 'Réinitialiser'
    },
    en: {
      title: 'Display Settings',
      fontSize: 'Text size',
      color: 'Theme color',
      mode: 'Display mode',
      images: 'Show images',
      descriptions: 'Show descriptions',
      language: 'Language',
      reset: 'Reset'
    },
    es: {
      title: 'Configuración de Pantalla',
      fontSize: 'Tamaño del texto',
      color: 'Color del tema',
      mode: 'Modo de visualización',
      images: 'Mostrar imágenes',
      descriptions: 'Mostrar descripciones',
      language: 'Idioma',
      reset: 'Restablecer'
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTION: Réinitialiser tous les paramètres
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Remet tous les paramètres à leur valeur par défaut
   * 
   * CHANGEMENT D'ÉTAT MULTIPLE:
   * Cette fonction appelle plusieurs setX() à la suite
   * Chaque appel déclenche un changement d'état
   * React optimise et regroupe les re-renders (batching)
   * 
   * Résultat: Un seul re-render au lieu de 6!
   */
  const resetSettings = () => {
    console.log('🔄 resetSettings() - Réinitialisation de tous les paramètres');
    setFontSize('medium');
    setThemeColor('blue');
    setDisplayMode('grid');
    setShowImages(true);
    setShowDescriptions(true);
    setLanguage('fr');
    console.log('✅ Paramètres réinitialisés avec succès');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // FONCTION: Obtenir les valeurs actuelles formatées
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Retourne un objet avec les valeurs actuelles formatées
   * Utile pour l'affichage ou la sauvegarde
   */
  const getCurrentSettings = () => {
    return {
      fontSize: fontSizeMap[fontSize],
      themeColor: themeColorMap[themeColor],
      displayMode,
      showImages,
      showDescriptions,
      language,
      translations: translations[language]
    };
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // VALEUR DU CONTEXT (API publique)
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Cet objet contient TOUT ce qui sera accessible aux composants
   * 
   * Organisation:
   * 1. États bruts (fontSize, themeColor, etc.)
   * 2. Fonctions de modification (setFontSize, setThemeColor, etc.)
   * 3. Données configurées (fontSizeMap, themeColorMap, etc.)
   * 4. Fonctions utilitaires (resetSettings, getCurrentSettings)
   * 5. Traductions
   * 
   * IMPORTANT: Chaque composant peut accéder à tout cela!
   * Mais généralement, chaque composant prend seulement ce dont il a besoin
   */
  const value = {
    // États
    fontSize,
    themeColor,
    displayMode,
    showImages,
    showDescriptions,
    language,
    
    // Setters (fonctions pour changer les états)
    setFontSize,
    setThemeColor,
    setDisplayMode,
    setShowImages,
    setShowDescriptions,
    setLanguage,
    
    // Configurations
    fontSizeMap,
    themeColorMap,
    translations: translations[language],
    
    // Fonctions utilitaires
    resetSettings,
    getCurrentSettings
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RETOUR DU PROVIDER
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Le Provider enveloppe les composants enfants
   * et leur donne accès à tous les paramètres via value
   * 
   * FLUX DE DONNÉES:
   * 1. Un composant appelle setFontSize('large')
   * 2. L'état fontSize change de 'medium' à 'large'
   * 3. Le Provider se re-render avec la nouvelle value
   * 4. Tous les composants qui utilisent fontSize se re-render
   * 5. L'UI affiche la nouvelle taille de texte partout!
   */
  return (
    <DisplaySettingsContext.Provider value={value}>
      {children}
    </DisplaySettingsContext.Provider>
  );
};
