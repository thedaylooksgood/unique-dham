"use client";

import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins at module level — still SSR-safe because this file
// is "use client" so it only runs in the browser.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chapters = [
  {
    id: "awakening",
    title: "THE CALL OF SHAKTI",
    subtitle: "Awakening",
    text: "In the serene heights of the Himalayas, Her divine presence echoes across the mists of time. Maa Durga guides every seeker toward the eternal light.",
    img: "/hero-himalaya.jpg",
    accent: "#C41E3A",
  },
  {
    id: "sadhana",
    title: "ETERNAL SADHANA",
    subtitle: "Devotion",
    text: "Upholding centuries of Sanatan rites — from Kumari Puja to the Navpatrika, every chant resonates with Her fierce and boundless grace.",
    img: "/hero-puja.jpg",
    accent: "#e95d24",
  },
  {
    id: "darshan",
    title: "HER DIVINE EMBRACE",
    subtitle: "Darshan",
    text: "A unique confluence where devotion meets tranquility. Surrender at Her lotus feet and be held in the warmth of Her boundless compassion.",
    img: "/hero-durga.jpg",
    accent: "#E8860C",
  },
];

// Generate stable particle positions once (avoids re-render re-randomisation)
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: ((i * 97 + 13) % 100).toFixed(1),
    cy: ((i * 61 + 7) % 100).toFixed(1),
    r: (1 + (i % 3) * 0.6).toFixed(1),
    opacity: 0.15 + (i % 5) * 0.07,
  }));
}

export function CinematicStorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(() => generateParticles(35), []);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const sections = gsap.utils.toArray<HTMLElement>(".story-panel");
      const totalWidth = trackRef.current.scrollWidth;

      // ── 1. Horizontal pin + scrub ─────────────────────────────────
      const hScroll = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.05,          // near-zero lag → feels like native scroll
          end: () => `+=${totalWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,   // snap-to-rest when user flicks fast
        },
      });

      // ── 2. Per-section text reveals ───────────────────────────────
      sections.forEach((panel, i) => {
        const eyebrow = panel.querySelector<HTMLElement>(".panel-eyebrow");
        const title   = panel.querySelector<HTMLElement>(".panel-title");
        const body    = panel.querySelector<HTMLElement>(".panel-body");
        const line    = panel.querySelector<HTMLElement>(".panel-line");

        // Skip first panel (already visible on load)
        const targets = [eyebrow, line, title, body].filter(Boolean);

        gsap.fromTo(
          targets,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: hScroll,
              start: "left 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── Ken Burns parallax on the bg image ──────────────────────
        const bg = panel.querySelector<HTMLElement>(".panel-bg");
        if (bg) {
          gsap.fromTo(
            bg,
            { scale: 1.18, x: "6%" },
            {
              scale: 1.0,
              x: "-6%",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: hScroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });

      // ── 3. Particle drift (CSS animation, no Anime.js on main thread) ──
      // Handled purely via CSS @keyframes — zero JS cost on scroll

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #fdf8f6 0%, #fef5f0 50%, #fff8f5 100%)",
      }}
    >
      {/* ── Particle layer — purely CSS-animated, zero scroll cost ─── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
          overflow: "hidden",
        }}
      >
        <svg width="100%" height="100%" style={{ opacity: 0.5 }}>
          {particles.map((p) => (
            <circle
              key={p.id}
              className="sacred-particle"
              cx={`${p.cx}%`}
              cy={`${p.cy}%`}
              r={p.r}
              fill="#e95d24"
              style={{
                opacity: p.opacity,
                animation: `particleDrift ${6 + (p.id % 6)}s ease-in-out ${(p.id * 0.3) % 4}s infinite alternate`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* ── Scroll track ──────────────────────────────────────────── */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: `${chapters.length * 100}vw`,
          height: "100%",
          willChange: "transform",
        }}
      >
        {chapters.map((chapter, i) => (
          <div
            key={chapter.id}
            className="story-panel"
            style={{
              position: "relative",
              width: "100vw",
              height: "100%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 6vw",
              overflow: "hidden",
              willChange: "transform",
            }}
          >
            {/* Background image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={chapter.img}
                alt={chapter.title}
                className="panel-bg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.22,
                  mixBlendMode: "luminosity",
                  willChange: "transform",
                  transformOrigin: "center center",
                }}
              />
              {/* Gradient vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to right, rgba(253,248,246,0.85) 0%, rgba(253,248,246,0.3) 40%, rgba(253,248,246,0.3) 60%, rgba(253,248,246,0.85) 100%)`,
                }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                maxWidth: "900px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {/* Chapter number */}
              <div
                className="panel-eyebrow"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ height: "1px", width: "2rem", background: chapter.accent, opacity: 0.5 }} />
                <span
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: chapter.accent,
                    fontWeight: 700,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} — {chapter.subtitle}
                </span>
                <div style={{ height: "1px", width: "2rem", background: chapter.accent, opacity: 0.5 }} />
              </div>

              {/* Decorative line */}
              <div
                className="panel-line"
                style={{
                  width: "clamp(40px, 6vw, 80px)",
                  height: "3px",
                  background: `linear-gradient(90deg, transparent, ${chapter.accent}, transparent)`,
                  margin: "0 auto 2rem",
                  borderRadius: "2px",
                }}
              />

              {/* Title */}
              <h2
                className="panel-title"
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                  fontWeight: 800,
                  color: "#1A0F0A",
                  lineHeight: 0.92,
                  letterSpacing: "-0.02em",
                  marginBottom: "clamp(1.2rem, 3vw, 2.5rem)",
                }}
              >
                {chapter.title.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    style={{
                      display: wi % 2 !== 0 ? "block" : "inline",
                      fontStyle: wi % 2 !== 0 ? "italic" : "normal",
                      background:
                        wi % 2 !== 0
                          ? `linear-gradient(135deg, ${chapter.accent}, #C41E3A)`
                          : undefined,
                      WebkitBackgroundClip: wi % 2 !== 0 ? "text" : undefined,
                      WebkitTextFillColor:
                        wi % 2 !== 0 ? "transparent" : undefined,
                      backgroundClip: wi % 2 !== 0 ? "text" : undefined,
                    }}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>

              {/* Body text */}
              <p
                className="panel-body"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
                  color: "rgba(26,15,10,0.7)",
                  lineHeight: 1.75,
                  maxWidth: "560px",
                  margin: "0 auto",
                  fontWeight: 500,
                }}
              >
                {chapter.text}
              </p>

              {/* Decorative SVG */}
              <div style={{ marginTop: "clamp(2rem, 5vw, 4rem)", opacity: 0.25 }}>
                <svg width="100" height="16" viewBox="0 0 100 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 8 Q25 0 50 8 Q75 16 100 8" stroke={chapter.accent} strokeWidth="1.5" />
                  <circle cx="50" cy="8" r="3" fill={chapter.accent} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.5,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#1A0F0A",
          }}
        >
          Scroll to explore
        </span>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="#1A0F0A" strokeWidth="1.5" />
          <circle cx="10" cy="8" r="2.5" fill="#e95d24" style={{ animation: "scrollDot 1.8s ease-in-out infinite" }} />
        </svg>
      </div>
    </section>
  );
}
