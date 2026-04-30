import React from "react";

import { Link } from "react-router-dom";

const CalculatorLayout = ({ title, description, inputs, chart, results }) => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 px-4">
            {title}
          </h2>
          {description && (
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed px-4">
              {description}
            </p>
          )}
        </div>

        {/* Main Content - Mobile First Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Left: Inputs - Mobile Optimized */}
          <div
            className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-orange-100"
            role="form"
            aria-label="Calculator inputs"
          >
            <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b-2 border-orange-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <span className="w-1.5 h-6 sm:h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-2 sm:mr-3"></span>
                Input Details
              </h3>
            </div>
            {inputs ? (
              <div className="space-y-3 sm:space-y-4">
                {inputs}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 sm:py-12">
                <p className="text-gray-400 text-sm sm:text-base">No inputs provided.</p>
              </div>
            )}
          </div>

          {/* Right: Chart - Mobile Responsive */}
          <div
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-orange-100"
            role="region"
            aria-label="Calculator visualization"
          >
            <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b-2 border-orange-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <span className="w-1.5 h-6 sm:h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-2 sm:mr-3"></span>
                Visual Breakdown
              </h3>
            </div>
            <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center">
              {chart ? (
                <div className="w-full h-full">
                  {chart}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mb-3 sm:mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-gray-400 text-sm sm:text-base">No chart available.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom: Results - Mobile First Grid */}
        {results && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8 sm:mt-10 lg:mt-12"
            role="region"
            aria-label="Calculator results"
          >
            {results}
          </div>
        )}

        {/* Disclaimer - Mobile Optimized */}
        <div className="mt-8 sm:mt-10 lg:mt-12 p-4 sm:p-6 bg-orange-50 border-2 border-orange-200 rounded-xl sm:rounded-2xl">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Disclaimer</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                This calculator provides estimates based on the inputs provided. Actual results may vary.
                Please consult with a financial advisor for personalized advice. Past performance does not
                guarantee future results.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section - Mobile Optimized */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-4">
            Need help understanding these results?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg touch-manipulation text-sm sm:text-base"
              aria-label="Schedule a consultation"
            >
              Schedule a Consultation
            </Link>
            <a
              href="https://wa.me/9193772 77703"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg touch-manipulation text-sm sm:text-base"
              aria-label="Contact us on WhatsApp"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorLayout;
