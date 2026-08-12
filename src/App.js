// src/App.js
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

// Inner wrapper so we can read the current location for ErrorBoundary reset
const AppWithErrorBoundary = () => {
  const location = useLocation();
  return (
    <ErrorBoundary resetKey={location.pathname}>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <AuthProvider>
        <ScrollToTop />
        <AppWithErrorBoundary />
      </AuthProvider>
    </Router>
  );
}

export default App;
