import React from "react";
import { Share2, Youtube, Music } from "lucide-react";
import { PodcastAsset } from "../types";
import { InteractiveButton } from "./InteractiveButton";

interface ThumbnailLayoutProps {
  podcast: PodcastAsset;
  onToast: (msg: string) => void;
  theme?: "dark" | "light";
}

export const ThumbnailLayout: React.FC<ThumbnailLayoutProps> = ({
  podcast,
  onToast,
  theme = "dark"
}) => {
  const isLight = theme === "light";

  const handleYoutubeClick = () => {
    onToast("Opening original YouTube video in a new tab... 📺");
    window.open("https://www.youtube.com/watch?v=UfCuLj-alZM", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6" id="thumbnails-workspace">
      {/* Social Composite card layout */}
      <div 
        className={`p-6 sm:p-8 rounded-[32px] border relative overflow-hidden transition-all duration-300 ${
          isLight 
            ? "bg-white border-light-border shadow-xl text-[#18181B]" 
            : "bg-gradient-to-b from-dark-surface to-dark-bg border-dark-border shadow-2xl text-white"
        }`} 
        id="thumbnail-canvas-frame"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-purple via-violet-500 to-indigo-500 dark:to-indigo-800" />
        
        {/* Banner top instructions */}
        <div className={`text-center md:text-left border-b pb-4 mb-6 ${
          isLight ? "border-light-border" : "border-dark-border"
        }`}>
          <span className={`text-[10px] font-mono tracking-widest uppercase block mb-1 font-black ${
            isLight ? "text-brand-purple" : "text-brand-purple"
          }`}>
            High-Impact Social Thumbnail Composition
          </span>
          <p className={`text-xs leading-normal ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Engineered layout grid specs optimized for social engagement, sharing bookmarks, and click CTR.
          </p>
        </div>
 
        {/* High contrast live visual preview */}
        <div className={`relative aspect-[16/9] w-full max-w-2xl mx-auto rounded-3xl overflow-hidden border group shadow-2xl bg-black ${
          isLight ? "border-light-border" : "border-dark-border"
        }`}>
          <img
            src={podcast.artworkUrl}
            alt="Thumbnail Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03] opacity-90"
          />
          
          {/* Centered YouTube Style Play overlay button */}
          <div 
            onClick={handleYoutubeClick}
            className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-all duration-300 cursor-pointer z-20"
          >
            <div className="w-16 h-11 bg-[#FF0000] hover:bg-[#ff1a1a] rounded-2xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 active:scale-95 transition-all duration-300">
              <Youtube className="w-8 h-8 fill-current text-white shrink-0" />
            </div>
          </div>

          {/* High contrast visual linear masks */}
          <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-y-0 left-0 right-1/4 bg-gradient-to-r from-slate-950 via-slate-950/45 to-transparent" />
 

 
          <span className="absolute bottom-3 right-3 bg-black/95 font-mono text-[10px] px-2 py-0.5 rounded text-white tracking-wider font-bold">
            {podcast.audioDuration || "15:00"}
          </span>
 
          {/* Display Overlays Title */}
          <div className="absolute bottom-4 left-6 right-16">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black font-sans text-white tracking-tight leading-none uppercase drop-shadow-md">
              {podcast.thumbnail?.caption || podcast.title}
            </h3>
          </div>
        </div>
 
        {/* Thumbnail focal recommendations */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 pt-6 border-t font-sans ${
          isLight ? "border-light-border" : "border-dark-border"
        }`}>
          <div className={`p-5 rounded-2xl border transition-all ${
            isLight ? "bg-slate-50 border-light-border" : "bg-dark-bg/45 border-dark-border"
          }`}>
            <span className={`text-[10px] font-mono font-bold tracking-widest block uppercase mb-2 ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}>
              Primary Focal Element
            </span>
            <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600 font-medium" : "text-slate-300"}`}>
              {podcast.thumbnail?.focusElement || "Centralized high-contrast glow icon representation."}
            </p>
          </div>
 
          <div className={`p-5 rounded-2xl border transition-all ${
            isLight ? "bg-slate-50 border-light-border" : "bg-dark-bg/45 border-dark-border"
          }`}>
            <span className={`text-[10px] font-mono font-bold tracking-widest block uppercase mb-2 ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}>
              Composition Layout
            </span>
            <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600 font-medium" : "text-slate-300"}`}>
              {podcast.thumbnail?.layoutDescription || "Balanced vertical alignment targeting clickability metrics."}
            </p>
          </div>
        </div>
      </div>
 
      {/* Specification Actions utility bar */}
      <div 
        className={`p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 border shadow-sm transition-all ${
          isLight 
            ? "bg-white border-light-border shadow-slate-100" 
            : "bg-dark-surface/60 border-dark-border shadow-black/40"
        }`} 
        id="thumbnails-actions-toolbar"
      >
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
          isLight ? "bg-slate-50 border border-light-border" : "bg-dark-bg/40 border border-dark-border"
        }`}>
          <div className="w-2.5 h-2.5 rounded bg-brand-purple animate-pulse shrink-0" />
          <span className="text-[11px] font-mono font-bold tracking-tight text-slate-400 flex items-center gap-1.5 label-ratio">
            RATIO <strong className={`font-sans text-xs ${isLight ? "text-[#18181B]" : "text-brand-purple"}`}>16:9</strong>
            <span className="opacity-80 font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 dark:bg-slate-800/40 dark:text-slate-300 dark:border-slate-700/50 whitespace-nowrap">Social Standard</span>
          </span>
        </div>
 
        {/* Buttons adjusted for YouTube direct play/navigate and rapid copy/sharing */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0 justify-end">
          <a
            href="https://open.spotify.com/show/736rhmW7vilNgkFFo8aDz4"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 text-xs font-mono font-black rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-250 cursor-pointer text-white bg-[#1DB954] hover:bg-[#1ed760] shadow shadow-emerald-500/10"
            title="Listen on Spotify"
            id="thumbnail-spotify-link"
          >
            <Music className="w-4 h-4 text-white shrink-0" />
            <span>Spotify</span>
          </a>

          <InteractiveButton
            onClick={handleYoutubeClick}
            className={`py-2.5 px-5 text-xs font-mono font-black rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-250 cursor-pointer text-white bg-[#FF0000] hover:bg-[#ff1a1a] border-transparent shadow shadow-red-500/15`}
            id="btn-youtube-watch"
            title="Watch full podcast on YouTube"
          >
            <Youtube className="w-4 h-4 text-white fill-current shrink-0" />
            <span>Watch Video</span>
          </InteractiveButton>
 
          <InteractiveButton
            onClick={() => onToast("Copied HD canvas layout specification criteria directly to your Clipboard! 📋")}
            className={`py-2.5 px-5 text-xs font-mono font-black rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-250 cursor-pointer border shadow-sm ${
              isLight 
                ? "bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100/80" 
                : "bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800/40"
            }`}
            id="btn-copy-thumbnail"
            title="Copy spec configuration"
          >
            <Share2 className="w-4 h-4 text-brand-purple shrink-0" />
            <span>Share Spec</span>
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
};
