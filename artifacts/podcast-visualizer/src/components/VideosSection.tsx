import React from "react";
import { Download } from "lucide-react";
import { FiShare } from "react-icons/fi";
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
  onToast,
  onDownload,
  onShare,
}) => {
  const isDark = theme === "dark";

  const YOUTUBE_URL = "https://www.youtube.com/watch?v=UfCuLj-alZM";
  const SPOTIFY_URL =
    "https://open.spotify.com/episode/4f0vvrAsMdFPCLt90LkYor?si=a5fe8f6427d246b8&nd=1&dlsi=87067f628b0c42bb";

  const titleCardClass = isDark
    ? "bg-black border-dark-border"
    : "bg-white border-slate-200";

  const baseBorder = isDark ? "border-dark-border/60" : "border-slate-200";

  const baseBtn =
    "inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium transition rounded-md";

  const darkBtn = "border border-dark-border bg-dark-bg hover:bg-dark-bg/60 text-slate-200";
  const lightBtn = "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700";

  return (
    <div className="mb-12 transition-all duration-300">
      {/* Title card */}
      <div className="rounded-[24px] border shadow-sm p-4 sm:p-6 mb-4">
        <div className={`rounded-2xl border ${titleCardClass} p-4 sm:p-6`}>
          <h2
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${
              isDark ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            {EPISODE_TITLE}
          </h2>
        </div>
      </div>

      {/* Thumbnail + actions */}
      <div className={`rounded-[24px] border shadow-sm p-4 sm:p-6 ${titleCardClass}`}>
        <div className={`rounded-2xl border overflow-hidden ${baseBorder}`}>
          <div className="p-4 sm:p-6">
            <div className="rounded-xl border overflow-hidden">
              <img
                src={videoThumbnailSrc}
                alt="Podcast Video Thumbnail"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Divider */}
            <div
              className={`mt-4 h-px w-full ${
                isDark ? "bg-zinc-800" : "bg-slate-200"
              }`}
            />

            {/* Buttons row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                type="button"
                onClick={onDownload}
                className={`${baseBtn} ${isDark ? darkBtn : lightBtn}`}
                aria-label="Download"
              >
                <Download className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onShare}
                className={`${baseBtn} ${isDark ? darkBtn : lightBtn}`}
                aria-label="Share"
              >
                <FiShare className="h-4 w-4" />
              </button>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseBtn} bg-[#FF0000] hover:bg-[#FF0000]/90 border-transparent text-white`}
                aria-label="YouTube"
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
                className={`${baseBtn} bg-[#1DB954] hover:bg-[#1DB954]/90 border-transparent text-white`}
                aria-label="Spotify"
              >
                <img
                  src="/assets/spotify.png"
                  alt="Spotify"
                  className="h-4 w-4"
                  draggable={false}
                />npm run dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
