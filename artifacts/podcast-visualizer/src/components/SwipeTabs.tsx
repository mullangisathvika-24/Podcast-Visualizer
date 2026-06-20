import React from "react";
import { useSwipeable } from "react-swipeable";
import { ArticleDigest } from "./ArticleDigest";
import InsightsSection from "./InsightsSection";
import { VideosSection } from "./VideosSection";
import { PodcastAsset } from "../types";

export type SwipeTabKey = "article" | "poster" | "video";

type SwipeTabsProps = {
  activeTab: SwipeTabKey;
  setActiveTab: (tab: SwipeTabKey) => void;

  theme: "dark" | "light";
  onToast: (msg: string) => void;

  // Articles
  podcasts: PodcastAsset[];
  selectedPodcastId: string;
  setSelectedPodcastId: (id: string) => void;

  // Videos
  onDownload: () => void;
  onShare: () => void;
};

const TABS: { key: SwipeTabKey; label: string; icon: string }[] = [
  { key: "article", label: "Articles", icon: "" },
  { key: "poster", label: "Posters", icon: "" },
  { key: "video", label: "Videos", icon: "" },
];

export const SwipeTabs: React.FC<SwipeTabsProps> = ({
  activeTab,
  setActiveTab,
  theme,
  onToast,
  podcasts,
  selectedPodcastId,
  setSelectedPodcastId,
  onDownload,
  onShare,
}) => {
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIndex].key);
  };

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + TABS.length) % TABS.length;
    setActiveTab(TABS[prevIndex].key);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 20,
  });

  return (
    <div className="w-full">
      {/* Desktop tab buttons */}
      <div className="flex justify-center items-center gap-3 py-4 px-3 sm:px-6 max-w-xl mx-auto flex-wrap">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-5 text-xs font-mono font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-purple text-white shadow-md shadow-brand-purple/25"
                  : theme === "dark"
                  ? "bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600 hover:text-zinc-100"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="inline-flex items-center gap-2">
                {tab.icon ? <span aria-hidden="true">{tab.icon}</span> : null}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Swipeable content */}
      <div {...swipeHandlers} className="relative" role="region" aria-label="Swipeable tab content">
        {activeTab === "article" && (
          <div className="px-2">
            <ArticleDigest
              theme={theme}
              onToast={onToast}
              selectedPodcastId={selectedPodcastId}
              setSelectedPodcastId={setSelectedPodcastId}
              podcasts={podcasts}
            />
          </div>
        )}

        {activeTab === "poster" && (
          <div className="px-2">
            <InsightsSection theme={theme} />
          </div>
        )}

        {activeTab === "video" && (
          <div className="px-2">
            <VideosSection theme={theme} onToast={onToast} onDownload={onDownload} onShare={onShare} />
          </div>
        )}
      </div>
    </div>
  );
};
