import { useState, useEffect, useRef, useCallback } from "react";

const PROJECTS = [
  {
    id: 1, name: "MERIDIAN", category: "WEB APP",
    description: "A real-time collaboration platform built for distributed creative teams. End-to-end design and frontend development.",
    year: "2025", tags: ["React", "WebSocket", "Figma"], color: "#00d4ff",
    icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5"/><path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="1.5"/><circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5"/></svg>),
    previewGradient: "linear-gradient(135deg, #0a1628 0%, #0d2847 40%, #0a4060 100%)",
  },
  {
    id: 2, name: "KOVA", category: "BRAND IDENTITY",
    description: "Complete brand system for a fintech startup. Logo, type system, motion guidelines, and component library.",
    year: "2024", tags: ["Branding", "Motion", "Systems"], color: "#ff6b35",
    icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="10" y="14" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M18 20l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>),
    previewGradient: "linear-gradient(135deg, #1a0f08 0%, #2d1810 40%, #4a2018 100%)",
  },
  {
    id: 3, name: "ATLAS", category: "MOBILE APP",
    description: "Navigation and discovery app for urban explorers. Designed and prototyped the full mobile experience.",
    year: "2024", tags: ["iOS", "Prototyping", "UX"], color: "#a78bfa",
    icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 10l14 28H10L24 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>),
    previewGradient: "linear-gradient(135deg, #0f0a1a 0%, #1a1030 40%, #251845 100%)",
  },
  {
    id: 4, name: "SIGNAL", category: "DASHBOARD",
    description: "Analytics dashboard for a media company. Complex data visualization with an emphasis on clarity and speed.",
    year: "2023", tags: ["D3.js", "Data Viz", "Design"], color: "#10b981",
    icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M12 34V22M20 34V14M28 34V26M36 34V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
    previewGradient: "linear-gradient(135deg, #06120d 0%, #0a2018 40%, #0d3025 100%)",
  },
  {
    id: 5, name: "PRISM", category: "CREATIVE TOOL",
    description: "Generative art tool that turns user inputs into unique visual compositions. WebGL-powered with real-time rendering.",
    year: "2023", tags: ["WebGL", "Canvas", "Creative"], color: "#f472b6",
    icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><polygon points="24,8 40,36 8,36" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="24" y1="8" x2="24" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4"/><line x1="16" y1="22" x2="40" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4"/><line x1="32" y1="22" x2="8" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>),
    previewGradient: "linear-gradient(135deg, #1a080f 0%, #2d1020 40%, #451835 100%)",
  },
];

const SECONDARY_NAV = [
  { id: "GITHUB", label: "GITHUB", href: "#" },
  { id: "LINKEDIN", label: "LINKEDIN", href: "#" },
  { id: "RESUME", label: "RESUME", href: "#" },
];

/* ── Animated Background ── */
function AnimatedBackground({ tint, blurred }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    particles.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.25 + 0.05,
    }));
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    let t = 0;
    const loop = () => {
      t += 0.004;
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w * 0.3 + Math.sin(t) * 80, h * 0.4 + Math.cos(t * 0.7) * 60, 0, w * 0.5, h * 0.5, w * 0.85);
      g.addColorStop(0, "rgba(10,20,40,0.35)"); g.addColorStop(1, "rgba(4,6,12,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(100,180,255,0.018)"; ctx.lineWidth = 0.5;
      const gs = 90; const ox = (t * 6) % gs; const oy = (t * 4) % gs;
      for (let x = -gs + ox; x < w + gs; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = -gs + oy; y < h + gs; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      const ps = particles.current;
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`; ctx.fill();
      });
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) { ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.strokeStyle = `rgba(0,212,255,${0.025 * (1 - d / 140)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      const sy = (t * 50) % (h + 200) - 100;
      const sg = ctx.createLinearGradient(0, sy - 30, 0, sy + 30);
      sg.addColorStop(0, "rgba(0,212,255,0)"); sg.addColorStop(0.5, "rgba(0,212,255,0.012)"); sg.addColorStop(1, "rgba(0,212,255,0)");
      ctx.fillStyle = sg; ctx.fillRect(0, sy - 30, w, 60);
      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "#060810", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, background: tint || "transparent", transition: "background 0.8s ease", zIndex: 1 }} />
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", transition: "filter 0.6s ease", filter: blurred ? "blur(8px)" : "none" }} />
      {/* Extra blur overlay for projects screen */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 2,
        backdropFilter: blurred ? "blur(12px)" : "blur(0px)",
        background: blurred ? "rgba(6,8,13,0.35)" : "transparent",
        transition: "all 0.6s ease",
        pointerEvents: "none",
      }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(4,6,12,0.75) 100%)", zIndex: 3, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "25vh", background: "linear-gradient(to top, rgba(6,8,13,0.85) 0%, transparent 100%)", zIndex: 3, pointerEvents: "none" }} />
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "35vw", background: "linear-gradient(to right, rgba(6,8,13,0.6) 0%, transparent 100%)", zIndex: 3, pointerEvents: "none" }} />
    </>
  );
}

/* ── Contact Button (icon-only) ── */
function ContactButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "hello@rabih.app";
  const ref = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button onClick={() => setOpen(!open)}
        style={{
          width: 38, height: 38, borderRadius: 8,
          background: open ? "rgba(0,212,255,0.14)" : "rgba(255,255,255,0.04)",
          border: open ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease", padding: 0,
        }}
        onMouseEnter={e => { if (!open) { e.currentTarget.style.background = "rgba(0,212,255,0.08)"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; }}}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="4" width="14" height="10" rx="2" stroke="#00d4ff" strokeWidth="1.3"/>
          <path d="M2 6l7 4.5L16 6" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{
        position: "absolute", top: "calc(100% + 8px)", right: 0,
        background: "rgba(10,12,20,0.95)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
        padding: "14px 16px", minWidth: 240,
        opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(-6px)",
        transition: "all 0.2s ease", pointerEvents: open ? "auto" : "none", zIndex: 200,
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", color: "#4a4f5a", marginBottom: 10 }}>GET IN TOUCH</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.03)", borderRadius: 6,
          padding: "10px 12px", marginBottom: 10,
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#c8cad0", flex: 1 }}>{email}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleCopy} style={{
            flex: 1, background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6,
            padding: "8px 12px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 11,
            color: copied ? "#10b981" : "#9ca0ab",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { if (!copied) e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            {copied ? (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>COPIED</>
            ) : (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1"/><path d="M8 4V2.5A1.5 1.5 0 006.5 1h-4A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" stroke="currentColor" strokeWidth="1.1"/></svg>COPY</>
            )}
          </button>
          <a href={`mailto:${email}`} style={{
            flex: 1, background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.2)", borderRadius: 6,
            padding: "8px 12px", cursor: "pointer", textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#00d4ff",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3l5 3.5L11 3" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round"/><rect x="1" y="2" width="10" height="8" rx="1.5" stroke="#00d4ff" strokeWidth="1.1"/></svg>
            EMAIL
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Profile Corner ── */
function ProfileCorner() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <ContactButton />
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, color: "#e8eaed", letterSpacing: "0.05em", lineHeight: 1.2 }}>
            RABIH SIDDIQUI
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#00d4ff", letterSpacing: "0.03em" }}>
            rabih.app
          </div>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))",
          border: "1px solid rgba(0,212,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, color: "#00d4ff",
          transition: "box-shadow 0.3s", boxShadow: open ? "0 0 20px rgba(0,212,255,0.15)" : "none",
        }}>R</div>
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", right: 0,
          background: "rgba(10,12,20,0.95)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
          padding: "14px 18px", minWidth: 190,
          opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "all 0.2s ease", pointerEvents: open ? "auto" : "none", zIndex: 200,
        }}>
          {["GitHub", "LinkedIn", "Resume"].map(l => (
            <a key={l} href="#" style={{
              display: "block", padding: "6px 0", fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, color: "#7a7f8a", textDecoration: "none", transition: "color 0.2s",
            }} onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#7a7f8a"}>{l}</a>
          ))}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px rgba(16,185,129,0.4)" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#5a5f6a" }}>Available for projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Menu Screen ── */
function MainMenu({ onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ position: "relative", zIndex: 10, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", animation: "fadeIn 0.4s ease both" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
        {/* PROJECTS - primary, larger */}
        <button onClick={() => onNavigate("PROJECTS")}
          onMouseEnter={() => setHovered("PROJECTS")} onMouseLeave={() => setHovered(null)}
          style={{
            background: "none", border: "none", cursor: "pointer", textAlign: "left",
            padding: "4px 0", position: "relative", display: "block",
            animation: "slideRight 0.5s ease 0.1s both",
          }}>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 68, letterSpacing: "0.03em", lineHeight: 1.05,
            color: hovered === "PROJECTS" ? "#ffffff" : "#c8cad0",
            fontStyle: "italic",
            transition: "all 0.25s ease",
            transform: hovered === "PROJECTS" ? "translateX(10px)" : "translateX(0)",
            textShadow: hovered === "PROJECTS" ? "0 0 40px rgba(0,212,255,0.2)" : "none",
            display: "inline-block",
          }}>
            PROJECTS
          </span>
          <div style={{
            position: "absolute", left: -24, top: "50%", transform: "translateY(-50%)",
            width: 4, height: hovered === "PROJECTS" ? 56 : 0, borderRadius: 2,
            background: "#00d4ff", boxShadow: "0 0 12px rgba(0,212,255,0.4)",
            transition: "height 0.25s ease",
          }} />
        </button>

        {/* ABOUT - secondary, smaller */}
        <button onClick={() => onNavigate("ABOUT")}
          onMouseEnter={() => setHovered("ABOUT")} onMouseLeave={() => setHovered(null)}
          style={{
            background: "none", border: "none", cursor: "pointer", textAlign: "left",
            padding: "4px 0", position: "relative", display: "block",
            animation: "slideRight 0.5s ease 0.17s both",
          }}>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 52, letterSpacing: "0.03em", lineHeight: 1.1,
            color: hovered === "ABOUT" ? "#ffffff" : "#8a8e98",
            fontStyle: "italic",
            transition: "all 0.25s ease",
            transform: hovered === "ABOUT" ? "translateX(8px)" : "translateX(0)",
            textShadow: hovered === "ABOUT" ? "0 0 40px rgba(0,212,255,0.15)" : "none",
            display: "inline-block",
          }}>
            ABOUT
          </span>
          <div style={{
            position: "absolute", left: -24, top: "50%", transform: "translateY(-50%)",
            width: 4, height: hovered === "ABOUT" ? 36 : 0, borderRadius: 2,
            background: "#00d4ff", boxShadow: "0 0 12px rgba(0,212,255,0.4)",
            transition: "height 0.25s ease",
          }} />
        </button>
      </div>

      {/* Secondary nav */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {SECONDARY_NAV.map((item, i) => (
          <a key={item.id} href={item.href}
            onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
            style={{
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
              fontSize: 16, letterSpacing: "0.1em",
              color: hovered === item.id ? "#e8eaed" : "#4a4f5a",
              textDecoration: "none", padding: "3px 0",
              transition: "color 0.2s ease",
              animation: `slideRight 0.5s ease ${0.3 + i * 0.05}s both`,
            }}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, isSelected, isHovered, onHover, onLeave, onClick, index }) {
  const active = isSelected || isHovered;
  const cardWidth = active ? 280 : 180;
  return (
    <div onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}
      style={{
        width: cardWidth, height: 360, borderRadius: 12, overflow: "hidden",
        cursor: "pointer", position: "relative",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        flexShrink: 0, animation: `cardEnter 0.5s ease ${0.08 + index * 0.06}s both`,
      }}>
      <div style={{
        position: "absolute", inset: 0,
        background: active
          ? `linear-gradient(180deg, rgba(${hexToRgb(project.color)}, 0.2) 0%, rgba(${hexToRgb(project.color)}, 0.05) 50%, rgba(10,12,20,0.95) 100%)`
          : "rgba(12, 16, 28, 0.7)",
        backdropFilter: "blur(16px)", transition: "all 0.4s ease",
      }} />
      <div style={{
        position: "absolute", inset: 0, borderRadius: 12,
        border: active ? `1.5px solid rgba(${hexToRgb(project.color)}, 0.4)` : "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.35s ease", pointerEvents: "none",
      }} />
      {active && (<div style={{
        position: "absolute", bottom: -2, left: "10%", right: "10%", height: 3,
        background: project.color, borderRadius: 2,
        boxShadow: `0 0 16px ${project.color}60, 0 0 40px ${project.color}20`,
      }} />)}
      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: active ? "28px 20px 20px" : "28px 16px 20px", textAlign: "center",
      }}>
        <div style={{
          color: active ? project.color : "#4a4f5a", transition: "all 0.35s ease",
          marginBottom: active ? 16 : 24, transform: active ? "scale(1.1)" : "scale(1)",
          filter: active ? `drop-shadow(0 0 8px ${project.color}40)` : "none",
          flex: active ? "0 0 auto" : "1 1 auto",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{project.icon}</div>
        <div style={{
          width: active ? "70%" : "40%", height: 1,
          background: active ? `linear-gradient(90deg, transparent, ${project.color}40, transparent)` : "rgba(255,255,255,0.06)",
          marginBottom: 16, transition: "all 0.35s ease",
        }} />
        <h3 style={{
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          fontSize: active ? 22 : 15, letterSpacing: "0.08em",
          color: active ? "#ffffff" : "#9ca0ab", margin: 0, lineHeight: 1.2,
          transition: "all 0.35s ease",
        }}>{project.name}</h3>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.08em",
          color: active ? project.color : "#4a4f5a", marginTop: 4,
          transition: "all 0.3s ease", opacity: active ? 1 : 0.7,
        }}>{project.category}</div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: "#9ca0ab", lineHeight: 1.6,
          margin: "14px 0 0 0", opacity: active ? 1 : 0, maxHeight: active ? 100 : 0,
          overflow: "hidden", transition: "all 0.35s ease 0.05s",
        }}>{project.description}</p>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center",
          marginTop: "auto", paddingTop: 12, opacity: active ? 1 : 0,
          transition: "opacity 0.3s ease 0.1s",
        }}>
          {active && project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#6a6f7a",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 4, padding: "2px 8px",
            }}>{tag}</span>
          ))}
        </div>
        {active && (
          <div style={{
            marginTop: 12, display: "flex", alignItems: "center", gap: 6,
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
            fontSize: 11, letterSpacing: "0.1em", color: project.color,
          }}>
            VIEW
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke={project.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Projects Screen ── */
function ProjectsScreen({ onBack }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const activeId = hoveredId || selectedId;

  return (
    <div style={{
      position: "relative", zIndex: 10, height: "100vh",
      display: "flex", flexDirection: "column",
      animation: "fadeIn 0.3s ease both",
    }}>
      <div style={{ padding: "28px 48px 0", display: "flex", alignItems: "flex-end", gap: 20, animation: "slideDown 0.4s ease 0.1s both" }}>
        <h1 style={{
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          fontSize: 56, fontStyle: "italic", color: "#e8eaed",
          letterSpacing: "0.02em", lineHeight: 1, margin: 0,
        }}>PROJECTS</h1>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          color: "#3a3f4a", letterSpacing: "0.06em", paddingBottom: 10,
        }}>{PROJECTS.length} PROJECTS</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 48px" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "center" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project}
              isSelected={selectedId === project.id} isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)} onLeave={() => setHoveredId(null)}
              onClick={() => setSelectedId(project.id === selectedId ? null : project.id)}
              index={i} />
          ))}
        </div>
      </div>
      <div style={{ padding: "0 48px 20px", display: "flex", justifyContent: "flex-end", animation: "fadeIn 0.5s ease 0.5s both" }}>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
          padding: "8px 20px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", color: "#5a5f6a",
          display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#9ca0ab"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#5a5f6a"; }}>
          <span style={{ fontSize: 10, opacity: 0.5 }}>ESC</span>BACK
        </button>
      </div>
    </div>
  );
}

/* ── About Screen ── */
function AboutScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const tabs = ["OVERVIEW", "EXPERIENCE", "TOOLKIT"];
  const experiences = [
    { role: "Senior Designer", company: "Studio Nova", period: "2023 - Present", desc: "Leading design for enterprise SaaS products" },
    { role: "Product Designer", company: "Helios Labs", period: "2021 - 2023", desc: "End-to-end product design for mobile and web" },
    { role: "UI/UX Designer", company: "Craft Digital", period: "2019 - 2021", desc: "Client work across fintech, health, and e-commerce" },
    { role: "Junior Designer", company: "Pixel & Co", period: "2018 - 2019", desc: "Visual design and prototyping" },
  ];
  const toolkit = [
    { name: "DESIGN", tools: [{ n: "Figma", l: "Daily driver" }, { n: "Framer", l: "Prototyping" }, { n: "After Effects", l: "Motion" }, { n: "Blender", l: "Exploring" }] },
    { name: "DEVELOPMENT", tools: [{ n: "React", l: "Primary" }, { n: "TypeScript", l: "Fluent" }, { n: "Next.js", l: "Primary" }, { n: "Tailwind CSS", l: "Daily driver" }] },
    { name: "INFRASTRUCTURE", tools: [{ n: "Vercel", l: "Hosting" }, { n: "GitHub", l: "Daily" }, { n: "Notion", l: "Documentation" }, { n: "Linear", l: "Project mgmt" }] },
  ];

  return (
    <div style={{
      position: "relative", zIndex: 10, height: "100vh",
      display: "flex", flexDirection: "column", animation: "fadeIn 0.3s ease both",
    }}>
      <div style={{ padding: "28px 48px 0", display: "flex", alignItems: "flex-end", gap: 20, animation: "slideDown 0.4s ease 0.1s both" }}>
        <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 56, fontStyle: "italic", color: "#e8eaed", letterSpacing: "0.02em", lineHeight: 1, margin: 0 }}>ABOUT</h1>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 48px 0", overflow: "auto" }}>
        <div style={{ width: "100%", maxWidth: 860, animation: "fadeUp 0.5s ease 0.15s both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 30 }}>
            <div style={{
              width: 68, height: 68, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))",
              border: "1px solid rgba(0,212,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 26, color: "#00d4ff",
            }}>R</div>
            <div>
              <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 26, color: "#e8eaed", letterSpacing: "0.04em", margin: 0, lineHeight: 1.2 }}>RABIH SIDDIQUI</h2>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7a7f8a", marginTop: 2 }}>Product Designer & Developer</div>
              <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                {[{ v: "7 YRS", l: "Experience" }, { v: "20+", l: "Projects" }, { v: "PST", l: "Timezone" }].map(s => (
                  <div key={s.v} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, color: "#00d4ff" }}>{s.v}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4a4f5a" }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "10px 20px",
                fontFamily: "'Rajdhani', sans-serif", fontWeight: activeTab === tab ? 700 : 500,
                fontSize: 13, letterSpacing: "0.12em", color: activeTab === tab ? "#e8eaed" : "#5a5f6a",
                position: "relative", transition: "color 0.2s",
              }}>
                {tab}
                {activeTab === tab && <div style={{ position: "absolute", bottom: -1, left: 20, right: 20, height: 2, background: "#00d4ff", borderRadius: 1, boxShadow: "0 0 8px rgba(0,212,255,0.3)" }} />}
              </button>
            ))}
          </div>
          <div key={activeTab} style={{ animation: "fadeUp 0.3s ease both", paddingBottom: 40 }}>
            {activeTab === "OVERVIEW" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "rgba(12,14,22,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "22px 26px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#b0b4be", lineHeight: 1.75, margin: 0 }}>
                    I design and build digital products that feel considered. My work sits at the intersection of product design, interaction design, and frontend engineering. I care about systems, craft, and the small details that make interfaces feel alive.
                  </p>
                </div>
                <div style={{ background: "rgba(12,14,22,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "18px 26px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", color: "#5a5f6a", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 6px rgba(0,212,255,0.3)" }} />
                    CURRENTLY
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9ca0ab", lineHeight: 1.6, margin: 0 }}>
                    Exploring generative UI patterns and building a design system for a healthtech startup.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "EXPERIENCE" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {experiences.map((exp, i) => (
                  <div key={exp.company} style={{ display: "flex", gap: 20, padding: "16px 22px", borderRadius: 8, transition: "background 0.2s", animation: `fadeUp 0.4s ease ${0.04 * i}s both` }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#4a4f5a", minWidth: 110, paddingTop: 2 }}>{exp.period}</div>
                    <div>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, color: "#e8eaed", letterSpacing: "0.03em" }}>{exp.role}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#00d4ff", marginTop: 2 }}>{exp.company}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#5a5f6a", marginTop: 3 }}>{exp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "TOOLKIT" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {toolkit.map((cat, ci) => (
                  <div key={cat.name} style={{ background: "rgba(12,14,22,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "18px 20px", animation: `fadeUp 0.4s ease ${0.06 * ci}s both` }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", color: "#5a5f6a", marginBottom: 14 }}>{cat.name}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {cat.tools.map(t => (
                        <div key={t.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#c8cad0" }}>{t.n}</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4a4f5a" }}>{t.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 48px 20px", display: "flex", justifyContent: "flex-end", animation: "fadeIn 0.5s ease 0.5s both" }}>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
          padding: "8px 20px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", color: "#5a5f6a",
          display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#9ca0ab"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#5a5f6a"; }}>
          <span style={{ fontSize: 10, opacity: 0.5 }}>ESC</span>BACK
        </button>
      </div>
    </div>
  );
}

/* ── Status Bar ── */
function StatusBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, height: 36,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", zIndex: 20, borderTop: "1px solid rgba(255,255,255,0.04)",
      background: "rgba(6,8,13,0.5)", backdropFilter: "blur(8px)",
      animation: "fadeIn 0.8s ease 0.8s both",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#2a2f3a", letterSpacing: "0.1em" }}>PORTFOLIO v4.0</span>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.04)" }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#2a2f3a", letterSpacing: "0.06em" }}>DESIGN + DEVELOPMENT</span>
      </div>
      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontWeight: 600, color: "#2a2f3a", letterSpacing: "0.08em" }}>
        {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
      </span>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ── Main App ── */
export default function Portfolio() {
  const [screen, setScreen] = useState("MAIN");

  const handleNavigate = useCallback((target) => { setScreen(target); }, []);
  const handleBack = useCallback(() => { setScreen("MAIN"); }, []);

  const isBlurred = screen === "PROJECTS";

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardEnter { from { opacity: 0; transform: translateY(24px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 2px; }
      `}</style>

      <AnimatedBackground blurred={isBlurred} />

      {/* Top bar */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 36px", zIndex: 50,
        animation: "fadeIn 0.5s ease 0.2s both",
      }}>
        {/* Brand - large like OW2 logo, only on main screen */}
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={handleBack}>
          {screen === "MAIN" ? (
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
              fontSize: 28, color: "#e8eaed", letterSpacing: "0.06em",
              lineHeight: 1,
              textShadow: "0 0 30px rgba(0,212,255,0.08)",
            }}>
              RABIH.APP
            </span>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: "linear-gradient(135deg, #00d4ff 0%, #0088aa 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, color: "#060810",
              }}>R</div>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 14, color: "#4a4f5a", letterSpacing: "0.08em" }}>
                RABIH.APP
              </span>
            </div>
          )}
        </div>

        <ProfileCorner />
      </header>

      {/* Screens */}
      {screen === "MAIN" && <MainMenu onNavigate={handleNavigate} />}
      {screen === "PROJECTS" && <ProjectsScreen onBack={handleBack} />}
      {screen === "ABOUT" && <AboutScreen onBack={handleBack} />}

      <StatusBar />
    </div>
  );
}
