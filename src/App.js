import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

// Lazy loader for Zoho SalesIQ to protect Googlebot's 5s rendering budget
const useLazyZohoChat = () => {
  useEffect(() => {
    // 1. Skip completely for search crawlers (Googlebot, Bingbot, Lighthouse, etc.)
    const isBot =
      typeof navigator !== 'undefined' &&
      /bot|googlebot|crawler|spider|robot|crawling|lighthouse|searchconsole/i.test(
        navigator.userAgent
      );

    if (isBot) return;

    let loaded = false;
    const loadZoho = () => {
      if (loaded || document.getElementById('zsiqscript')) return;
      loaded = true;

      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

      const script = document.createElement('script');
      script.id = 'zsiqscript';
      script.src =
        'https://salesiq.zohopublic.com/widget?wc=siq89da75e6e3077594e783ec276e93063849f161aaa9c622f51e7a2c17cb5b96d0';
      script.defer = true;
      document.body.appendChild(script);
    };

    // Delay 4 seconds to guarantee the core React app paints first
    const timer = setTimeout(loadZoho, 4000);

    // Or load on first user interaction
    const onInteraction = () => {
      loadZoho();
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };

    window.addEventListener('scroll', onInteraction, { passive: true, once: true });
    window.addEventListener('mousemove', onInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onInteraction, { passive: true, once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };
  }, []);
};

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
  useLazyZohoChat();

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
