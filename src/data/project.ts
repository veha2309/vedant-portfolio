export interface ProjectDemo {
  title: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  githubLabel?: string;
  live?: string;
  liveLabel?: string;
  companion?: { title: string; description: string; image: string };
  download?: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  imageWidth?: number;
  imageHeight?: number;
  tone: string;
  overview: string;
  decisions: { title: string; description: string }[];
  capabilities: string[];
  demos?: ProjectDemo[];
}

export const projects: Project[] = [
  {
    slug: "financeflow",
    number: "01",
    title: "FinanceFlow",
    category: "Web application",
    tagline: "Clarity for your everyday finances.",
    description:
      "A considered workspace for accounts, transactions, and the bigger financial picture.",
    tech: ["React", "TypeScript", "Supabase", "Zustand", "Recharts"],
    github: "https://github.com/veha2309/FinanceFlow",
    live: "https://finance-flow-pi-eight.vercel.app/",
    image: "/images/projects/financeflow.svg",
    imageAlt:
      "Product illustration of a FinanceFlow balance overview and spending chart.",
    tone: "sage",
    overview:
      "Personal finance becomes easier to understand when accounts, transactions, and spending patterns share one workspace. FinanceFlow brings these pieces together with secure persistence and an interface built around finding the information that matters.",
    decisions: [
      {
        title: "Local-first state",
        description:
          "Zustand manages application state while IndexedDB supports offline-first workflows, keeping frequently used financial information close to the interface.",
      },
      {
        title: "Secure persistence",
        description:
          "Supabase connects authentication and PostgreSQL-backed data persistence. Role-based access supports the application’s account workflows.",
      },
      {
        title: "Useful visualization",
        description:
          "Recharts presents 30-day balance trends and spending analysis. Anomaly detection surfaces unusual patterns, while Fuse.js supports fuzzy transaction search.",
      },
    ],
    capabilities: [
      "Account and transaction overview",
      "Spending analysis and balance trends",
      "Offline-first state",
      "Fuzzy search and anomaly detection",
    ],
  },
  {
    slug: "stockpulse",
    number: "02",
    title: "StockPulse",
    category: "Web application",
    tagline: "Market complexity. Made clear.",
    description:
      "Watchlists, holdings, and market movement brought into one focused trading workspace.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    github: "https://github.com/veha2309/StockPulse",
    live: "https://stockpulse-nine-taupe.vercel.app/",
    image: "/images/projects/stockpulse.svg",
    imageAlt:
      "Product illustration of StockPulse portfolio tracking and a market chart.",
    tone: "slate",
    overview:
      "StockPulse is a stock-monitoring and trading-simulation platform. It brings portfolio positions, watchlists, and price movement into a single workspace so that market information stays connected to the holdings it affects.",
    decisions: [
      {
        title: "A typed application foundation",
        description:
          "Next.js and TypeScript provide the structure for the dashboard, with typed interfaces supporting the flow of market and portfolio information.",
      },
      {
        title: "Connected portfolio data",
        description:
          "Supabase and PostgreSQL support persistent portfolio data and real-time synchronization, connecting holdings with portfolio changes.",
      },
      {
        title: "Information with hierarchy",
        description:
          "The dashboard brings real-time tracking and profit/loss calculations into a visual hierarchy designed for information-dense market views.",
      },
    ],
    capabilities: [
      "Stock monitoring and watchlists",
      "Trading simulation",
      "Real-time portfolio tracking",
      "Profit and loss calculations",
    ],
  },
  {
    slug: "stockpulse-mobile",
    number: "03",
    title: "StockPulse Mobile",
    category: "Mobile application",
    tagline: "Your portfolio. In your pocket.",
    description:
      "Precise charts and granular risk controls, rethought for a smaller screen.",
    tech: ["Flutter", "Provider", "Supabase", "Hive", "Yahoo Finance API"],
    github: "https://github.com/veha2309/StockPulseMobile-",
    download:
      "https://drive.google.com/file/d/17P-hwh96zL_B4n5JirdpTMmvKNQHCI9d/view?usp=drive_link",
    image: "/images/projects/stockpulse-mobile.svg",
    imageAlt:
      "Product illustration of a mobile StockPulse portfolio and candlestick chart.",
    tone: "sand",
    overview:
      "StockPulse Mobile brings the trading workspace to Flutter. The application combines touch-driven charting, portfolio positions, and per-holding risk controls, with data synchronized across mobile and web.",
    decisions: [
      {
        title: "Charting made for touch",
        description:
          "Custom-painted candlestick charts support touch interaction and crosshair tracking, giving detailed market information a usable form on mobile screens.",
      },
      {
        title: "Risk at the holding level",
        description:
          "Individual Stop Loss and Take Profit levels give each holding its own risk controls. FIFO selling logic manages the order in which positions are sold.",
      },
      {
        title: "A connected mobile companion",
        description:
          "Supabase Realtime synchronizes trades between platforms. Provider manages application state and Hive provides local storage.",
      },
    ],
    capabilities: [
      "Interactive candlestick charts",
      "Per-holding risk controls",
      "FIFO selling logic",
      "Web and mobile synchronization",
    ],
  },
  {
    slug: "vision-assistant",
    number: "04",
    title: "Vision Assistant",
    category: "Accessibility / mobile",
    tagline: "Technology with a human purpose.",
    description:
      "On-device perception that turns a camera feed into environmental cues.",
    tech: ["Flutter", "TensorFlow Lite", "Camera"],
    image: "/images/projects/vision-assistant.svg",
    imageAlt:
      "Conceptual product illustration of object detection and environmental cues in Vision Assistant.",
    tone: "olive",
    overview:
      "Vision Assistant explores how on-device object detection can make environmental information more accessible. A Flutter camera interface connects perception with clear cues about objects and navigation context.",
    decisions: [
      {
        title: "Perception on the device",
        description:
          "TensorFlow Lite supports an on-device inference pipeline, connecting object detection with the mobile camera experience.",
      },
      {
        title: "Camera to context",
        description:
          "The camera pipeline provides the visual input for object detection. The interface turns that input into environmental and navigation cues.",
      },
      {
        title: "Access as the starting point",
        description:
          "The project focuses on making perception output understandable. Its purpose is to communicate useful surroundings information through a mobile interface.",
      },
    ],
    capabilities: [
      "On-device inference",
      "Camera-based object detection",
      "Environmental cues",
      "Assistive navigation context",
    ],
  },
  {
    slug: "mahila-mitr",
    number: "05",
    title: "Mahila Mitr",
    category: "Mobile app + web companion",
    tagline: "A little care. A closer connection.",
    description:
      "A Flutter app for cycle tracking, private partner chats and shared moments, supported by a web admin panel.",
    tech: ["Flutter", "Dart", "Supabase", "Next.js", "TypeScript", "Resend"],
    github: "https://github.com/veha2309/mahila-mitr-web",
    live: "https://mahila-mitr-web.vercel.app/",
    githubLabel: "Admin source code",
    liveLabel: "View admin panel",
    image: "/images/projects/mahila-mitr.svg",
    imageAlt:
      "Product illustration of the Mahila Mitr mobile app, with cycle tracking and shared partner moments.",
    imageWidth: 370,
    imageHeight: 808,
    tone: "rose",
    overview:
      "Mahila Mitr is a mobile-first project built with Flutter for cycle tracking and connection with a chosen partner. The account owner logs period details and explores calendar views and approximate cycle estimates. Partners can exchange private chats with adjustable message expiry, share styled notes, and record shared moments and reflections. A companion web admin panel supports the service without exposing personal content.",
    decisions: [
      {
        title: "A mobile experience built around daily use",
        description:
          "Flutter brings cycle logs, monthly, weekly and yearly calendars, shared notes, and reflections into one app. Calendar insights are computed locally from cycle records protected by Supabase row-level security. Cycle estimates are approximate.",
      },
      {
        title: "Private conversations, with an expiry",
        description:
          "Short-lived, single-use invite codes connect a chosen partner. Private conversation rooms use Supabase Realtime and adjustable per-message expiry. Messages are encrypted on the server before storage; this is server-side encryption, not end-to-end encryption. The account owner retains control of period-log edits.",
      },
      {
        title: "A supporting web workspace",
        description:
          "The Next.js admin panel exposes aggregate counts and service events to approved administrators. Server-verified access and a signed authentication-email hook support operations while keeping personal content out of the dashboard.",
      },
    ],
    capabilities: [
      "Period logs and calendar insights",
      "Partner pairing and shared notes",
      "Private chat with adjustable message expiry",
      "Shared moments and reflections",
      "Companion web administration",
    ],
    companion: {
      title: "Behind the app, a private workspace.",
      description:
        "The supporting web panel gives approved administrators aggregate activity and authentication-email service information. Cycle dates, private notes, reflections, pairing codes, and partner identities are excluded from this view.",
      image: "/images/websites/mahila-mitr-desktop.webp",
    },
  },
  {
    slug: "liquid-ui-components",
    number: "06",
    title: "Liquid UI Components",
    category: "Flutter packages",
    tagline: "Small pieces. Fluid interfaces.",
    description: "Reusable liquid glass surfaces, controls, navigation and fluid morphs for Flutter.",
    tech: ["Flutter", "Dart"],
    github: "https://github.com/veha2309/liquid_ui_components",
    live: "https://pub.dev/packages/liquid_ui_components",
    liveLabel: "View on pub.dev",
    demos: [
      { title: "Morph styles", description: "Droplet, Jelly and Merge: component expansion and collapse, captured from Flutter.", src: "/images/liquid-ui/morph-styles.gif", poster: "/images/liquid-ui/morph-styles.png", width: 1080, height: 310 },
      { title: "Prompts and panels", description: "Light and dark prompts alongside a bottom panel, showing the liquid entrance and exit transitions.", src: "/images/liquid-ui/modal-transitions.gif", poster: "/images/liquid-ui/modal-transitions.png", width: 1080, height: 510 },
    ],
    image: "/images/gallery/liquid-ui-components-object.svg",
    imageWidth: 900,
    imageHeight: 560,
    imageAlt: "Concept illustration of liquid UI controls and reusable Flutter components.",
    imageCaption: "CONCEPT ILLUSTRATION / FLUTTER PACKAGE",
    tone: "rose",
    overview: "Liquid UI Components is a Flutter package for liquid glass interfaces. A shared material theme brings surfaces, controls, navigation, blending and morphing together. Its example gallery demonstrates the components and rendering settings. Android is the documented, device-tested platform.",
    decisions: [
      { title: "One material, many components", description: "Shared glass settings and per-widget overrides give buttons, sliders, switches, navigation and panels a consistent material while keeping application state in the caller’s callbacks." },
      { title: "Rendering with explicit tradeoffs", description: "Optical, balanced, frosted and opaque modes let applications choose between refraction, blur and solid surfaces. Unsupported optical backends fall back to frosted rendering; high contrast and reduced transparency use opaque surfaces." },
      { title: "Motion that respects the user", description: "Shared touch dynamics support press, stretch and spring release. Reduced motion disables decorative transitions, while focus, keyboard input and native semantics support accessible interactions." },
    ],
    capabilities: ["Themed liquid glass controls", "Draggable blending and reversible morphs", "Alerts, prompts and modal panels", "Reduced motion and transparency settings"],
  },
  {
    slug: "codebase-qa-refactor-agent",
    number: "07",
    title: "Change Lens",
    category: "Developer tools",
    tagline: "Understand it. Improve it.",
    description: "A codebase QA and refactoring workbench for tracing changes, choosing tests and reviewing edits.",
    tech: ["Python", "TypeScript", "Rope", "Ollama"],
    github: "https://github.com/veha2309/code_qa_refactoring_agent",
    image: "/images/gallery/codebase-qa-refactor-agent-object.svg",
    imageWidth: 900,
    imageHeight: 560,
    imageAlt: "Concept illustration of a codebase QA and refactoring workflow.",
    imageCaption: "CONCEPT ILLUSTRATION / DEVELOPER TOOL",
    tone: "slate",
    overview: "Change Lens, the Codebase QA & Refactor Agent project, is a Windows workbench for tracing change impact, selecting relevant tests and reviewing refactors. It connects selected functions and saved edits with potentially affected source and tests. Ordinary indexing, editing and formatting work offline after setup; optional model features use a local Ollama service.",
    decisions: [
      { title: "Evidence behind the impact", description: "Source relationships connect changed code to potentially affected definitions and tests, with inspectable source evidence. Static recommendations remain separate from actual test execution results." },
      { title: "Preview, apply and undo", description: "Python refactors use Rope, while JavaScript and TypeScript refactors use the TypeScript language service. Proposed edits are shown as diffs before applying, with undo available after a successful refactor." },
      { title: "Local tools, optional models", description: "Indexing, editing and formatting run locally after initial setup. Optional Ollama models provide completions, explanations and rewrite previews; users review suggestions before applying them." },
    ],
    capabilities: ["Multi-language change-impact analysis", "Evidence-backed test recommendations", "Refactor preview, apply and undo", "Optional local model assistance"],
  },
];

export const contact = {
  email: "448vedantshukla@gmail.com",
  github: "https://github.com/veha2309",
  linkedin: "https://linkedin.com/in/vedant-shukla-79a6342b1",
};
