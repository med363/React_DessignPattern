import React from 'react';
import CustomErrorPage from './CustomErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidMount() {
    // Catch global errors (including from extensions)
    window.addEventListener('error', this.handleGlobalError);
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleGlobalError);
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  handleGlobalError = (event) => {
    // Ignore errors from browser extensions
    if (event.filename && event.filename.includes('chrome-extension://')) {
      event.preventDefault();
      return;
    }
    
    this.setState({ 
      hasError: true, 
      error: new Error(event.message) 
    });
    event.preventDefault();
  };

  handlePromiseRejection = (event) => {
    // Ignore rejections from browser extensions
    if (event.reason && event.reason.stack && event.reason.stack.includes('chrome-extension://')) {
      event.preventDefault();
      return;
    }
    
    this.setState({ 
      hasError: true, 
      error: event.reason 
    });
    event.preventDefault();
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <CustomErrorPage 
          error={this.state.error} 
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
