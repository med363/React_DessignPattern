import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import reportWebVitals from './reportWebVitals';

// Disable React's error overlay in development
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    const errorString = args.join(' ');
    if (errorString.includes('chrome-extension://') || 
        errorString.includes('chrome?.runtime?.getURL')) {
      return;
    }
    originalError.apply(console, args);
  };

  // Remove React's error overlay iframe
  const removeErrorOverlay = () => {
    const overlay = document.querySelector('iframe[style*="fixed"]');
    if (overlay) {
      overlay.remove();
    }
  };

  // Watch for error overlay and remove it
  const observer = new MutationObserver(removeErrorOverlay);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('chrome-extension://')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
    removeErrorOverlay();
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.stack && event.reason.stack.includes('chrome-extension://')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
    removeErrorOverlay();
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
