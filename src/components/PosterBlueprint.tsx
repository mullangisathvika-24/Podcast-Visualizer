import React, { useState } from "react";
import { Download, Share2, Sparkles, ChevronLeft, ChevronRight, Play, Music, LayoutGrid, Eye } from "lucide-react";
import { PodcastAsset } from "../types";
import { InteractiveButton } from "./InteractiveButton";

const renderVectorGraphic = (id: string) => {
  switch (id) {
    case "insight-1-inspiration-systems":
    case "insight-7-agency-ecosystem":
      return (
        <svg className="w-80 h-80 text-violet-500/20" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="80" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" strokeDasharray="1,2" />
          <path d="M 20,100 L 180,100 M 100,20 L 100,180" strokeWidth="0.25" strokeDasharray="5,5" />
          <path d="M 43,43 L 157,157 M 43,157 L 157,43" strokeWidth="0.25" strokeDasharray="5,5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const x = 100 + Math.cos(angle) * 60;
            const y = 100 + Math.sin(angle) * 60;
            return <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" fillOpacity="0.4" />;
          })}
        </svg>
      );
    case "insight-2-strategic-alliances":
      return (
        <svg className="w-80 h-80 text-amber-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75">
          <polygon points="100,30 160,70 160,140 100,185 40,140 40,70" strokeDasharray="4,4" />
          <polygon points="100,50 140,80 140,130 100,160 60,130 60,80" />
          <line x1="100" y1="30" x2="100" y2="185" strokeWidth="0.5" />
          <line x1="40" y1="70" x2="160" y2="140" strokeWidth="0.5" />
          <line x1="160" y1="70" x2="40" y2="140" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="10" strokeWidth="1" />
          <circle cx="100" cy="30" r="4" fill="currentColor" />
          <circle cx="160" cy="70" r="4" fill="currentColor" />
          <circle cx="160" cy="140" r="4" fill="currentColor" />
          <circle cx="100" cy="185" r="4" fill="currentColor" />
          <circle cx="40" cy="140" r="4" fill="currentColor" />
          <circle cx="40" cy="70" r="4" fill="currentColor" />
        </svg>
      );
    case "insight-3-derisk-yes":
      return (
        <svg className="w-80 h-80 text-emerald-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75">
          <rect x="50" y="50" width="100" height="100" rx="15" />
          <rect x="65" y="65" width="70" height="70" rx="8" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="22" strokeWidth="1" />
          <path d="M 100,60 L 100,78 M 100,122 L 100,140 M 60,100 L 78,100 M 122,100 L 140,100" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="3" fill="currentColor" />
          <path d="M 85,100 L 95,110 L 120,85" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "insight-4-unserved-problems":
      return (
        <svg className="w-80 h-80 text-sky-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="75" strokeDasharray="1,4" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="130" cy="70" r="25" />
          <circle cx="130" cy="70" r="1.5" fill="currentColor" />
          <line x1="100" y1="100" x2="130" y2="70" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="4" fill="currentColor" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const x = 100 + Math.cos(angle) * 50;
            const y = 100 + Math.sin(angle) * 50;
            return <line key={i} x1={100} y1={100} x2={x} y2={y} strokeWidth="0.25" strokeDasharray="2,2" />;
          })}
        </svg>
      );
    case "insight-5-sell-outcomes":
      return (
        <svg className="w-80 h-80 text-violet-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="20" strokeWidth="1.5" />
          <polygon points="100,100 135,65 125,55 150,50 145,75 135,65" fill="currentColor" strokeWidth="0.5" />
          <line x1="20" y1="180" x2="100" y2="100" strokeWidth="0.5" strokeDasharray="4,4" />
        </svg>
      );
    case "insight-6-follower-advantage":
      return (
        <svg className="w-80 h-80 text-teal-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M 100,100 Q 100,50 150,50 M 100,100 Q 50,100 50,150 M 100,100 Q 150,100 150,150 M 100,100 Q 100,150 50,50" strokeWidth="0.25" strokeDasharray="2,2" />
          <circle cx="100" cy="100" r="10" />
          <circle cx="100" cy="100" r="30" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="70" strokeDasharray="6,6" />
          <circle cx="100" cy="100" r="4" fill="currentColor" />
        </svg>
      );
    case "insight-8-operational-risk":
      return (
        <svg className="w-80 h-80 text-red-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75">
          <polygon points="100,20 180,160 20,160" />
          <polygon points="100,45 160,150 40,150" strokeDasharray="3,3" />
          <line x1="100" y1="75" x2="100" y2="115" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="100" cy="132" r="1.5" fill="currentColor" />
          <path d="M 10,100 L 190,100 M 100,10 L 100,190" strokeWidth="0.25" strokeDasharray="4,4" />
        </svg>
      );
    case "insight-9-creative-freedom":
      return (
        <svg className="w-80 h-80 text-rose-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75">
          <path d="M 30,100 C 60,60 140,60 170,100" />
          <path d="M 30,110 C 60,70 140,70 170,110" strokeDasharray="3,3" />
          <path d="M 30,90 C 60,50 140,50 170,90" strokeDasharray="2,2" />
          <path d="M 100,30 C 100,30 110,65 100,100 C 90,135 100,170 100,170" strokeWidth="0.5" />
          <circle cx="100" cy="95" r="8" />
          <polygon points="100,80 112,95 88,95" fill="currentColor" strokeWidth="0.5" />
        </svg>
      );
    case "insight-10-capital-fuel":
      return (
        <svg className="w-80 h-80 text-amber-500/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75">
          <path d="M 100,180 L 100,30 M 70,170 L 70,70 M 130,170 L 130,70" strokeWidth="0.5" strokeDasharray="4,4" />
          <circle cx="100" cy="30" r="3" fill="currentColor" />
          <line x1="50" y1="180" x2="150" y2="180" strokeWidth="1" />
          <path d="M 100,180 Q 95,140 100,110 Q 105,140 100,180 Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M 100,180 Q 80,110 100,60 Q 120,110 100,180 Z" strokeWidth="0.5" />
          <path d="M 70,170 Q 60,120 70,90 Q 80,120 70,170 Z" strokeWidth="0.5" fill="currentColor" fillOpacity="0.1" />
          <path d="M 130,170 Q 120,120 130,90 Q 140,120 130,170 Z" strokeWidth="0.5" fill="currentColor" fillOpacity="0.1" />
        </svg>
      );
    default:
      return (
        <svg className="w-80 h-80 text-brand-purple/15" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="35" strokeDasharray="3,3" />
          <line x1="30" y1="30" x2="170" y2="170" strokeWidth="0.25" />
          <line x1="30" y1="170" x2="170" y2="30" strokeWidth="0.25" />
        </svg>
      );
  }
};

const renderHighlightedSlogan = (slogan: string) => {
  const words = slogan.split(" ");
  return words.map((word, idx) => {
    const cleanWord = word.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    let highlightedClass = "";
    let customShadow = "";

    if (cleanWord === "GUARDRAILS") {
      highlightedClass = "text-red-500 font-extrabold";
      customShadow = "0 0 16px rgba(239, 68, 68, 0.4)";
    } else if (cleanWord === "SYSTEMS") {
      highlightedClass = "text-violet-400 font-extrabold";
      customShadow = "0 0 16px rgba(167, 139, 250, 0.4)";
    } else if (cleanWord === "INSPIRATION" || cleanWord === "MOTIVATION") {
      highlightedClass = "text-violet-400 font-extrabold";
      customShadow = "0 0 16px rgba(167, 139, 250, 0.4)";
    } else if (cleanWord === "ALLIANCES") {
      highlightedClass = "text-amber-400 font-extrabold";
      customShadow = "0 0 16px rgba(251, 191, 36, 0.4)";
    } else if (cleanWord === "YES" || cleanWord === "EASY") {
      highlightedClass = "text-emerald-400 font-extrabold";
      customShadow = "0 0 16px rgba(16, 185, 129, 0.4)";
    } else if (cleanWord === "IGNORED") {
      highlightedClass = "text-orange-400 font-extrabold";
      customShadow = "0 0 16px rgba(249, 115, 22, 0.4)";
    } else if (cleanWord === "OUTCOMES") {
      highlightedClass = "text-purple-400 font-extrabold";
      customShadow = "0 0 16px rgba(139, 92, 246, 0.4)";
    } else if (cleanWord === "TRUST" || cleanWord === "REVENUE") {
      highlightedClass = "text-cyan-400 font-extrabold";
      customShadow = "0 0 16px rgba(6, 182, 212, 0.4)";
    } else if (cleanWord === "CONVERT" || cleanWord === "LESS" || cleanWord === "MORE") {
      highlightedClass = "text-rose-400 font-extrabold";
      customShadow = "0 0 16px rgba(244, 63, 94, 0.4)";
    } else if (cleanWord === "FUEL" || cleanWord === "DESTINATION") {
      highlightedClass = "text-amber-400 font-extrabold";
      customShadow = "0 0 16px rgba(245, 158, 11, 0.4)";
    } else if (cleanWord === "HOURS" || cleanWord === "HOURLY") {
      highlightedClass = "text-amber-500 font-extrabold";
      customShadow = "0 0 16px rgba(245, 158, 11, 0.4)";
    }

    if (highlightedClass !== "") {
      return (
        <span key={idx} className={highlightedClass} style={{ textShadow: customShadow }}>
          {word}{" "}
        </span>
      );
    }
    return <span key={idx}>{word} </span>;
  });
};

interface PosterBlueprintProps {
  podcast: PodcastAsset;
  podcasts: PodcastAsset[];
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioProgress: number;
  onToast: (msg: string) => void;
  theme?: "dark" | "light";
  onUpdatePodcast?: (updatedData: Partial<PodcastAsset>) => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
  onSelectIndex?: (index: number) => void;
  searchQuery?: string;
}

export const PosterBlueprint: React.FC<PosterBlueprintProps> = ({
  podcast,
  podcasts,
  isPlaying,
  setIsPlaying,
  audioProgress,
  onToast,
  theme = "dark",
  onUpdatePodcast,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
  onSelectIndex,
  searchQuery = ""
}) => {
  const isLight = theme === "light";
  const [posterMode, setPosterMode] = useState<"artwork" | "takeaways">("artwork");
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'downloading' | 'completed'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handlePosterDownload = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('preparing');
    setDownloadProgress(12);
    onToast("Initiating companion vector design download pipeline... 🌐");

    setTimeout(() => {
      setDownloadState('downloading');
      setDownloadProgress(45);
    }, 450);

    setTimeout(() => {
      setDownloadProgress(75);
    }, 900);

    setTimeout(() => {
      setDownloadProgress(92);
    }, 1300);

    setTimeout(() => {
      try {
        const svgHeader = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="800" height="1200" style="background:#09090b; font-family:system-ui, -apple-system, sans-serif;">
  <rect width="800" height="1200" fill="#09090b"/>
  <rect x="40" y="40" width="720" height="1120" rx="24" fill="none" stroke="#27272a" stroke-width="2"/>
  
  <text x="80" y="120" fill="#8B5CF6" font-size="14" font-weight="900" letter-spacing="4">FIGURING OUT BLUEPRINTS</text>
  <text x="80" y="175" fill="#ffffff" font-size="36" font-weight="900" letter-spacing="-1">${(podcast.title || "EPISODE ANALYSIS").toUpperCase()}</text>
  <text x="80" y="210" fill="#71717a" font-size="15" font-weight="500">By ${podcast.creatorName || "Julian Vance"}</text>

  <!-- Graphic canvas spacer -->
  <rect x="80" y="260" width="640" height="360" rx="16" fill="#18181b" stroke="#27272a" stroke-width="1"/>
  <circle cx="400" cy="440" r="100" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="400" cy="440" r="60" fill="none" stroke="#4F46E5" stroke-width="2" stroke-opacity="0.6"/>
  <circle cx="400" cy="440" r="20" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.2"/>
  
  <text x="400" y="445" fill="#3f3f46" font-size="140" font-weight="900" text-anchor="middle" dominant-baseline="middle">EP${currentIndex !== undefined ? currentIndex + 1 : 1}</text>

  <!-- Takeaways Title -->
  <text x="80" y="690" fill="#ffffff" font-size="20" font-weight="bold" letter-spacing="1">CRITICAL BLUEPRINT TAKEAWAYS</text>
  <line x1="80" y1="705" x2="720" y2="705" stroke="#27272a" stroke-width="2"/>
  
  <!-- Takeaway bullet elements -->
  <text x="80" y="750" fill="#8B5CF6" font-size="16" font-weight="900">TAKEAWAY #1</text>
  <text x="210" y="750" fill="#e4e4e7" font-size="14" font-weight="bold">${(podcast.poster.takeaways?.[0] || 'Uncover underserved problems of customers').replace(/["'<>]/g, '')}</text>

  <text x="80" y="830" fill="#8B5CF6" font-size="16" font-weight="900">TAKEAWAY #2</text>
  <text x="210" y="830" fill="#e4e4e7" font-size="14" font-weight="bold">${(podcast.poster.takeaways?.[1] || 'Optimize operational and capital design models').replace(/["'<>]/g, '')}</text>

  <text x="80" y="910" fill="#8B5CF6" font-size="16" font-weight="900">TAKEAWAY #3</text>
  <text x="210" y="910" fill="#e4e4e7" font-size="14" font-weight="bold">${(podcast.poster.takeaways?.[2] || 'Scale systems with standard compliance mechanisms').replace(/["'<>]/g, '')}</text>

  <!-- Footer elements -->
  <text x="80" y="1110" fill="#3f3f46" font-size="11" font-weight="800" letter-spacing="1">HIGH-RESOLUTION DESK COMPANION CANVAS</text>
  <text x="720" y="1110" fill="#3f3f46" font-size="11" font-weight="800" text-anchor="end">DIGITAL SOURCE: SPOTIFY / YOUTUBE</text>
</svg>
`;

        const blob = new Blob([svgHeader], { type: "image/svg+xml;charset=utf-8" });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = `${podcast.id}-vector-poster-blueprint.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
        
        setDownloadProgress(100);
        setDownloadState('completed');
        onToast("High-resolution Vector Poster downloaded! 📥🎨");
      } catch (err) {
        console.error("Download fail:", err);
        onToast("Error rendering companion file down to path.");
        setDownloadState('idle');
      }

      setTimeout(() => {
        setDownloadState('idle');
        setDownloadProgress(0);
      }, 2000);
    }, 1800);
  };

  // Background presets for the poster
  const BACKGROUND_THEMES = [
    { name: "Midnight Obsidian", value: "Midnight Obsidian background with sharp violet neon lines and electric purple highlighting." },
    { name: "Emerald Vector", value: "Satin mint-emerald theme with laser-glowing nodes and digital mesh alignments." },
    { name: "Indigo Velvet", value: "Royal deep indigo canvas with smooth golden reflections and high contrast display text." },
    { name: "Sunrise Coral", value: "Warm coral and golden amber radial gradient elements styled like designer glass." }
  ];

  const handleFieldChange = (field: string, value: any) => {
    if (!onUpdatePodcast) return;

    if (field === "title") {
      onUpdatePodcast({ title: value });
    } else if (field === "creatorName") {
      onUpdatePodcast({ creatorName: value });
    } else if (field === "caption") {
      onUpdatePodcast({
        poster: {
          ...podcast.poster,
          caption: value
        }
      });
    } else if (field === "themeStyle") {
      onUpdatePodcast({
        poster: {
          ...podcast.poster,
          themeStyle: value
        }
      });
    } else if (field === "artworkUrl") {
      onUpdatePodcast({ artworkUrl: value });
    }
  };

  const handleTakeawayChange = (index: number, value: string) => {
    if (!onUpdatePodcast) return;
    const updatedTakeaways = [...podcast.poster.takeaways];
    updatedTakeaways[index] = value;
    onUpdatePodcast({
      poster: {
        ...podcast.poster,
        takeaways: updatedTakeaways
      }
    });
  };

  const cycleThemeStyle = () => {
    const currentIndex = BACKGROUND_THEMES.findIndex(t => t.value === podcast.poster.themeStyle);
    const nextIndex = (currentIndex + 1) % BACKGROUND_THEMES.length;
    handleFieldChange("themeStyle", BACKGROUND_THEMES[nextIndex].value);
    onToast(`Theme vibe set to: ${BACKGROUND_THEMES[nextIndex].name}`);
  };

  const activeThemeObj = BACKGROUND_THEMES.find(t => t.value === podcast.poster.themeStyle) || BACKGROUND_THEMES[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto relative" id="posters-workspace">

      {/* Section Heading & Description */}
      <div className="text-center md:text-left space-y-2 mb-4">
        <h3 className={`text-2xl sm:text-3xl font-black font-sans tracking-tight ${
          isLight ? "text-slate-900" : "text-white text-glow"
        }`}>
          Key Insights from Building One Impression
        </h3>
        <p className={`text-xs md:text-sm leading-relaxed max-w-2xl ${
          isLight ? "text-slate-600" : "text-slate-400"
        }`}>
          10 visual lessons on startups, growth, influencer marketing, execution, and scaling distilled from the conversation with Apaksh Gupta.
        </p>
      </div>

      {/* 10 Chronological Visual Poster Cards Selection strip */}
      <div className="space-y-2 select-none mb-6 pt-1" id="poster-navigation-image-cards">
        <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block ${isLight ? "text-slate-600" : "text-slate-400"}`}>
          🎨 Chronological Visual Series:
        </span>
        <div className="flex gap-3 overflow-x-auto pb-4 pt-1.5 scrollbar-thin scrollbar-thumb-brand-purple scrollbar-track-transparent">
          {(() => {
            const findChronologicalIndex = (title: string) => {
              const t = title.toLowerCase();
              if (t.includes("inspiration") || t.includes("system")) return 0;
              if (t.includes("strategic") || t.includes("alliance")) return 1;
              if (t.includes("derisk") || t.includes("yes")) return 2;
              if (t.includes("unserved") || t.includes("problem")) return 3;
              if (t.includes("outcome") || t.includes("capability")) return 4;
              if (t.includes("500") || t.includes("follower")) return 5;
              if (t.includes("agency") || t.includes("ecosystem")) return 6;
              if (t.includes("operational") || t.includes("inexperience") || t.includes("guardrail")) return 7;
              if (t.includes("creative") || t.includes("freedom") || t.includes("conversion") || t.includes("control less")) return 8;
              if (t.includes("capital") || t.includes("fuel") || t.includes("success")) return 9;
              return 10;
            };

            const sortedPodcastsList = [...(podcasts || [])].sort((a, b) => {
              return findChronologicalIndex(a.title) - findChronologicalIndex(b.title);
            });

            return sortedPodcastsList.map((pod, i) => {
              const isCardActive = pod.id === podcast.id;
              const originalIndex = podcasts.findIndex(p => p.id === pod.id);

              return (
                <div
                  key={pod.id}
                  onClick={() => {
                    if (onSelectIndex && originalIndex !== -1) {
                      onSelectIndex(originalIndex);
                    }
                  }}
                  className={`aspect-[3/4] w-20 sm:w-24 shrink-0 rounded-xl relative overflow-hidden cursor-pointer transition-all duration-300 border-2 select-none hover:scale-105 active:scale-95 group ${
                    isCardActive
                      ? "border-brand-purple shadow-lg shadow-brand-purple/20 scale-[1.03]"
                      : isLight 
                        ? "border-transparent hover:border-slate-300"
                        : "border-transparent hover:border-white/20"
                  }`}
                  title={pod.title}
                  id={`image-nav-card-${pod.id}`}
                >
                  <img
                    src={pod.artworkUrl}
                    alt={pod.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-all duration-200" />
                  
                  {/* index label badge */}
                  <div className="absolute top-1.5 left-1.5 bg-black/75 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-white tracking-tight border border-white/5 shadow-sm">
                    #{i + 1}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black via-black/85 to-transparent">
                    <p className="text-[7.5px] leading-snug font-sans font-extrabold text-white line-clamp-2 uppercase">
                      {pod.title}
                    </p>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Centered Poster Canvas Layout */}
      <div className="flex flex-col space-y-6">
        
        {/* Main Visual Poster Cover sheet */}
        <div 
          className={`p-6 sm:p-10 rounded-[32px] border relative overflow-hidden transition-all duration-300 flex-1 flex flex-col justify-between ${
            isLight 
              ? "bg-white border-light-border text-[#18181B] shadow-xl" 
              : "bg-gradient-to-b from-dark-surface to-dark-bg border-dark-border text-white shadow-2xl"
          }`} 
          id="poster-canvas-frame"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-purple via-violet-500 to-indigo-500 dark:to-indigo-800" />

          {/* Centered Left & Right Navigation Arrow Overlays */}
          {onPrev && (
            <button
              onClick={onPrev}
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full backdrop-blur-md shadow-lg border transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center group ${
                isLight 
                  ? "bg-white/80 hover:bg-white border-slate-200 text-slate-700 hover:text-brand-purple" 
                  : "bg-black/60 hover:bg-black/85 border-slate-800 text-slate-200 hover:text-brand-purple"
              }`}
              title="Previous Insight"
              id="center-nav-prev-btn"
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              className={`absolute right-3.5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full backdrop-blur-md shadow-lg border transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center group ${
                isLight 
                  ? "bg-white/80 hover:bg-white border-slate-200 text-slate-700 hover:text-brand-purple" 
                  : "bg-black/60 hover:bg-black/85 border-slate-800 text-slate-200 hover:text-brand-purple"
              }`}
              title="Next Insight"
              id="center-nav-next-btn"
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          )}



          {posterMode === "artwork" ? (
            /* ARTWORK EXHIBITION POSTER VIEW - SIMULATES THE BEAUTIFUL DOWNLOADABLE PRINTS FROM USER PROVIDED IMAGES */
            <div className="relative flex flex-col justify-between flex-1 min-h-[480px] w-full" id="exhibition-render-card">
              
              {/* Dynamic Backdrop Background Image with themed opacity overlay */}
              <div className="absolute inset-x-0 top-0 h-[260px] pointer-events-none overflow-hidden rounded-t-[32px] select-none">
                <img
                  src={podcast.artworkUrl}
                  alt="Poster background artwork"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-10 filter saturate-100 contrast-125 scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${
                  isLight ? "via-[#fdfbf7]/40 to-[#fdfbf7]" : "via-slate-950/40 to-[#060710]"
                }`} />
              </div>

              {/* Fine design grid corners inside poster */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-brand-purple/20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-brand-purple/20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-brand-purple/20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-brand-purple/20 pointer-events-none" />

              {/* Vector blueprint in background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none select-none overflow-hidden scale-75 md:scale-100">
                {renderVectorGraphic(podcast.id)}
              </div>

              {/* Exhibition metadata header */}
              <div className="border-b border-dashed border-slate-300/20 pb-4 mb-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-3 relative z-10 select-none">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <span className="text-[7px] font-black font-mono bg-brand-orange text-white px-2.5 py-0.5 rounded-sm tracking-widest uppercase shadow shadow-brand-orange/20">
                    ONE IMPRESSION PODCAST
                  </span>
                  <span className={`text-[8px] font-mono font-extrabold ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    DIRECTOR EDITION // EP-0{(currentIndex !== undefined ? currentIndex + 1 : 1)}
                  </span>
                </div>
              </div>

              {/* Master Typography Slogan Layout */}
              <div className="my-auto py-12 text-center select-none relative z-10">
                <span className="text-[10px] font-black tracking-[0.25em] text-brand-purple block mb-4 font-mono uppercase">
                  {podcast.category?.toUpperCase() || "GROWTH PROTOCOLS"}
                </span>
                
                {/* Slogan Title */}
                <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] font-display max-w-4xl mx-auto ${
                  isLight ? "text-slate-900" : "text-white text-glow-indigo transition-all duration-300"
                }`}>
                  {renderHighlightedSlogan(podcast.poster.slogan || podcast.title)}
                </h1>
                
                <p className={`text-[10px] sm:text-xs leading-relaxed max-w-xl mx-auto mt-6 italic ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}>
                  "{podcast.poster.caption}"
                </p>
              </div>

              {/* Exhibition Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-end gap-3 pt-4 border-t border-dashed border-slate-300/20 relative z-10 select-none">
                <div className="text-left w-full sm:w-auto">
                  <span className={`text-[6px] font-mono tracking-widest block uppercase ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    GUEST KEYNOTE SPEAKER
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-tight block ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                    {podcast.creatorName}
                  </span>
                </div>
                
                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto gap-0.5">
                  <div className={`h-4 w-24 flex items-end gap-[1.5px] opacity-35 ${isLight ? "text-slate-800" : "text-slate-300"}`}>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="bg-current h-full" style={{ width: i % 3 === 0 ? '3px' : i % 5 === 0 ? '1px' : '1.5px' }} />
                    ))}
                  </div>
                  <span className={`text-[5px] font-mono tracking-widest ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                    *SYSTEMS_FIN_THE_JOURNEY_EP-0{(currentIndex !== undefined ? currentIndex + 1 : 1)}*
                  </span>
                </div>
              </div>

            </div>
          ) : (
            /* DETAILED BLUEPRINT SHEETS / EDIT STATE */
            <div className="relative flex flex-col justify-between flex-1 relative z-10">
              
              {/* Dynamic Backdrop Background Image */}
              <div className="absolute inset-x-0 top-0 h-[260px] pointer-events-none overflow-hidden rounded-t-[32px] select-none">
                <img
                  src={podcast.artworkUrl}
                  alt="Poster background artwork"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-15 filter saturate-100 contrast-125 scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${
                  isLight ? "via-[#fdfbf7]/40 to-[#fdfbf7]" : "via-slate-950/40 to-[#060710]"
                }`} />
              </div>

              {/* Title & Creator editing block */}
              <div className={`border-b pb-6 mb-6 mt-2 text-center md:text-left ${
                isLight ? "border-[#e0d8c8]" : "border-white/10"
              }`}>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-3">
                  <div className="w-full md:flex-1">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="text-[8px] font-black font-mono bg-brand-orange text-white px-2.5 py-0.5 rounded-sm tracking-widest uppercase shadow shadow-brand-orange/20">
                        COMPANION EDIT PANEL
                      </span>
                      <span className={`text-[9px] font-mono select-none font-bold ${
                        isLight ? "text-slate-500" : "text-slate-400"
                      }`}>{podcast.category || "General"}</span>
                    </div>
                    
                    <textarea
                      value={podcast.title}
                      rows={2}
                      onChange={(e) => handleFieldChange("title", e.target.value)}
                      className={`w-full bg-transparent border-0 border-b border-transparent hover:border-purple-500/25 focus:border-purple-500/60 focus:ring-0 text-xl md:text-2xl font-black font-display tracking-tight uppercase leading-[1.1] focus:outline-none transition-all duration-200 resize-none rounded-md px-1 py-0.5 ${
                        isLight 
                          ? "text-slate-950 hover:bg-slate-200/20" 
                          : "text-white text-glow hover:bg-white/5"
                      }`}
                      title="Click to edit poster header title"
                      placeholder="Enter Poster Title..."
                    />
                  </div>
                  
                  <div className="text-center md:text-right shrink-0">
                    <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1 select-none font-bold ${
                      isLight ? "text-slate-500" : "text-slate-400"
                    }`}>
                      KEYNOTE SPEAKER
                    </span>
                    
                    <input
                      type="text"
                      value={podcast.creatorName}
                      onChange={(e) => handleFieldChange("creatorName", e.target.value)}
                      className={`bg-transparent border-0 border-b border-transparent hover:border-purple-500/25 focus:border-purple-500/60 focus:ring-0 text-xs font-extrabold tracking-tight uppercase focus:outline-none transition-all text-center md:text-right rounded px-1 py-0.5 ${
                        isLight ? "text-slate-800 hover:bg-slate-200/20" : "text-slate-200 hover:bg-white/5"
                      }`}
                      title="Click to edit speaker name"
                      placeholder="Speaker/Host Name"
                    />
                  </div>
                </div>
              </div>

              {/* Editable Synopsis */}
              <div className={`p-4 rounded-xl mb-6 border transition-all duration-300 ${
                isLight 
                  ? "bg-slate-50 border-brand-orange/25 text-slate-800" 
                  : "bg-slate-900 border-brand-orange/20 text-slate-200"
              }`}>
                <div className="text-xs leading-relaxed flex flex-col md:flex-row gap-2 items-start">
                  <strong className={`font-mono text-[9px] uppercase tracking-widest mr-2 block shrink-0 select-none ${
                    isLight ? "text-brand-orange font-bold text-center sm:text-left" : "text-brand-orange text-center sm:text-left"
                  }`}>
                    Core Abstract Synopsis:
                  </strong>
                  <textarea
                    value={podcast.poster.caption}
                    rows={2}
                    onChange={(e) => handleFieldChange("caption", e.target.value)}
                    className={`w-full bg-transparent border-0 border-b border-transparent hover:border-purple-500/25 focus:border-purple-500/60 focus:ring-0 text-xs focus:outline-none resize-none transition-all rounded px-1 p-0 font-sans leading-relaxed ${
                      isLight ? "text-slate-900 hover:bg-slate-200/10" : "text-purple-100 hover:bg-white/5"
                    }`}
                    title="Click to edit central synopsis paragraph"
                    placeholder="Central synopsis paragraph description..."
                  />
                </div>
              </div>

              {/* Admin Customizable Poster Image Card - Sathvika's Studio workspace */}
              <div className={`p-4 sm:p-5 rounded-xl border mb-6 transition-all duration-300 ${
                isLight 
                  ? "bg-slate-100/60 border-slate-250" 
                  : "bg-slate-900/40 border-dark-border"
              }`} id="admin-custom-image-designer">
                <div className="flex items-center gap-2 mb-3 select-none">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse shrink-0" />
                  <h4 className={`text-[10px] sm:text-xs font-black font-mono tracking-widest uppercase ${
                    isLight ? "text-slate-700 font-bold" : "text-slate-300"
                  }`}>
                    Poster Graphic & Artwork Creator Workspace
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  {/* Active Poster Artwork Preview */}
                  <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden relative shadow-sm shrink-0 border border-slate-300 dark:border-white/5 bg-slate-950">
                    <img 
                      src={podcast.artworkUrl} 
                      alt="Active poster design" 
                      className="w-full h-full object-cover animate-fade-in"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-center font-mono text-[7px] text-white/90 font-bold tracking-wider">
                      ACTIVE ARTWORK
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <p className={`text-[10px] leading-relaxed mb-2 ${
                        isLight ? "text-slate-650" : "text-slate-400"
                      }`}>
                        Sathvika, select a customized display canvas or insert a unique high-res photography URL below to transform the poster artwork layout instantly!
                      </p>
                      
                      <input
                        type="text"
                        value={podcast.artworkUrl}
                        onChange={(e) => handleFieldChange("artworkUrl", e.target.value)}
                        placeholder="Paste custom banner/artwork URL..."
                        className={`w-full px-3 py-1.5 rounded-lg text-[11px] font-mono border focus:outline-none focus:ring-1 focus:ring-brand-purple ${
                          isLight
                            ? "bg-white border-slate-300 text-slate-800"
                            : "bg-black/30 border-slate-800 text-slate-200"
                        }`}
                        title="Poster illustration web URL override"
                      />
                    </div>

                    <div>
                      <span className="text-[7px] font-mono uppercase tracking-widest block mb-1.5 text-slate-450 dark:text-slate-500 font-bold">
                        Designed Poster Graphics presets:
                      </span>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                        {[
                          { name: "Cosmic Gears", url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800" },
                          { name: "Neon Startup", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" },
                          { name: "Cyber Canvas", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
                          { name: "Minimal Tech", url: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800" }
                        ].map((pr) => {
                          const isPrActive = podcast.artworkUrl === pr.url;
                          return (
                            <button
                              key={pr.name}
                              onClick={() => {
                                handleFieldChange("artworkUrl", pr.url);
                                onToast(`Custom poster graphic is set to: "${pr.name}" 🎨`);
                              }}
                              className={`px-1.5 py-1 text-[9px] font-mono rounded border transition-all cursor-pointer truncate ${
                                isPrActive
                                  ? "bg-brand-purple text-white border-brand-purple font-bold shadow-sm"
                                  : isLight
                                    ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                                    : "bg-black/20 hover:bg-white/5 border-slate-800 text-slate-400"
                              }`}
                            >
                              {pr.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Takeaways List */}
              <div className="space-y-4" id="poster-diagram-canvas">
                <div className="flex items-center gap-2 mb-2 select-none">
                  <div className="w-1.5 h-3 bg-brand-orange rounded" />
                  <h4 className={`text-[9px] font-black font-mono tracking-widest uppercase ${
                    isLight ? "text-slate-500 font-bold" : "text-slate-400"
                  }`}>
                    Click Below to Edit Takeaway Bullets
                  </h4>
                </div>
     
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {podcast.poster.takeaways.map((takeaway, index) => {
                    const isMatched = searchQuery.trim() !== "" && takeaway.toLowerCase().includes(searchQuery.toLowerCase().trim());
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-xl transition-all duration-300 group flex gap-3 items-start relative overflow-hidden border ${
                          isMatched
                            ? "border-amber-500/80 ring-1 ring-amber-500/30 bg-amber-500/[0.04] dark:bg-amber-500/[0.08]"
                            : isLight 
                              ? "bg-white/95 border-light-border hover:border-brand-orange/30 shadow-sm" 
                              : "bg-black/40 border-dark-border hover:border-brand-orange/30"
                        }`}
                      >
                        {isMatched && (
                          <div className="absolute top-0 right-0 bg-amber-500 text-zinc-950 font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg select-none flex items-center gap-1 z-10">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Match</span>
                          </div>
                        )}
                        <div className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors border select-none ${
                          isMatched
                            ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                            : isLight 
                              ? "bg-brand-orange/10 text-brand-orange border-brand-orange/30 group-hover:bg-brand-orange group-hover:text-white" 
                              : "bg-brand-orange/10 text-brand-orange border-brand-orange/20 group-hover:bg-brand-orange group-hover:text-white"
                        }`}>
                          0{index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <textarea
                            value={takeaway}
                            rows={3}
                            onChange={(e) => handleTakeawayChange(index, e.target.value)}
                            className={`w-full bg-transparent border-0 border-b border-transparent hover:border-purple-500/25 focus:border-purple-500/60 focus:ring-0 p-1 text-xs leading-relaxed focus:outline-none resize-none transition-all rounded ${
                              isLight 
                                ? "text-slate-700 hover:bg-slate-200/15 focus:text-slate-950" 
                                : "text-slate-300 hover:bg-white/5 focus:text-white"
                            }`}
                            placeholder={`Takeaway bullet ${index + 1}...`}
                            title="Click to edit takeaway statement directly"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vibe Theme Cycler */}
              <div className={`mt-8 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-center relative z-10 ${
                isLight ? "border-[#e0d8c8]" : "border-white/10"
              }`}>
                <InteractiveButton
                  onClick={cycleThemeStyle}
                  className="text-[8px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5 justify-center hover:text-brand-purple bg-slate-500/5 hover:bg-slate-500/10 border border-slate-500/10 px-3 py-1.5 rounded-lg cursor-pointer transition-all active:scale-95 duration-205 shrink-0"
                  title="Click to switch colour vibe preset themes"
                >
                  <Sparkles className="w-3 h-3 text-brand-purple animate-spin" style={{ animationDuration: '6s' }} />
                  Theme style: <span className="font-bold underline text-brand-purple">{activeThemeObj.name} Preset</span> (Change Style)
                </InteractiveButton>
              </div>

            </div>
          )}
        </div>

        {/* Icon Button Action toolbar - strictly matches drawing/wireframe in image (4) */}
        <div 
          className={`p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 border shadow-md transition-all ${
            isLight 
              ? "bg-white border-light-border shadow-slate-100" 
              : "bg-dark-surface/60 border-dark-border shadow-black/40"
          }`} 
          id="posters-actions-toolbar"
        >
          {/* Active status label */}
          <div className="flex items-center gap-2 select-none" id="poster-active-status-badge">
            <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}>
              EP-0{currentIndex !== undefined ? currentIndex + 1 : 1}
            </span>
          </div>

          {/* Icon toolbar actions */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 dark:border-dark-border">
            {/* YouTube Direct Link (Icon-only, high-fidelity custom SVG logo) */}
            <a
              href={podcast.sourceUrl || "https://www.youtube.com/watch?v=UfCuLj-alZM"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 bg-red-600 hover:bg-red-700 shadow-md cursor-pointer"
              title="Watch Episode on YouTube"
              id="poster-youtube-link"
            >
              <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Spotify Play Button (Icon-only, high-fidelity custom SVG logo) */}
            <a
              href="https://open.spotify.com/show/736rhmW7vilNgkFFo8aDz4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 bg-[#1DB954] hover:bg-[#1ed760] shadow-md cursor-pointer"
              title="Listen on Spotify"
              id="poster-spotify-link"
            >
              <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.965-.335.076-.668-.135-.744-.47-.077-.335.136-.668.47-.744 3.82-.875 7.09-.496 9.75 1.128.294.18.386.564.207.857zm1.225-2.72c-.227.367-.707.487-1.074.26-2.69-1.654-6.79-2.134-9.97-1.17-.412.125-.845-.107-.97-.52-.125-.413.108-.847.52-.972 3.636-1.103 8.156-.566 11.233 1.33.368.226.488.706.26 1.072zm.105-2.822C14.444 8.718 8.8 8.53 5.534 9.52c-.516.156-1.066-.14-1.222-.656-.156-.517.14-1.067.656-1.223 3.754-1.14 9.957-.924 13.987 1.47.464.276.615.875.34 1.34-.277.465-.877.616-1.34.34z"/>
              </svg>
            </a>

            {/* Share Button (Left indicator in pic 4) */}
            <InteractiveButton
              onClick={() => {
                navigator.clipboard?.writeText(podcast.sourceUrl || "");
                onToast("Core Share Link successfully copied to clipboard! 👋");
              }}
              className={`p-3 border text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
                isLight 
                  ? "bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100/80" 
                  : "bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800/40"
              }`}
              title="Share Episode Assets"
              id="btn-share-poster"
            >
              <Share2 className="w-4 h-4 text-brand-purple shrink-0" />
              <span className="hidden sm:inline">Share Asset</span>
            </InteractiveButton>

            {/* Download Button (Center indicator in pic 4) */}
            <InteractiveButton
              onClick={handlePosterDownload}
              disabled={downloadState !== 'idle'}
              className={`flex-1 sm:flex-none py-3 px-5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition duration-200 cursor-pointer min-w-[155px] ${
                downloadState === 'completed'
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
                  : downloadState !== 'idle'
                  ? "bg-violet-600/55 text-zinc-300 cursor-not-allowed border-transparent"
                  : "text-white bg-brand-purple hover:bg-brand-purple/90 border-transparent shadow shadow-brand-purple/15"
              }`}
              id="btn-download-poster"
            >
              {downloadState === 'preparing' && (
                <>
                  <svg className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Preparing... {downloadProgress}%</span>
                </>
              )}
              {downloadState === 'downloading' && (
                <>
                  <svg className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Saving... {downloadProgress}%</span>
                </>
              )}
              {downloadState === 'completed' && (
                <>
                  <span className="font-sans">✓ Saved! 📥</span>
                </>
              )}
              {downloadState === 'idle' && (
                <>
                  <Download className="w-4 h-4 text-white shrink-0" />
                  <span>Download Poster</span>
                </>
              )}
            </InteractiveButton>
          </div>
        </div>
      </div>
    </div>
  );
};
