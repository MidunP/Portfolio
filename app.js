// ============================================================
//  app.js — macOS Portfolio Logic
// ============================================================

// ─── State ───────────────────────────────────────────────────
let isDark = true;
let activeWindows = {};
let dragState = null;
let topZ = 200;
let terminalHistory = [];
let terminalHistoryIdx = -1;

// ─── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
  startTypewriter();
  populateProjects();
  // Show terminal banner automatically when window first opens
  document.getElementById('dock-terminal')?.addEventListener('click', initTerminalBanner, { once: true });
  populateContact();
  populateArticles();
  populateGallery();
  buildAboutText();
  buildResumeWindow();
  initDockMagnify();
  initWindowDrag();
  applyTheme();

  // Global key shortcuts
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === ' ') { e.preventDefault(); toggleSpotlight(); }
    if (e.key === 'Escape') { closeSpotlight(); closeControlCenter(); }
  });
});

// ─── Clock ───────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  document.getElementById('menu-time').textContent = now.toLocaleString('en-US', options);
}

// ─── Typewriter ──────────────────────────────────────────────
const typewriterPhrases = [
  "Full Stack Developer 💻",
  "Backend Engineer 🛠️",
  "Chess Player ♟️",
  "Problem Solver 🧩",
  "Open Source Enthusiast 🌐",
];
let twPhrase = 0, twChar = 0, twDeleting = false;

function startTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  function tick() {
    const current = typewriterPhrases[twPhrase];
    if (twDeleting) {
      el.innerHTML = current.slice(0, twChar - 1) + '<span class="cursor-blink"></span>';
      twChar--;
      if (twChar === 0) {
        twDeleting = false;
        twPhrase = (twPhrase + 1) % typewriterPhrases.length;
        setTimeout(tick, 500);
        return;
      }
      setTimeout(tick, 40);
    } else {
      el.innerHTML = current.slice(0, twChar + 1) + '<span class="cursor-blink"></span>';
      twChar++;
      if (twChar === current.length) {
        setTimeout(() => { twDeleting = true; tick(); }, 2200);
        return;
      }
      setTimeout(tick, 80);
    }
  }
  setTimeout(tick, 1200);
}

// ─── Theme ───────────────────────────────────────────────────
function toggleTheme() {
  isDark = !isDark;
  applyTheme();
  closeControlCenter();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const label = document.getElementById('theme-label');
  const tile  = document.getElementById('theme-toggle');
  if (label) label.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  if (tile)  tile.querySelector('.cc-icon').textContent = isDark ? '🌙' : '☀️';
}

// ─── Control Center ──────────────────────────────────────────
function toggleControlCenter() {
  const cc = document.getElementById('control-center');
  cc.classList.toggle('hidden');
}
function closeControlCenter() {
  document.getElementById('control-center').classList.add('hidden');
}
document.addEventListener('click', e => {
  const cc  = document.getElementById('control-center');
  const btn = document.querySelector('.control-center-btn');
  if (!cc.contains(e.target) && !btn.contains(e.target)) cc.classList.add('hidden');
});

// ─── Spotlight ───────────────────────────────────────────────
function toggleSpotlight() {
  const overlay = document.getElementById('spotlight-overlay');
  overlay.classList.toggle('hidden');
  if (!overlay.classList.contains('hidden')) {
    document.getElementById('spotlight-input').focus();
    document.getElementById('spotlight-results').innerHTML = '';
    document.getElementById('spotlight-input').value = '';
  }
}
function closeSpotlight(e) {
  if (!e || e.target === document.getElementById('spotlight-overlay')) {
    document.getElementById('spotlight-overlay').classList.add('hidden');
  }
}

function spotlightSearch(query) {
  const results = document.getElementById('spotlight-results');
  results.innerHTML = '';
  if (!query.trim()) return;

  const items = [
    { icon: '📁', label: 'Finder — Projects', action: () => openApp('finder') },
    { icon: '📄', label: 'About Me', action: () => { openApp('finder'); finderNav('about'); } },
    { icon: '✍️', label: 'Articles', action: () => openApp('articles') },
    { icon: '🖼️', label: 'Gallery', action: () => openApp('gallery') },
    { icon: '📇', label: 'Contact', action: () => openApp('contact') },
    { icon: '⌨️', label: 'Terminal', action: () => openApp('terminal') },
    { icon: '📋', label: 'Resume', action: () => openApp('resume') },
    ...PORTFOLIO_DATA.projects.map(p => ({
      icon: p.emoji,
      label: `Project: ${p.name}`,
      action: () => openProject(p.id)
    })),
  ];

  const q = query.toLowerCase();
  const matched = items.filter(i => i.label.toLowerCase().includes(q)).slice(0, 8);

  matched.forEach(item => {
    const div = document.createElement('div');
    div.className = 'spotlight-result-item';
    div.innerHTML = `<span class="spotlight-result-icon">${item.icon}</span><span>${item.label}</span>`;
    div.addEventListener('click', () => {
      item.action();
      document.getElementById('spotlight-overlay').classList.add('hidden');
    });
    results.appendChild(div);
  });

  if (matched.length === 0) {
    results.innerHTML = '<div style="color:var(--text-muted);padding:10px 12px;font-size:13px;">No results found</div>';
  }
}

// ─── Window Management ───────────────────────────────────────
function openApp(appId) {
  const winId = appId === 'finder'   ? 'finder-window'
              : appId === 'articles' ? 'articles-window'
              : appId === 'gallery'  ? 'gallery-window'
              : appId === 'contact'  ? 'contact-window'
              : appId === 'terminal' ? 'terminal-window'
              : appId === 'resume'   ? 'resume-window'
              : appId === 'trash'    ? 'finder-window'
              : null;

  if (!winId) return;

  if (appId === 'trash') { finderNav('trash'); }

  const win = document.getElementById(winId);
  if (!win) return;

  bounceDock(`dock-${appId}`);
  win.classList.remove('hidden');
  bringToFront(win);
  markRunning(appId);

  // Special init
  if (appId === 'terminal') { focusTerminalInput(); }
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  if (win) {
    win.style.transform = 'scale(0.9)';
    win.style.opacity = '0';
    win.style.transition = 'transform 0.2s, opacity 0.2s';
    setTimeout(() => {
      win.classList.add('hidden');
      win.style.transform = ''; win.style.opacity = ''; win.style.transition = '';
    }, 200);
  }
}

function minimizeWindow(winId) {
  closeWindow(winId);
}

function bringToFront(win) {
  document.querySelectorAll('.macos-window').forEach(w => w.classList.remove('focused'));
  win.classList.add('focused');
  win.style.zIndex = ++topZ;
}

function markRunning(appId) {
  const dock = document.getElementById(`dock-${appId}`);
  if (dock) dock.classList.add('running');
}

function bounceDock(dockId) {
  const item = document.getElementById(dockId);
  if (!item) return;
  item.classList.remove('bouncing');
  void item.offsetWidth;
  item.classList.add('bouncing');
  setTimeout(() => item.classList.remove('bouncing'), 600);
}

// Click on window to focus
document.addEventListener('mousedown', e => {
  const win = e.target.closest('.macos-window');
  if (win) bringToFront(win);
});

// ─── Window Dragging ─────────────────────────────────────────
function initWindowDrag() {
  document.addEventListener('mousemove', e => {
    if (!dragState) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    dragState.win.style.left = (dragState.origLeft + dx) + 'px';
    dragState.win.style.top  = (dragState.origTop  + dy) + 'px';
  });
  document.addEventListener('mouseup', () => { dragState = null; });
}

function startDrag(e, winId) {
  if (e.target.tagName === 'BUTTON') return;
  const win = document.getElementById(winId);
  bringToFront(win);
  dragState = {
    win,
    startX: e.clientX, startY: e.clientY,
    origLeft: parseInt(win.style.left) || 80,
    origTop:  parseInt(win.style.top)  || 60,
  };
}

// ─── Finder Navigation ───────────────────────────────────────
function finderNav(section) {
  document.querySelectorAll('.finder-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));

  const sec = document.getElementById(`finder-${section}`);
  const sidebar = document.getElementById(`sidebar-${section}`);
  if (sec) sec.classList.add('active');
  if (sidebar) sidebar.classList.add('active');
}

// ─── Projects ────────────────────────────────────────────────
// macOS-style blue folder SVG
function macFolderSVG() {
  return `<svg class="folder-icon-svg" viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#72C1F5"/>
        <stop offset="1" stop-color="#3A9DE0"/>
      </linearGradient>
      <linearGradient id="fg2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#87CDFA"/>
        <stop offset="1" stop-color="#4EB0F0"/>
      </linearGradient>
    </defs>
    <!-- folder back -->
    <rect x="2" y="14" width="76" height="46" rx="5" fill="url(#fg1)"/>
    <!-- tab -->
    <path d="M2 14 Q2 10 6 10 L28 10 Q32 10 34 14 Z" fill="#5BAEE8"/>
    <!-- folder front highlight -->
    <rect x="2" y="20" width="76" height="40" rx="5" fill="url(#fg2)"/>
    <!-- shine line -->
    <rect x="2" y="20" width="76" height="6" rx="3" fill="rgba(255,255,255,0.25)"/>
  </svg>`;
}

function populateProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // Sidebar work items too
  const sidebarWork = document.getElementById('sidebar-work-items');

  PORTFOLIO_DATA.projects.forEach(p => {
    // Grid folder item
    const item = document.createElement('div');
    item.className = 'finder-item';
    item.innerHTML = `${macFolderSVG()}<span class="finder-item-name">${p.name}</span>`;
    item.addEventListener('dblclick', () => openProject(p.id));
    grid.appendChild(item);

    // Sidebar sub-item
    if (sidebarWork) {
      const si = document.createElement('div');
      si.className = 'sidebar-item sidebar-sub-item';
      si.innerHTML = `<svg width="14" height="14" viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="8" width="78" height="50" rx="5" fill="#5BAEE8"/><path d="M1 16 Q1 8 6 8 L28 8 Q33 8 35 14 Z" fill="#4A9ED8"/><rect x="1" y="16" width="78" height="42" rx="5" fill="#72C1F5"/></svg> ${p.name}`;
      si.addEventListener('click', () => openProject(p.id));
      sidebarWork.appendChild(si);
    }
  });
}

function openProject(id) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!project) return;

  document.getElementById('project-window-title').textContent = `${project.name}.txt`;

  const body = document.getElementById('project-detail-body');
  body.innerHTML = `
    <div class="project-header">
      <span class="project-icon-lg">${project.emoji}</span>
      <div class="project-title-block">
        <div class="project-title">${project.name}</div>
        <div class="project-tags">
          ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="project-description">${project.description}</div>
    <div class="project-links">
      ${project.liveUrl && project.liveUrl !== '#' ? `<a href="${project.liveUrl}" target="_blank" class="project-link-btn primary">🌐 Live Demo</a>` : ''}
      ${project.githubUrl && project.githubUrl !== '#' ? `<a href="${project.githubUrl}" target="_blank" class="project-link-btn secondary">🐙 GitHub</a>` : '<span class="project-link-btn secondary" style="opacity:0.5;cursor:not-allowed;">🔒 Private</span>'}
    </div>
  `;

  const win = document.getElementById('project-window');
  win.classList.remove('hidden');
  bringToFront(win);
}

// ─── About Text File ─────────────────────────────────────────
function buildAboutText() {
  const pre = document.getElementById('about-text-content');
  if (!pre) return;
  pre.textContent = `# about-me.txt
# Last modified: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
# ─────────────────────────────────────────

${PORTFOLIO_DATA.bio}

# ─────────────────────────────────────────
# Contact: ${PORTFOLIO_DATA.email}
# Location: ${PORTFOLIO_DATA.location}
# ─────────────────────────────────────────`;
}

function openTextFile(type) {
  if (type === 'about-me') {
    const win = document.getElementById('about-window');
    win.classList.remove('hidden');
    bringToFront(win);
  }
}

// ─── Contact ─────────────────────────────────────────────────
function populateContact() {
  const details = document.getElementById('contact-details');
  if (!details) return;
  details.innerHTML = `
    <div class="contact-avatar">${PORTFOLIO_DATA.avatarEmoji}</div>
    <div class="contact-name-big">${PORTFOLIO_DATA.fullName}</div>
    <div class="contact-role">${PORTFOLIO_DATA.title}</div>
    <div class="contact-bio">${PORTFOLIO_DATA.bio.split('\n').slice(0, 3).join('\n')}</div>
    <div class="contact-field">
      <div class="contact-field-label">Email</div>
      <div class="contact-field-value"><a href="mailto:${PORTFOLIO_DATA.email}" style="color:var(--accent-blue);text-decoration:none;">${PORTFOLIO_DATA.email}</a></div>
    </div>
    <div class="contact-field">
      <div class="contact-field-label">Location</div>
      <div class="contact-field-value">${PORTFOLIO_DATA.location}</div>
    </div>
    <div class="contact-field">
      <div class="contact-field-label">Socials</div>
      <div class="social-links-grid">
        ${PORTFOLIO_DATA.social.map(s => `
          <a href="${s.url}" target="_blank" class="social-link-chip">
            <span class="social-icon">${s.icon}</span>${s.name}
          </a>`).join('')}
      </div>
    </div>
  `;
}

// ─── Articles ────────────────────────────────────────────────
function populateArticles() {
  const body = document.getElementById('articles-body');
  if (!body) return;
  PORTFOLIO_DATA.articles.forEach(a => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="article-date">${a.date}</div>
      <div class="article-title">${a.title}</div>
      <div class="article-excerpt">${a.excerpt}</div>
    `;
    card.addEventListener('click', () => { if (a.url && a.url !== '#') window.open(a.url); });
    body.appendChild(card);
  });
}

// ─── Gallery ─────────────────────────────────────────────────
function populateGallery() {
  const body = document.getElementById('gallery-body');
  if (!body) return;
  PORTFOLIO_DATA.gallery.forEach(g => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.textContent = g.emoji;
    item.title = g.label;
    body.appendChild(item);
  });
}

// ─── Resume Window ───────────────────────────────────────────
function buildResumeWindow() {
  const body = document.getElementById('resume-body');
  if (!body) return;

  const skillsHTML = Object.entries(PORTFOLIO_DATA.skills).map(([cat, items]) => `
    <div style="margin-bottom:8px;">
      <span style="font-size:12px;color:var(--text-muted);text-transform:capitalize;margin-right:8px;">${cat}:</span>
      ${items.map(s => `<span class="resume-skill-tag">${s}</span>`).join('')}
    </div>
  `).join('');

  const projHTML = PORTFOLIO_DATA.projects.map(p => `
    <div class="resume-entry">
      <div class="resume-entry-title">${p.emoji} ${p.name}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
        ${p.tags.map(t => `<span class="resume-skill-tag">${t}</span>`).join('')}
      </div>
      <div class="resume-entry-sub" style="margin-top:6px;">${p.description.split('\n')[0]}</div>
    </div>
  `).join('');

  const eduHTML = PORTFOLIO_DATA.education.map(e => `
    <div class="resume-entry">
      <div class="resume-entry-title">${e.degree} <span class="resume-entry-period">${e.period}</span></div>
      <div class="resume-entry-sub">${e.school}</div>
      <ul>${e.details.map(d => `<li>${d}</li>`).join('')}</ul>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="resume-header">
      <div class="resume-name">${PORTFOLIO_DATA.fullName}</div>
      <div class="resume-contact-row">
        <span class="resume-contact-item">📧 ${PORTFOLIO_DATA.email}</span>
        <span class="resume-contact-item">📍 ${PORTFOLIO_DATA.location}</span>
        ${PORTFOLIO_DATA.social.filter(s=>s.name==='GitHub')[0]
          ? `<span class="resume-contact-item">🐙 ${PORTFOLIO_DATA.social.filter(s=>s.name==='GitHub')[0].url.replace('https://','')}</span>` : ''}
        ${PORTFOLIO_DATA.social.filter(s=>s.name==='LinkedIn')[0]
          ? `<span class="resume-contact-item">💼 ${PORTFOLIO_DATA.social.filter(s=>s.name==='LinkedIn')[0].url.replace('https://','')}</span>` : ''}
      </div>
    </div>
    <div>
      <div class="resume-section-title">Education</div>
      ${eduHTML}
    </div>
    <div>
      <div class="resume-section-title">Projects</div>
      ${projHTML}
    </div>
    <div>
      <div class="resume-section-title">Skills</div>
      <div class="resume-skills-grid" style="display:block;">${skillsHTML}</div>
    </div>
    ${PORTFOLIO_DATA.resumeLink && PORTFOLIO_DATA.resumeLink !== '#'
      ? `<a href="${PORTFOLIO_DATA.resumeLink}" target="_blank" class="resume-download-btn">⬇️ Download Full Resume</a>`
      : '<div style="color:var(--text-muted);font-size:13px;">💡 Set your resume PDF link in data.js → resumeLink</div>'}
  `;
}

// ─── Terminal ────────────────────────────────────────────────
const TERMINAL_COMMANDS = {
  help: () => `Available commands:
  about      — About me
  skills     — My tech stack
  projects   — List all projects
  contact    — Contact info
  social     — Social links
  open <app> — Open an app (finder, articles, gallery, contact, resume)
  clear      — Clear terminal
  whoami     — Who am I?
  date       — Current date & time
  theme      — Toggle dark/light mode
  banner     — Show welcome banner`,

  about: () => PORTFOLIO_DATA.terminalAbout,

  whoami: () => `${PORTFOLIO_DATA.name} — ${PORTFOLIO_DATA.title}`,

  date: () => new Date().toString(),

  skills: () => {
    let out = '';
    Object.entries(PORTFOLIO_DATA.skills).forEach(([cat, items]) => {
      out += `\n  ${cat.toUpperCase().padEnd(12)} ${items.join(', ')}`;
    });
    return out;
  },

  projects: () => {
    let out = '\n';
    PORTFOLIO_DATA.projects.forEach((p, i) => {
      out += `  [${i+1}] ${p.emoji} ${p.name}\n      ${p.tags.join(' · ')}\n\n`;
    });
    out += '  Type: open finder  to browse projects';
    return out;
  },

  contact: () => `
  Email    : ${PORTFOLIO_DATA.email}
  Location : ${PORTFOLIO_DATA.location}`,

  social: () => {
    return '\n' + PORTFOLIO_DATA.social.map(s => `  ${s.icon} ${s.name.padEnd(12)} ${s.url}`).join('\n');
  },

  clear: () => { document.getElementById('terminal-output').innerHTML = ''; return null; },

  theme: () => { toggleTheme(); return `Theme switched to ${isDark ? 'dark' : 'light'} mode.`; },

  banner: () => `
  ███╗   ███╗██╗██████╗ ██╗   ██╗███╗   ██╗
  ████╗ ████║██║██╔══██╗██║   ██║████╗  ██║
  ██╔████╔██║██║██║  ██║██║   ██║██╔██╗ ██║
  ██║╚██╔╝██║██║██║  ██║██║   ██║██║╚██╗██║
  ██║ ╚═╝ ██║██║██████╔╝╚██████╔╝██║ ╚████║
  ╚═╝     ╚═╝╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝

  Welcome to ${PORTFOLIO_DATA.name}'s Portfolio Terminal v1.0
  Type 'help' for a list of commands.`,
};

function focusTerminalInput() {
  const input = document.getElementById('terminal-input');
  if (input) input.focus();
}

function handleTerminalInput(e) {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  if (e.key === 'ArrowUp') {
    if (terminalHistoryIdx < terminalHistory.length - 1) {
      terminalHistoryIdx++;
      input.value = terminalHistory[terminalHistory.length - 1 - terminalHistoryIdx];
    }
    return;
  }
  if (e.key === 'ArrowDown') {
    if (terminalHistoryIdx > 0) {
      terminalHistoryIdx--;
      input.value = terminalHistory[terminalHistory.length - 1 - terminalHistoryIdx];
    } else {
      terminalHistoryIdx = -1;
      input.value = '';
    }
    return;
  }

  if (e.key !== 'Enter') return;
  const cmd = input.value.trim();
  input.value = '';
  terminalHistoryIdx = -1;
  if (!cmd) return;

  terminalHistory.push(cmd);

  const promptLine = document.createElement('div');
  promptLine.className = 'terminal-line';
  promptLine.innerHTML = `<span class="terminal-prompt-display">midun@macbook ~ %</span> <span class="terminal-command">${escapeHtml(cmd)}</span>`;
  output.appendChild(promptLine);

  // Parse command
  const parts = cmd.split(/\s+/);
  const base = parts[0].toLowerCase();
  const args = parts.slice(1);

  let result = '';

  if (base === 'open' && args[0]) {
    openApp(args[0]);
    result = `Opening ${args[0]}...`;
  } else if (TERMINAL_COMMANDS[base]) {
    result = TERMINAL_COMMANDS[base]();
  } else {
    result = `Command not found: ${cmd}\nType 'help' for available commands.`;
  }

  if (result !== null && result !== undefined) {
    const outLine = document.createElement('div');
    outLine.className = 'terminal-line terminal-output-text';
    outLine.style.whiteSpace = 'pre';
    outLine.textContent = result;
    output.appendChild(outLine);
  }

  // Scroll to bottom
  const termBody = document.getElementById('terminal-body');
  termBody.scrollTop = termBody.scrollHeight;
}

// Show welcome banner the first time terminal opens
function initTerminalBanner() {
  setTimeout(() => {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    const banner = TERMINAL_COMMANDS.banner();
    const helpText = TERMINAL_COMMANDS.help();
    const div = document.createElement('div');
    div.className = 'terminal-line terminal-output-text';
    div.style.whiteSpace = 'pre';
    div.textContent = banner + '\n\n' + helpText;
    output.appendChild(div);
    const termBody = document.getElementById('terminal-body');
    if (termBody) termBody.scrollTop = termBody.scrollHeight;
  }, 150);
}

// ─── Dock Magnify ────────────────────────────────────────────
function initDockMagnify() {
  const dock = document.getElementById('dock');
  const items = dock.querySelectorAll('.dock-item');

  dock.addEventListener('mousemove', e => {
    const dockRect = dock.getBoundingClientRect();
    const mouseX = e.clientX;

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const dist = Math.abs(mouseX - itemCenterX);
      const maxDist = 120;
      const scale = dist < maxDist ? 1 + (0.4 * (1 - dist / maxDist)) : 1;
      const lift  = dist < maxDist ? -12 * (1 - dist / maxDist) : 0;
      item.style.transform = `scale(${scale}) translateY(${lift}px)`;
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach(item => { item.style.transform = ''; });
  });
}

// ─── Utils ───────────────────────────────────────────────────
function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
