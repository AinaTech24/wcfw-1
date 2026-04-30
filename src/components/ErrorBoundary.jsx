import React from 'react';
import { FaExclamationTriangle, FaHome, FaRedo, FaWhatsapp } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        console.error('Error caught by boundary:', error, errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // You can also log the error to an error reporting service here
        // Example: logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center px-4 py-8 sm:py-12"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="max-w-2xl w-full text-center">
                        {/* Error Icon - Responsive sizing */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                            <FaExclamationTriangle className="text-white text-3xl sm:text-4xl" aria-hidden="true" />
                        </div>

                        {/* Error Message - Mobile optimized typography */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4 leading-relaxed">
                            We're sorry for the inconvenience. An unexpected error has occurred. Please try refreshing the page or return to the homepage.
                        </p>

                        {/* Action Buttons - Mobile First Stack */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
                            <button
                                onClick={this.handleReset}
                                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 touch-manipulation text-sm sm:text-base"
                                aria-label="Go to homepage"
                            >
                                <FaHome className="mr-2" aria-hidden="true" />
                                Go to Homepage
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center justify-center bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base"
                                aria-label="Refresh current page"
                            >
                                <FaRedo className="mr-2" aria-hidden="true" />
                                Refresh Page
                            </button>
                        </div>

                        {/* Error Details (Development Only) - Mobile optimized */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 sm:mt-8 text-left bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border-2 border-red-100 mx-2 sm:mx-0">
                                <summary className="cursor-pointer font-bold text-red-600 mb-3 sm:mb-4 text-sm sm:text-base hover:text-red-700 transition-colors">
                                    Error Details (Development Mode)
                                </summary>
                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Error:</h3>
                                        <pre className="bg-red-50 p-3 sm:p-4 rounded-lg overflow-auto text-xs sm:text-sm text-red-800 max-h-40 sm:max-h-60">
                                            {this.state.error.toString()}
                                        </pre>
                                    </div>
                                    {this.state.errorInfo && (
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Component Stack:</h3>
                                            <pre className="bg-red-50 p-3 sm:p-4 rounded-lg overflow-auto text-xs sm:text-sm text-red-800 max-h-40 sm:max-h-60">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </details>
                        )}

                        {/* Contact Support - Mobile friendly */}
                        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-orange-100 px-4">
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                                If this problem persists, please contact our support team:
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 items-center">
                                <a
                                    href="mailto:info@wcfw.in"
                                    className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors text-sm sm:text-base touch-manipulation"
                                    aria-label="Email support at info@wcfw.in"
                                >
                                    info@wcfw.in
                                </a>
                                <span className="text-gray-400 hidden sm:inline" aria-hidden="true">•</span>
                                <a
                                    href="https://wa.me/919377277703"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 touch-manipulation"
                                    aria-label="Contact support via WhatsApp"
                                >
                                    <FaWhatsapp className="text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
