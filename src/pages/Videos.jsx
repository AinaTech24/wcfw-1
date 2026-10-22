import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaYoutube, FaSearch, FaClock, FaEye, FaVideo, FaArrowRight, FaTv } from 'react-icons/fa';
import axios from 'axios';
import { CardSkeleton } from '../components/LoadingSkeletons';
import useCMSContent from '../hooks/useCMSContent';
import useMetaTags from '../hooks/useMetaTags';

const Videos = () => {
  const { cmsContent } = useCMSContent('videos');

  // SEO Hook
  useMetaTags(
    cmsContent['_seo'] || {
      title: 'Videos | We Care Freedom Wealth',
      description:
        'Watch our latest videos on SIP, mutual funds, tax planning, insurance, and market analysis.',
      robotsTag: 'index, follow',
    },
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // YouTube API Configuration - Updated with your credentials
  const YOUTUBE_API_KEY = "AIzaSyC2Ipc357Zm_TffHwDw5p_YBClyMYgT3vc";
  const PLAYLIST_ID = "UUADuni6S-18E2haTHUwkunA"; // Channel uploads playlist ID

  const categories = ['All', 'Latest Upload', 'SIP & Mutual Funds', 'Tax Solution', 'Insurance', 'Retirement Solution', 'Market Analysis'];

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

  const staticVideos = React.useMemo(() => [
    {
      id: 1,
      title: "Organize Your Money - Live the lifestyle you want | Nikhil Thakkar",
      thumbnail: "https://img.youtube.com/vi/srALW6zLb0k/maxresdefault.jpg",
      videoId: "srALW6zLb0k",
      category: "SIP & Mutual Funds",
      duration: "10:05",
      views: "1.2K",
      uploadDate: "2 days ago"
    },
    {
      id: 2,
      title: "Quarterly? Yearly? Review your Wealth Portfolio!",
      thumbnail: "https://img.youtube.com/vi/SuZCNYfqgQE/maxresdefault.jpg",
      videoId: "SuZCNYfqgQE",
      category: "Market Analysis",
      duration: "8:45",
      views: "850",
      uploadDate: "5 days ago"
    },
    {
      id: 3,
      title: "Personal Financial Organizer kya hai aur kyu Zaroori Hai?",
      thumbnail: "https://img.youtube.com/vi/XiLaDj23jHI/maxresdefault.jpg",
      videoId: "XiLaDj23jHI",
      category: "SIP & Mutual Funds",
      duration: "12:30",
      views: "2.5K",
      uploadDate: "1 week ago"
    },
    {
      id: 4,
      title: "What is SIF? | Everything You Need to Know | Nikhil Thakkar",
      thumbnail: "https://img.youtube.com/vi/fwW22NEA3fA/maxresdefault.jpg",
      videoId: "fwW22NEA3fA",
      category: "SIP & Mutual Funds",
      duration: "15:20",
      views: "3.1K",
      uploadDate: "2 weeks ago"
    },
    {
      id: 5,
      title: "Safeguard Wealth Through DigiLocker | Nikhil Thakkar",
      thumbnail: "https://img.youtube.com/vi/SEK4OPFxmws/maxresdefault.jpg",
      videoId: "SEK4OPFxmws",
      category: "Insurance",
      duration: "6:15",
      views: "900",
      uploadDate: "3 weeks ago"
    },
    {
      id: 6,
      title: "Diwali Picks 2024 | Nikhil Thakkar | We Care Freedom Wealth",
      thumbnail: "https://img.youtube.com/vi/g4AZe-tF4Vw/maxresdefault.jpg",
      videoId: "g4AZe-tF4Vw",
      category: "Market Analysis",
      duration: "18:00",
      views: "5.4K",
      uploadDate: "1 month ago"
    }
  ], []);

  // Function to fetch video details including duration
  const fetchVideoDetails = async (videoIds) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            part: 'contentDetails,statistics',
            id: videoIds.join(','),
            key: YOUTUBE_API_KEY,
          },
        }
      );

      return response.data.items;
    } catch (err) {
      console.error("Error fetching video details:", err);
      return [];
    }
  };

  // Format duration from ISO 8601
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "Live";

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format view count
  const formatViewCount = (views) => {
    const num = parseInt(views);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        // First, fetch videos from playlist
        const playlistResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: 'snippet',
              maxResults: 12,
              playlistId: PLAYLIST_ID,
              key: YOUTUBE_API_KEY,
            },
          }
        );

        if (playlistResponse.data.items.length === 0) {
          throw new Error("No videos found in playlist");
        }

        // Extract video IDs for detailed info
        const videoIds = playlistResponse.data.items.map(item =>
          item.snippet.resourceId.videoId
        );

        // Fetch video details (duration and views)
        const videoDetails = await fetchVideoDetails(videoIds);

        // Map data with enhanced information
        const fetchedVideos = playlistResponse.data.items.map((item, index) => {
          const videoDetail = videoDetails.find(v => v.id === item.snippet.resourceId.videoId);
          const duration = videoDetail ? formatDuration(videoDetail.contentDetails.duration) : "Live";
          const views = videoDetail ? formatViewCount(videoDetail.statistics.viewCount) : "New";

          // Auto-categorize based on title keywords
          const title = item.snippet.title.toLowerCase();
          let category = "Latest Upload";

          if (title.includes('sip') || title.includes('mutual') || title.includes('sif')) {
            category = "SIP & Mutual Funds";
          } else if (title.includes('tax') || title.includes('solution')) {
            category = "Tax Solution";
          } else if (title.includes('insurance') || title.includes('safeguard')) {
            category = "Insurance";
          } else if (title.includes('retirement') || title.includes('pension')) {
            category = "Retirement Solution";
          } else if (title.includes('market') || title.includes('analysis') || title.includes('diwali')) {
            category = "Market Analysis";
          }

          return {
            id: item.id || index,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
            videoId: item.snippet.resourceId.videoId,
            category: category,
            duration: duration,
            views: views,
            uploadDate: timeAgo(item.snippet.publishedAt)
          };
        });

        // Combine fetched videos with static ones for fallback
        const allVideos = fetchedVideos.length > 0 ? fetchedVideos : staticVideos;

        // Remove duplicates based on videoId
        const uniqueVideos = allVideos.filter((video, index, self) =>
          index === self.findIndex((v) => v.videoId === video.videoId)
        );

        setVideos(uniqueVideos);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setVideos(staticVideos);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [staticVideos]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#f8fafc]">
      {/* Cinematic Light Header */}
      <section
        className="relative min-h-[min(65vh,520px)] flex items-center overflow-hidden pt-16 pb-8"
        style={{
          backgroundImage: 'linear-gradient(135deg, #ffe5bd 0%, #fffdf7 35%, #c7f1ff 100%)'
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-3 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-2 rounded-full mb-8"
              >
                <FaTv className="text-orange-600 text-sm" />
                <span className="text-orange-900 font-bold text-xs uppercase tracking-[0.2em]">Financial Broadcast</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                Watch & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Prosper.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl mb-12 font-medium">
                Unlock wealth architecture through masterclasses and market analysis from Nikhil Thakkar. Knowledge is the ultimate asset.
              </p>

              <div className="flex flex-wrap gap-10">
                <div className="flex flex-col">
                  <span className="text-slate-900 text-3xl font-black">100+</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Masterclasses</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-orange-600 text-3xl font-black">10k+</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Viewers Pulse</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden lg:block relative"
            >
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-12 rounded-[4rem] shadow-2xl relative z-10 overflow-hidden">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-orange-500 shadow-xl">
                    <FaVideo className="text-3xl" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-xl leading-tight">Advisor-Led <br /> Masterclasses</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Institutional Standard</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20 relative z-20">


        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] p-8 sm:p-12 border border-slate-100 mb-20"
        >
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5">
              <div className="relative group">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-orange-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 pl-14 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all font-bold text-slate-800 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-7 flex overflow-x-auto no-scrollbar gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[400px]">
          {loading ? (
            <CardSkeleton count={6} />
          ) : filteredVideos.length > 0 ? (
            filteredVideos.map((video, idx) => (
              <motion.div
                key={`${video.id}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
              >
                <div className="h-64 relative overflow-hidden bg-slate-900">
                  <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
                    alt={video.title}
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-900/40">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500 hover:bg-orange-700"
                    >
                      <FaPlay className="ml-1" />
                    </a>
                  </div>
                  <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white flex items-center uppercase tracking-widest">
                    <FaClock className="mr-2 text-orange-500" /> {video.duration}
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest shadow-sm">
                      {video.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <h4 className="text-xl font-black text-slate-900 mb-8 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight uppercase tracking-tight">
                    {video.title}
                  </h4>
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center">
                      <FaEye className="mr-2 text-orange-600" /> {video.views} views
                    </span>
                    <span>{video.uploadDate}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500 font-bold uppercase tracking-widest">
              No videos found matching your search.
            </div>
          )}
        </div>

        {/* YouTube Subscribe Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-slate-900 rounded-[4rem] p-12 sm:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/50"
        >
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="relative z-10">
            <FaYoutube className="text-red-500 text-7xl mx-auto mb-10" />
            <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight uppercase tracking-tight">
              The Wealth <br /> Broadcast Protocol
            </h2>
            <p className="text-slate-400 text-xl mb-14 max-w-2xl mx-auto font-medium">
              Join our network of elite investors and never miss a tactical wealth lesson.
              Knowledge is the foundation of sovereignty.
            </p>
            <a
              href="https://youtube.com/@wecarefreedomwealth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-14 py-6 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-2xl group uppercase tracking-widest text-xs"
            >
              Subscribe on YouTube <FaArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </a>
            <p className="text-slate-500 text-sm mt-8">
              <strong>We Care Freedom Wealth Pvt. Ltd.</strong> -
              Educating and helping accomplish individuals' financial dreams into goals and goals into reality.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Videos;