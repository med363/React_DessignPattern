import React, { useEffect } from 'react';
import { useDisplaySettings } from '../DisplaySettingsContext';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPOSANT: ContentDisplay
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Composant qui AFFICHE du contenu en utilisant les paramètres
 * 
 * Ce composant:
 * - LIT les paramètres du Context
 * - APPLIQUE les styles en fonction des paramètres
 * - SE MET À JOUR automatiquement quand les paramètres changent
 * 
 * IMPORTANT: Ce composant ne MODIFIE jamais les paramètres!
 * Il ne fait que les lire et les appliquer
 * 
 * RÉACTIVITÉ:
 * Quand SettingsPanel change un paramètre, ce composant se re-render
 * automatiquement et applique les nouveaux styles!
 */
const ContentDisplay = () => {
  
  /**
   * LECTURE DES PARAMÈTRES
   * 
   * On récupère tous les paramètres d'affichage
   * Ce composant s'abonne au Context et se re-render quand:
   * - fontSize change
   * - themeColor change
   * - displayMode change
   * - showImages change
   * - showDescriptions change
   * - language change
   * 
   * Donc: TOUT changement dans SettingsPanel affecte ce composant!
   */
  const {
    fontSize,
    themeColor,
    displayMode,
    showImages,
    showDescriptions,
    language,
    fontSizeMap,
    themeColorMap,
    translations
  } = useDisplaySettings();

  /**
   * OBSERVER LES RE-RENDERS
   * 
   * Ce useEffect s'exécute à chaque render
   * Il log tous les paramètres actuels dans la console
   * 
   * EXPÉRIENCE:
   * 1. Ouvrez la console (F12)
   * 2. Changez un paramètre dans SettingsPanel
   * 3. Voyez ce log s'afficher avec les nouvelles valeurs!
   * 
   * Cela prouve que le composant se re-render automatiquement
   */
  useEffect(() => {
    console.log('🔄 ContentDisplay re-rendered avec:', {
      fontSize,
      themeColor,
      displayMode,
      showImages,
      showDescriptions,
      language
    });
  });

  /**
   * DONNÉES DE DÉMONSTRATION
   * 
   * Liste de cartes à afficher
   * En production, ces données viendraient d'une API
   */
  const items = [
    { id: 1, emoji: '🎨', title: 'Design', description: 'Interface utilisateur moderne' },
    { id: 2, emoji: '⚡', title: 'Performance', description: 'Application rapide et réactive' },
    { id: 3, emoji: '🔒', title: 'Sécurité', description: 'Données protégées' },
    { id: 4, emoji: '🌍', title: 'Accessibilité', description: 'Pour tous les utilisateurs' },
    { id: 5, emoji: '📱', title: 'Responsive', description: 'Fonctionne sur tous les appareils' },
    { id: 6, emoji: '🚀', title: 'Innovation', description: 'Technologies modernes' }
  ];

  /**
   * CALCUL DES STYLES DYNAMIQUES
   * ═══════════════════════════════════════════════════════════════════════
   * 
   * Ces styles changent en fonction des paramètres!
   * 
   * - fontSize détermine la taille du texte
   * - themeColor détermine les couleurs
   * - displayMode détermine grid vs list
   * 
   * Quand un paramètre change:
   * 1. Le composant se re-render
   * 2. Ces variables sont recalculées
   * 3. Les styles changent
   * 4. L'UI est mise à jour!
   */
  const currentFontSize = fontSizeMap[fontSize].value;
  const currentTheme = themeColorMap[themeColor];

  return (
    <div style={{
      ...styles.container,
      backgroundColor: currentTheme.background,
      fontSize: currentFontSize
    }}>
      <h2 style={{ color: currentTheme.text }}>
        📺 {translations.title} - Aperçu
      </h2>

      {/* 
        AFFICHAGE DYNAMIQUE: GRID vs LIST
        ═══════════════════════════════════════════════════════════════════
        
        Le style change en fonction de displayMode:
        - 'grid' → display: 'grid' avec colonnes
        - 'list' → display: 'flex' en colonne
        
        Quand on clique sur "Grille" ou "Liste" dans SettingsPanel:
        1. setDisplayMode() change l'état
        2. Ce composant se re-render
        3. Cette div applique le nouveau style
        4. L'affichage change instantanément!
      */}
      <div style={{
        ...styles.itemsContainer,
        display: displayMode === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: displayMode === 'grid' ? 'repeat(auto-fill, minmax(200px, 1fr))' : 'none',
        flexDirection: displayMode === 'list' ? 'column' : 'row'
      }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              ...styles.item,
              borderColor: currentTheme.primary,
              backgroundColor: 'white'
            }}
          >
            {/* 
              AFFICHAGE CONDITIONNEL DES IMAGES
              ═══════════════════════════════════════════════════════════
              
              showImages && <div>...</div>
              
              En JavaScript:
              - true && <div> → affiche le <div>
              - false && <div> → n'affiche rien
              
              Quand on coche/décoche "Afficher les images":
              1. setShowImages(true/false) change l'état
              2. Ce composant se re-render
              3. Cette condition est réévaluée
              4. L'emoji apparaît ou disparaît!
            */}
            {showImages && (
              <div style={styles.emoji}>{item.emoji}</div>
            )}
            
            <h3 style={{ 
              color: currentTheme.text,
              fontSize: currentFontSize 
            }}>
              {item.title}
            </h3>
            
            {/* AFFICHAGE CONDITIONNEL DES DESCRIPTIONS */}
            {showDescriptions && (
              <p style={styles.description}>{item.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* 
        SECTION INFORMATIVE
        Affiche les paramètres actuels pour visualiser les changements
      */}
      <div style={styles.info}>
        <h3>📊 Paramètres actuels:</h3>
        <ul style={styles.infoList}>
          <li>📏 Taille: <strong>{fontSizeMap[fontSize].label}</strong> ({currentFontSize})</li>
          <li>🎨 Couleur: <strong style={{ color: currentTheme.primary }}>{themeColor}</strong></li>
          <li>📱 Mode: <strong>{displayMode === 'grid' ? 'Grille' : 'Liste'}</strong></li>
          <li>🖼️ Images: <strong>{showImages ? 'Visibles' : 'Masquées'}</strong></li>
          <li>📝 Descriptions: <strong>{showDescriptions ? 'Visibles' : 'Masquées'}</strong></li>
          <li>🌍 Langue: <strong>{language.toUpperCase()}</strong></li>
        </ul>
        <p style={styles.infoNote}>
          ⚡ Ce composant se met à jour automatiquement quand vous changez
          les paramètres dans le panneau ci-dessus!
          <br /><br />
          <strong>Mécanisme:</strong>
          <br />1. Vous cliquez sur un bouton dans SettingsPanel
          <br />2. SettingsPanel appelle un setter (ex: setFontSize)
          <br />3. Le Provider met à jour son état
          <br />4. React détecte le changement
          <br />5. ContentDisplay se re-render automatiquement
          <br />6. Les nouveaux styles sont appliqués!
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '3px solid #4CAF50',
    borderRadius: '12px',
    padding: '25px',
    margin: '10px',
    transition: 'all 0.3s ease'
  },
  itemsContainer: {
    gap: '15px',
    marginTop: '20px',
    marginBottom: '30px',
    transition: 'all 0.3s ease'
  },
  item: {
    border: '2px solid',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  emoji: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  description: {
    fontSize: '14px',
    color: '#666',
    marginTop: '10px',
    lineHeight: '1.4'
  },
  info: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px'
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    lineHeight: '2'
  },
  infoNote: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#d1ecf1',
    border: '2px solid #0c5460',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#0c5460',
    lineHeight: '1.8'
  }
};

export default ContentDisplay;
