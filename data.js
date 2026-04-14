// ============================================================
//  data.js — Edit YOUR details here!
// ============================================================

const PORTFOLIO_DATA = {

  // ── Personal Info ────────────────────────────────────────
  name: "Midun",
  fullName: "Midun [Your Last Name]",
  title: "Full Stack Developer",
  email: "your.email@example.com",
  location: "Your City, Country",
  bio: `Hey! I'm Midun 👋

A passionate Full Stack Developer who loves building scalable backend systems and clean, intuitive interfaces.

I mainly work with Node.js, Express, MongoDB, React, and JavaScript — and I'm always exploring new technologies.

Currently focused on:
  → Building robust backend architectures
  → Mastering system design
  → Exploring cloud deployment
  → Making things that actually solve problems

When I'm not coding, you'll find me playing chess ♟️, reading, or learning something new.

Available for internships, freelance work & chess matches!`,

  avatarEmoji: "👨‍💻",

  // ── Social Links ─────────────────────────────────────────
  // Replace '#' with your actual profile links
  social: [
    { name: "LinkedIn",  icon: "💼", url: "https://linkedin.com/in/your-profile" },
    { name: "GitHub",    icon: "🐙", url: "https://github.com/your-username" },
    { name: "Twitter/X", icon: "🐦", url: "https://twitter.com/your-handle" },
    { name: "Instagram", icon: "📸", url: "https://instagram.com/your-handle" },
    { name: "Discord",   icon: "💬", url: "#" },
    { name: "Medium",    icon: "✍️", url: "#" },
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
      description: `A production-grade banking transaction backend built with Node.js, Express, and MongoDB.

Key Features:
  → Atomic transactions using MongoDB sessions
  → JWT-based authentication with bcrypt password hashing
  → Account creation, fund transfers, and ledger history
  → Comprehensive error handling and input validation
  → RESTful API architecture following best practices

This system ensures financial data integrity through ACID-compliant operations, preventing race conditions and partial transaction failures.`,
      tags: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
      liveUrl: "#",         // Your deployed link
      githubUrl: "https://github.com/your-username/banking-backend",
    },
    {
      id: "chess-app",
      name: "Chess Application",
      icon: "♟️",
      emoji: "♟️",
      description: `An online multiplayer chess platform with real-time gameplay.

Key Features:
  → Real-time multiplayer using WebSockets (Socket.io)
  → Full chess rule enforcement (castling, en passant, promotion)
  → Game history and move tracking
  → Clean, responsive UI with drag-and-drop piece movement
  → Room-based matchmaking system

Built to showcase real-time communication patterns and complex game logic.`,
      tags: ["Node.js", "Socket.io", "JavaScript", "WebSockets"],
      liveUrl: "#",
      githubUrl: "https://github.com/your-username/chess-app",
    },
    {
      id: "portfolio",
      name: "macOS Portfolio",
      icon: "🖥️",
      emoji: "🖥️",
      description: `This portfolio! A macOS desktop-style interface built with vanilla HTML, CSS, and JavaScript.

Key Features:
  → Draggable, resizable windows
  → macOS dock with hover magnification
  → Functional terminal with custom commands
  → Dark/Light mode toggle
  → Spotlight search
  → Finder with project browsing
  → No frameworks — pure vanilla JS

Inspired by the amazing macOS portfolio aesthetic.`,
      tags: ["HTML", "CSS", "JavaScript", "UI/UX"],
      liveUrl: "#",
      githubUrl: "https://github.com/your-username/portfolio",
    },
    {
      id: "talent-iq",
      name: "Talent IQ",
      icon: "🧠",
      emoji: "🧠",
      description: `An AI-powered talent management and hiring platform.

Key Features:
  → AI-driven candidate screening and matching
  → Resume parsing and skill extraction
  → Automated interview scheduling
  → Dashboard analytics for hiring managers
  → RESTful API backend

Built to streamline the recruitment process using modern AI techniques.`,
      tags: ["Node.js", "AI/ML", "React", "MongoDB", "REST API"],
      liveUrl: "#",
      githubUrl: "https://github.com/your-username/talent-iq",
    },
  ],

  // ── Skills (shown in terminal) ───────────────────────────
  skills: {
    backend:   ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Socket.io"],
    frontend:  ["React.js", "JavaScript", "HTML5", "CSS3"],
    devops:    ["Git", "GitHub", "Render", "Vercel", "Docker (basics)"],
    languages: ["JavaScript", "TypeScript (learning)", "Python (basics)"],
    tools:     ["VS Code", "Postman", "MongoDB Atlas", "Figma"],
  },

  // ── Articles / Blog ───────────────────────────────────────
  articles: [
    {
      title: "Building an Atomic Banking Backend with MongoDB Sessions",
      date: "March 2026",
      excerpt: "How I implemented ACID-compliant transactions for a banking ledger using MongoDB sessions and Node.js to prevent race conditions and data corruption.",
      url: "#",
    },
    {
      title: "Real-time Chess with Node.js and Socket.io",
      date: "February 2026",
      excerpt: "A step-by-step guide to building a multiplayer chess game with WebSockets, covering game state synchronization, room management, and rule enforcement.",
      url: "#",
    },
    {
      title: "From Local to Production: Deploying Node.js Apps on Render",
      date: "January 2026",
      excerpt: "My experience deploying backend applications to Render — including environment variables, database connections, and handling the gotchas that caught me off guard.",
      url: "#",
    },
  ],

  // ── Gallery (emojis for now — replace with real images) ──
  gallery: [
    { emoji: "🏆", label: "Achievements" },
    { emoji: "💻", label: "Coding Setup" },
    { emoji: "♟️", label: "Chess" },
    { emoji: "📚", label: "Learning" },
    { emoji: "🎯", label: "Goals" },
    { emoji: "🌏", label: "World" },
  ],

  // ── Terminal about text ───────────────────────────────────
  terminalAbout: `
Name     : Midun
Role     : Full Stack Developer
Location : India
Focus    : Backend Engineering, System Design
Stack    : Node.js | Express | MongoDB | React
Status   : Available for opportunities ✅
`,

  // ── Education ─────────────────────────────────────────────
  education: [
    {
      degree: "B.Tech — Computer Science Engineering",
      school: "Your University Name",
      period: "2022 – 2026",
      details: ["Relevant coursework: DSA, DBMS, OS, CN", "GPA: X.X / 10"],
    },
  ],
};
