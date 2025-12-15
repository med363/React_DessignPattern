import React from 'react';

function CustomErrorPage({ error, resetError }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        padding: '60px 40px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        animation: 'slideDown 0.5s ease-out'
      }}>
        {/* Animated Icon */}
        <div style={{
          fontSize: '80px',
          marginBottom: '20px',
          animation: 'bounce 1s infinite'
        }}>
          🚨
        </div>
        
        {/* Error Title */}
        <h1 style={{
          fontSize: '42px',
          color: '#2d3748',
          marginBottom: '16px',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          Oops! Something Broke
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: '18px',
          color: '#718096',
          marginBottom: '40px',
          lineHeight: '1.6',
          maxWidth: '450px',
          margin: '0 auto 40px'
        }}>
          Don't worry, it happens to the best of us. We've logged the error and our team is on it!
        </p>

        {/* Error Details Card */}
        {error && (
          <div style={{
            padding: '20px',
            backgroundColor: '#fff5f5',
            border: '2px solid #fc8181',
            borderRadius: '12px',
            marginBottom: '30px',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #fc8181, #f56565)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>⚠️</span>
              <strong style={{ color: '#c53030', fontSize: '16px' }}>Error Details</strong>
            </div>
            
            <pre style={{
              fontSize: '13px',
              color: '#742a2a',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              lineHeight: '1.5'
            }}>
              {error.toString()}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={resetError}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            🔄 Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '14px 32px',
              backgroundColor: 'white',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#667eea';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#667eea';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🏠 Go Home
          </button>
        </div>

        {/* Help Text */}
        <p style={{
          marginTop: '40px',
          fontSize: '14px',
          color: '#a0aec0'
        }}>
          Need help? Contact us at <span style={{ color: '#667eea', fontWeight: '600' }}>support@example.com</span>
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

export default CustomErrorPage;
