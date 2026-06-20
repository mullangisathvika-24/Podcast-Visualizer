import React, { useRef, useState } from "react";
import { Download, Share2 } from "lucide-react";
import { EPISODE_TITLE } from "../constants/content";
import { PodcastAsset } from "../types";

interface ArticleDigestProps {
  theme?: "dark" | "light";
  onToast: (msg: string) => void;
  selectedPodcastId: string;
  setSelectedPodcastId: (id: string) => void;
  podcasts: PodcastAsset[];
}

interface ArticleItem {
  headline: string;
  overview: string;
  bodyParagraphs: string[];
  conclusion: string;
}

const articles: ArticleItem[] = [
  {
    headline: "Inspiration vs Systems",
    overview:
      "Motivation can help people begin, but systems are what sustain progress over time. Inspiration creates movement, while systems create consistency and long-term results.",
    bodyParagraphs: [
      "Many people depend on motivation to take action. The challenge is that motivation changes from day to day and cannot always be relied upon.",
      "Successful individuals build systems that make progress automatic. These systems include habits, routines, schedules, and environments that encourage action regardless of mood.",
      "Consistency is rarely the result of constant inspiration. It is usually the result of repeatable processes that remove friction and make progress easier.",
      "People who build systems create momentum even when motivation is low. Over time, small actions repeated consistently produce significant outcomes."
    ],
    conclusion: "Stop waiting to feel motivated. Build systems that help you take action every day."
  },
  {
    headline: "Strategic Alliances",
    overview:
      "The people around you influence your mindset, standards, opportunities, and long-term growth.",
    bodyParagraphs: [
      "Growth often accelerates when ambitious individuals surround themselves with other ambitious people.",
      "Strong relationships expose people to new perspectives, better opportunities, and higher expectations.",
      "The right environment creates accountability and encourages higher performance.",
      "Many successful ventures are built through collaboration rather than isolation. Strategic alliances often shorten learning curves and open doors that would otherwise remain closed."
    ],
    conclusion: "Choose relationships that challenge you to think bigger and grow faster."
  },
  {
    headline: "De-Risk The First Yes",
    overview: "Customers are more likely to take action when the perceived risk is reduced.",
    bodyParagraphs: [
      "Most first-time customers hesitate because they are uncertain about the outcome.",
      "Reducing risk through guarantees, pilots, free trials, or low-commitment offers helps build trust.",
      "People often need confidence before they need convincing.",
      "Businesses that remove friction make it easier for customers to say yes.",
      "Trust grows when customers feel protected during the decision-making process."
    ],
    conclusion: "Make the first decision simple, safe, and easy."
  },
  {
    headline: "Solve Unserved Problems",
    overview:
      "The greatest opportunities often exist where important problems remain unsolved.",
    bodyParagraphs: [
      "Many successful businesses are built by identifying needs that others have ignored.",
      "Innovation does not always require creating something entirely new. Sometimes it means solving an existing problem more effectively.",
      "Customers value businesses that remove frustrations and create practical solutions.",
      "The larger and more neglected the problem, the greater the potential opportunity."
    ],
    conclusion: "Focus on creating value by solving problems that others overlook."
  },
  {
    headline: "Sell Outcomes, Not Capabilities",
    overview: "Customers care more about results than features.",
    bodyParagraphs: [
      "Many businesses spend too much time explaining what they do and too little time explaining the outcome they create.",
      "Customers buy solutions, transformations, and results.",
      "People are interested in what improves their lives, saves time, increases revenue, or solves a challenge.",
      "Clear communication of outcomes makes value easier to understand."
    ],
    conclusion: "Position products and services around the transformation they create."
  },
  {
    headline: "The 500 Follower Advantage",
    overview: "Trust and relevance are often more valuable than large audience numbers.",
    bodyParagraphs: [
      "A highly engaged audience can create more impact than a large but disconnected following.",
      "Trust increases influence, and influence creates opportunities.",
      "Strong communities are built through consistency, authenticity, and genuine value.",
      "Audience quality frequently matters more than audience size."
    ],
    conclusion: "Focus on building meaningful relationships before chasing large numbers."
  },
  {
    headline: "Agency to Ecosystem",
    overview: "Long-term growth comes from building systems that scale beyond personal effort.",
    bodyParagraphs: [
      "Service businesses often depend heavily on the founder's time.",
      "As demand grows, personal capacity becomes a limitation.",
      "Building products, platforms, infrastructure, and systems creates leverage.",
      "Systems continue delivering value without requiring constant direct involvement."
    ],
    conclusion: "Build assets that continue creating value independently."
  },
  {
    headline: "Operational Risk of Inexperience",
    overview: "Growth introduces complexity that requires stronger operational systems.",
    bodyParagraphs: [
      "What works at a small scale often breaks at a larger scale.",
      "As teams and operations grow, processes become increasingly important.",
      "Documentation, accountability, communication, and structure reduce operational risk.",
      "Scaling successfully requires operational maturity in addition to ambition."
    ],
    conclusion: "Strengthen operations before scale exposes weaknesses."
  },
  {
    headline: "Creative Freedom Drives Conversion",
    overview: "Ownership and trust often produce better results than control.",
    bodyParagraphs: [
      "Creative people perform at their best when they have freedom to contribute ideas and take responsibility.",
      "Excessive control can limit innovation and reduce motivation.",
      "Ownership encourages accountability, creativity, and stronger outcomes.",
      "People are more committed when they feel trusted."
    ],
    conclusion: "Give talented people the freedom to create and contribute."
  },
  {
    headline: "Capital Is Fuel, Not Success",
    overview: "Money accelerates execution but cannot replace it.",
    bodyParagraphs: [
      "Funding can help businesses grow faster, but it cannot compensate for weak fundamentals.",
      "Successful execution still depends on strategy, discipline, decision-making, and action.",
      "Capital amplifies strengths and weaknesses.",
      "Businesses that execute well benefit more from funding than businesses with poor foundations."
    ],
    conclusion: "Treat capital as fuel for growth, not as a substitute for strong execution."
  }
];

const buildFullArticleText = (items: ArticleItem[]) =>
  items
    .map((article) => [
      article.headline,
      "",
      article.overview,
      "",
      ...article.bodyParagraphs,
      "",
      article.conclusion
    ].join("\n"))
    .join("\n\n");

export const ArticleDigest: React.FC<ArticleDigestProps> = ({ theme = "dark", onToast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const articleTextRef = useRef<HTMLDivElement | null>(null);


  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };


  const handleDownload = () => {
    const text = articleTextRef.current?.innerText || buildFullArticleText(articles);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "article.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = buildFullArticleText(articles);

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Editorial Articles",
          text: shareText,
          url: window.location.href
        });
        return;
      } catch {
        // Fall back to clipboard when share is cancelled.
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      onToast("Link copied!");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div
        className={`rounded-3xl border p-5 sm:p-6 transition-all duration-300 ${
          theme === "dark"
            ? "border-zinc-800 bg-zinc-900/80 text-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.22)]"
            : "border-slate-200 bg-white text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
        }`}
      >
        {/* Episode title for the Articles card */}
        <div className="px-1">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight leading-tight whitespace-normal">{EPISODE_TITLE}</h3>
        </div>

        <div className="space-y-4">
          <div
            className={`mt-4 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
              isExpanded ? "max-h-[4000px] opacity-100" : "max-h-96 opacity-100"
            }`}
          >
            <div
              ref={articleTextRef}
              className={`space-y-4 ${!isExpanded ? "line-clamp-8" : ""}`}
            >
              {articles.map((article, index) => (
                <div
                  key={`${article.headline}-${index}`}
                  className={`relative rounded-2xl border overflow-hidden ${
                    theme === "dark"
                      ? "border-zinc-800 bg-zinc-900/60"
                      : "border-slate-200 bg-white shadow-sm"
                  }`}
                >
                  {/* Left accent bar */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-brand-purple/70 rounded-l-2xl" />

                  <div className="pl-5 pr-4 py-4 sm:pl-6 sm:pr-5 sm:py-5">
                    {/* Header row: number badge + title */}
                    <div className="flex items-start gap-3">
                      <span
                        className={`shrink-0 mt-0.5 inline-flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-black font-mono tracking-wider ${
                          theme === "dark"
                            ? "bg-brand-purple/20 text-brand-purple border border-brand-purple/30"
                            : "bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4
                        className={`text-base font-bold leading-snug ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {article.headline}
                      </h4>
                    </div>

                    {/* Overview */}
                    <p
                      className={`mt-3 text-sm leading-6 font-medium ${
                        theme === "dark" ? "text-zinc-300" : "text-slate-700"
                      }`}
                    >
                      {article.overview}
                    </p>

                    {/* Body paragraphs */}
                    <div className="mt-3 space-y-2">
                      {article.bodyParagraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={`${article.headline}-${paragraphIndex}`}
                          className={`text-sm leading-6 ${
                            theme === "dark" ? "text-zinc-400" : "text-slate-600"
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Conclusion callout */}
                    <div
                      className={`mt-4 rounded-xl px-4 py-3 flex items-start gap-2.5 ${
                        theme === "dark"
                          ? "bg-brand-purple/10 border border-brand-purple/20"
                          : "bg-brand-purple/5 border border-brand-purple/15"
                      }`}
                    >
                      <span className="text-brand-purple mt-0.5 shrink-0">✦</span>
                      <p
                        className={`text-sm font-medium leading-6 ${
                          theme === "dark" ? "text-zinc-200" : "text-slate-800"
                        }`}
                      >
                        {article.conclusion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleExpanded}
              className={`text-sm font-semibold transition-colors ${
                theme === "dark"
                  ? "text-violet-400 hover:text-violet-300"
                  : "text-violet-600 hover:text-violet-500"
              }`}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {(() => {
                const YOUTUBE_URL = "https://www.youtube.com/watch?v=UfCuLj-alZM";
                const SPOTIFY_URL =
                  "https://open.spotify.com/episode/4f0vvrAsMdFPCLt90LkYor?si=a5fe8f6427d246b8&nd=1&dlsi=87067f628b0c42bb";

                const baseBtn =
                  "btn inline-flex items-center justify-center w-[72px] px-3 py-2.5 text-sm font-medium transition";
                const darkBtn =
                  "btn-dark border-dark-border bg-dark-bg hover:bg-dark-bg/60 text-slate-200";
                const lightBtn =
                  "btn-light border-slate-200 bg-white hover:bg-slate-50 text-slate-700";

                return (
                  <>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className={`${baseBtn} ${theme === "dark" ? darkBtn : lightBtn}`}
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className={`${baseBtn} ${theme === "dark" ? darkBtn : lightBtn}`}
                      aria-label="Share"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>

                    <a
                      href={YOUTUBE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseBtn} bg-[#FF0000] hover:bg-[#FF0000]/90 border-transparent text-white`}
                      aria-label="YouTube"
                      title="YouTube"
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
                      title="Spotify"
                    >
                      <img
                        src="/assets/spotify.png"
                        alt="Spotify"
                        className="h-4 w-4"
                        draggable={false}
                      />
                    </a>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};