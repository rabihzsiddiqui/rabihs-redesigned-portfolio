"use client";

// components/background/AnimatedBackground.tsx
// Full-viewport animated canvas background.
// Layers (bottom to top):
//   z-0  base dark fill (always visible)
//   z-0  static gradient (visible only when prefers-reduced-motion)
//   z-1  canvas (particles, grid, scan line) — hidden when reduced motion
//   z-2  blur overlay (active when `blurred` prop is true)
//   z-3  vignette + bottom fade + left fade (static compositing)
//
// Swappable: canvas will eventually be replaced with a <video>.

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

interface AnimatedBackgroundProps {
  blurred?: boolean;
}

export default function AnimatedBackground({
  blurred = false,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.25 + 0.05,
    }));

    let t = 0;

    const loop = () => {
      t += 0.004;
      ctx.clearRect(0, 0, w, h);

      // Drifting radial gradient
      const gx = w * 0.3 + Math.sin(t) * 80;
      const gy = h * 0.4 + Math.cos(t * 0.7) * 60;
      const radial = ctx.createRadialGradient(gx, gy, 0, w * 0.5, h * 0.5, w * 0.85);
      radial.addColorStop(0, "rgba(10,20,40,0.35)");
      radial.addColorStop(1, "rgba(4,6,12,0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "rgba(100,180,255,0.018)";
      ctx.lineWidth = 0.5;
      const cellSize = 90;
      const offsetX = (t * 6) % cellSize;
      const offsetY = (t * 4) % cellSize;
      for (let x = -cellSize + offsetX; x < w + cellSize; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -cellSize + offsetY; y < h + cellSize; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Particles
      const ps = particlesRef.current;
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.025 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Scan line
      const scanY = (t * 50) % (h + 200) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, "rgba(0,212,255,0)");
      scanGrad.addColorStop(0.5, "rgba(0,212,255,0.012)");
      scanGrad.addColorStop(1, "rgba(0,212,255,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, w, 60);

      animRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden="true">
      {/* Layer 0a: base fill — always visible */}
      <div className="fixed inset-0 z-0" style={{ background: "#060810" }} />

      {/* Layer 0b: static gradient — shown when prefers-reduced-motion (canvas is hidden).
          A soft radial glow gives the page depth without any animation. */}
      <div
        className="fixed inset-0 z-0 pointer-events-none motion-safe:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 30% 45%, rgba(0,212,255,0.05) 0%, transparent 65%), radial-gradient(ellipse at 75% 60%, rgba(0,100,140,0.04) 0%, transparent 55%)",
        }}
      />

      {/* Layer 1: animated canvas — hidden when prefers-reduced-motion */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1] pointer-events-none motion-reduce:hidden"
        style={{
          filter: blurred ? "blur(8px)" : "none",
          transition: "filter 600ms ease",
        }}
      />

      {/* Layer 2: blur overlay */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          backdropFilter: blurred ? "blur(12px)" : "blur(0px)",
          WebkitBackdropFilter: blurred ? "blur(12px)" : "blur(0px)",
          background: blurred ? "rgba(6,8,13,0.35)" : "rgba(6,8,13,0)",
          transition:
            "backdrop-filter 600ms ease, -webkit-backdrop-filter 600ms ease, background 600ms ease",
        }}
      />

      {/* Layer 3: static compositing overlays */}
      <div
        className="fixed inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(4,6,12,0.75) 100%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-[3] pointer-events-none"
        style={{
          height: "25vh",
          background:
            "linear-gradient(to top, rgba(6,8,13,0.85) 0%, transparent 100%)",
        }}
      />
      <div
        className="fixed left-0 top-0 bottom-0 z-[3] pointer-events-none"
        style={{
          width: "35vw",
          background:
            "linear-gradient(to right, rgba(6,8,13,0.6) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
