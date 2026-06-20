"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { EPISODE_TITLE } from "../constants/content";

// DEBUG: posters live under /assets (repo-level assets folder)
// so keep posterFile paths as /assets/<n>.jpg
const INSIGHTS = [
  { id: 1, subHeadline: "Inspiration vs Systems", posterFile: "/assets/1.jpg" },
  { id: 2, subHeadline: "Strategic Alliances", posterFile: "/assets/2.jpg" },
  { id: 3, subHeadline: "De-Risk The First Yes", posterFile: "/assets/3.jpg" },
  { id: 4, subHeadline: "Solve Unserved Problems", posterFile: "/assets/4.jpg" },
  { id: 5, subHeadline: "Sell Outcomes, Not Capabilities", posterFile: "/assets/5.jpg" },
  { id: 6, subHeadline: "The 500 Follower Advantage", posterFile: "/assets/6.jpg" },
  { id: 7, subHeadline: "Agency to Ecosystem", posterFile: "/assets/7.jpg" },
  { id: 8, subHeadline: "Operational Risk of Inexperience", posterFile: "/assets/8.jpg" },
  { id: 9, subHeadline: "Creative Freedom Drives Conversion", posterFile: "/assets/9.jpg" },
  { id: 10, subHeadline: "Capital Is Fuel, Not Success", posterFile: "/assets/10.jpg" },
] as const;

export default function InsightsSection({ theme }: { theme?: "dark" | "light" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = theme === "dark";

  const insight = INSIGHTS[activeIndex];

  const showPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? INSIGHTS.length - 1 : prev - 1));
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev === INSIGHTS.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = insight.posterFile;
    link.download = `poster-${insight.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const shareText = `${EPISODE_TITLE} • ${insight.subHeadline}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
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

  const YOUTUBE_URL = "https://www.youtube.com/watch?v=UfCuLj-alZM";
  const SPOTIFY_URL =
    "https://open.spotify.com/episode/4f0vvrAsMdFPCLt90LkYor?si=a5fe8f6427d246b8&nd=1&dlsi=87067f628b0c42bb";

  return (
    <section
      className={`mx-auto flex w-full max-w-[480px] flex-col gap-5 rounded-[28px] border shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${
        isDark
          ? "border-slate-700 bg-black p-4 sm:p-5"
          : "border-slate-200 bg-white/90 p-5 sm:p-7"
      }`}
    >
      {/* 1. Title — forced 2-line break at natural midpoint */}
      <h2
        className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug ${
          isDark ? "text-zinc-100" : "text-slate-900"
        }`}
      >
        From Inspiration to Forbes 30 Under 30 –<br />
        Apaksh Gupta's Journey
      </h2>

      {/* 2. Poster image — strict 4:5, fills full card width */}
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white"
        style={{ aspectRatio: "4 / 5" }}
      >
        <img
          src={insight.posterFile}
          alt={insight.subHeadline}
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />

        <button
          type="button"
          onClick={showPrev}
          aria-label="Previous poster"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/40 text-white transition hover:bg-black/60"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next poster"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/40 text-white transition hover:bg-black/60"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5">
          {INSIGHTS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to poster ${item.id}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition ${
                index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Action buttons — always horizontal, equal spacing */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className={`btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium ${
            isDark
              ? "btn-dark border-dark-border bg-dark-bg hover:bg-dark-bg/60 text-slate-200"
              : "btn-light border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
          }`}
          aria-label="Download"
        >
          <Download className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleShare}
          className={`btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium ${
            isDark
              ? "btn-dark border-dark-border bg-dark-bg hover:bg-dark-bg/60 text-slate-200"
              : "btn-light border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
          }`}
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>

        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium bg-[#FF0000] hover:bg-[#FF0000]/90 border-transparent text-white"
          aria-label="YouTube"
          title="YouTube"
        >
          <img src="/assets/YOUTUBE.png" alt="YouTube" className="h-4 w-4" draggable={false} />
        </a>

        <a
          href={SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium bg-[#1DB954] hover:bg-[#1DB954]/90 border-transparent text-white"
          aria-label="Spotify"
          title="Spotify"
        >
          <img src="/assets/spotify.png" alt="Spotify" className="h-4 w-4" draggable={false} />
        </a>
      </div>
    </section>
  );
}
