import React from "react";
import { Download, Share2 } from "lucide-react";
import { EPISODE_TITLE } from "../constants/content";
import videoThumbnail from "../assets/video thumbnail.jpg";

const videoThumbnailSrc =
  (videoThumbnail as unknown as { src?: string }).src ?? "../../assets/video thumbnail.jpg";

type VideosSectionProps = {
  theme: "dark" | "light";
  onToast: (msg: string) => void;
  onDownload: () => void;
  onShare: () => void;
};

export const VideosSection: React.FC<VideosSectionProps> = ({
  theme,
  onToast: _onToast,
  onDownload,
  onShare,
}) => {
  const isDark = theme === "dark";

  const YOUTUBE_URL = "https://www.youtube.com/watch?v=UfCuLj-alZM";
  const SPOTIFY_URL =
    "https://open.spotify.com/episode/4f0vvrAsMdFPCLt90LkYor?si=a5fe8f6427d246b8&nd=1&dlsi=87067f628b0c42bb";

  return (
    <div className="mb-12 transition-all duration-300">
      {/* Merged: title + thumbnail in a single card */}
      <div
        className={`rounded-[24px] border shadow-sm ${
          isDark
            ? "bg-black border-dark-border p-4 sm:p-6"
            : "bg-white/90 border-slate-200 p-6 sm:p-8"
        }`}
      >
        {/* Episode title inside card */}
        <h2
          className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight leading-tight whitespace-normal mb-4 ${
            isDark ? "text-zinc-100" : "text-slate-900"
          }`}
        >
          {EPISODE_TITLE}
        </h2>

        {/* Divider */}
        <div
          className={`mb-4 h-px w-full ${isDark ? "bg-zinc-800" : "bg-slate-200"}`}
        />

        {/* Thumbnail */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark ? "border-dark-border/60" : "border-slate-200"
          }`}
        >
          <div className="p-4 sm:p-5">
            <div className="rounded-xl overflow-hidden border border-zinc-700/30">
              <img
                src={videoThumbnailSrc}
                alt="Podcast Video Thumbnail"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Divider */}
            <div
              className={`mt-4 h-px w-full ${isDark ? "bg-zinc-800" : "bg-slate-200"}`}
            />

            {/* Action buttons row — standardized */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={onDownload}
                className={`btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium rounded-md border transition ${
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
                onClick={onShare}
                className={`btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium rounded-md border transition ${
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
                className="btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium rounded-md border border-transparent bg-[#FF0000] hover:bg-[#FF0000]/90 text-white transition"
                aria-label="YouTube"
                title="Watch on YouTube"
              >
                <img
                  src="/assets/YOUTUBE.png"
                  alt="YouTube"
                  className="h-4 w-4"
                  draggable={false}
                />
              </a>

              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium rounded-md border border-transparent bg-[#1DB954] hover:bg-[#1DB954]/90 text-white transition"
                aria-label="Spotify"
                title="Listen on Spotify"
              >
                <img
                  src="/assets/spotify.png"
                  alt="Spotify"
                  className="h-4 w-4"
                  draggable={false}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
