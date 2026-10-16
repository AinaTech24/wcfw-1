import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

// Lazy loader for Zoho SalesIQ to protect Googlebot's 5s rendering budget
const useLazyZohoChat = () => {
  useEffect(() => {
    // 1. Skip completely for search crawlers, Google-InspectionTool, Lighthouse, and automated browsers
    const isBot =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver ||
        /bot|google|crawler|spider|robot|crawling|lighthouse|inspection|searchconsole|headless/i.test(
          navigator.userAgent
        ));

    if (isBot) return;

    let loaded = false;
    const loadZoho = () => {
      if (loaded || document.getElementById('zsiqscript')) return;
      loaded = true;

      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || {
        ready: function () {
          if (window.$zoho?.salesiq?.domain) {
            window.$zoho.salesiq.domain('wcfw.in');
          }
        },
      };

      const script = document.createElement('script');
      script.id = 'zsiqscript';
      script.src =
        'https://salesiq.zohopublic.com/widget?wc=siq89da75e6e3077594e783ec276e93063849f161aaa9c622f51e7a2c17cb5b96d0';
      script.defer = true;
      document.body.appendChild(script);
    };

    // Load immediately on real user interaction
    const cleanup = () => {
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('keydown', onInteraction);
      window.removeEventListener('click', onInteraction);
    };

    const onInteraction = () => {
      loadZoho();
      cleanup();
    };

    window.addEventListener('scroll', onInteraction, { passive: true, once: true });
    window.addEventListener('mousemove', onInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onInteraction, { passive: true, once: true });
    window.addEventListener('keydown', onInteraction, { passive: true, once: true });
    window.addEventListener('click', onInteraction, { passive: true, once: true });

    // Fallback timer only for idle human visitors
    const timer = setTimeout(loadZoho, 8000);

    return () => {
      clearTimeout(timer);
      cleanup();
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
