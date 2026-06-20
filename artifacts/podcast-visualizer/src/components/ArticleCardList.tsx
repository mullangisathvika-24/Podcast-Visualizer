import React, { useState } from 'react';

interface ArticleItem {
  headline: string;
  overview: string;
  bodyParagraphs: string[];
  conclusion: string;
}

export default function ArticleCardList() {
  // Array tracking the open/closed collapse status for each individual index independently
  const [expandedStates, setExpandedStates] = useState<{ [key: number]: boolean }>({});

  // Function to toggle a single card without affecting the others
  const toggleCollapse = (index: number) => {
    setExpandedStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Exact, unaltered article sequence array
  const articles: ArticleItem[] = [
    {
      headline: "Inspiration vs Systems",
      overview: "Motivation can help people begin, but systems are what sustain progress over time. Inspiration creates movement, while systems create consistency and long-term results.",
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
      overview: "The people around you influence your mindset, standards, opportunities, and long-term growth.",
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
      overview: "The greatest opportunities often exist where important problems remain unsolved.",
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

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 my-8 px-4">
      {articles.map((item, index) => {
        const isOpen = expandedStates[index] || false;

        return (
          <div 
            key={index} 
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl transition-all duration-300"
          >
            {/* 1. Headline */}
            <h2 className="text-xl font-extrabold text-white tracking-tight mb-2">
              {item.headline}
            </h2>
            
            {/* 2. Overview Description (Always Visible) */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {item.overview}
            </p>

            {/* 3. The Collapsible Content Container */}
            <div 
              className={`grid transition-all duration-500 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-slate-800 pt-4 space-y-4">
                  
                  {/* Render exact core paragraphs */}
                  {item.bodyParagraphs.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-sm text-slate-400 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  {/* Render conclusion footer block */}
                  <div className="bg-purple-950/20 border border-purple-900/30 p-3.5 rounded-xl mt-2">
                    <p className="text-sm text-purple-200 italic leading-relaxed">
                      {item.conclusion}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* 4. Only the Collapse/Expand Button (No Prev/Next controls) */}
            <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-start">
              <button
                onClick={() => toggleCollapse(index)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 tracking-wider uppercase transition-colors cursor-pointer select-none focus:outline-none"
              >
                {isOpen ? (
                  <span>Hide Content ▲</span>
                ) : (
                  <span>Read Full Article ▼</span>
                )}
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}