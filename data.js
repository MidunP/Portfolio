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
  bio: `Midun P — Full Stack Developer

I build backend systems and ship real products. My work centers around Node.js, Express, MongoDB, and React — with a strong focus on reliability and correctness under load, not just on localhost.

Shipped projects:
  Live Chess Website      Real-time multiplayer via Socket.io, used by strangers
  Banking Ledger API      ACID-compliant, handles concurrent transactions correctly
  LiveCodeX               Collaborative IDE built for technical interviews

Roles and experience:
  Campus Ambassador       Fractal AI at KPRIET, 2026-2027
  Content Writer          NeuraNext, College AI Club
  Executive Member        IEEE Computational Intelligence Society
  Data Science Intern     Codsoft, 2024
  SDE Intern              Miro Studios, 2024

I play chess, read about systems design, and am generally up for a conversation about startups or software.

Currently open to internships and full-time roles.`,

  avatarEmoji: "👨‍💻",

  // ── Social Links ─────────────────────────────────────────
  // Replace '#' with your actual profile links
  social: [
    { name: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/your-profile" },
    { name: "GitHub", icon: "🐙", url: "https://github.com/MidunP" },
    { name: "Twitter/X", icon: "🐦", url: "https://twitter.com/your-handle" },
    { name: "Instagram", icon: "📸", url: "https://instagram.com/your-handle" },
    { name: "Discord", icon: "💬", url: "#" },
    { name: "Medium", icon: "✍️", url: "#" },
  ],

  // ── Resume Link ──────────────────────────────────────────
  resumeLink: "#", // Paste your Google Drive / Dropbox PDF link here

  // ── Projects ─────────────────────────────────────────────
  projects: [
    {
      id: "banking-backend",
      name: "Banking Ledger Backend",
      icon: "🏦",
      emoji: "🏦",
      description: `A production-grade banking backend that handles real money movement — built to never lose a transaction.

The core problem I wanted to solve: what happens when two transfers hit the same account at the same millisecond? Most toy projects ignore this. I didn't.

Built with:
  → MongoDB sessions for true ACID transactions
  → JWT auth + bcrypt — no plaintext passwords, ever
  → Atomic debit/credit operations that either fully succeed or fully rollback
  → Detailed ledger history per account
  → Input validation on every route

The trickiest part was getting MongoDB's session API to work correctly with Express middleware. Spent a weekend on that one.`,
      tags: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
      liveUrl: "#",
      githubUrl: "https://github.com/MidunP/Bank-Ledger",
      previewImage: "chess-preview.png",
    },
    {
      id: "chess-app",
      name: "Live Chess Website",
      icon: "♟️",
      emoji: "♟️",
      description: `I play chess. A lot. So naturally I built my own chess site.

Started as a weekend project to understand WebSockets, ended up becoming something people actually use. The tagline on the site says it all — we lost so many games we started building instead.

What's under the hood:
  → Real-time multiplayer via Socket.io with room-based matchmaking
  → Full chess rule enforcement — castling, en passant, promotion, all of it
  → Guest play (no signup required to jump in)
  → Drag-and-drop piece movement
  → Move history tracking per game

Hardest bug: en passant. Always en passant.`,
      tags: ["Node.js", "Socket.io", "JavaScript", "WebSockets"],
      liveUrl: "https://live-chess-website-cuwr.vercel.app",
      githubUrl: "https://github.com/MidunP/Live-Chess-Website",
      previewImage: "chess-preview.png",
    },
    {
      id: "portfolio",
      name: "macOS Portfolio",
      icon: "🖥️",
      emoji: "🖥️",
      description: `You're looking at it.

I wanted a portfolio that felt like something, not just another scrollable page. Inspired by akashjana.xyz — I built my own version from scratch, with zero frameworks.

Every part of this is vanilla JS + CSS:
  → Draggable, resizable macOS windows
  → Finder with real project navigation (open a folder, see the files)
  → Dock with physics-based magnification
  → Working terminal with custom commands (try typing 'skills')
  → PDF resume viewer via PDF.js
  → Spotlight search (Ctrl+Space)
  → Dark / Light mode toggle

Fun fact: the hardest thing to get right was the dock magnification curve.`,
      tags: ["HTML", "CSS", "JavaScript", "UI/UX"],
      liveUrl: "https://midunp.vercel.app",
      githubUrl: "https://github.com/MidunP/Portfolio",
    },
    {
      id: "livecodex",
      name: "LiveCodeX",
      icon: "💻",
      emoji: "💻",
      description: `LiveCodeX is a full-stack collaborative coding platform — think LeetCode meets Google Docs.

Built this to solve a real problem: doing technical interviews over a call where you're both staring at the same shared doc is painful. This gives you a real IDE, live sync, and context.

Stack:
  → React frontend with a Monaco-based code editor
  → Node.js + Express backend
  → Real-time sync via Socket.io
  → Clerk for auth (no password headaches)
  → Stream for chat
  → MongoDB for session persistence
  → Deployed on Render (backend) + Vercel (frontend)

Most interesting engineering challenge: handling concurrent edits without conflicts.`,
      tags: ["React", "Node.js", "Socket.io", "Clerk", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/MidunP/LiveCodeX",
      previewImage: "livecodex-preview.png",
    },
  ],

  // ── Skills (shown in terminal) ───────────────────────────
  skills: {
    backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Socket.io"],
    frontend: ["React.js", "JavaScript", "HTML5", "CSS3"],
    devops: ["Git", "GitHub", "Render", "Vercel", "Docker (basics)"],
    languages: ["JavaScript", "TypeScript (learning)", "Python (basics)"],
    tools: ["VS Code", "Postman", "MongoDB Atlas", "Figma"],
  },

  // ── Experience / Work ────────────────────────────────────
  articles: [
    {
      title: "Campus Ambassador",
      org: "Fractal AI · KPRIET",
      date: "2026 – 2027",
      excerpt: "Selected as the official campus ambassador for Fractal, an AI company, at KPRIET. Organising outreach sessions, coordinating workshops, and connecting peers with industry opportunities in the AI space.",
      url: "#",
      type: "experience",
      tags: ["Ambassador", "Fractal AI", "KPRIET"],
    },
    {
      title: "Content Writer",
      org: "NeuraNext · College AI Club",
      date: "2025 – Present",
      excerpt: "Writing technical articles and handling communications for NeuraNext, the college AI club. Work spans concept breakdowns, event coverage, and social media — with measurable growth in the club's reach since joining.",
      url: "#",
      type: "experience",
      tags: ["Content Writing", "AI Club"],
    },
    {
      title: "Executive Member",
      org: "IEEE Computational Intelligence Society",
      date: "2024 – 2025",
      excerpt: "Part of the executive committee for the college IEEE CIS chapter. Involved in planning technical events and workshops that bring computational intelligence research closer to students.",
      url: "#",
      type: "experience",
      tags: ["IEEE", "CIS"],
    },
    {
      title: "Data Science Intern",
      org: "Codsoft",
      date: "2024-2025",
      excerpt: "Built and evaluated ML models on real datasets as part of an internship at Codsoft. Worked end-to-end through data preparation, model training, and performance analysis using Python and pandas.",
      url: "#",
      type: "experience",
      tags: ["Internship", "Data Science", "Python"],
    },
    {
      title: "SDE Intern",
      org: "Miro Studios",
      date: "2023-2024",
      excerpt: "Developed production features for client-facing products at Miro Studios. Worked within the engineering team across the full development lifecycle — from design to deployment.",
      url: "#",
      type: "experience",
      tags: ["Internship", "SDE", "Full Stack"],
    },
  ],

  // ── Gallery (real photos) ──────────────────────────────────────
  gallery: [
    { src: "photos/photo_2026-05-14_19-22-08.jpg", label: "Photo 1" },
    { src: "photos/photo_2026-05-14_19-22-10.jpg", label: "Photo 2" },
    { src: "photos/photo_2026-05-14_19-22-12.jpg", label: "Photo 3" },
    { src: "photos/photo_2026-05-14_19-23-44.jpg", label: "Photo 4" },
    { src: "photos/photo_2026-05-14_20-31-22.jpg", label: "Photo 5" },
    { src: "photos/photo_2026-05-14_20-38-52.jpg", label: "Photo 6" },
  ],

  // ── Terminal about text ───────────────────────────────────
  terminalAbout: `
  Name       : Midun P
  Role       : SOFTWARE DEVELOPMENT ENGINEER
  Location   : India
  Education  : B.Tech CSE — 2023–2027

  Stack      : Node.js | Express | MongoDB | React | Socket.io
  Focus      : Backend Engineering · Real-time Systems · System Design

  Experience :
    → Content Creator @ GDSC (college chapter)
    → Campus Ambassador @ Unstop
    → Campus Ambassador @ Coding Ninjas

  Projects   :
    → Live Chess Website  (live: chess.vercel.app)
    → Banking Ledger API  (ACID-compliant transactions)
    → LiveCodeX           (real-time collaborative IDE)
    → macOS Portfolio     (you're looking at it)

  GitHub     : github.com/MidunP
  Status     : Open to internships & opportunities ✅
`,

  // ── Education ─────────────────────────────────────────────
  education: [
    {
      degree: "B.Tech — Computer Science Engineering",
      school: "KPR INSITUTE OF ENGINEERING AND TECHNOLOGY",
      period: "2023 – 2027",
      details: ["Relevant coursework: DSA, DBMS, OS, CN", "GPA: 8.6/ 10"],
    },
  ],
};
