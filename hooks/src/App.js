import React from 'react';
import './App.css';

/**
 * ═══════════════════════════════════════════════════════════════════
 * IMPORT DES CUSTOM HOOKS
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Les custom hooks sont dans le dossier src/hooks/
 * On les importe comme n'importe quel module JavaScript
 */
import useCounter from './hooks/useCounter';
import useToggle from './hooks/useToggle';

function App() {
  /**
   * ═══════════════════════════════════════════════════════════════
   * UTILISATION DES CUSTOM HOOKS
   * ═══════════════════════════════════════════════════════════════
   * 
   * Un custom hook s'utilise exactement comme les hooks React natifs
   * (useState, useEffect, etc.)
   */

  // ──────────────────────────────────────────────────────────────
  // HOOK 1: useCounter
  // ──────────────────────────────────────────────────────────────
  // On peut créer plusieurs instances indépendantes du même hook!
  
  // Premier compteur commence à 0
  const counter1 = useCounter(0);
  
  // Deuxième compteur commence à 100
  const counter2 = useCounter(100);
  
  // Chaque compteur a son propre état INDÉPENDANT
  // counter1.count et counter2.count sont séparés

  // ──────────────────────────────────────────────────────────────
  // HOOK 2: useToggle
  // ──────────────────────────────────────────────────────────────
  // On peut donner des noms personnalisés lors de la déstructuration
  
  // Pour afficher/cacher une section
  const [showSection, openSection, closeSection, toggleSection] = useToggle(false);
  
  // Pour afficher/cacher un autre élément
  const [showMessage, , , toggleMessage] = useToggle(false);

  return (
    <div className="App">
      <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        <h1>🎯 Custom Hooks - Guide Complet</h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>
          Les hooks sont définis dans <code>src/hooks/</code> avec commentaires détaillés
        </p>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 1: useCounter                                        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section style={{
          marginBottom: '30px',
          padding: '25px',
          border: '3px solid #4CAF50',
          borderRadius: '12px',
          background: '#f9fff9'
        }}>
          <h2>📊 Custom Hook: useCounter</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            📂 Fichier: <code>src/hooks/useCounter.js</code><br/>
            💡 Concept: Encapsuler la logique d'un compteur pour la réutiliser
          </p>

          {/* Compteur 1 */}
          <div style={{
            marginBottom: '20px',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ marginTop: 0 }}>Compteur 1: <span style={{ color: '#4CAF50', fontSize: '32px' }}>{counter1.count}</span></h3>
            <button 
              onClick={counter1.increment}
              style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
            >
              ➕ Increment
            </button>
            <button 
              onClick={counter1.decrement}
              style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
            >
              ➖ Decrement
            </button>
            <button 
              onClick={counter1.reset}
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              🔄 Reset
            </button>
          </div>

          {/* Compteur 2 */}
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ marginTop: 0 }}>Compteur 2: <span style={{ color: '#4CAF50', fontSize: '32px' }}>{counter2.count}</span></h3>
            <button 
              onClick={counter2.increment}
              style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
            >
              ➕ Increment
            </button>
            <button 
              onClick={counter2.decrement}
              style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
            >
              ➖ Decrement
            </button>
            <button 
              onClick={counter2.reset}
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              🔄 Reset
            </button>
          </div>

          {/* Explication */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#e8f5e9',
            borderRadius: '8px',
            borderLeft: '4px solid #4CAF50'
          }}>
            <strong>💡 Ce qu'il faut comprendre:</strong>
            <ul style={{ textAlign: 'left', marginTop: '10px', lineHeight: '1.8' }}>
              <li>Les deux compteurs utilisent le <strong>même hook</strong> <code>useCounter</code></li>
              <li>Chaque compteur a son <strong>état indépendant</strong></li>
              <li>Pas besoin de réécrire la logique increment/decrement/reset</li>
              <li>Le code est <strong>réutilisable</strong> dans n'importe quel composant</li>
            </ul>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 2: useToggle                                         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section style={{
          marginBottom: '30px',
          padding: '25px',
          border: '3px solid #2196F3',
          borderRadius: '12px',
          background: '#f5f9ff'
        }}>
          <h2>🔄 Custom Hook: useToggle</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            📂 Fichier: <code>src/hooks/useToggle.js</code><br/>
            💡 Concept: Gérer un état true/false avec des noms de fonctions clairs
          </p>

          {/* Exemple 1: Section toggle */}
          <div style={{
            marginBottom: '20px',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ marginTop: 0 }}>Exemple 1: Afficher/Cacher une section</h3>
            <button 
              onClick={toggleSection}
              style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
            >
              🔄 Toggle
            </button>
            <button 
              onClick={openSection}
              style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
            >
              ✅ Show
            </button>
            <button 
              onClick={closeSection}
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              ❌ Hide
            </button>

            {showSection && (
              <div style={{
                marginTop: '15px',
                padding: '20px',
                background: '#e3f2fd',
                borderRadius: '8px',
                border: '2px solid #2196F3'
              }}>
                <h4>🎉 Section visible!</h4>
                <p>Cette section apparaît et disparaît grâce au hook <code>useToggle</code></p>
              </div>
            )}
          </div>

          {/* Exemple 2: Message toggle */}
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ marginTop: 0 }}>Exemple 2: Afficher un message</h3>
            <button 
              onClick={toggleMessage}
              style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
            >
              🔄 Toggle Message
            </button>

            {showMessage && (
              <div style={{
                marginTop: '15px',
                padding: '20px',
                background: '#fff3e0',
                borderRadius: '8px',
                border: '2px solid #FF9800'
              }}>
                <strong>📣 Message:</strong> Le hook useToggle peut être utilisé plusieurs fois!
              </div>
            )}
          </div>

          {/* Explication */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#e3f2fd',
            borderRadius: '8px',
            borderLeft: '4px solid #2196F3'
          }}>
            <strong>💡 Ce qu'il faut comprendre:</strong>
            <ul style={{ textAlign: 'left', marginTop: '10px', lineHeight: '1.8' }}>
              <li>Au lieu d'écrire <code>setState(true)</code>, on écrit <code>open()</code> (plus clair!)</li>
              <li>Le hook peut être utilisé pour modales, menus, accordéons, etc.</li>
              <li>On peut créer plusieurs toggles indépendants</li>
              <li>Noms personnalisables lors de la déstructuration</li>
            </ul>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* RÉSUMÉ FINAL                                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section style={{
          padding: '25px',
          background: '#fff3e0',
          borderRadius: '12px',
          border: '3px solid #FF9800'
        }}>
          <h2>📖 Résumé: Anatomie d'un Custom Hook</h2>
          
          <div style={{ textAlign: 'left' }}>
            <h3>Structure d'un Custom Hook:</h3>
            <pre style={{
              background: '#2d2d2d',
              color: '#f8f8f2',
              padding: '15px',
              borderRadius: '8px',
              overflow: 'auto'
            }}>
{`function useMonHook(params) {
  // 1. Créer l'état
  const [state, setState] = useState(initialValue);

  // 2. Créer des fonctions
  const maFonction = () => { ... };

  // 3. Retourner ce que le composant utilisera
  return { state, maFonction };
}`}
            </pre>

            <h3 style={{ marginTop: '20px' }}>Règles essentielles:</h3>
            <ol style={{ lineHeight: '2' }}>
              <li><strong>Nom:</strong> Doit commencer par "use" (useCounter, useToggle, useForm...)</li>
              <li><strong>Hooks internes:</strong> Peut utiliser useState, useEffect, et autres hooks</li>
              <li><strong>Réutilisabilité:</strong> Peut être appelé dans n'importe quel composant</li>
              <li><strong>Indépendance:</strong> Chaque appel crée une instance indépendante</li>
            </ol>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#4CAF50',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <strong style={{ fontSize: '18px' }}>
                ✅ Custom Hooks = Réutilisabilité + Code Propre + Maintenabilité
              </strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
