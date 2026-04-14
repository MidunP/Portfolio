// ══════════════════════════════════════════════════════════════════════
//  liquid-text.js — WebGL Liquid Ripple Effect for Portfolio text
//  Three.js + custom GLSL shaders
//  - Reads exact DOM text element positions via getBoundingClientRect()
//  - Renders text to a 2D canvas texture with chromatic aberration
//  - Full-screen Three.js plane with displacement shader:
//      sine-wave ripple + exponential falloff + magnetic pull + noise
//  - Crossfades from DOM text to WebGL canvas after stagger completes
// ══════════════════════════════════════════════════════════════════════

(function initLiquidRipple() {

  // ── Vertex Shader ──────────────────────────────────────────────────
  var VERT = [
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = uv;',
    '  gl_Position = vec4(position, 1.0);',
    '}'
  ].join('\n');

  // ── Fragment Shader ────────────────────────────────────────────────
  var FRAG = [
    'precision highp float;',

    'uniform sampler2D uTex;',   // 2D canvas text texture
    'uniform vec2      uMouse;', // cursor UV — Y flipped (0=bottom, 1=top)
    'uniform float     uTime;',  // elapsed seconds
    'uniform float     uStr;',   // 0..1 activation strength

    'varying vec2 vUv;',

    // --- Smooth value-noise for organic micro-wave ---
    'float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }',
    'float noise(vec2 p){',
    '  vec2 i=floor(p); vec2 f=fract(p);',
    '  f=f*f*(3.0-2.0*f);',
    '  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),',
    '             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);',
    '}',

    'void main() {',
    '  vec2 uv = vUv;',

    // Passive organic shimmer — gentle always-on surface movement
    '  float n = (noise(uv * 4.5 + uTime * 0.25) - 0.5);',
    '  uv += vec2(n, n) * 0.0022;',

    // Cursor ripple setup
    '  vec2  d    = uv - uMouse;',     // vector: UV fragment → cursor
    '  float dist = length(d);',       // distance to cursor

    // Exponential falloff: 1.0 at cursor, ≈0 beyond 0.4 UV distance
    '  float fo   = exp(-dist * 6.5) * uStr;',

    // Sine wave radiating outward: dist*26=frequency, uTime*5.2=speed
    '  float wave = sin(dist * 26.0 - uTime * 5.2) * fo * 0.052;',

    // Radial displacement — pushes UV outward like a water surface
    '  vec2 radial = dist > 0.001 ? normalize(d) : vec2(0.0);',
    '  uv += radial * wave;',

    // Magnetic pull — letters softly lean toward the cursor
    '  uv -= d * (exp(-dist * 4.2) * 0.019 * uStr);',

    // Sample text texture with distorted UV
    '  gl_FragColor = texture2D(uTex, clamp(uv, 0.001, 0.999));',
    '}'
  ].join('\n');

  // ── Load Three.js dynamically, then wait for fonts + stagger done ──
  // Greeting stagger: ~1385ms, Portfolio: ~1220ms, transitions: ~300ms
  // Total wait: 1800ms after fonts ready to ensure everything is visible
  function loadThree(cb) {
    if (typeof THREE !== 'undefined') { cb(); return; }
    var s   = document.createElement('script');
    s.src   = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.async = true;
    s.onload  = cb;
    s.onerror = function() { console.warn('[LiquidText] Failed to load Three.js'); };
    document.head.appendChild(s);
  }

  document.fonts.ready.then(function () {
    loadThree(function () {
      setTimeout(setup, 1800);
    });
  });

  // ── Main setup ─────────────────────────────────────────────────────
  function setup() {
    if (typeof THREE === 'undefined') {
      console.warn('[LiquidText] THREE.js not found — skipping liquid effect.');
      return;
    }

    var W   = window.innerWidth;
    var H   = window.innerHeight;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    // Get text element references and their exact screen positions
    var glLine = document.querySelector('.g-line');
    var gPort  = document.getElementById('g-port-word');
    if (!glLine || !gPort) return;

    var lR  = glLine.getBoundingClientRect();
    var pR  = gPort.getBoundingClientRect();
    var lFs = parseFloat(getComputedStyle(glLine).fontSize) || 30;
    var pFs = parseFloat(getComputedStyle(gPort ).fontSize) || 128;

    // ── Draw text to offscreen 2D canvas ─────────────────────────────
    var tc    = document.createElement('canvas');
    tc.width  = Math.round(W * DPR);
    tc.height = Math.round(H * DPR);
    var ctx   = tc.getContext('2d');
    ctx.scale(DPR, DPR);
    ctx.textBaseline = 'middle';
    ctx.textAlign    = 'center';

    // Name from data or fallback
    var dataName = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.name) || 'Midun';
    var name     = dataName + '!';
    var greeting = 'Hey, I\u2019m ' + name + ' Welcome to my';
    var cx       = W / 2; // text is center-aligned in viewport

    // Draw text with chromatic-aberration text-shadow (red left, cyan right)
    function drawChr(text, x, y, fs) {
      ctx.save();
      ctx.font        = 'italic 400 ' + fs + 'px Georama, sans-serif';
      ctx.fillStyle   = 'rgb(209, 213, 219)';
      ctx.shadowBlur  = 0;
      ctx.shadowOffsetY = 0;
      // Red left shadow
      ctx.shadowColor   = 'rgba(255,50,50,0.35)';
      ctx.shadowOffsetX = -1;
      ctx.fillText(text, x, y);
      // Cyan right shadow
      ctx.shadowColor   = 'rgba(50,200,255,0.35)';
      ctx.shadowOffsetX = 1;
      ctx.fillText(text, x, y);
      ctx.restore();
    }

    // Draw greeting at vertical midpoint of .g-line element
    drawChr(greeting,    cx, lR.top + lR.height / 2, lFs);
    // Draw Portfolio at vertical midpoint of #g-port-word element
    drawChr('Portfolio', cx, pR.top + pR.height / 2, pFs);

    // ── THREE.js renderer ─────────────────────────────────────────────
    var canvas       = document.createElement('canvas');
    canvas.id        = 'liquid-canvas';
    canvas.style.position   = 'fixed';
    canvas.style.top        = '0';
    canvas.style.left       = '0';
    canvas.style.width      = W + 'px';
    canvas.style.height     = H + 'px';
    canvas.style.zIndex     = '4';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity    = '0';
    canvas.style.transition = 'opacity 0.7s ease';
    document.body.appendChild(canvas);

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(DPR);

    var scene  = new THREE.Scene();
    // Orthographic: left=-1, right=1, top=1, bottom=-1
    // UV(0,0) = bottom-left = screen bottom-left
    // UV(1,1) = top-right   = screen top-right
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // CanvasTexture: default flipY=true, so canvas origin (top-left)
    // correctly maps to screen top — no position inversion needed
    var tex = new THREE.CanvasTexture(tc);

    var uniforms = {
      uTex:   { value: tex },
      uMouse: { value: new THREE.Vector2(-2, -2) }, // off-screen until first move
      uTime:  { value: 0.0 },
      uStr:   { value: 0.0 },
    };

    var mat = new THREE.ShaderMaterial({
      uniforms:       uniforms,
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthTest:      false,
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    // ── Cursor / touch tracking ───────────────────────────────────────
    var tgtX = -2, tgtY = -2, smX = -2, smY = -2;
    var tgtS = 0,  smS  = 0;

    function track(clientX, clientY) {
      tgtX = clientX / W;
      tgtY = 1.0 - clientY / H; // flip Y: WebGL +Y axis is up
      tgtS = 1;
    }

    window.addEventListener('mousemove', function (e) { track(e.clientX, e.clientY); });
    window.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) track(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchend',     function () { tgtS = 0; });
    document.addEventListener('mouseleave', function () { tgtS = 0; });

    // ── Crossfade: fade DOM spans → WebGL canvas ──────────────────────
    function fadeSpans(el) {
      if (!el) return;
      var spans = el.querySelectorAll('span');
      var len   = spans.length;
      for (var i = 0; i < len; i++) {
        spans[i].style.transition = 'opacity 0.7s ease';
        spans[i].style.opacity    = '0';
      }
    }
    fadeSpans(glLine);
    fadeSpans(gPort);

    // Trigger CSS opacity transition on next paint frame
    requestAnimationFrame(function () {
      canvas.style.opacity = '1';
    });

    // ── Render loop ────────────────────────────────────────────────────
    var t0 = performance.now();

    function animate() {
      requestAnimationFrame(animate);

      var t = (performance.now() - t0) / 1000;

      // Lerp smooth easing — 0.09 per frame ≈ ~11ms lag
      smX += (tgtX - smX) * 0.09;
      smY += (tgtY - smY) * 0.09;
      smS += (tgtS - smS) * 0.045; // slower activation for smooth ramp

      uniforms.uMouse.value.set(smX, smY);
      uniforms.uTime.value = t;
      uniforms.uStr.value  = Math.max(0, smS);

      renderer.render(scene, camera);
    }

    animate();
  }

})();
