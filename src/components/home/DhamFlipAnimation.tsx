"use client";

/**
 * DhamFlipAnimation
 * ─────────────────────────────────────────────────────────────────────────────
 * Awwwards-level GSAP Flip layout morphing section.
 * Spells out "D H A M" and morphs through 4 dramatic layout states:
 *   final  → plain  → columns  → grid  → final (loop)
 *
 * Rules strictly followed:
 *  1. SSR-safe — Flip imported dynamically on client only
 *  2. No useState for layout toggling — raw classList mutation
 *  3. delayedCall killed on cleanup — no memory leaks
 *  4. scope-less useGSAP to avoid conflicts with Flip's absolute positioning
 */

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Module-level singleton — safe because this is "use client" only
let Flip: typeof import("gsap/Flip").Flip | null = null;

export function DhamFlipAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<gsap.core.Tween | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Step 1: Dynamically import Flip on client only ─────────────────────
  useEffect(() => {
    let alive = true;
    import("gsap/Flip").then(({ Flip: F }) => {
      if (!alive) return;
      gsap.registerPlugin(F);
      Flip = F;
    });
    return () => {
      alive = false;
    };
  }, []);

  // ─── Step 2: Entry animations for the section itself ────────────────────
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate the eyebrow + subtitle in on mount
    gsap.fromTo(
      ".dham-eyebrow, .dham-footer-label",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.3, delay: 0.5 }
    );
  }, { scope: sectionRef });

  // ─── Step 3: The GSAP Flip loop ─────────────────────────────────────────
  useEffect(() => {
    const LAYOUTS = ["final", "plain", "columns", "grid"] as const;
    let current = 0;

    function nextState() {
      const container = containerRef.current;
      if (!container || !Flip) return;

      const els = container.querySelectorAll<HTMLElement>(
        ".dham-letter, .dham-of, .dham-shakti"
      );
      if (!els.length) return;

      // 1. Snapshot positions + painted properties BEFORE any change
      const state = Flip.getState(els, {
        props: "backgroundColor,borderRadius,color",
        simple: true,
      });

      // 2. Mutate CSS class — pure DOM, no React re-render
      container.classList.remove(LAYOUTS[current]);
      current = (current + 1) % LAYOUTS.length;
      container.classList.add(LAYOUTS[current]);

      // 3. Animate from old → new
      Flip.from(state, {
        duration: 0.8,
        ease: "expo.inOut",
        absolute: true,
        stagger: { amount: 0.18, from: current % 2 === 0 ? "start" : "end" },
        spin: current === 0, // full 360° spin on return to "final"
        onEnter: (els: Element[]) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, scale: 0.3, rotation: -15 },
            { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" }
          ),
        onLeave: (els: Element[]) =>
          gsap.to(els, { autoAlpha: 0, scale: 0.3, rotation: 15, duration: 0.3 }),
      });

      // 4. Schedule next — linger longer on "final" so users can read it
      timerRef.current = gsap.delayedCall(current === 0 ? 3.5 : 1.6, nextState);
    }

    // Wait for Flip to be dynamically loaded, then kick off
    intervalRef.current = setInterval(() => {
      if (!Flip) return;
      clearInterval(intervalRef.current!);
      timerRef.current = gsap.delayedCall(1.2, nextState);
    }, 60);

    return () => {
      if (timerRef.current) timerRef.current.kill();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dham-section"
    >
      {/* ── Radial god-ray glow ─────────────────────────────────── */}
      <div className="dham-glow" aria-hidden />

      {/* ── Floating embers ─────────────────────────────────────── */}
      <div className="dham-embers" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="dham-ember" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      {/* ── Eyebrow ─────────────────────────────────────────────── */}
      <p className="dham-eyebrow">◊ &nbsp; Jai Maa Durga &nbsp; ◊</p>

      {/* ── The Flip container ──────────────────────────────────── */}
      <div ref={containerRef} className="dham-flip-wrap final">
        <div className="dham-letter dham-D">D</div>
        <div className="dham-letter dham-H">H</div>
        <div className="dham-letter dham-A">A</div>
        <div className="dham-letter dham-M">M</div>
        {/* These only appear in the "final" layout via CSS */}
        <div className="dham-of">SACRED</div>
        <div className="dham-shakti">TRADITION</div>
      </div>

      {/* ── Footer label ────────────────────────────────────────── */}
      <p className="dham-footer-label">Maa Unique Dham — Est. Sacred Tradition</p>

      {/* ── Bottom border beam ──────────────────────────────────── */}
      <div className="dham-beam" aria-hidden />
    </section>
  );
}
