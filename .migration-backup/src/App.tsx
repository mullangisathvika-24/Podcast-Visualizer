import React, { useState, useEffect } from "react";
import { PodcastAsset, UserSession } from "./types";
import { Dashboard } from "./pages/Dashboard";
import { Toast } from "./components/Toast";
import { registerChronoPair } from "./utils/pairing";

// Constant beautiful local fallbacks to guarantee client robustness if server is preparing
const LOCAL_PRESET_PODCASTS: PodcastAsset[] = [
  {
    id: "insight-1-inspiration-systems",
    title: "Inspiration vs Systems",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/1.jpg",
    category: "Business",
    audioDuration: "10:30",
    poster: {
      caption: "Why motivation starts the journey but systems create outcomes.",
      slogan: "INSPIRATION STARTS THE JOURNEY. SYSTEMS FINISH IT.",
      imageType: "A complex interconnected gears blueprint glowing with electric cyan and purple circuits.",
      themeStyle: "Tech-slate minimalist blueprint with royal cyan borders.",
      takeaways: [
        "Motivation Fades: Initial excitement is temporary and unreliable.",
        "Routines Scale: Repeatable processes turn erratic wins into predictable outcomes.",
        "Eliminate Friction: Solid workflows reduce cognitive load and decision fatigue.",
        "Continuous Auditing: Regularly refine operational bottlenecks to sustain momentum."
      ]
    },
    article: {
      summary: "Why motivation starts the journey but systems create outcomes.",
      overview: "While initial inspiration provides the spark to launch an endeavor, it is an erratic and unreliable fuel source. Long-term success, scale, and peak performance are the exclusive domain of well-constructed organizational and personal systems.",
      sections: [
        {
          heading: "1. The Failure of Fleeting Motivation",
          content: "Relying purely on daily motivation creates a highly volatile execution loop. True performance requires decoupling emotional sentiment from daily tasks by embedding activities directly into the operational infrastructure."
        },
        {
          heading: "2. Architectural System Engineering",
          content: "Building a system involves mapping crucial recursive habits, templating repetitive assets, and creating automatic documentation. When procedures are clear, execution becomes the path of least resistance."
        },
        {
          heading: "3. Operationalizing Daily Rhythms",
          content: "A robust personal system automates simple structural checks: daily time-blocking, strict tool usage policies, and non-negotiable review checkpoints to ensure consistency regardless of willpower."
        }
      ],
      conclusion: "Motivation is what gets you started; your systems are what keep you growing. Stop waiting for the perfect creative mood and design the infrastructure that makes execution automatic."
    },
    thumbnail: {
      caption: "MOTIVATION IS A LIE: Build Systems",
      layoutDescription: "A bold split screen with a lightning bolt on the left and structured gears layout on the right with yellow neon text 'SYSTEMS > MOTIVATION'",
      focusElement: "Structured Gears",
      badgeText: "INSIGHT 01"
    }
  },
  {
    id: "insight-2-strategic-alliances",
    title: "Strategic Alliances",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/2.jpg",
    category: "Business",
    audioDuration: "12:15",
    poster: {
      caption: "The importance of surrounding yourself with ambitious people.",
      slogan: "DON'T COLLECT CONTACTS. BUILD ALLIANCES.",
      imageType: "A circle of illuminated crystalline figures connected by bright beams of golden and purple light.",
      themeStyle: "Rich midnight violet backdrop with luxurious gold vector lines.",
      takeaways: [
        "Ambitious Networks: Surrounding yourself with high-agency peers elevates peer standards.",
        "Value Exchange: Strategic alliances are forged on reciprocal value and respect.",
        "Collaborative Leverage: Shared resources unlock complex opportunities faster.",
        "Accountability Anchors: A peer group ensures you stay aligned with high goals."
      ]
    },
    article: {
      summary: "The importance of surrounding yourself with ambitious people.",
      overview: "Your environment dramatically shapes your baseline standard of capability. Forging deep strategic alliances with high-performance, ambitious individuals creates an upward spiral of personal and professional standards.",
      sections: [
        {
          heading: "1. Setting High Performance Baselines",
          content: "Culture and behavior are highly contagious. By immersing yourself in a network of proactive, ambitious operators, you rapidly internalize their high work ethic, strategic frameworks, and risk threshold."
        },
        {
          heading: "2. Unlocking Reciprocal Leverage",
          content: "A powerful alliance is built on mutual respect and distinct capabilities. When high-performers share insights, networks, and technical expertise, the friction of problem-solving is drastically minimized."
        },
        {
          heading: "3. Rigorous Peer Accountability",
          content: "Ambitious networks act as truth mirrors. They call out complacency, validate critical strategies, and demand commitment, ensuring that you continually push past previous performance limitations."
        }
      ],
      conclusion: "You cannot outperform your environment over the long run. Choose your inner circle with extreme intent, and build strategic bridges with those who challenge you to level up."
    },
    thumbnail: {
      caption: "AMBITIOUS CIRCLES: Choose Your Network",
      layoutDescription: "A gorgeous cluster of connected networking nodes and a silhouette of visionaries cooperating under neon amber typography: 'ELITE PEERS'",
      focusElement: "Illuminated Network Nodes",
      badgeText: "INSIGHT 02"
    }
  },
  {
    id: "insight-3-derisk-yes",
    title: "De-Risk The First Yes",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/3.jpg",
    category: "Business",
    audioDuration: "09:45",
    poster: {
      caption: "How getting the first customer is easier when risk is removed.",
      slogan: "MAKE THE FIRST YES EASY.",
      imageType: "A golden key opening a translucent glowing vault containing a brilliant violet checkmark.",
      themeStyle: "Sleek obsidian glassmorphism with emerald neon highlighting.",
      takeaways: [
        "Remove Friction: Lower client objection barriers during initial sales cycles.",
        "Value Guarantee: Offer absolute performance guarantees to build quick confidence.",
        "Momentum Over Margin: Prioritize early trust and case studies over high pricing.",
        "Uncluttered Paths: Make onboarding so direct that starting is completely effortless."
      ]
    },
    article: {
      summary: "How getting the first customer is easier when risk is removed.",
      overview: "The absolute hardest step in any commercial venture is capturing the initial conversion. By systematically eliminating financial, operational, and reputational risks for your prospect, you drastically shorten the path to the first critical 'yes'.",
      sections: [
        {
          heading: "1. Eliminating Buyer Friction",
          content: "New customers carry cognitive doubts about your quality. Overcoming this requires taking the burden of risk off their shoulders—offering robust performance guarantees, trial phases, or free pilots."
        },
        {
          heading: "2. Optimizing for Early Validation",
          content: "In the early phases, a glowing case study is worth far more than perfect profit margins. Focus your initial efforts on achieving spectacular outcomes for earliest adopters to build a strong reputational base."
        },
        {
          heading: "3. Seamless Onboarding Pipelines",
          content: "Even standard procedural overhead can kill an early pilot. Ensure that the pilot scope is narrow, the implementation is lightweight, and the time-to-value is almost instantaneous for the buyer."
        }
      ],
      conclusion: "Don't expect early prospects to trust you blindly. Build a bridge of risk-free confidence so wide and inviting that saying yes becomes the logical choice."
    },
    thumbnail: {
      caption: "THE FIRST CLIENT: De-Risk Your Offer",
      layoutDescription: "A hand placing a golden key into an empty lock, with high contrast typography 'GET THE FIRST YES' in vibrant emerald colors.",
      focusElement: "Golden Key",
      badgeText: "INSIGHT 03"
    }
  },
  {
    id: "insight-4-unserved-problems",
    title: "Solve Unserved Problems",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/4.jpg",
    category: "Business",
    audioDuration: "11:10",
    poster: {
      caption: "Businesses grow by solving overlooked problems.",
      slogan: "THE BIGGEST OPPORTUNITIES ARE OFTEN IGNORED.",
      imageType: "A single glowing pearl discovered in an ocean-deep trench illuminated by blue light beams.",
      themeStyle: "Intense ocean deep cobalt blues with bright white-blue spotlights.",
      takeaways: [
        "Ignore the Noise: Look away from competitive fields which are already overly crowded.",
        "Identify Micro-Friction: Focus on specific, painful delays hidden in plain sight.",
        "Niche Dominance: Capture smaller overlooked demands before moving up-market.",
        "Customer Proximity: Converse deeply with operators to map hidden frustrations."
      ]
    },
    article: {
      summary: "Businesses grow by solving overlooked problems.",
      overview: "The greatest business opportunities reside in addressing unserved or underserved niches. Rather than engaging in fierce competition inside saturated markets, true innovation means uncovering overlooked pain points and building tailored solutions.",
      sections: [
        {
          heading: "1. Finding Saturated Competitor Gaps",
          content: "Most startups fail because they enter over-contested fields. Sustainable businesses are built by focusing on the deep niches, the specialized professional workflows, and the painful manual processes everyone else ignores."
        },
        {
          heading: "2. Tactical Niche Priming",
          content: "Dominating a niche means creating an incredibly tailored, specialized product. Solve one specific friction point with high precision before expanding your product capability downstream."
        },
        {
          heading: "3. Deep Customer Consultation",
          content: "True market needs are not found in surface surveys. They are discovered by asking qualitative questions, analyzing real professional friction, and seeing which temporary hacks users have already built themselves."
        }
      ],
      conclusion: "Stop fighting for space in crowded rooms. Walk out into the quiet areas of friction, listen closely to real pain, and build the focused solutions that markets are begging for."
    },
    thumbnail: {
      caption: "UNDERSERVED NICHES: Uncover Hidden Pain",
      layoutDescription: "A magnifying glass highlighting a lone golden node amidst a cluster of gray nodes, with energetic cyan lettering: 'FIND HIDDEN PROBLEMS'",
      focusElement: "Golden Node under Lens",
      badgeText: "INSIGHT 04"
    }
  },
  {
    id: "insight-5-sell-outcomes",
    title: "Sell Outcomes, Not Capabilities",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/5.jpg",
    category: "Business",
    audioDuration: "13:00",
    poster: {
      caption: "Customers buy results, not features.",
      slogan: "SELL OUTCOMES. NOT CAPABILITIES.",
      imageType: "A beautiful glowing arrow striking the exact center of a target glowing with ultraviolet light.",
      themeStyle: "Midnight purple space canvas with sharp golden vector vectors.",
      takeaways: [
        "Translate Features: Convert product specs into tangible speed or revenue gains.",
        "Active Problem Solving: Pitch yourself as a solution, not a technical tool.",
        "Quantifiable Returns: Show concrete payback math to justify high prices.",
        "Client-Centric Language: Speak in customer success metrics, never internal jargon."
      ]
    },
    article: {
      summary: "Customers buy results, not features.",
      overview: "Many operators design beautifully engineered features yet fail to capture market attention. To unlock hyper-growth, your sales messaging must pivot entirely from describing internal technical capabilities to promising clear, undeniable business outcomes.",
      sections: [
        {
          heading: "1. Features vs Outcomes",
          content: "A customer does not seek a faster processing engine; they seek early project completion. If you describe the mechanical gears of your service rather than the end-state destination, you create high cognitive drag."
        },
        {
          heading: "2. Quantifying Business Value",
          content: "High-value pricing is only possible when you align with your client's core bottom line. Learn to translate tool capabilities into concrete numbers: hours saved, marketing ROI, or reduced overhead."
        },
        {
          heading: "3. Tailoring Client Messaging",
          content: "Review every piece of commercial collateral. Purge self-indulgent, highly technical jargon and replace it with language that directly mirrors your client's aspirations, goals, and fears."
        }
      ],
      conclusion: "Your product's code or mechanics is merely a path. What the client is renting is the destination. Paint that final picture clearly, and support it with consistent execution."
    },
    thumbnail: {
      caption: "SELL THE DESTINATION: Stop Spec Hyping",
      layoutDescription: "A splitting graphic comparing a complicated list of code lines (red) and a rich golden trophy index (gold) with neon lettering: 'SELL THE OUTCOME'",
      focusElement: "Golden Trophy Index",
      badgeText: "INSIGHT 05"
    }
  },
  {
    id: "insight-6-follower-advantage",
    title: "The 500 Follower Advantage",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/6.jpg",
    category: "Business",
    audioDuration: "10:15",
    poster: {
      caption: "Trust and relevance beat massive reach.",
      slogan: "TRUST BEATS REACH",
      imageType: "An focused crowd of 500 emerald-green silhouettes listening intently to a speaker glowing with golden auras.",
      themeStyle: "Matt charcoal with beautiful emerald-green boundaries and fine lines.",
      takeaways: [
        "Extreme Relevance: Speak deeply to a highly specialized, passionate demographic.",
        "Trust Capital: Deep personal bonds drive ten times more action than general popularity.",
        "Direct Engagement: Converse individually with early audience nodes to build loyalty.",
        "Leveraged Influence: A small high-intent buyer group beats a million passive eyes."
      ]
    },
    article: {
      summary: "Trust and relevance beat massive reach.",
      overview: "Massive social reach is often a vanity metric that hides low-intent engagement. Real business conversions and strategic opportunities are unlocked by cultivating deep trust and unshakeable relevance in a select group of high-intent followers.",
      sections: [
        {
          heading: "1. The Illusion of Vanity Reach",
          content: "A million passive followers who glance past your updates will not support your brand. Modern authority is built by commanding the deep attention of a highly specialized focus-group."
        },
        {
          heading: "2. Cultivating Deep Trust Capital",
          content: "Building true leverage requires individual value. Engaging with your early community in a conversational, high-context manner creates an army of passionate long-term champions."
        },
        {
          heading: "3. Converting Focus to Leverage",
          content: "A micro-audience of 500 decision-makers (CEOs, investors, directors) yields immense commercial value compared to generic mass reach. Focus your content to speak directly to elite peers."
        }
      ],
      conclusion: "Stop measuring your value by the length of your follower counts. Measure it by the depth of your relevance and the authority of those who take action when you speak."
    },
    thumbnail: {
      caption: "QUALITY OVER QUANTITY: The 500 Advantage",
      layoutDescription: "A visual graph of a massive generic red wave vs a high-spiking gold needle, labeled under typography: 'THE 500 ADVANTAGE'",
      focusElement: "Spiking Gold Needle",
      badgeText: "INSIGHT 06"
    }
  },
  {
    id: "insight-7-agency-ecosystem",
    title: "Agency to Ecosystem",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/7.jpg",
    category: "Business",
    audioDuration: "14:05",
    poster: {
      caption: "The shift from selling services to building infrastructure.",
      slogan: "STOP SELLING HOURS. BUILD SYSTEMS.",
      imageType: "A simple building foundation transforming into a vast, complex interconnected city grid glowing under starry night skies.",
      themeStyle: "Futuristic deep navy cyan overlay with fine-grid lines and circuit structures.",
      takeaways: [
        "Standardize Workflows: Turn manual team effort into software-driven protocols.",
        "Repetitive Revenue: Transition from one-off client hours to platform subscriptions.",
        "Asset Accumulation: Invest in building reusable code, proprietary data or pipelines.",
        "Ecosystem Leverage: Build support hubs that make your framework irreplaceable."
      ]
    },
    article: {
      summary: "The shift from selling services to building infrastructure.",
      overview: "Selling manual human hours is a non-scalable model that caps your growth. Transforming a high-touch agency service into a mature product, software pipeline, or self-sustaining platform ecosystem creates immense enterprise equity.",
      sections: [
        {
          heading: "1. Escaping the Hourly Trap",
          content: "Agencies struggle with scaling because revenue is directly tied to payroll and manual hours. Overcoming this requires auditing your operations and capturing repetitive services into structured workflows."
        },
        {
          heading: "2. Designing Reusable IP",
          content: "Every time you solve a client problem, document it, automate it with code, or draft it as a reusable framework. Capitalize your team's knowledge into proprietary IP assets."
        },
        {
          heading: "3. Erecting Platform Ecosystems",
          content: "The ultimate stage of transition is embedding your core business directly into the client's infrastructure. Build integrations, portals, and databases that make leaving your product incredibly high-friction."
        }
      ],
      conclusion: "Do not just sell services; build the machinery that makes service delivery effortless. True business valuation increases when you stop working in the business and start building the ecosystem."
    },
    thumbnail: {
      caption: "SCALE BEYOND SERVICES: Build Ecosystems",
      layoutDescription: "A bold shift animation showing manual tools morphing into glowing automated server units, overlay text: 'SERVICES TO ECOSYSTEM'",
      focusElement: "Automated Server Units",
      badgeText: "INSIGHT 07"
    }
  },
  {
    id: "insight-8-operational-risk",
    title: "Operational Risk of Inexperience",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/8.jpg",
    category: "Business",
    audioDuration: "11:40",
    poster: {
      caption: "Scaling creates new challenges that require mature systems.",
      slogan: "SCALING REQUIRES GUARDRAILS",
      imageType: "A tall abstract glass pillar showing hairline stress fractures glowing with intense warning red lights.",
      themeStyle: "Sleek dark charcoal grey with elegant accent highlights of deep warning red.",
      takeaways: [
        "Manage Complexity: Scaling too quickly without structure causes immediate operational decay.",
        "Define Boundaries: Create explicit policies for communication, deadlines and safety.",
        "Hire for Maturity: Integrate experienced managers who have navigated scaling storms.",
        "System Audits: Regularly perform pressure tests on your production timelines."
      ]
    },
    article: {
      summary: "Scaling creates new challenges that require mature systems.",
      overview: "Aggressive business growth is a double-edged sword. When business operations expand rapidly without experienced managers, mature standard procedures, or stable databases, scale acts as an accelerant of organizational cracks.",
      sections: [
        {
          heading: "1. Saturated System Breakpoints",
          content: "In the early phases, informal alignment is sufficient. However, as task columns expand, informal communication breaks down. Scaling without structured guidelines leads to immediate client disruption."
        },
        {
          heading: "2. Infusing Mature Management",
          content: "Hiring too many junior execution nodes creates immense management friction. Interlace your team with seasoned, mature managers who know how to construct long-term processes."
        },
        {
          heading: "3. Conducting Stress Audits",
          content: "Don't wait for a crisis to check your limits. Regularly perform dry-run tests on your server capacities, your delivery pipelines, and client onboardings to discover weak nodes."
        }
      ],
      conclusion: "Scale does not solve your internal organizational problems; it merely amplifies them. Build structural maturity and rigorous checks before you turn on the growth capital."
    },
    thumbnail: {
      caption: "SCALING DANGERS: Fix Your Infrastructure",
      layoutDescription: "A visual representation of an elegant bridge cracking under light pressure, bold typography 'SCALING OPERATIONS' in high-contrast red warning tones.",
      focusElement: "Cracking Struct Bridge",
      badgeText: "INSIGHT 08"
    }
  },
  {
    id: "insight-9-creative-freedom",
    title: "Creative Freedom Drives Conversion",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/9.jpg",
    category: "Business",
    audioDuration: "10:50",
    poster: {
      caption: "Great creators perform when given ownership, not control.",
      slogan: "CONTROL LESS. CONVERT MORE.",
      imageType: "A bird sculpted from glowing violet light escaping a minimalist geometric cage.",
      themeStyle: "Deep graphite black canvas with electric violet and warm rose highlights.",
      takeaways: [
        "Trust Innovation: Micromanaging creators kills the unique energy that drives conversion.",
        "Clear Alignment: Align on target business objectives, not tactical micro-steps.",
        "Creative Autonomy: Give talent the blank canvas to express authentic storylines.",
        "Data Over Ego: Let real audience analytics guide creative decisions, not design opinions."
      ]
    },
    article: {
      summary: "Great creators perform when given ownership, not control.",
      overview: "Collaborating with top-tier creative talent requires a fundamental shift in executive strategy. Micromanaging creative executions yields sanitized, low-converting assets. True conversion is unlocked when creative talent is granted full ownership of storyline development.",
      sections: [
        {
          heading: "1. The Death of Scripted Content",
          content: "Modern audiences have high-accuracy filters for fake, over-scripted endorsements. When you force creators to read exact corporate copy, you dilute the trust capital they have spent years building with their followers."
        },
        {
          heading: "2. Implementing Guardrail Alignment",
          content: "Instead of dictate-style control, establish robust baseline boundaries: brand values, key taboos, and main target conversion metrics. Give creators full freedom to play inside those parameters."
        },
        {
          heading: "3. Relying on Empirical Data",
          content: "Design decisions often spark high-intensity ego debates inside corporate boards. Disarm these subjective opinions by running robust A/B tests, tracking real click rates, and letting audiences choose the winners."
        }
      ],
      conclusion: "Stop treating expert creators like passive production tools. Harness their unique authority and perspective by setting core goals, stepping out of the way, and letting authentic narratives produce performance."
    },
    thumbnail: {
      caption: "AUTONOMOUS ARTISTS: Let Creators Lead",
      layoutDescription: "A visual of a bird in flight leaving a stylized golden cage, accompanied by electric indigo typography: 'CREATOR FREEDOM'.",
      focusElement: "A Glowing Violet Bird",
      badgeText: "INSIGHT 09"
    }
  },
  {
    id: "insight-10-capital-fuel",
    title: "Capital Is Fuel, Not Success",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/10.jpg",
    category: "Business",
    audioDuration: "13:20",
    poster: {
      caption: "Money amplifies execution but cannot replace it.",
      slogan: "CAPITAL IS FUEL. NOT THE DESTINATION.",
      imageType: "A burning fire pit where golden coins are transforming into high-fusing blue chemical fire.",
      themeStyle: "Stark slate gray background with high-flaring cyan and golden flame outlines.",
      takeaways: [
        "No Early Crutches: Funding cannot hide a broken product-market fit.",
        "Execution Leverage: Capital is an accelerator of existing operational patterns.",
        "Frugal Foundation: Build highly resource-efficient loops before fundraising.",
        "Strategic Focus: Direct capital into scalable assets, not vanity indicators."
      ]
    },
    article: {
      summary: "Money amplifies execution but cannot replace it.",
      overview: "Aggressive venture fundraising or heavy cash injections often create a false aura of business triumph. Capital is merely a powerful fuel source: it dramatically accelerates your existing momentum, whether that momentum is directed toward growth or failure.",
      sections: [
        {
          heading: "1. The Illusion of Cash Cushions",
          content: "A massive bank balance often masks structural product flaws and high operational burn. If your basic unit economics don't prove fit, more cash only postpones the ultimate correction."
        },
        {
          heading: "2. Capitalization Priorities",
          content: "Pouring funding into general advertising or premium headquarters before establishing stable operations is highly destructive. Capital must be carefully directed to buy long-term scale levers."
        },
        {
          heading: "3. Preserving Resource Efficiency",
          content: "The most innovative companies preserve a culture of high resource discipline. Frugal defaults force creative problem-solving, resulting in elegant software architectures and organic distribution."
        }
      ],
      conclusion: "Money can buy speed, but it cannot buy product desirability or authentic customer trust. Lock down your unit economics and build a high-performing execution core first."
    },
    thumbnail: {
      caption: "MONEY CAN'T FIX THIS: Build Desirability",
      layoutDescription: "A glowing fuel pump nozzle pouring gold sparks into a sleek sports car, labeled: 'FUEL VS ENGINE'.",
      focusElement: "Fuel Nozzle pouring Gold Sparks",
      badgeText: "INSIGHT 10"
    }
  }
];

export default function App() {
  const session: UserSession = {
    isLoggedIn: true,
    username: "User",
    email: "",
  };


  // Theme State ("dark" | "light")
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Client data states (Prefilled with high-contrast preset fallbacks)
  const [podcasts, setPodcasts] = useState<PodcastAsset[]>(LOCAL_PRESET_PODCASTS);
  
  const [selectedPodcastId, setSelectedPodcastId] = useState<string>(() => {
    return localStorage.getItem("castsketch_selected_podcast_id") || "";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const [activeTab, setActiveTab] = useState<"article" | "poster" | "video">(() => {
    const saved = localStorage.getItem("castsketch_active_tab");
    return (saved === "article" || saved === "poster" || saved === "video")
      ? saved as any
      : "poster";
  });

  // Persist selections to localStorage
  useEffect(() => {
    localStorage.setItem("castsketch_selected_podcast_id", selectedPodcastId);
  }, [selectedPodcastId]);

  useEffect(() => {
    localStorage.setItem("castsketch_active_tab", activeTab);
  }, [activeTab]);

  // Interface state indicators
  const [articleExpanded, setArticleExpanded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Audio briefing synthesizer ticks
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);

  // Audio ticking simulator
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 800);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Load podcasts from the Express server-side database
  useEffect(() => {
    fetch("/api/podcasts")
      .then((res) => {
        if (!res.ok) throw new Error("API not ready yet, loading local fallback matrices.");
        return res.json();
      })
      .then((payload) => {
        if (payload.data && Array.isArray(payload.data) && payload.data.length > 0) {
          setPodcasts(payload.data);
          const savedId = localStorage.getItem("castsketch_selected_podcast_id");
          const exists = payload.data.some((p: any) => p.id === savedId);
          if (savedId && exists) {
            setSelectedPodcastId(savedId);
          } else {
            setSelectedPodcastId(payload.data[0].id);
          }
        }
      })
      .catch((err) => {
        console.log("Safe express server load status:", err.message);
      });
  }, []);

  // Synchronize loaded/preloaded podcasts to the permanent Chronological pairing registry
  useEffect(() => {
    if (podcasts && podcasts.length > 0) {
      podcasts.forEach((podcast, index) => {
        registerChronoPair(podcast, index + 1);
      });
    }
  }, [podcasts]);

  const triggerToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLogoutSuccess = () => {
    triggerToast("Signed out.");
  };

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-500 ease-in-out ${
      theme === "dark" 
        ? "bg-dark-bg text-[#FFFFFF] selection:bg-brand-purple/20 fill-[#FFFFFF]" 
        : "bg-light-bg text-[#18181B] selection:bg-brand-purple/25"
    } overflow-x-hidden`}>
      
      {/* Decorative ambient blurred vector orbs - Brand Purple themed */}
      {theme === "dark" ? (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#8B5CF6]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      {/* Primary Toaster element */}
      <Toast message={toast} onClear={() => setToast(null)} />

      {/* Login page removed: always show Dashboard */}
      <Dashboard
        session={session}
        onLogout={handleLogoutSuccess}
        onToast={triggerToast}
        podcasts={podcasts}
        setPodcasts={setPodcasts}
        selectedPodcastId={selectedPodcastId}
        setSelectedPodcastId={setSelectedPodcastId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        articleExpanded={articleExpanded}
        setArticleExpanded={setArticleExpanded}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioProgress={audioProgress}
        theme={theme}
        setTheme={setTheme}
      />


    </div>
  );
}