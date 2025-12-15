import React from 'react';
import { useDisplaySettings } from '../DisplaySettingsContext';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPOSANT: SettingsPanel
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Panneau de contrôle pour MODIFIER les paramètres d'affichage
 * 
 * Ce composant:
 * - Lit les valeurs actuelles (fontSize, themeColor, etc.)
 * - Fournit des contrôles (boutons, select, checkbox) pour les modifier
 * - Appelle les setters (setFontSize, setThemeColor, etc.) pour changer l'état
 * 
 * CHANGEMENT D'ÉTAT:
 * Quand un utilisateur change un paramètre ici, TOUS les autres composants
 * qui utilisent ce paramètre se mettent à jour automatiquement!
 */
const SettingsPanel = () => {
  
  /**
   * RÉCUPÉRATION DES PARAMÈTRES ET FONCTIONS
   * 
   * On destructure pour extraire:
   * - Les valeurs actuelles (fontSize, themeColor, etc.)
   * - Les fonctions pour les modifier (setFontSize, etc.)
   * - Les configurations (fontSizeMap pour les labels)
   * - Les traductions
   * - Les fonctions utilitaires (resetSettings)
   * 
   * ABONNEMENT AUTOMATIQUE:
   * En appelant useDisplaySettings(), ce composant s'abonne au Context
   * Si N'IMPORTE QUEL paramètre change, ce composant se re-render
   */
  const {
    fontSize,
    setFontSize,
    themeColor,
    setThemeColor,
    displayMode,
    setDisplayMode,
    showImages,
    setShowImages,
    showDescriptions,
    setShowDescriptions,
    language,
    setLanguage,
    fontSizeMap,
    translations,
    resetSettings
  } = useDisplaySettings();

  return (
    <div style={styles.panel}>
      <h2>⚙️ {translations.title}</h2>
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: TAILLE DU TEXTE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      
      <div style={styles.setting}>
        <label style={styles.label}>📏 {translations.fontSize}</label>
        <div style={styles.buttonGroup}>
          {/* 
            BOUTONS RADIO POUR LA TAILLE
            ═══════════════════════════════════════════════════════════════
            
            Object.entries(fontSizeMap) retourne un tableau:
            [['small', {...}], ['medium', {...}], ['large', {...}]]
            
            Pour chaque taille:
            1. On crée un bouton
            2. Si fontSize === size, le bouton est actif
            3. Au clic: setFontSize(size) change l'état
            4. Le Provider se met à jour
            5. TOUS les composants utilisant fontSize se re-render
            6. La taille du texte change partout!
          */}
          {Object.entries(fontSizeMap).map(([size, config]) => (
            <button
              key={size}
              onClick={() => {
                console.log(`📏 Changement de taille: ${fontSize} → ${size}`);
                setFontSize(size);
              }}
              style={{
                ...styles.button,
                backgroundColor: fontSize === size ? '#4CAF50' : '#e0e0e0',
                color: fontSize === size ? 'white' : '#333'
              }}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: COULEUR DU THÈME */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      
      <div style={styles.setting}>
        <label style={styles.label}>🎨 {translations.color}</label>
        <div style={styles.colorGrid}>
          {/* 
            SÉLECTION DE COULEUR
            ═══════════════════════════════════════════════════════════════
            
            Pour chaque couleur disponible:
            1. On affiche un carré coloré
            2. Si themeColor === color, on ajoute une bordure
            3. Au clic: setThemeColor(color) change l'état
            4. Tous les composants utilisant themeColor se re-render
            5. Les couleurs changent partout dans l'app!
          */}
          {['blue', 'green', 'purple', 'orange'].map(color => (
            <div
              key={color}
              onClick={() => {
                console.log(`🎨 Changement de couleur: ${themeColor} → ${color}`);
                setThemeColor(color);
              }}
              style={{
                ...styles.colorBox,
                backgroundColor: color,
                border: themeColor === color ? '4px solid #333' : '2px solid #ccc',
                transform: themeColor === color ? 'scale(1.1)' : 'scale(1)'
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: MODE D'AFFICHAGE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      
      <div style={styles.setting}>
        <label style={styles.label}>📱 {translations.mode}</label>
        <div style={styles.buttonGroup}>
          {/* 
            BASCULER ENTRE GRID ET LIST
            ═══════════════════════════════════════════════════════════════
            
            onClick: setDisplayMode('grid') ou setDisplayMode('list')
            
            EFFET:
            1. L'état displayMode change
            2. Le composant ContentDisplay (qui lit displayMode) se re-render
            3. L'affichage passe de grille à liste (ou inversement)
            
            Pas besoin de props! Le Context fait tout! ✨
          */}
          <button
            onClick={() => {
              console.log(`📱 Mode: ${displayMode} → grid`);
              setDisplayMode('grid');
            }}
            style={{
              ...styles.button,
              backgroundColor: displayMode === 'grid' ? '#2196F3' : '#e0e0e0',
              color: displayMode === 'grid' ? 'white' : '#333'
            }}
          >
            🔲 Grille
          </button>
          <button
            onClick={() => {
              console.log(`📱 Mode: ${displayMode} → list`);
              setDisplayMode('list');
            }}
            style={{
              ...styles.button,
              backgroundColor: displayMode === 'list' ? '#2196F3' : '#e0e0e0',
              color: displayMode === 'list' ? 'white' : '#333'
            }}
          >
            📋 Liste
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: VISIBILITÉ (CHECKBOXES) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      
      <div style={styles.setting}>
        <label style={styles.label}>👁️ Visibilité</label>
        
        {/* 
          CHECKBOX POUR AFFICHER/MASQUER LES IMAGES
          ═══════════════════════════════════════════════════════════════
          
          onChange: setShowImages(!showImages)
          
          FONCTIONNEMENT:
          1. Si showImages = true, !showImages = false (et inversement)
          2. setShowImages(false) change l'état
          3. ContentDisplay lit showImages et masque les images
          
          C'est un toggle (basculer) entre true et false
        */}
        <div style={styles.checkbox}>
          <input
            type="checkbox"
            id="showImages"
            checked={showImages}
            onChange={(e) => {
              console.log(`👁️ Images: ${showImages} → ${e.target.checked}`);
              setShowImages(e.target.checked);
            }}
          />
          <label htmlFor="showImages">🖼️ {translations.images}</label>
        </div>

        {/* CHECKBOX POUR AFFICHER/MASQUER LES DESCRIPTIONS */}
        <div style={styles.checkbox}>
          <input
            type="checkbox"
            id="showDescriptions"
            checked={showDescriptions}
            onChange={(e) => {
              console.log(`👁️ Descriptions: ${showDescriptions} → ${e.target.checked}`);
              setShowDescriptions(e.target.checked);
            }}
          />
          <label htmlFor="showDescriptions">📝 {translations.descriptions}</label>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: LANGUE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      
      <div style={styles.setting}>
        <label style={styles.label}>🌍 {translations.language}</label>
        {/* 
          SELECT POUR CHANGER LA LANGUE
          ═══════════════════════════════════════════════════════════════
          
          onChange: setLanguage(e.target.value)
          
          EFFET EN CASCADE:
          1. language change (ex: 'fr' → 'en')
          2. translations change automatiquement (recalculé dans le Provider)
          3. TOUS les textes de l'app se mettent à jour
          4. Même SettingsPanel se re-render avec les nouveaux labels!
          
          C'est l'internationalisation (i18n) avec Context! 🌍
        */}
        <select
          value={language}
          onChange={(e) => {
            console.log(`🌍 Langue: ${language} → ${e.target.value}`);
            setLanguage(e.target.value);
          }}
          style={styles.select}
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BOUTON RESET */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      
      {/* 
        RÉINITIALISER TOUS LES PARAMÈTRES
        ═══════════════════════════════════════════════════════════════════
        
        resetSettings() appelle 6 setX() à la suite
        
        BATCHING (regroupement):
        React est intelligent et regroupe ces 6 changements d'état
        Résultat: UN SEUL re-render au lieu de 6!
        
        C'est une optimisation automatique de React ⚡
      */}
      <button onClick={resetSettings} style={styles.resetButton}>
        🔄 {translations.reset}
      </button>

      {/* Note explicative */}
      <p style={styles.note}>
        💡 <strong>Observez:</strong> Quand vous changez un paramètre ici,
        le composant d'affichage ci-dessous se met à jour automatiquement!
        <br /><br />
        📊 Ouvrez la console (F12) pour voir les logs des changements
      </p>
    </div>
  );
};

const styles = {
  panel: {
    border: '3px solid #2196F3',
    borderRadius: '12px',
    padding: '25px',
    margin: '10px',
    backgroundColor: '#f0f8ff'
  },
  setting: {
    marginBottom: '25px',
    paddingBottom: '20px',
    borderBottom: '1px solid #ddd'
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    maxWidth: '300px'
  },
  colorBox: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    fontSize: '15px'
  },
  select: {
    padding: '10px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '2px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    width: '200px'
  },
  resetButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  note: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#fff3cd',
    border: '2px solid #ffc107',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '1.6'
  }
};

export default SettingsPanel;
