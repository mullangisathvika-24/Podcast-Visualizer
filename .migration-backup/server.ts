import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing
app.use(express.json());

// Lazy-initialized Gemini client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing from your configuration. Please set GEMINI_API_KEY in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Preset Premium Podcasts (Pre-loaded so the client works immediately without waiting or if no API key is specified)
const PRESET_PODCASTS = [
  {
    id: "insight-1-inspiration-systems",
    title: "Inspiration vs Systems",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/src/assets/images/poster_systems.png",
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
    artworkUrl: "/src/assets/images/poster_alliances.png",
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
    artworkUrl: "/src/assets/images/poster_derisk.png",
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
    artworkUrl: "/src/assets/images/poster_problems.png",
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
    artworkUrl: "/src/assets/images/poster_outcomes.png",
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
    artworkUrl: "/src/assets/images/poster_reach.png",
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
    artworkUrl: "/src/assets/images/poster_hours.png",
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
    artworkUrl: "/src/assets/images/poster_guardrails.png",
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
    artworkUrl: "/src/assets/images/poster_control.png",
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
    artworkUrl: "/src/assets/images/poster_capital.png",
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

// Endpoint: Fetch all podcasts (Preset + Generated)
app.get("/api/podcasts", (req, res) => {
  res.json({ status: "success", data: PRESET_PODCASTS });
});

// Endpoint: Generate a customized Podcast Asset from prompt using Gemini
app.post("/api/generate-podcast", async (req, res) => {
  const { topic, customTitle, creator } = req.body;

  if (!topic || topic.trim() === "") {
    return res.status(400).json({ error: "A podcast topic or description is required for generation." });
  }

  try {
    const ai = getGeminiClient();
    const promptString = `
      You are an elite research analyst and graphic designer. Analyze this podcast topic/title: "${topic}".
      Optional guidelines: Creator name: "${creator || "Unknown Expert"}", Title: "${customTitle || ""}".
      
      Convert this topic into a comprehensive package of three visual visual learning assets:
      1. A poster asset (with deep takeaways, caption, and an artistic design blueprint description).
      2. An article summary (with comprehensive paragraphs and 3 detailed educational sections).
      3. A high-clickable social media thumbnail layout plan.
      
      Generate a realistic podcast YouTube reference link if none is provided.
      Categorize the topic into one of these fields: "Neuroscience", "AI & Technology", "Business", "Psychology", "Health", or "Arts".
      
      Respond STRICTLY with a single, perfectly formatted JSON object that complies with the following TypeScript schema:
      {
        title: string (highly engaging title based on input),
        creatorName: string (use "${creator || "Podcast Specialist"}" any realistic expert name),
        sourceUrl: string (a valid youtube watch URL, e.g., 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' or randomized valid shape),
        category: string (Use exactly one of "Neuroscience", "AI & Technology", "Business", "Psychology", "Health", "Arts"),
        poster: {
          caption: string (A strong visual-subheading tagline),
          imageType: string (Detailed description of the core visual asset, e.g. 'A translucent hourglass with glowing purple light beams representing structural focus'),
          themeStyle: string (Description of the premium theme styling, e.g. 'Dusk indigo with electric ultraviolet highlights'),
          takeaways: string[] (Exactly 4 punchy key bullet takeaways, each under 15 words)
        },
        article: {
          summary: string (Compact 1-sentence analytical summary),
          overview: string (A masterfully written 2-3 sentence overview paragraph),
          sections: [
            {
              heading: string (Title of section 1, e.g. '1. Structural Flow States'),
              content: string (In-depth, highly structured paragraph of 3-4 sentences containing protocols, facts, or technical details)
            },
            {
              heading: string (Title of section 2),
              content: string (In-depth educational content)
            },
            {
              heading: string (Title of section 3),
              content: string (In-depth educational content)
            }
          ],
          conclusion: string (Inspirational closing statement summary)
        },
        thumbnail: {
          caption: string (Bold, high-impact clickbait thumbnail overlay text, under 6 words),
          layoutDescription: string (A solid composition setup),
          focusElement: string (Key primary icon/term),
          badgeText: string (EP number or category tag, e.g. 'MASTER', 'AI FUTURE')
        }
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptString,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            creatorName: { type: Type.STRING },
            sourceUrl: { type: Type.STRING },
            category: { type: Type.STRING },
            poster: {
              type: Type.OBJECT,
              properties: {
                caption: { type: Type.STRING },
                imageType: { type: Type.STRING },
                themeStyle: { type: Type.STRING },
                takeaways: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["caption", "imageType", "themeStyle", "takeaways"]
            },
            article: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                overview: { type: Type.STRING },
                sections: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      heading: { type: Type.STRING },
                      content: { type: Type.STRING }
                    },
                    required: ["heading", "content"]
                  }
                },
                conclusion: { type: Type.STRING }
              },
              required: ["summary", "overview", "sections", "conclusion"]
            },
            thumbnail: {
              type: Type.OBJECT,
              properties: {
                caption: { type: Type.STRING },
                layoutDescription: { type: Type.STRING },
                focusElement: { type: Type.STRING },
                badgeText: { type: Type.STRING }
              },
              required: ["caption", "layoutDescription", "focusElement", "badgeText"]
            }
          },
          required: ["title", "creatorName", "sourceUrl", "category", "poster", "article", "thumbnail"]
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("No output was received from the Gemini model.");
    }

    const payload = JSON.parse(outputText.trim());

    // Map categories to premium backdrop images
    let artworkUrl = "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800"; // fallback
    const categoryLower = (payload.category || "").toLowerCase();
    
    if (categoryLower.includes("neuro") || categoryLower.includes("health")) {
      artworkUrl = "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800";
    } else if (categoryLower.includes("ai") || categoryLower.includes("tech")) {
      artworkUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
    } else if (categoryLower.includes("business") || categoryLower.includes("finance") || categoryLower.includes("perform")) {
      artworkUrl = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800";
    } else {
      artworkUrl = "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800";
    }

    const completedAsset = {
      id: "generated-" + Date.now(),
      title: payload.title,
      creatorName: payload.creatorName,
      sourceUrl: payload.sourceUrl,
      artworkUrl: artworkUrl,
      category: payload.category || "General",
      audioDuration: "10:00",
      poster: payload.poster,
      article: payload.article,
      thumbnail: payload.thumbnail
    };

    res.json({ status: "success", data: completedAsset });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate podcast visualization assets." });
  }
});

// Configure Vite or Static Assets depending on runtime mode
async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Dev Mode - Boot Vite Development Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    // Production Mode - Serve pre-bundled static public assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static build from dist folder.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server bound to host 0.0.0.0 and listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Fatal Server Startup Failure:", err);
  process.exit(1);
});
