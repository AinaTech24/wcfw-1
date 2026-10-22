import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PageLoader } from "../components/LoadingSkeletons";
import DynamicServicePage from "../pages/services/DynamicServicePage";

import PublicLayout from "../components/PublicLayout";
import Home from "../pages/Home";

// Lazy imports for pages
const About = lazy(() => import("../pages/About"));
const Blog = lazy(() => import("../pages/Blog"));
const Newsletter = lazy(() => import("../pages/Newsletter"));
const Calculators = lazy(() => import("../pages/Calculators"));
const Contact = lazy(() => import("../pages/Contact"));
const Videos = lazy(() => import("../pages/Videos"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const NotFound = lazy(() => import("../pages/NotFound"));
const FinancialFreedom = lazy(() => import("../pages/FinancialFreedom"));
const AssetAllocation = lazy(() => import("../pages/AssetAllocation"));

// Service Pages
const Services = lazy(() => import("../pages/Services"));
const GoalBaseInvesting = lazy(
  () => import("../pages/services/GoalBaseInvesting"),
);
const Stocks = lazy(() => import("../pages/services/Stocks"));
const FixedDeposit = lazy(() => import("../pages/services/FixedDeposit"));
const TaxSolutionService = lazy(() => import("../pages/services/TaxSolution"));
const LifeInsurance = lazy(() => import("../pages/services/LifeInsurance"));
const MutualFund = lazy(() => import("../pages/services/MutualFund"));

// Goal Pages
const Retirement = lazy(() => import("../pages/goals/Retirement"));
const DreamHome = lazy(() => import("../pages/goals/DreamHome"));
const ChildEducation = lazy(() => import("../pages/goals/ChildEducation"));
const ChildWedding = lazy(() => import("../pages/goals/ChildWedding"));
const EmergencyFund = lazy(() => import("../pages/goals/EmergencyFund"));
const WealthCreation = lazy(() => import("../pages/goals/WealthCreation"));

// Admin Pages
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const ContentEditor = lazy(() => import("../pages/admin/ContentEditor"));
const EnquiryList = lazy(() => import("../pages/admin/EnquiryList"));
const BlogManager = lazy(() => import("../pages/admin/BlogManager"));
const RedirectManager = lazy(() => import("../pages/admin/RedirectManager"));
const NewsletterManager = lazy(
  () => import("../pages/admin/NewsletterManager"),
);
const TeamManager = lazy(() => import("../pages/admin/TeamManager"));
const TestimonialManager = lazy(
  () => import("../pages/admin/TestimonialManager"),
);
const VideoManager = lazy(() => import("../pages/admin/VideoManager"));
const SiteSettings = lazy(() => import("../pages/admin/SiteSettings"));
const ProtectedRoute = lazy(() => import("../components/ProtectedRoute"));
const AdminLayout = lazy(() => import("../pages/admin/AdminLayout"));

// Calculators
const SIPCalculator = lazy(() => import("../pages/calculators/SIPCalculator"));
const LumpsumCalculator = lazy(
  () => import("../pages/calculators/LumpsumCalculator"),
);
const SWPCalculator = lazy(() => import("../pages/calculators/SWPCalculator"));
const STPCalculator = lazy(() => import("../pages/calculators/STPCalculator"));
const RetirementCalculator = lazy(
  () => import("../pages/calculators/RetirementCalculator"),
);
const DelayCalculator = lazy(
  () => import("../pages/calculators/DelayCalculator"),
);
const EMICalculator = lazy(() => import("../pages/calculators/EMICalculator"));
const InsuranceCalculator = lazy(
  () => import("../pages/calculators/InsuranceCalculator"),
);
const TaxCalculator = lazy(() => import("../pages/calculators/TaxCalculator"));
const MarriageCalculator = lazy(
  () => import("../pages/calculators/MarriageCalculator"),
);
const EducationCalculator = lazy(
  () => import("../pages/calculators/EducationCalculator"),
);
const HomeLoanCalculator = lazy(
  () => import("../pages/calculators/HomeLoanCalculator"),
);
const CarLoanCalculator = lazy(
  () => import("../pages/calculators/CarLoanCalculator"),
);
const VacationCalculator = lazy(
  () => import("../pages/calculators/VacationCalculator"),
);

// Legal Pages
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/TermsOfService"));
const Disclaimer = lazy(() => import("../pages/Disclaimer"));
const CommissionDisclosure = lazy(
  () => import("../pages/CommissionDisclosure"),
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/knowledge-hub" element={<Navigate to="/blog" replace />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/financial-freedom" element={<FinancialFreedom />} />
          <Route path="/asset-allocation" element={<AssetAllocation />} />

          {/* Services */}
          <Route path="/services" element={<Services />} />
          <Route
            path="/services/goal-base-investing"
            element={<GoalBaseInvesting />}
          />
          <Route path="/services/stocks" element={<Stocks />} />
          <Route path="/services/fixed-deposit" element={<FixedDeposit />} />
          <Route
            path="/services/tax-solution"
            element={<TaxSolutionService />}
          />
          <Route path="/services/life-insurance" element={<LifeInsurance />} />
          <Route path="/services/mutual-fund" element={<MutualFund />} />
          <Route
  path="/services/:slug"
  element={<DynamicServicePage />}
/>

          {/* Goals */}
          <Route path="/goals/retirement" element={<Retirement />} />
          <Route path="/goals/dream-home" element={<DreamHome />} />
          <Route path="/goals/child-education" element={<ChildEducation />} />
          <Route path="/goals/child-wedding" element={<ChildWedding />} />
          <Route path="/goals/emergency-fund" element={<EmergencyFund />} />
          <Route path="/goals/wealth-creation" element={<WealthCreation />} />

          {/* Calculators */}
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculator/sip" element={<SIPCalculator />} />
          <Route path="/calculator/lumpsum" element={<LumpsumCalculator />} />
          <Route path="/calculator/swp" element={<SWPCalculator />} />
          <Route path="/calculator/stp" element={<STPCalculator />} />
          <Route
            path="/calculator/retirement"
            element={<RetirementCalculator />}
          />
          <Route path="/calculator/delay" element={<DelayCalculator />} />
          <Route path="/calculator/emi" element={<EMICalculator />} />
          <Route
            path="/calculator/insurance"
            element={<InsuranceCalculator />}
          />
          <Route path="/calculator/tax" element={<TaxCalculator />} />
          <Route path="/calculator/marriage" element={<MarriageCalculator />} />
          <Route
            path="/calculator/education"
            element={<EducationCalculator />}
          />
          <Route
            path="/calculator/home-loan"
            element={<HomeLoanCalculator />}
          />
          <Route path="/calculator/car-loan" element={<CarLoanCalculator />} />
          <Route path="/calculator/vacation" element={<VacationCalculator />} />

          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route
            path="/commission-disclosure"
            element={<CommissionDisclosure />}
          />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/content" element={<ContentEditor />} />
            <Route path="/admin/blogs" element={<BlogManager />} />
            <Route path="/admin/enquiries" element={<EnquiryList />} />
            <Route path="/admin/redirects" element={<RedirectManager />} />
            <Route path="/admin/newsletter" element={<NewsletterManager />} />
            <Route path="/admin/team" element={<TeamManager />} />
            <Route
              path="/admin/testimonials"
              element={<TestimonialManager />}
            />
            <Route path="/admin/videos" element={<VideoManager />} />
            <Route path="/admin/settings" element={<SiteSettings />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
