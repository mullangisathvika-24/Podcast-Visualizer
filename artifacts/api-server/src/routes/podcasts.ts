import { Router } from "express";
import { GoogleGenAI, Type } from "@google/genai";

const router = Router();

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please set GEMINI_API_KEY in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const PRESET_PODCASTS = [
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
        { heading: "1. The Failure of Fleeting Motivation", content: "Relying purely on daily motivation creates a highly volatile execution loop. True performance requires decoupling emotional sentiment from daily tasks by embedding activities directly into the operational infrastructure." },
        { heading: "2. Architectural System Engineering", content: "Building a system involves mapping crucial recursive habits, templating repetitive assets, and creating automatic documentation. When procedures are clear, execution becomes the path of least resistance." },
        { heading: "3. Operationalizing Daily Rhythms", content: "A robust personal system automates simple structural checks: daily time-blocking, strict tool usage policies, and non-negotiable review checkpoints to ensure consistency regardless of willpower." }
      ],
      conclusion: "Motivation is what gets you started; your systems are what keep you growing. Stop waiting for the perfect creative mood and design the infrastructure that makes execution automatic."
    },
    thumbnail: { caption: "MOTIVATION IS A LIE: Build Systems", layoutDescription: "A bold split screen with a lightning bolt on the left and structured gears layout on the right with yellow neon text 'SYSTEMS > MOTIVATION'", focusElement: "Structured Gears", badgeText: "INSIGHT 01" }
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
        { heading: "1. Setting High Performance Baselines", content: "Culture and behavior are highly contagious. By immersing yourself in a network of proactive, ambitious operators, you rapidly internalize their high work ethic, strategic frameworks, and risk threshold." },
        { heading: "2. Unlocking Reciprocal Leverage", content: "A powerful alliance is built on mutual respect and distinct capabilities. When high-performers share insights, networks, and technical expertise, the friction of problem-solving is drastically minimized." },
        { heading: "3. Rigorous Peer Accountability", content: "Ambitious networks act as truth mirrors. They call out complacency, validate critical strategies, and demand commitment, ensuring that you continually push past previous performance limitations." }
      ],
      conclusion: "You cannot outperform your environment over the long run. Choose your inner circle with extreme intent, and build strategic bridges with those who challenge you to level up."
    },
    thumbnail: { caption: "AMBITIOUS CIRCLES: Choose Your Network", layoutDescription: "A gorgeous cluster of connected networking nodes and a silhouette of visionaries cooperating under neon amber typography: 'ELITE PEERS'", focusElement: "Illuminated Network Nodes", badgeText: "INSIGHT 02" }
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
        { heading: "1. Eliminating Buyer Friction", content: "New customers carry cognitive doubts about your quality. Overcoming this requires taking the burden of risk off their shoulders—offering robust performance guarantees, trial phases, or free pilots." },
        { heading: "2. Optimizing for Early Validation", content: "In the early phases, a glowing case study is worth far more than perfect profit margins. Focus your initial efforts on achieving spectacular outcomes for earliest adopters to build a strong reputational base." },
        { heading: "3. Seamless Onboarding Pipelines", content: "Even standard procedural overhead can kill an early pilot. Ensure that the pilot scope is narrow, the implementation is lightweight, and the time-to-value is almost instantaneous for the buyer." }
      ],
      conclusion: "Don't expect early prospects to trust you blindly. Build a bridge of risk-free confidence so wide and inviting that saying yes becomes the logical choice."
    },
    thumbnail: { caption: "THE FIRST CLIENT: De-Risk Your Offer", layoutDescription: "A hand placing a golden key into an empty lock, with high contrast typography 'GET THE FIRST YES' in vibrant emerald colors.", focusElement: "Golden Key", badgeText: "INSIGHT 03" }
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
        { heading: "1. Finding Saturated Competitor Gaps", content: "Most startups fail because they enter over-contested fields. Sustainable businesses are built by focusing on the deep niches, the specialized professional workflows, and the painful manual processes everyone else ignores." },
        { heading: "2. Tactical Niche Priming", content: "Dominating a niche means creating an incredibly tailored, specialized product. Solve one specific friction point with high precision before expanding your product capability downstream." },
        { heading: "3. Deep Customer Consultation", content: "True market needs are not found in surface surveys. They are discovered by asking qualitative questions, analyzing real professional friction, and seeing which temporary hacks users have already built themselves." }
      ],
      conclusion: "Stop fighting for space in crowded rooms. Walk out into the quiet areas of friction, listen closely to real pain, and build the focused solutions that markets are begging for."
    },
    thumbnail: { caption: "UNDERSERVED NICHES: Uncover Hidden Pain", layoutDescription: "A magnifying glass highlighting a lone golden node amidst a cluster of gray nodes, with energetic cyan lettering: 'FIND HIDDEN PROBLEMS'", focusElement: "Golden Node under Lens", badgeText: "INSIGHT 04" }
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
        { heading: "1. Features vs Outcomes", content: "A customer does not seek a faster processing engine; they seek early project completion. If you describe the mechanical gears of your service rather than the end-state destination, you create high cognitive drag." },
        { heading: "2. Quantifying Business Value", content: "High-value pricing is only possible when you align with your client's core bottom line. Learn to translate tool capabilities into concrete numbers: hours saved, marketing ROI, or reduced overhead." },
        { heading: "3. Tailoring Client Messaging", content: "Review every piece of commercial collateral. Purge self-indulgent, highly technical jargon and replace it with language that directly mirrors your client's aspirations, goals, and fears." }
      ],
      conclusion: "Your product's code or mechanics is merely a path. What the client is renting is the destination. Paint that final picture clearly, and support it with consistent execution."
    },
    thumbnail: { caption: "SELL THE DESTINATION: Stop Spec Hyping", layoutDescription: "A splitting graphic comparing a complicated list of code lines (red) and a rich golden trophy index (gold) with neon lettering: 'SELL THE OUTCOME'", focusElement: "Golden Trophy Index", badgeText: "INSIGHT 05" }
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
        { heading: "1. The Illusion of Vanity Reach", content: "A million passive followers who glance past your updates will not support your brand. Modern authority is built by commanding the deep attention of a highly specialized focus-group." },
        { heading: "2. Deep Engagement Architecture", content: "Real influence means responding individually to questions, tracking your audience's evolving needs, and building private communities. The more personal the attention, the deeper the trust loop." },
        { heading: "3. Monetizing Trust Capital", content: "An audience of 500 deeply engaged followers will drive more conversions, referrals, and testimonials than ten thousand passive scroll-past observers. Trust is the ultimate currency of modern influence." }
      ],
      conclusion: "Don't chase vanity metrics. Build deep relationships with a small focused group, and the results will far outpace broad but shallow reach."
    },
    thumbnail: { caption: "500 FOLLOWERS: The Trust Advantage", layoutDescription: "A focused crowd of green silhouettes under a glowing speaker, with emerald text: 'TRUST > REACH'", focusElement: "Crowd of Green Silhouettes", badgeText: "INSIGHT 06" }
  },
  {
    id: "insight-7-content-systems",
    title: "Content Systems That Scale",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/7.jpg",
    category: "Business",
    audioDuration: "11:45",
    poster: {
      caption: "Build content factories, not one-off posts.",
      slogan: "SYSTEMATIZE YOUR CONTENT OUTPUT.",
      imageType: "A high-speed assembly line of glowing content modules flowing into a distribution network.",
      themeStyle: "Industrial dark grey with neon cyan production lines.",
      takeaways: [
        "Repurpose Ruthlessly: Convert one piece into many formats automatically.",
        "Batch Production: Record multiple episodes in one session for efficiency.",
        "Template Discipline: Use strict formats so execution becomes muscle memory.",
        "Distribution Automation: Schedule and syndicate content across channels systematically."
      ]
    },
    article: {
      summary: "Build content factories, not one-off posts.",
      overview: "The content creators who win aren't necessarily the most creative — they're the most systematic. By designing scalable content architectures that repurpose, batch, and automate, you can dramatically increase your output without proportionally increasing your effort.",
      sections: [
        { heading: "1. The Repurposing Stack", content: "A single long-form piece becomes a short-form clip, a carousel, a thread, an email, and a blog post. Repurposing is not laziness — it's leverage. Every high-effort piece deserves maximum distribution." },
        { heading: "2. Batching for Flow States", content: "Context switching kills creativity and productivity. Recording multiple episodes in one session, designing graphics in bulk, and writing posts in batches preserves deep work states and increases output quality." },
        { heading: "3. Templates as Intellectual Infrastructure", content: "Templates remove decision fatigue from execution. When the structure is pre-decided, you only need to fill in the substance. This is how media companies scale to hundreds of posts per week." }
      ],
      conclusion: "Treat your content like a product line, not individual art pieces. Design the factory first, then run the machine."
    },
    thumbnail: { caption: "CONTENT SYSTEMS: Scale Your Output", layoutDescription: "An assembly line of glowing content boxes with arrows pointing to multiple platforms, labeled: 'ONE INPUT → MANY OUTPUTS'", focusElement: "Content Assembly Line", badgeText: "INSIGHT 07" }
  },
  {
    id: "insight-8-pricing-psychology",
    title: "Pricing Psychology Mastery",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/8.jpg",
    category: "Business",
    audioDuration: "12:30",
    poster: {
      caption: "Price signals quality. Set prices intentionally.",
      slogan: "YOUR PRICE IS YOUR POSITIONING.",
      imageType: "A precision scale weighing a golden coin against a glowing gem, perfectly balanced.",
      themeStyle: "Luxe black and gold with crimson accent highlights.",
      takeaways: [
        "Anchor Effect: Lead with premium tiers to make standard pricing feel accessible.",
        "Charm Pricing: Psychological price points drive purchase decisions subconsciously.",
        "Value Framing: Present price relative to outcome value, not cost to produce.",
        "Decoy Pricing: Middle tiers make premium options feel rational and justified."
      ]
    },
    article: {
      summary: "Price signals quality. Set prices intentionally.",
      overview: "Pricing is not just economics — it's psychology. The way you present, anchor, and frame your prices dramatically shapes how buyers perceive the value of what you offer. Master pricing psychology and you will close deals faster at higher margins.",
      sections: [
        { heading: "1. The Anchoring Phenomenon", content: "Humans evaluate price relative to reference points, not absolute value. By presenting a premium tier first, you anchor the buyer's perception at a high level, making your core offer feel like a bargain by comparison." },
        { heading: "2. Outcome-Based Value Framing", content: "Never present your price next to your cost. Always present it next to the outcome value it delivers. A $5,000 service that saves $50,000 in operational costs is a 10x return, not a $5,000 expense." },
        { heading: "3. The Three-Tier Decoy Structure", content: "Three pricing tiers with a well-placed middle option guide buyers toward the option you want them to choose. The middle tier becomes the rational compromise between the too-cheap and too-expensive extremes." }
      ],
      conclusion: "Stop guessing at prices. Design your pricing architecture deliberately, test anchors rigorously, and always frame price against the value it unlocks — never the cost to deliver it."
    },
    thumbnail: { caption: "PRICE PSYCHOLOGY: Master Perception", layoutDescription: "A precision scale balancing a gold coin and a gem under sharp white spotlights, with bold text: 'PRICE = POSITIONING'", focusElement: "Precision Scale", badgeText: "INSIGHT 08" }
  },
  {
    id: "insight-9-leverage-loops",
    title: "Leverage Loops",
    creatorName: "Apaksh Gupta",
    sourceUrl: "https://www.youtube.com/watch?v=UfCuLj-alZM",
    artworkUrl: "/assets/9.jpg",
    category: "Business",
    audioDuration: "10:50",
    poster: {
      caption: "Build loops that compound your output over time.",
      slogan: "LOOPS THAT COMPOUND WIN EVERYTHING.",
      imageType: "An infinite loop of glowing arrows accelerating around a central energy core.",
      themeStyle: "Electric indigo and deep space black with glowing cyan loops.",
      takeaways: [
        "Flywheel Design: Create systems where outputs become inputs automatically.",
        "Network Effects: Build assets that grow more valuable as more people use them.",
        "Reinvestment Logic: Always redirect gains back into the loop to accelerate growth.",
        "Compounding Timelines: Short-term consistency creates exponential long-term returns."
      ]
    },
    article: {
      summary: "Build loops that compound your output over time.",
      overview: "The most powerful business models are not linear — they are looped. A flywheel that converts outputs back into inputs creates compounding momentum that becomes nearly impossible to disrupt once it reaches escape velocity.",
      sections: [
        { heading: "1. Designing the Flywheel", content: "Map every major business action to an outcome, then identify how that outcome feeds back into a new action. Revenue funds product improvements, which attract customers, who generate revenue. Identify your specific loop and invest in its friction points." },
        { heading: "2. Network Effects as Leverage", content: "Network-effect businesses grow more valuable as they grow. When your platform, community, or data asset becomes more useful with each new participant, you are building a loop that competitors cannot easily replicate." },
        { heading: "3. Reinvestment Discipline", content: "Compounding only works if you don't extract all the gains prematurely. Reinvesting early profits into the loop — back into product, marketing, and talent — is the discipline that separates explosive growers from plateauing businesses." }
      ],
      conclusion: "Think in loops, not in lines. The business that builds the most powerful flywheel wins the market — not the one that sprints the hardest in a straight line."
    },
    thumbnail: { caption: "LEVERAGE LOOPS: Compound Your Output", layoutDescription: "Glowing arrows looping around an energy core, with cyan text: 'BUILD THE FLYWHEEL'", focusElement: "Glowing Loop Core", badgeText: "INSIGHT 09" }
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
        { heading: "1. The Illusion of Cash Cushions", content: "A massive bank balance often masks structural product flaws and high operational burn. If your basic unit economics don't prove fit, more cash only postpones the ultimate correction." },
        { heading: "2. Capitalization Priorities", content: "Pouring funding into general advertising or premium headquarters before establishing stable operations is highly destructive. Capital must be carefully directed to buy long-term scale levers." },
        { heading: "3. Preserving Resource Efficiency", content: "The most innovative companies preserve a culture of high resource discipline. Frugal defaults force creative problem-solving, resulting in elegant software architectures and organic distribution." }
      ],
      conclusion: "Money can buy speed, but it cannot buy product desirability or authentic customer trust. Lock down your unit economics and build a high-performing execution core first."
    },
    thumbnail: { caption: "MONEY CAN'T FIX THIS: Build Desirability", layoutDescription: "A glowing fuel pump nozzle pouring gold sparks into a sleek sports car, labeled: 'FUEL VS ENGINE'.", focusElement: "Fuel Nozzle pouring Gold Sparks", badgeText: "INSIGHT 10" }
  }
];

router.get("/podcasts", (_req, res) => {
  res.json({ status: "success", data: PRESET_PODCASTS });
});

router.post("/generate-podcast", async (req, res) => {
  const { topic, customTitle, creator } = req.body as { topic?: string; customTitle?: string; creator?: string };

  if (!topic || topic.trim() === "") {
    res.status(400).json({ error: "A podcast topic or description is required for generation." });
    return;
  }

  try {
    const ai = getGeminiClient();
    const promptString = `
      You are an elite research analyst and graphic designer. Analyze this podcast topic/title: "${topic}".
      Optional guidelines: Creator name: "${creator || "Unknown Expert"}", Title: "${customTitle || ""}".
      
      Convert this topic into a comprehensive package of three visual learning assets:
      1. A poster asset (with deep takeaways, caption, and an artistic design blueprint description).
      2. An article summary (with comprehensive paragraphs and 3 detailed educational sections).
      3. A high-clickable social media thumbnail layout plan.
      
      Generate a realistic podcast YouTube reference link if none is provided.
      Categorize the topic into one of these fields: "Neuroscience", "AI & Technology", "Business", "Psychology", "Health", or "Arts".
      
      Respond STRICTLY with a single, perfectly formatted JSON object matching this schema:
      {
        title: string,
        creatorName: string,
        sourceUrl: string,
        category: string,
        poster: { caption: string, imageType: string, themeStyle: string, takeaways: string[] },
        article: { summary: string, overview: string, sections: [{ heading: string, content: string }], conclusion: string },
        thumbnail: { caption: string, layoutDescription: string, focusElement: string, badgeText: string }
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
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
                takeaways: { type: Type.ARRAY, items: { type: Type.STRING } }
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
                    properties: { heading: { type: Type.STRING }, content: { type: Type.STRING } },
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
    if (!outputText) throw new Error("No output was received from the Gemini model.");

    const payload = JSON.parse(outputText.trim());

    let artworkUrl = "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800";
    const categoryLower = (payload.category || "").toLowerCase();
    if (categoryLower.includes("neuro") || categoryLower.includes("health")) {
      artworkUrl = "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800";
    } else if (categoryLower.includes("ai") || categoryLower.includes("tech")) {
      artworkUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
    } else if (categoryLower.includes("business") || categoryLower.includes("finance")) {
      artworkUrl = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800";
    } else {
      artworkUrl = "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800";
    }

    const completedAsset = {
      id: "generated-" + Date.now(),
      title: payload.title,
      creatorName: payload.creatorName,
      sourceUrl: payload.sourceUrl,
      artworkUrl,
      category: payload.category || "General",
      audioDuration: "10:00",
      poster: payload.poster,
      article: payload.article,
      thumbnail: payload.thumbnail
    };

    res.json({ status: "success", data: completedAsset });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate podcast visualization assets.";
    res.status(500).json({ error: message });
  }
});

export default router;
