import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Podcast,
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Share2,
  Twitter,
  MessageCircle,
  Send as Telegram,
  Copy,
  Sun,
  Moon,
  LogOut,
  Music,
  Music2,
  Play,
  Youtube,
  User,
  Settings,
  ChevronDown,
  FileText,
  Sparkles,
  BookOpen,
  Download,
  Eye,
  X,
} from "lucide-react";
import { PodcastAsset, UserSession } from "../types";
import { PosterBlueprint } from "../components/PosterBlueprint";
import { ArticleDigest } from "../components/ArticleDigest";
import { ThumbnailLayout } from "../components/ThumbnailLayout";
import { InteractiveButton } from "../components/InteractiveButton";
import InsightsSection from "../components/InsightsSection";
import { SwipeTabs } from "../components/SwipeTabs";
import { EPISODE_TITLE } from "../constants/content";

import videoThumbnail from "../assets/video thumbnail.jpg";

const videoThumbnailSrc = (videoThumbnail as unknown as { src?: string }).src ?? "../../assets/video thumbnail.jpg";

// NOTE: Dashboard.tsx is intentionally large; keep local test comments outside imports.

interface DashboardProps {
  session: UserSession;
  onLogout: () => void;
  onToast: (msg: string) => void;

  podcasts: PodcastAsset[];
  setPodcasts: React.Dispatch<React.SetStateAction<PodcastAsset[]>>;
  selectedPodcastId: string;
  setSelectedPodcastId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: "article" | "poster" | "video";
  setActiveTab: (tab: "article" | "poster" | "video") => void;
  articleExpanded: boolean;
  setArticleExpanded: (expanded: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioProgress: number;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}


const renderPosterImageMockup = (
  podcast: PodcastAsset,
  isLarge: boolean,
  theme: "dark" | "light"
) => {
  // ── DARK MODE: rich translucent gradients (unchanged) ──
  let gradientClasses = "from-violet-600/30 via-violet-950/20 to-indigo-950/40";
  let accentColor = "text-brand-purple";

  if (podcast.id.includes("2")) {
    gradientClasses = "from-amber-600/30 via-amber-950/20 to-orange-950/40";
    accentColor = "text-amber-500";
  } else if (podcast.id.includes("3")) {
    gradientClasses = "from-emerald-600/30 via-emerald-950/20 to-teal-950/40";
    accentColor = "text-emerald-500";
  } else if (podcast.id.includes("4")) {
    gradientClasses = "from-sky-600/30 via-sky-950/20 to-blue-950/40";
    accentColor = "text-sky-500";
  } else if (podcast.id.includes("5")) {
    gradientClasses = "from-fuchsia-600/30 via-fuchsia-950/20 to-purple-950/40";
    accentColor = "text-fuchsia-500";
  } else if (podcast.id.includes("6")) {
    gradientClasses = "from-teal-600/30 via-teal-950/20 to-emerald-950/40";
    accentColor = "text-teal-500";
  } else if (podcast.id.includes("8")) {
    gradientClasses = "from-red-600/30 via-red-950/20 to-rose-950/40";
    accentColor = "text-red-500";
  } else if (podcast.id.includes("9")) {
    gradientClasses = "from-rose-600/30 via-rose-950/20 to-pink-950/40";
    accentColor = "text-rose-500";
  } else if (podcast.id.includes("10")) {
    gradientClasses = "from-yellow-600/30 via-amber-950/20 to-slate-950/40";
    accentColor = "text-amber-400";
  }

  // ── LIGHT MODE: fully opaque solid pastel gradients — no /XX alpha suffixes ──
  // FIX: removed all /50, /60, /70, /80 alpha modifiers that were making card
  // backgrounds semi-transparent and bleeding the doodle layer through them.
  if (theme === "light") {
    if (podcast.id.includes("2")) {
      gradientClasses = "from-amber-50 to-amber-100";
    } else if (podcast.id.includes("3")) {
      gradientClasses = "from-emerald-50 to-emerald-100";
    } else if (podcast.id.includes("4")) {
      gradientClasses = "from-sky-50 to-sky-100";
    } else if (podcast.id.includes("5")) {
      gradientClasses = "from-fuchsia-50 to-fuchsia-100";
    } else if (podcast.id.includes("6")) {
      gradientClasses = "from-teal-50 to-teal-100";
    } else if (podcast.id.includes("8")) {
      gradientClasses = "from-red-50 to-red-100";
    } else if (podcast.id.includes("9")) {
      gradientClasses = "from-rose-50 to-rose-100";
    } else if (podcast.id.includes("10")) {
      gradientClasses = "from-amber-50 to-orange-100";
    } else {
      gradientClasses = "from-violet-50 to-violet-100";
    }
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border transition-all duration-300 flex items-center justify-center shrink-0 ${
        theme === "dark" ? "bg-dark-bg border-dark-border" : "bg-slate-50 border-slate-200"
      } ${isLarge ? "h-[220px] sm:h-[340px] w-full" : "h-[70px] w-[100px]"}`}
    >
      {/* Dynamic Background Gradients
          FIX: removed `opacity-80` — the gradient div is now fully opaque so the
          card interior is not washed out or see-through in light mode. */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses}`} />

      {/* Blueprint Grid Mesh Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Decorative layout ticks */}
      {isLarge && (
        <>
          <div className="absolute top-3 left-3 font-mono text-[9px] text-zinc-500 select-none">
            ⌖ DESIGN MATRIX // 43.1
          </div>
          <div className="absolute bottom-3 left-3 font-mono text-[9px] text-zinc-400 select-none font-bold">
            RAW BLUEPRINT DESIGN
          </div>
          <div className="absolute top-3 right-3 font-mono text-[9px] text-zinc-500 select-none">
            EP-{podcast.id.includes("10") ? "10" : "0" + (podcast.id.split("-")[1] || "INSIGHT")}
          </div>
        </>
      )}

      {/* Vector Artwork Illustration centered */}
      <div className="relative z-10 flex items-center justify-center p-3">
        {podcast.id.includes("2") ? (
          <svg
            className={`${isLarge ? "w-28 h-28" : "w-10 h-10"} ${accentColor} opacity-75`}
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <polygon points="100,30 160,70 160,140 100,185 40,140 40,70" strokeDasharray="4,4" />
            <polygon points="100,50 140,80 140,130 100,160 60,130 60,80" />
            <line x1="100" y1="30" x2="100" y2="185" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="15" />
          </svg>
        ) : podcast.id.includes("3") ? (
          <svg
            className={`${isLarge ? "w-28 h-28" : "w-10 h-10"} ${accentColor} opacity-75`}
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <rect x="50" y="50" width="100" height="100" rx="15" />
            <rect x="65" y="65" width="70" height="70" rx="8" strokeDasharray="3,3" />
            <circle cx="100" cy="100" r="22" />
            <path
              d="M 85,100 L 95,110 L 120,85"
              strokeWidth="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className={`${isLarge ? "w-28 h-28" : "w-10 h-10"} ${accentColor} opacity-75`}
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="100" cy="100" r="75" strokeDasharray="2,2" />
            <circle cx="100" cy="100" r="45" />
            <path d="M 30,100 L 170,100 M 100,30 L 100,170" strokeDasharray="3,3" />
            <circle cx="100" cy="100" r="5" fill="currentColor" />
          </svg>
        )}
      </div>

      {/* Floating design details inside Large Poster Image */}
      {isLarge && (
        <div className="absolute inset-x-0 bottom-4 px-6 flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 font-bold block">
              MODEL SPECIFICATION
            </span>
            <span
              className={`text-[11px] font-mono leading-none tracking-tight ${
                theme === "dark" ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {podcast.poster.themeStyle.toUpperCase()} PRESET SCALE
            </span>
          </div>
          <div className="h-6 w-12 border border-zinc-500/20 rounded flex items-center justify-center font-mono text-[9px] text-zinc-400 font-bold select-none">
            vector.ai
          </div>
        </div>
      )}
    </div>
  );
};

const getYoutubeId = (url?: string) => {
  if (!url) return "";
  const regExp = /^.*(youtube\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

export const Dashboard: React.FC<DashboardProps> = ({
  session,
  onLogout,
  onToast,
  podcasts,
  setPodcasts,
  selectedPodcastId,
  setSelectedPodcastId,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  articleExpanded,
  setArticleExpanded,
  isPlaying,
  setIsPlaying,
  audioProgress,
  theme,
  setTheme,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    "insight-1-inspiration-systems",
  ]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEpisodeSelectorOpen, setIsEpisodeSelectorOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const episodeSelectorRef = useRef<HTMLDivElement>(null);

  const [downloadingResourceMap, setDownloadingResourceMap] = useState<Record<string, number>>({});

  const triggerResourceDownload = (
    resourceId: string,
    resourceName: string,
    fileType: string,
    contentGenerator: () => string
  ) => {
    if (downloadingResourceMap[resourceId] !== undefined) return;

    onToast("Preparing download.");
    setDownloadingResourceMap((prev) => ({ ...prev, [resourceId]: 5 }));

    setTimeout(() => {
      setDownloadingResourceMap((prev) => ({ ...prev, [resourceId]: 35 }));
    }, 300);

    setTimeout(() => {
      setDownloadingResourceMap((prev) => ({ ...prev, [resourceId]: 70 }));
    }, 700);

    setTimeout(() => {
      setDownloadingResourceMap((prev) => ({ ...prev, [resourceId]: 95 }));
    }, 1100);

    setTimeout(() => {
      try {
        const fileContent = contentGenerator();
        const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = `${activePodcast?.id || "resource"}-${resourceId}.${fileType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);

        onToast("Download complete.");
        setDownloadingResourceMap((prev) => ({ ...prev, [resourceId]: 100 }));
      } catch {
        onToast("Download failed.");
      }

      setTimeout(() => {
        setDownloadingResourceMap((prev) => {
          const next = { ...prev };
          delete next[resourceId];
          return next;
        });
      }, 1500);
    }, 1400);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (episodeSelectorRef.current && !episodeSelectorRef.current.contains(event.target as Node)) {
        setIsEpisodeSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hr = new Date().getHours();
    const next = hr < 12 ? "Good Morning" : hr < 18 ? "Good Afternoon" : "Good Evening";
    setGreeting(next);
    console.log("Greeting:", next);
  }, []);

  const firstName = session?.username ? session.username.trim().split(" ")[0] : "User";

  const activePodcast = podcasts.find((p) => p.id === selectedPodcastId);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("castsketch_scroll_y", window.scrollY.toString());
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedScrollY = localStorage.getItem("castsketch_scroll_y");
    if (!savedScrollY) return;

    const targetY = parseFloat(savedScrollY);
    if (isNaN(targetY)) return;

    window.scrollTo(0, targetY);
    const t1 = setTimeout(() => window.scrollTo(0, targetY), 100);
    const t2 = setTimeout(() => window.scrollTo(0, targetY), 300);
    const t3 = setTimeout(() => window.scrollTo(0, targetY), 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchBlur = () => {
    if (!searchQuery) setIsSearchExpanded(false);
  };

  const filteredPodcasts = podcasts.filter((podcast) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      podcast.title.toLowerCase().includes(q) ||
      podcast.creatorName.toLowerCase().includes(q) ||
      podcast.category.toLowerCase().includes(q)
    );
  });

  const handleSelectPodcast = (podcastId: string) => setSelectedPodcastId(podcastId);

  const handleShareTrigger = (
    platform: "X" | "WhatsApp" | "Telegram" | "Copy",
    podcast: PodcastAsset,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const text = `Check out this gorgeous visual companion of: "${podcast.title}" by ${podcast.creatorName}`;
    const url = podcast.sourceUrl;

    if (platform === "X") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "WhatsApp") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
        "_blank"
      );
    } else if (platform === "Telegram") {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank"
      );
    } else {
      navigator.clipboard?.writeText(url);
      onToast("Link copied.");
    }

    setActiveShareId(null);
  };

  const handleVideoDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/video thumbnail.jpg";
    link.download = "podcast-video-thumbnail.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast("Download complete.");
  };

  const handleVideoShare = async () => {
    const shareText = EPISODE_TITLE;

    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: EPISODE_TITLE,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // fall back to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-6" id="dashboard-mount">
      <header
        className="py-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-6 transition-all min-w-0 overflow-hidden"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-brand-purple whitespace-normal">
              Welcome to Podcast Visualizer
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-3">

            <motion.div
              className="overflow-hidden"
              initial={false}
              animate={{ width: isSearchFocused ? "240px" : "0px", opacity: isSearchFocused ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-10">
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setIsSearchExpanded(false)}
                  placeholder="Search"
                  className={`h-10 w-full max-w-[240px] px-3 text-sm outline-none rounded-xl border shadow-sm transition-all min-w-0 ${theme === "dark"
                      ? "bg-dark-surface border-dark-border text-slate-200 placeholder:text-slate-500"
                      : "bg-white border-slate-200 text-slate-700 placeholder:text-slate-400"}`} />
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => {
                const next = !isSearchFocused;
                setIsSearchFocused(next);
                setIsSearchExpanded(next);
              }}
              className={`btn btn-icon border rounded-xl shadow-sm transition-all cursor-pointer ${
                theme === "dark"
                  ? "btn-dark bg-dark-surface hover:bg-dark-bg border-dark-border text-brand-purple"
                  : "btn-light hover:bg-slate-50 border-light-border text-slate-600 hover:text-brand-purple"}
                `}
              title="Search"
              aria-label="Search"
              id="header-search-toggle"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const nextStyle = theme === "dark" ? "light" : "dark";
                setTheme(nextStyle);
              }}
              className={`btn btn-icon border rounded-xl shadow-sm transition-all cursor-pointer ${
                theme === "dark"
                  ? "btn-dark bg-dark-surface hover:bg-dark-bg border-dark-border text-brand-purple"
                  : "btn-light hover:bg-slate-50 border-light-border text-slate-600 hover:text-brand-purple"}
              `}
              title="Toggle color theme"
              id="theme-mode-toggle"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <SwipeTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToast={onToast}
        podcasts={podcasts}
        selectedPodcastId={selectedPodcastId}
        setSelectedPodcastId={setSelectedPodcastId}
        onDownload={handleVideoDownload}
        onShare={handleVideoShare}
      />

      <footer className="mt-20 border-t border-transparent pt-8 pb-12" />
    </div>
  );
};
