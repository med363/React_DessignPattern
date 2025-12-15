import React, { useState, useEffect } from 'react';

// ============================================
// 1. Simple Components (No loading logic)
// ============================================

const UserProfile = ({ user }) => {
  return (
    <div style={{ border: '2px solid blue', padding: '20px', borderRadius: '8px', margin: '10px' }}>
      <h2>👤 User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
    </div>
  );
};

const ProductList = ({ products }) => {
  return (
    <div style={{ border: '2px solid green', padding: '20px', borderRadius: '8px', margin: '10px' }}>
      <h2>🛍️ Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = ({ data }) => {
  return (
    <div style={{ border: '2px solid purple', padding: '20px', borderRadius: '8px', margin: '10px' }}>
      <h2>📊 Dashboard</h2>
      <p><strong>Total Users:</strong> {data.totalUsers}</p>
      <p><strong>Total Sales:</strong> ${data.totalSales}</p>
      <p><strong>Active Orders:</strong> {data.activeOrders}</p>
    </div>
  );
};


// ============================================
// 2. HOC: withLoading (Reusable Loading Logic)
// ============================================

const withLoading = (WrappedComponent, fetchData, loadingTime = 2000) => {
  return (props) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate fetching data
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        const fetchedData = fetchData();
        setData(fetchedData);
        setIsLoading(false);
      }, loadingTime);

      return () => clearTimeout(timer);
    }, []);

    // Show loading state
    if (isLoading) {
      return (
        <div style={{ 
          border: '2px dashed gray', 
          padding: '20px', 
          borderRadius: '8px', 
          margin: '10px',
          textAlign: 'center',
          backgroundColor: '#f0f0f0'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
          <p>Loading...</p>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: '#ddd', 
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '10px'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#4CAF50',
              animation: 'loading 1.5s infinite'
            }}></div>
          </div>
        </div>
      );
    }

    // Show the component with data
    return <WrappedComponent {...props} {...data} />;
  };
};


// ============================================
// 3. Mock Data Functions
// ============================================

const fetchUserData = () => {
  return {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    }
  };
};

const fetchProductData = () => {
  return {
    products: [
      { name: 'Laptop', price: 999 },
      { name: 'Phone', price: 699 },
      { name: 'Tablet', price: 499 }
    ]
  };
};

const fetchDashboardData = () => {
  return {
    data: {
      totalUsers: 1250,
      totalSales: 45000,
      activeOrders: 89
    }
  };
};


// ============================================
// 4. Create Components WITH Loading Logic
// ============================================

const UserProfileWithLoading = withLoading(UserProfile, fetchUserData, 2000);
const ProductListWithLoading = withLoading(ProductList, fetchProductData, 3000);
const DashboardWithLoading = withLoading(Dashboard, fetchDashboardData, 1500);


// ============================================
// 5. App Component
// ============================================

function App() {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      <h1>🎯 HOC: Loading Page Example</h1>

      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>💡 How it works:</h3>
        <ol>
          <li><strong>withLoading</strong> HOC adds loading logic to any component</li>
          <li>Shows "Loading..." while fetching data</li>
          <li>Displays the component when data is ready</li>
          <li>Same loading logic reused for ALL components! 🚀</li>
        </ol>
      </div>

      <button 
        onClick={() => setShowComponents(!showComponents)}
        style={{ 
          padding: '15px 30px', 
          fontSize: '16px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {showComponents ? '🔄 Reload All Components' : '▶️ Load Components'}
      </button>

      {showComponents && (
        <div>
          <h2>📦 Components with Loading States:</h2>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            <UserProfileWithLoading />
            <ProductListWithLoading />
            <DashboardWithLoading />
          </div>

          <div style={{ backgroundColor: '#e6ffe6', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
            <h3>✅ Benefits of using HOC for loading:</h3>
            <ul>
              <li>Loading logic written ONCE in <code>withLoading</code></li>
              <li>Applied to UserProfile, ProductList, and Dashboard</li>
              <li>Each component gets automatic loading state</li>
              <li>Easy to customize loading time for each component</li>
              <li>No duplicate code! 🎉</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;