"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProps {
  children: ReactNode;
}

function ScrollHandler() {
  const pathname = usePathname();
  const lenis = useLenis();

  // Sync GSAP with Lenis and handle route changes
  useEffect(() => {
    if (!lenis) return;

    // Set browser scroll restoration to manual
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Update ScrollTrigger on Lenis scroll
    const updateST = () => ScrollTrigger.update();
    lenis.on('scroll', updateST);

    // Initial refresh to capture accurate positions
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', updateST);
    };
  }, [lenis]);

  // Handle route changes
  useEffect(() => {
    if (!lenis) return;

    // Refresh ScrollTrigger and handle scroll restoration
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <ScrollHandler />
      {children}
    </ReactLenis>
  );
}

