import React from "react";
import { Compass, Search } from "lucide-react";
import { PodcastAsset } from "../types";

interface ExplorationStreamProps {
  podcasts: PodcastAsset[];
  selectedPodcastId: string;
  onSelect: (id: string) => void;
  searchQuery: string;
}

export const ExplorationStream: React.FC<ExplorationStreamProps> = ({
  podcasts,
  selectedPodcastId,
  onSelect,
  searchQuery
}) => {
  // Safe filtering logic
  const filteredPodcasts = podcasts.filter((podcast) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      podcast.title.toLowerCase().includes(q) ||
      podcast.creatorName.toLowerCase().includes(q) ||
      podcast.category.toLowerCase().includes(q) ||
      (podcast.poster?.takeaways &&
        podcast.poster.takeaways.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1" id="channels-column">
      <div className="flex justify-between items-center px-1.5 pt-1">
        <div className="flex items-center gap-2">
          <Compass 
            className="w-4 h-4 text-purple-400 animate-spin" 
            style={{ animationDuration: "6s" }} 
          />
          <span className="text-xs font-extrabold font-mono uppercase tracking-widest text-slate-300">
            Exploration Stream
          </span>
        </div>
        <span className="text-[10px] bg-slate-900 border border-white/10 px-2.5 py-0.5 rounded-full font-mono text-slate-400 font-bold">
          {filteredPodcasts.length} Active
        </span>
      </div>

      {/* Dynamic scroll list of podcasts */}
      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
        {filteredPodcasts.map((podcast) => {
          const isActive = podcast.id === selectedPodcastId;
          return (
            <div
              key={podcast.id}
              onClick={() => onSelect(podcast.id)}
              className={`glass-panel p-3.5 rounded-2xl cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                isActive
                  ? "border-purple-500/50 bg-gradient-to-br from-purple-950/20 via-indigo-950/15 to-slate-900/40 shadow-lg shadow-purple-950/30"
                  : "hover:border-white/20 hover:bg-white/5"
              }`}
              id={`podcast-card-${podcast.id}`}
            >
              {/* Active Left Purple Light Strike */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-400 to-indigo-500 rounded-r-md" />
              )}
              
              <div className="flex gap-4">
                {/* Artwork Preview Block */}
                <div className="w-18 h-18 rounded-xl relative overflow-hidden bg-slate-900 shrink-0 border border-white/5 group-hover:border-white/10 shadow-md">
                  <img
                    src={podcast.artworkUrl}
                    alt={podcast.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded font-mono text-[9px] text-purple-300 font-bold border border-white/5">
                    {podcast.audioDuration || "15:00"}
                  </span>
                </div>

                {/* Title descriptions */}
                <div className="flex flex-col justify-between overflow-hidden min-w-0 flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 overflow-hidden">
                      <span className="text-[8px] font-bold font-mono px-2 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md uppercase tracking-wider shrink-0">
                        {podcast.category}
                      </span>
                      <span className="text-[9px] text-indigo-400 font-mono tracking-widest shrink-0 font-bold">
                        VECTOR READY
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold mt-1.5 transition-colors duration-200 line-clamp-1 ${
                      isActive ? "text-purple-300" : "text-white group-hover:text-purple-400"
                    }`}>
                      {podcast.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] text-slate-400 truncate">
                      Host: <span className="text-slate-200 font-medium">{podcast.creatorName}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredPodcasts.length === 0 && (
          <div className="p-10 text-center bg-slate-900/10 border border-[#2d2159]/20 rounded-2xl text-slate-500">
            <svg
              className="w-8 h-8 mx-auto text-purple-900 mb-3 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-xs font-mono font-medium text-slate-400">No matching streams located.</p>
            <p className="text-[10px] text-slate-500 mt-1">Try another creator term or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};
