import { C } from "../colors/colors";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Be Vietnam Pro', sans-serif; background: ${C.surface}; color: ${C.onSurface}; -webkit-font-smoothing: antialiased; }
.msym { font-family: 'Material Symbols Outlined'; font-weight: 400; font-style: normal; display: inline-flex; align-items: center; vertical-align: middle; line-height: 1; }
.msym-filled { font-variation-settings: 'FILL' 1; }

/* Themed thin scrollbar for modern browsers */
html, body, * {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: ${C.secondaryContainer} rgba(0,0,0,0.06);
}

/* WebKit browsers */
*::-webkit-scrollbar { width: 8px; height: 8px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: ${C.secondaryContainer}; border-radius: 999px; border: 2px solid rgba(255,255,255,0.06); }
*::-webkit-scrollbar-thumb:hover { background: ${C.secondary}; }

@keyframes fadeInDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
@keyframes heroSlide { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
@keyframes pulse-slow { 0%,100% { opacity:.15; transform:scale(1); } 50% { opacity:.25; transform:scale(1.08); } }
@keyframes countUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }

.nav-link { font-family:'Be Vietnam Pro',sans-serif; font-size:14px; font-weight:600; letter-spacing:.05em; color:${C.onSurfaceVariant}; text-decoration:none; transition:color .2s, transform .2s; display:inline-block; }
.nav-link:hover { color:${C.primary}; transform:translateY(-2px); }
.nav-link.active { color:${C.primary}; border-bottom:2px solid ${C.primary}; padding-bottom:2px; }

.btn-primary { background:${C.secondaryContainer}; color:${C.onSecondary}; border:none; border-radius:999px; font-family:'Be Vietnam Pro',sans-serif; font-size:14px; font-weight:600; letter-spacing:.05em; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:transform .25s, box-shadow .25s; }
.btn-primary:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(252,138,64,.45); }
.btn-primary:active { transform:scale(.97); }

.btn-glass { background:rgba(255,255,255,.7); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.4); border-radius:999px; font-family:'Be Vietnam Pro',sans-serif; font-size:14px; font-weight:600; letter-spacing:.05em; color:${C.primary}; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:background .25s, transform .25s; }
.btn-glass:hover { background:rgba(255,255,255,.95); transform:translateY(-2px); }

.dest-card:hover .dest-img { transform:scale(1.08); }
.dest-card:hover { box-shadow:0 24px 56px rgba(0,0,0,.35); }

.feature-card:hover { background:${C.white}; box-shadow:0 16px 48px rgba(0,50,125,.1); transform:translateY(-4px); }
.feature-card:hover .feat-icon { transform:scale(1.1); }

.test-card { flex-shrink:0; scroll-snap-align:start; }

.price-card-mid { transform:scale(1.05); }

@media (max-width:768px) {
  .hero-title { font-size:40px !important; }
  .price-card-mid { transform:none; }
}
`;

export function StyleInject() {
    return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}