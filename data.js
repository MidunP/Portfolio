// ============================================================
//  data.js — Edit YOUR details here!
// ============================================================

const PORTFOLIO_DATA = {

  // ── Personal Info ────────────────────────────────────────
  name: "Midun",
  fullName: "Midun P",
  title: "Software Development Engineer",
  email: "midbxy70@gmail.com",
  location: "Coimbatore, India",
  bio: `Backend-focused SDE with hands-on experience building real-time, secure, and scalable backend systems using Node.js, Express.js, TypeScript, and MongoDB. Seeking an SDE role to apply production-grade system design and backend engineering to high-scale applications.

Key Highlights & Technical Impact:
  Mavericks SDE Intern       Built multi-layered fraud detection system cutting free-trial abuse by ~8-9% on 20K+ user Play Store app.
  Live Chess Website         Real-time multiplayer via WebSockets, PostgreSQL + Prisma, Redis write-buffer queue, server move validation.
  Bank Backend Ledger        Double-entry banking ledger with MongoDB ACID transactions, on-demand balance aggregation, idempotency keys.
  LiveCodeX                  Collaborative coding IDE with Monaco editor, HD video/chat via Stream, Piston API execution, Clerk auth.

Roles & Leadership:
  SDE Intern                 Mavericks (March 2025 – May 2025)
  Campus Ambassador          Fractal Analytics (IQIGAI) @ KPRIET
  Social Media Manager       NeuraNest
  Executive Member           IEEE Computational Intelligence Society (CIS)
  Data Science Intern        CodSoft (Dec 2024 – Jan 2025)

Currently open to internships and full-time SDE opportunities.`,

  avatarEmoji: "👨‍💻",

  // ── Social Links ─────────────────────────────────────────
  social: [
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/midun-p/" },
    { name: "GitHub", icon: "🐙", url: "https://github.com/MidunP" },
    { name: "Instagram", icon: "📸", url: "https://www.instagram.com/_.midbxy._18?igsh=MWRqMG9nejY1Z3U1bw==" },
    { name: "Letterboxd", icon: "🎬", url: "https://boxd.it/axxen" },
    { name: "Pinterest", icon: "📌", url: "https://pin.it/5ZpoGTvbe" },
    { name: "Chess.com", icon: "♟️", url: "https://www.chess.com/member/midun_186" },
  ],

  // ── Resume Link ──────────────────────────────────────────
  resumeLink: "MIDUN_SDE_RESUME.pdf",

  // ── Projects ─────────────────────────────────────────────
  projects: [
    {
      id: "banking-backend",
      name: "Bank Backend Ledger",
      icon: "🏦",
      emoji: "🏦",
      description: `A double-entry banking ledger built with RESTful APIs for fund transfers, computing account balances on-demand via MongoDB aggregation over an immutable, append-only ledger for full auditability.

Engineering Highlights:
  → Implemented atomic multi-document transactions (Mongoose sessions) to prevent partial writes.
  → Idempotency keys included on transfer endpoints to prevent duplicate payments.
  → Secured with JWT authentication (bcryptjs) and Gmail OAuth2 email notifications.
  → Aggregates ledger entries dynamically for fast balance checks while keeping historical record immutable.`,
      tags: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "REST API"],
      liveUrl: "#",
      githubUrl: "https://github.com/MidunP/Bank-Ledger",
      previewImage: "chess-preview.png",
    },
    {
      id: "chess-app",
      name: "Live Chess Website",
      icon: "♟️",
      emoji: "♟️",
      description: `A real-time multiplayer chess platform with a separated WebSocket server architecture, room-based matchmaking, and server-side move validation using chess.js to prevent cheating.

Engineering Highlights:
  → Designed a PostgreSQL + Prisma persistence layer for users, games, and Elo-based ratings.
  → Redis write-buffer queue absorbing real-time move writes before batch persistence to database.
  → Implemented JWT authentication (bcryptjs) with GitHub & Google OAuth2.
  → Deployed on split architecture: React frontend on Vercel, Node.js backend on Render.`,
      tags: ["Node.js", "TypeScript", "React", "WebSockets", "PostgreSQL", "Prisma", "Redis"],
      liveUrl: "https://live-chess-website-cuwr.vercel.app",
      githubUrl: "https://github.com/MidunP/Live-Chess-Website",
      previewImage: "chess-preview.png",
    },
    {
      id: "portfolio",
      name: "macOS Portfolio",
      icon: "🖥️",
      emoji: "🖥️",
      description: `An interactive macOS-themed desktop portfolio website built from scratch with Vanilla JavaScript, HTML5, and CSS3.

Features:
  → Draggable, resizable macOS window manager with double-tap & fullscreen state.
  → Finder file browser with live project view and resume preview.
  → Embedded crisp PDF resume viewer powered by PDF.js.
  → Interactive ZSH-style Terminal with custom system commands ('help', 'skills', 'experience', 'whoami').
  → Dock with smooth physics magnification curve.
  → Control Center dark/light appearance switcher and Spotlight search (Ctrl+Space).`,
      tags: ["HTML5", "CSS3", "JavaScript", "PDF.js", "UI/UX"],
      liveUrl: "https://midunp.vercel.app",
      githubUrl: "https://github.com/MidunP/Portfolio",
    },
    {
      id: "livecodex",
      name: "LiveCodeX",
      icon: "💻",
      emoji: "💻",
      description: `A real-time collaborative coding interview platform featuring a shared code editor, HD video/chat via Stream SDK, and multi-language code execution via Piston API.

Engineering Highlights:
  → Room-based session management with Clerk authentication.
  → Integrated Piston API for isolated multi-language code execution.
  → Inngest background job processing for asynchronous workflows.
  → Personal analytics dashboard for tracking coding and interview sessions.
  → Split architecture deployment: Vercel frontend + Render backend.`,
      tags: ["React", "Node.js", "Express.js", "Clerk", "Stream SDK", "MongoDB", "Inngest"],
      liveUrl: "#",
      githubUrl: "https://github.com/MidunP/LiveCodeX",
      previewImage: "livecodex-preview.png",
    },
    {
      id: "amc",
      name: "CineSentry",
      icon: "🎬",
      emoji: "🎬",
      description: `An automated FDFS (First Day First Show) cinema ticket monitoring and booking assistant — built for the love of the game.

Engineering Highlights:
  → Playwright-powered headless browser automation for real-time seat scanning and booking.
  → Anthropic AI integration to intelligently parse seat maps and select the best available seats.
  → SQLite-backed session persistence to survive restarts between monitoring cycles.
  → Cheerio HTML scraping for fast, lightweight availability checks without full page loads.
  → MCP (Model Context Protocol) SDK integration for structured tool-calling AI workflows.
  → CLI-first design with Commander.js for flexible dry-run and live booking modes.`,
      tags: ["TypeScript", "Node.js", "Playwright", "Anthropic AI", "SQLite", "Cheerio", "MCP SDK"],
      liveUrl: "#",
      githubUrl: "https://github.com/MidunP/AMC",
    },
    {
      id: "stash",
      name: "Stash — Game Tracker",
      icon: "🎮",
      emoji: "🎮",
      description: `A full-stack game tracking application with a Letterboxd-inspired aesthetic — beautifully log, rate, and review your gaming journey.

Engineering Highlights:
  → Next.js App Router architecture with server actions for seamless data mutations.
  → Prisma ORM with PostgreSQL for robust, type-safe game and user data persistence.
  → JWT-based authentication with bcryptjs for secure, stateless session management.
  → RAWG & Steam CDN integration for rich game metadata and portrait-quality poster art.
  → Fully responsive UI built with Tailwind CSS and Lucide React icon system.
  → Deployed on Vercel with environment-driven configuration for production readiness.`,
      tags: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Vercel"],
      liveUrl: "https://stash-ten-psi.vercel.app",
      githubUrl: "https://github.com/MidunP/Stash",
    },
    {
      id: "grievance-portal",
      name: "Grievance Portal — AI Layer",
      icon: "🏛️",
      emoji: "🏛️",
      description: `A production-grade, multilingual AI model layer for citizen grievance systems supporting English, Hindi, and Tamil across 5 public administration categories.

Engineering Highlights:
  → 9-phase AI pipeline: data generation → language detection → classification → duplicate detection → priority prediction → departmental routing → admin dashboard → FastAPI serving → STAR research metrics.
  → Multilingual NLP supporting English, Hindi, and Tamil with language-aware preprocessing.
  → Vector-based duplicate detection to prevent redundant grievance submissions.
  → Fairness auditing built into the priority prediction pipeline for unbiased outcomes.
  → FastAPI server with a structured JSON response API for seamless frontend integration.
  → Covers 5 departments: Water Supply, Sanitation, Roads, Electricity, Public Healthcare.`,
      tags: ["Python", "FastAPI", "NLP", "Machine Learning", "Vector Search", "Multilingual", "AI Pipeline"],
      liveUrl: "#",
      githubUrl: "https://github.com/MidunP/Grievence-Portal",
    },
    {
      id: "tvtime",
      name: "TvTime — CineTrack",
      icon: "📺",
      emoji: "📺",
      description: `A personal, stripped-down TV Time clone — a full-stack CineTrack app to track your show watching progress with a clean, modern UI.

Engineering Highlights:
  → React + Vite frontend with TanStack React Query for efficient server state and data synchronization.
  → Framer Motion animations for smooth, cinematic UI transitions and micro-interactions.
  → Node.js + Express backend with MongoDB (Mongoose) for flexible show and episode tracking.
  → Redis (ioredis) caching layer for fast episode and show metadata lookups.
  → JWT + bcryptjs authentication with Sentry error monitoring and Pino structured logging.
  → Dockerized with docker-compose for consistent local dev and Render deployment via render.yaml.`,
      tags: ["React", "Vite", "Node.js", "Express", "MongoDB", "Redis", "Framer Motion", "Docker"],
      liveUrl: "#",
      githubUrl: "https://github.com/MidunP/TvTime",
    },
  ],

  // ── Skills (shown in terminal) ───────────────────────────
  skills: {
    backend: ["Node.js", "Express.js", "REST APIs", "WebSockets", "JWT Auth", "System Design"],
    database: ["MongoDB", "PostgreSQL", "Prisma", "Redis"],
    languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render"],
  },

  // ── Experience / Work ────────────────────────────────────
  articles: [
    {
      title: "Software Development Engineer Intern",
      org: "Mavericks",
      date: "March 2025 – May 2025",
      excerpt: "Built a multi-layered fraud detection system (device, phone/email, IP, behavior signals) to stop duplicate free-trial abuse on a 20K+ user Play Store app, cutting fraudulent signups by ~8–9%. Implemented detection logic in Node.js, Express, and MongoDB into existing auth flows without disrupting legitimate users.",
      url: "#",
      type: "experience",
      tags: ["SDE Intern", "Node.js", "Express.js", "MongoDB", "Fraud Detection"],
    },
    {
      title: "Campus Ambassador",
      org: "Fractal Analytics (IQIGAI)",
      date: "2026 – 2027",
      excerpt: "Selected as Campus Ambassador for Fractal Analytics (IQIGAI) at KPRIET. Organizing outreach sessions, coordinating workshops, and connecting peers with industry opportunities in AI.",
      url: "#",
      type: "experience",
      tags: ["Ambassador", "Fractal Analytics", "KPRIET"],
    },
    {
      title: "Social Media Manager",
      org: "NeuraNest",
      date: "2025 – Present",
      excerpt: "Managing technical content, digital engagement, and public communications for NeuraNest, driving growth and student involvement across campus tech events.",
      url: "#",
      type: "experience",
      tags: ["Social Media", "NeuraNest", "AI"],
    },
    {
      title: "Data Science Intern",
      org: "CodSoft",
      date: "Dec 2024 – Jan 2025",
      excerpt: "Engineered Python data pipelines integrating REST APIs to automate data retrieval and preprocessing, and built ML inference pipelines structured for seamless integration with backend REST API endpoints. Maintained a clean architecture Git workflow.",
      url: "#",
      type: "experience",
      tags: ["Internship", "Data Science", "Python", "REST APIs"],
    },
    {
      title: "Executive Committee Member",
      org: "IEEE Computational Intelligence Society (CIS)",
      date: "2024 – 2025",
      excerpt: "Executive Committee Member for the IEEE CIS chapter. Organized technical workshops and academic events promoting computational intelligence research among engineering students.",
      url: "#",
      type: "experience",
      tags: ["IEEE", "CIS", "Leadership"],
    },
  ],

  // ── Gallery (real photos) ──────────────────────────────────────
  gallery: [
    { src: "photos/photo_2026-05-14_19-22-08.jpg", label: "Photo 1" },
    { src: "photos/photo_2026-05-14_19-22-10.jpg", label: "Photo 2" },
    { src: "photos/photo_2026-05-14_19-22-12.jpg", label: "Photo 3" },
    { src: "photos/photo_2026-05-14_19-23-44.jpg", label: "Photo 4" },
  ],

  // ── Terminal about text ───────────────────────────────────
  terminalAbout: `
  Name       : Midun P
  Role       : SOFTWARE DEVELOPMENT ENGINEER
  Location   : Coimbatore, India
  Education  : B.E. CSE (AI & ML) — KPRIET (2023–2027) | 8.5/10 CGPA

  Summary    : Backend-focused SDE with experience building real-time, secure, 
               and scalable systems (Node.js, Express, TypeScript, MongoDB, PostgreSQL).

  Experience :
    → SDE Intern @ Mavericks (March 2025 – May 2025)
      - Built multi-layered fraud detection system for 20K+ user app, cutting abuse ~8-9%
    → Data Science Intern @ CodSoft (Dec 2024 – Jan 2025)
      - Engineered Python data pipelines & ML inference endpoints
    → Campus Ambassador @ Fractal Analytics (IQIGAI)
    → Social Media Manager @ NeuraNest
    → Executive Member @ IEEE Computational Intelligence Society (CIS)

  Projects   :
    → Live Chess Website        (WebSockets, PostgreSQL, Prisma, Redis)
    → Bank Backend Ledger       (ACID Transactions, MongoDB Sessions, Idempotency)
    → LiveCodeX                 (Collaborative IDE, Monaco Editor, Stream SDK, Piston API)
    → macOS Portfolio           (Vanilla JS/CSS desktop environment)
    → CineSentry                 (Playwright, Anthropic AI, MCP SDK, SQLite)
    → Stash — Game Tracker      (Next.js, Prisma, PostgreSQL, Tailwind CSS)
    → Grievance Portal AI Layer (FastAPI, NLP, Vector Search, Multilingual)
    → TvTime — CineTrack        (React, Node.js, MongoDB, Redis, Docker)

  Skills     : Java, JS, TS, Python, SQL | Node.js, Express, REST, WebSockets | MongoDB, Postgres
  GitHub     : github.com/MidunP
  Status     : Open to SDE Internships & Full-Time Roles ✅
`,

  // ── Education ─────────────────────────────────────────────
  education: [
    {
      degree: "B.E. — Computer Science and Engineering (AI & ML)",
      school: "KPR Institute of Engineering and Technology",
      period: "2023 – 2027",
      details: ["CGPA: 8.5 / 10", "Specialization: Artificial Intelligence & Machine Learning"],
    },
  ],
};
