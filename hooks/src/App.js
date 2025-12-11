import React, { useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import useLocalStorage from './hooks/useLocalStorage';
import useCounter from './hooks/useCounter';

function App() {
  /**
   * EXEMPLE 1: RÉUTILISATION du hook useCounter
   * 
   * AVANTAGE: On utilise le MÊME hook 2 fois!
   * - Pas besoin de réécrire la logique increment/decrement/reset
   * - Chaque compteur est indépendant avec son propre état
   * - Code propre et maintenable
   **/
  const counter1 = useCounter(0);   // Premier compteur commence à 0
  const counter2 = useCounter(10);  // Deuxième compteur commence à 10

  /**
   * EXEMPLE 2: Hook useLocalStorage
   * 
   * AVANTAGE: Persistance automatique!
   * - La valeur est sauvegardée dans le navigateur
   * - Même après F5 (refresh), la valeur reste
   * - Fonctionne comme useState mais avec localStorage
   */
  const [name, setName] = useLocalStorage('userName', '');

  /**
   * EXEMPLE 3: Hook useFetch pour appeler une API
   * 
   * AVANTAGE: Gestion automatique de loading, error, data
   * - Quand userId change, le hook refait automatiquement le fetch
   * - On peut réutiliser ce hook pour n'importe quelle API
   * - Pas besoin de gérer manuellement les états loading/error
   */
  const [userId, setUserId] = useState(1);
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return (
    <div className="App">
      <header style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Custom Hooks Demo - Reusing Logic</h1>

        {/* Counter Example */}
        <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>📊 Counter Hook (Reused Logic)</h2>
          <div style={{ marginBottom: '15px' }}>
            <h3>Counter 1: {counter1.count}</h3>
            <button onClick={counter1.increment}>+1</button>
            <button onClick={counter1.decrement} style={{ margin: '0 5px' }}>-1</button>
            <button onClick={counter1.reset}>Reset</button>
          </div>
          <div>
            <h3>Counter 2: {counter2.count}</h3>
            <button onClick={counter2.increment}>+1</button>
            <button onClick={counter2.decrement} style={{ margin: '0 5px' }}>-1</button>
            <button onClick={counter2.reset}>Reset</button>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            ✨ Same logic reused for two independent counters!
          </p>
        </section>

        {/* LocalStorage Example */}
        <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>💾 LocalStorage Hook</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: '8px', fontSize: '16px', width: '200px' }}
          />
          <p>Stored name: <strong>{name || 'none'}</strong></p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            ✨ Your name persists even after page reload!
          </p>
        </section>

        {/* Fetch Example */}
        <section style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>🌐 Fetch Hook</h2>
          <div>
            <label>User ID: </label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              min="1"
              max="10"
              style={{ padding: '8px', fontSize: '16px', width: '60px', marginLeft: '5px' }}
            />
          </div>
          
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {user && (
            <div style={{ marginTop: '15px', textAlign: 'left', background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>City:</strong> {user.address?.city}</p>
            </div>
          )}
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            ✨ Fetch logic is reusable for any API endpoint!
          </p>
        </section>
      </header>
    </div>
  );
}

export default App;
