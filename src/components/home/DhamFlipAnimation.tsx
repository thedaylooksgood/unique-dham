"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ─── SSR-safe plugin registration ────────────────────────────────────────────
let FlipPlugin: typeof import("gsap/Flip").Flip | null = null;

export function DhamFlipAnimation() {
  const wrapperRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load and register Flip only on the client
  useEffect(() => {
    let cancelled = false;
    import("gsap/Flip").then(({ Flip }) => {
      if (cancelled) return;
      gsap.registerPlugin(Flip);
      FlipPlugin = Flip;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      // Wait for Flip to be loaded
      const waitForFlip = setInterval(() => {
        if (!FlipPlugin) return;
        clearInterval(waitForFlip);
        startAnimation();
      }, 50);

      const layouts = ["final", "plain", "columns", "grid"] as const;
      let curLayout = 0;
      let timer: gsap.core.Tween | null = null;

      function startAnimation() {
        timer = gsap.delayedCall(0.8, nextState);
      }

      function nextState() {
        const container = containerRef.current;
        if (!container || !FlipPlugin) return;

        // Select elements explicitly within our container
        const els = container.querySelectorAll<HTMLElement>(
          ".fl-letter, .fl-of, .fl-shakti"
        );

        if (!els.length) return;

        // 1. Capture state BEFORE the layout change
        const state = FlipPlugin.getState(els, {
          props: "backgroundColor,color,borderRadius",
          simple: true,
        });

        // 2. Mutate DOM class (vanilla JS style – no setState!)
        container.classList.remove(layouts[curLayout]);
        curLayout = (curLayout + 1) % layouts.length;
        container.classList.add(layouts[curLayout]);

        // 3. Animate from old → new positions
        FlipPlugin.from(state, {
          duration: 0.65,
          ease: "expo.inOut",
          stagger: {
            amount: 0.15,
            from: curLayout % 2 === 0 ? "start" : "end",
          },
          absolute: true,
          spin: curLayout === 0, // a full 360° spin when returning to "final"
          onEnter: (elements: Element[]) =>
            gsap.fromTo(
              elements,
              { autoAlpha: 0, scale: 0.4 },
              { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" }
            ),
          onLeave: (elements: Element[]) =>
            gsap.to(elements, {
              autoAlpha: 0,
              scale: 0.4,
              duration: 0.25,
            }),
        });

        // 4. Schedule next transition
        timer = gsap.delayedCall(curLayout === 0 ? 3 : 1.4, nextState);
      }

      return () => {
        if (timer) timer.kill();
        clearInterval(waitForFlip);
      };
    },
    { scope: wrapperRef }
  );

  return (
    <section
      ref={wrapperRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0a0402",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Ambient glow ──────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(156,66,33,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Eyebrow label ─────────────────────────────────── */}
      <p
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(229,184,105,0.55)",
          marginBottom: "2.5rem",
          zIndex: 10,
        }}
      >
        ◊ The Sacred Dham ◊
      </p>

      {/* ── Flip container ────────────────────────────────── */}
      <div
        ref={containerRef}
        className="dham-flip-container final"
        style={{ zIndex: 10 }}
      >
        <div className="fl-letter fl-D">D</div>
        <div className="fl-letter fl-H">H</div>
        <div className="fl-letter fl-A">A</div>
        <div className="fl-letter fl-M">M</div>
        <div className="fl-of">of</div>
        <div className="fl-shakti">SHAKTI</div>
      </div>

      {/* ── Footer label ──────────────────────────────────── */}
      <p
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(229,184,105,0.35)",
          marginTop: "3rem",
          zIndex: 10,
        }}
      >
        Maa Unique Dham
      </p>
    </section>
  );
}
