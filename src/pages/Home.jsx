import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import GoogleReviews from "../components/GoogleReviews";
import {
  FaChartLine,
  FaShieldAlt,
  FaHome,
  FaGraduationCap,
  FaRing,
  FaUmbrella,
  FaChartPie,
  FaBullseye,
  FaUniversity,
  FaFileInvoiceDollar,
  FaPlay,
  FaYoutube,
  FaClock,
  FaEye,
} from "react-icons/fa";
import axios from "axios";

import ServiceCard from "../components/ServiceCard";
import useMetaTags from "../hooks/useMetaTags";
import {
  OrganizationSchema,
  FinancialServiceSchema,
} from "../components/SchemaMarkup";
import useCMSContent from "../hooks/useCMSContent";

// Import Service Images
import goalImg from "../assets/images/services/goal-based-investing.png";
import mfImg from "../assets/images/services/mutual-funds.png";
import stocksImg from "../assets/images/services/stocks.png";
import fdImg from "../assets/images/services/fixed-deposits.png";
import taxImg from "../assets/images/services/tax-solution.png";
import lifeInsImg from "../assets/images/services/life-insurance.png";

// CTA Button Component
import CTAButton from "../components/CTAButton";

const Home = () => {
  const { cmsContent } = useCMSContent("home");
  const [latestVideo, setLatestVideo] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // YouTube API Configuration
  const YOUTUBE_API_KEY = "AIzaSyC2Ipc357Zm_TffHwDw5p_YBClyMYgT3vc";
  const PLAYLIST_ID = "UUADuni6S-18E2haTHUwkunA";

  // Utility to format YouTube date
  const timeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + "y ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + "mo ago";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "Live";

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatViewCount = (views) => {
    const num = parseInt(views);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        // Fetch latest videos from playlist
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: "snippet",
              maxResults: 5,
              playlistId: PLAYLIST_ID,
              key: YOUTUBE_API_KEY,
            },
          },
        );

        if (response.data.items.length > 0) {
          const videoIds = response.data.items.map(
            (item) => item.snippet.resourceId.videoId,
          );

          // Fetch video details
          const detailsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`,
            {
              params: {
                part: "contentDetails,statistics",
                id: videoIds.join(","),
                key: YOUTUBE_API_KEY,
              },
            },
          );

          const videosWithDetails = response.data.items.map((item, index) => {
            const details = detailsResponse.data.items[index];
            return {
              id: item.id || index,
              title: item.snippet.title,
              thumbnail:
                item.snippet.thumbnails.maxres?.url ||
                item.snippet.thumbnails.high?.url,
              videoId: item.snippet.resourceId.videoId,
              duration: details
                ? formatDuration(details.contentDetails.duration)
                : "Live",
              views: details
                ? formatViewCount(details.statistics.viewCount)
                : "New",
              uploadDate: timeAgo(item.snippet.publishedAt),
              description: item.snippet.description.substring(0, 100) + "...",
            };
          });

          // First video is the latest (YouTube returns newest first)
          setLatestVideo(videosWithDetails[0]);
          setOtherVideos(videosWithDetails.slice(1, 4)); // Get next 3 videos
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        // Fallback static videos
        const staticVideos = [
          {
            id: 1,
            title:
              "Organize Your Money - Live the lifestyle you want | Nikhil Thakkar",
            thumbnail:
              "https://img.youtube.com/vi/srALW6zLb0k/maxresdefault.jpg",
            videoId: "srALW6zLb0k",
            duration: "10:05",
            views: "1.2K",
            uploadDate: "2 days ago",
            description:
              "Learn how to organize your finances for the lifestyle you deserve",
          },
          {
            id: 2,
            title:
              "Diwali Picks 2024 | Nikhil Thakkar | We Care Freedom Wealth",
            thumbnail:
              "https://img.youtube.com/vi/g4AZe-tF4Vw/maxresdefault.jpg",
            videoId: "g4AZe-tF4Vw",
            duration: "18:00",
            views: "5.4K",
            uploadDate: "1 month ago",
            description: "Special Diwali investment recommendations for 2024",
          },
          {
            id: 3,
            title:
              "What is SIF? | Everything You Need to Know | Nikhil Thakkar",
            thumbnail:
              "https://img.youtube.com/vi/fwW22NEA3fA/maxresdefault.jpg",
            videoId: "fwW22NEA3fA",
            duration: "15:20",
            views: "3.1K",
            uploadDate: "2 weeks ago",
            description: "Complete guide to Systematic Investment Framework",
          },
        ];
        setLatestVideo(staticVideos[0]);
        setOtherVideos(staticVideos.slice(1));
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const services = useMemo(
    () => [
      {
        id: 1,
        title: "Goal Based Investing",
        icon: FaBullseye,
        description:
          "Strategic investment solution aligned with your life goals and aspirations",
        image: goalImg,
        link: "/services/goal-base-investing",
        gradient: "from-orange-500 to-red-600",
        features: ["Retirement Solution", "Child Education", "Dream Home"],
      },
      {
        id: 2,
        title: "Mutual Funds",
        icon: FaChartLine,
        description:
          "Diversified portfolio management for long-term wealth creation",
        image: mfImg,
        link: "/services/mutual-fund",
        gradient: "from-blue-500 to-indigo-600",
        features: ["SIP & Lumpsum", "Tax Saving ELSS", "Portfolio Review"],
      },
      {
        id: 3,
        title: "Stocks",
        icon: FaChartPie,
        description:
          "Equity investment solutions for long-term wealth creation",
        image: stocksImg,
        link: "/services/stocks",
        gradient: "from-emerald-500 to-teal-600",
        features: ["Equity Advisory", "Technical Analysis", "Long-term Picks"],
      },
      {
        id: 4,
        title: "Fixed Deposits",
        icon: FaUniversity,
        description: "Stable fixed-income options with flexible tenure choices",
        image: fdImg,
        link: "/services/fixed-deposit",
        gradient: "from-yellow-500 to-orange-600",
        features: ["Corporate FDs", "Higher Returns", "Monthly Payouts"],
      },
      {
        id: 5,
        title: "Tax Solution",
        icon: FaFileInvoiceDollar,
        description:
          "Optimize your tax savings with Tax-saving investment solutions",
        image: taxImg,
        link: "/services/tax-solution",
        gradient: "from-rose-500 to-pink-600",
        features: ["80C Deductions", "Tax Audit", "ITR Filing"],
      },
      {
        id: 6,
        title: "Life Insurance",
        icon: FaShieldAlt,
        description: "Comprehensive protection for you and your loved ones",
        image: lifeInsImg,
        link: "/services/life-insurance",
        gradient: "from-purple-500 to-violet-600",
        features: ["Term Insurance", "Critical Illness", "Family Protection"],
      },
    ],
    [],
  );

  const goals = useMemo(
    () => [
      {
        id: 1,
        title: "Dream Home",
        icon: FaHome,
        link: "/goals/dream-home",
        color: "from-orange-500 to-orange-600",
      },
      {
        id: 2,
        title: "Wealth Creation",
        icon: FaChartLine,
        link: "/goals/wealth-creation",
        color: "from-emerald-500 to-emerald-600",
      },
      {
        id: 3,
        title: "Retirement",
        icon: FaUmbrella,
        link: "/goals/retirement",
        color: "from-blue-500 to-blue-600",
      },
      {
        id: 4,
        title: "Child's Education",
        icon: FaGraduationCap,
        link: "/goals/child-education",
        color: "from-purple-500 to-purple-600",
      },
      {
        id: 5,
        title: "Child's Wedding",
        icon: FaRing,
        link: "/goals/child-wedding",
        color: "from-pink-500 to-pink-600",
      },
      {
        id: 6,
        title: "Emergency Fund",
        icon: FaShieldAlt,
        link: "/goals/emergency-fund",
        color: "from-red-500 to-red-600",
      },
    ],
    [],
  );

  // SEO Hook
  useMetaTags(
    cmsContent["_seo"] || {
      title: "We Care Freedom Wealth | Best Financial Advisory in Ahmedabad",
      description:
        "Expert financial solutions including goal-based investing, mutual funds, and stocks from निखिल ठक्कर.",
      keywords:
        "Financial advisor Ahmedabad, Mutual funds, Wealth creation, WCFW",
      robotsTag: "index, follow",
    },
  );

  return (
    <div className="overflow-hidden bg-white">
      <OrganizationSchema />
      <FinancialServiceSchema />
      {/* Hero Section */}
      <HeroSection content={cmsContent.hero} />

      {/* Services Section - Mobile Optimized */}
      <section className="relative py-12 overflow-hidden bg-white sm:py-16 lg:py-24">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full sm:w-96 sm:h-96 bg-orange-50 blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full sm:w-96 sm:h-96 bg-blue-50 blur-3xl opacity-30 -z-10"></div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-4">
              {cmsContent["services-section"]?.title || (
                <>
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                    Services & Products
                  </span>
                </>
              )}
            </h2>
            <div className="max-w-3xl px-4 mx-auto text-base font-medium text-gray-600 sm:text-lg lg:text-xl">
              {cmsContent["services-section"]?.description ? (
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["services-section"].description,
                  }}
                />
              ) : (
                "Experience Bespoke Financial Solutions with WCFW's 35-Year Legacy of Trust"
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                image={service.image}
                buttonLink={service.link}
                gradient={service.gradient}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Added after Hero */}
      <section className="relative py-12 overflow-hidden sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full sm:w-96 sm:h-96 bg-orange-50 blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full sm:w-96 sm:h-96 bg-blue-50 blur-3xl opacity-30 -z-10"></div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border border-orange-100 rounded-full sm:gap-3 bg-orange-50 sm:px-6 sm:py-3 sm:mb-6">
              <FaYoutube className="text-base text-red-500 sm:text-lg" />
              <span className="text-xs font-bold tracking-widest text-orange-700 uppercase sm:text-sm">
                {cmsContent["video-section"]?.badge ||
                  "Latest Financial Insights"}
              </span>
            </div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-4">
              {cmsContent["video-section"]?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["video-section"].title.replace(
                      /Learn/g,
                      '<span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-500">Learn</span>',
                    ),
                  }}
                />
              ) : (
                <>
                  Watch &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                    Learn
                  </span>
                </>
              )}
            </h2>
            <div className="max-w-3xl px-4 mx-auto text-base font-medium text-gray-600 sm:text-lg lg:text-xl">
              {cmsContent["video-section"]?.description ? (
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["video-section"].description,
                  }}
                />
              ) : (
                "Latest wealth creation strategies from Nikhil Thakkar. New videos highlight automatically."
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-8 lg:grid-cols-3 sm:gap-10">
              {/* Latest Video Skeleton */}
              <div className="lg:col-span-2">
                <div className="bg-gray-100 rounded-3xl p-6 sm:p-8 animate-pulse h-[400px]"></div>
              </div>
              {/* Other Videos Skeleton */}
              <div className="space-y-6 sm:space-y-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-2xl p-6 animate-pulse h-[120px]"
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 sm:gap-10">
              {/* Latest Video - Highlighted */}
              {latestVideo && (
                <div className="lg:col-span-2 group">
                  <div className="relative overflow-hidden transition-all duration-500 bg-white border-2 border-orange-100 shadow-2xl rounded-3xl hover:shadow-3xl">
                    {/* New Badge */}
                    <div className="absolute z-20 top-6 left-6">
                      <span className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-red-500 sm:text-sm sm:px-6 sm:py-3">
                        <FaYoutube className="text-white" />
                        NEW RELEASE
                      </span>
                    </div>

                    <div className="relative h-64 overflow-hidden sm:h-80 md:h-96 bg-gradient-to-br from-slate-900 to-slate-800">
                      <img
                        src={latestVideo.thumbnail}
                        alt={latestVideo.title}
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 opacity-90"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${latestVideo.videoId}/maxresdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <a
                          href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-20 h-20 text-white transition-all duration-500 transform scale-75 rounded-full shadow-2xl sm:w-24 sm:h-24 bg-gradient-to-r from-red-500 to-orange-500 group-hover:scale-100 hover:shadow-3xl hover:scale-110"
                          aria-label={`Watch ${latestVideo.title}`}
                        >
                          <FaPlay className="ml-1 text-lg sm:text-xl" />
                        </a>
                      </div>
                      <div className="absolute flex items-center px-4 py-2 text-xs font-bold tracking-widest text-white uppercase rounded-full bottom-6 right-6 bg-black/80 backdrop-blur-md sm:text-sm">
                        <FaClock className="mr-2 text-orange-400" />{" "}
                        {latestVideo.duration}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10">
                      <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors sm:text-2xl md:text-3xl group-hover:text-orange-600 line-clamp-2">
                        {latestVideo.title}
                      </h3>
                      <p className="mb-6 text-sm text-gray-600 sm:text-base line-clamp-2">
                        {latestVideo.description}
                      </p>
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="flex items-center text-xs font-semibold text-gray-500 sm:text-sm">
                            <FaEye className="mr-2 text-orange-500" />{" "}
                            {latestVideo.views} views
                          </span>
                          <span className="text-xs font-semibold text-gray-500 sm:text-sm">
                            {latestVideo.uploadDate}
                          </span>
                        </div>
                        <CTAButton
                          href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                          text="Watch Now"
                          icon={<FaPlay />}
                          variant="primary"
                          external
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Videos */}
              <div className="space-y-6 sm:space-y-8">
                {otherVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group"
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 p-4 transition-all duration-300 bg-white border border-gray-100 shadow-lg sm:gap-6 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-2xl hover:border-orange-200"
                      aria-label={`Watch ${video.title}`}
                    >
                      <div className="relative flex-shrink-0 w-32 h-24 overflow-hidden sm:w-40 sm:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-90"
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white">
                          {video.duration}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                          <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-lg bg-gradient-to-r from-red-500 to-orange-500">
                            <FaPlay className="text-xs" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-2 text-sm font-bold text-gray-900 transition-colors sm:text-base group-hover:text-orange-600 line-clamp-2">
                          {video.title}
                        </h4>
                        <div className="flex items-center justify-between mt-4">
                          <span className="flex items-center text-xs text-gray-500">
                            <FaEye className="mr-1 text-orange-500" />{" "}
                            {video.views}
                          </span>
                          <span className="text-xs text-gray-500">
                            {video.uploadDate}
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}

                {/* View All Button */}
                <div>
                  <Link
                    to="/videos"
                    className="group relative flex items-center w-full h-16 px-3 overflow-hidden font-bold text-white rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md transition-all duration-500 hover:shadow-[0_14px_30px_-10px_rgba(249,115,22,.45)]"
                  >
                    {/* Expanding Pill */}
                    <span className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-2xl bg-white/80 transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]" />

                    {/* Icon */}
                    <span className="absolute z-10 flex items-center justify-center w-12 h-12 -translate-y-1/2 left-3 top-1/2">
                      <FaYoutube
                        className="text-red-600 transition-transform duration-500 group-hover:scale-110"
                        style={{ fontSize: "22px" }}
                      />
                    </span>

                    {/* Default Text */}
                    <span className="relative z-10 ml-20 text-base font-bold tracking-tight transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-3">
                      View All Videos
                    </span>

                    {/* Hover Text */}
                    <span className="absolute z-10 text-base font-bold text-black transition-all duration-300 delay-150 -translate-y-1/2 opacity-0 left-20 right-6 top-1/2 group-hover:opacity-100">
                      View All Videos
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Goals Section - Mobile Optimized */}
      <section className="relative py-12 overflow-hidden sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute hidden w-64 h-64 border-4 border-orange-500 rounded-full top-20 right-20 sm:w-96 sm:h-96 sm:block"></div>
          <div className="absolute hidden w-48 h-48 border-4 border-blue-500 rounded-full bottom-20 left-20 sm:w-64 sm:h-64 sm:block"></div>
        </div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl sm:mb-4">
              {cmsContent["goals-section"]?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["goals-section"].title.replace(
                      /Solution Your Goals/g,
                      '<span class="text-orange-600">Solution Your Goals</span>',
                    ),
                  }}
                />
              ) : (
                <>
                  Let's Start to{" "}
                  <span className="text-orange-600">Solution Your Goals</span>
                </>
              )}
            </h2>
            <div className="max-w-3xl px-4 mx-auto text-base text-gray-600 sm:text-lg lg:text-xl">
              {cmsContent["goals-section"]?.description ? (
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{
                    __html: cmsContent["goals-section"].description,
                  }}
                />
              ) : (
                "Investing and savings get direction when mapped with your short-term, medium-term, and long-term financial goals"
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-6">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="group transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
              >
                <Link
                  to={goal.link}
                  className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 h-full min-h-[140px] sm:min-h-[180px]"
                  aria-label={`Solution for ${goal.title}`}
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${goal.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    <goal.icon
                      className="text-lg text-white sm:text-2xl"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 transition-colors sm:text-sm group-hover:text-orange-600">
                    {goal.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section - Mobile Optimized */}
      <section className="py-12 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl sm:mb-4">
              What Our <span className="text-orange-600">Clients Say</span>
            </h2>
            <p className="max-w-3xl px-4 mx-auto text-base text-gray-600 sm:text-lg lg:text-xl">
              Trusted by thousands of satisfied clients across India
            </p>
          </div>

          <GoogleReviews />
        </div>
      </section>
    </div>
  );
};

export default Home;
