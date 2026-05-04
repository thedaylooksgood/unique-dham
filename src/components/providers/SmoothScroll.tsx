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

  // Sync GSAP with Lenis
  useEffect(() => {
    if (!lenis) return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const updateST = () => ScrollTrigger.update();
    lenis.on('scroll', updateST);
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', updateST);
    };
  }, [lenis]);

  // Handle manual scroll restoration and saving
  useEffect(() => {
    if (!lenis) return;

    // Detect if this is a page refresh/reload
    const isReload = performance.getEntriesByType('navigation')
      .map(nav => (nav as PerformanceNavigationTiming).type)
      .includes('reload');

    if (isReload) {
      sessionStorage.removeItem(`scroll-pos-${pathname}`);
    }

    // 1. Restore scroll position
    const savedScroll = sessionStorage.getItem(`scroll-pos-${pathname}`);
    
    if (savedScroll && parseInt(savedScroll) > 20) {
      const scrollY = parseInt(savedScroll);
      let attempts = 0;
      let hasReachedTarget = false;
      
      const attemptRestoration = () => {
        if (hasReachedTarget) return;

        // Force GSAP to recalculate all its spacers and pins
        ScrollTrigger.refresh();
        
        // Attempt the scroll
        lenis.scrollTo(scrollY, { immediate: true });
        
        // Sync GSAP with the new position immediately
        ScrollTrigger.update();

        // Check if we actually reached the target
        // If the page is still too short (e.g. async images haven't loaded),
        // lenis.scroll will be clamped to the current max height, and this will be false.
        if (Math.abs(lenis.scroll - scrollY) <= 50) {
          hasReachedTarget = true;
        }
      };

      // Initial aggressive attempts for quick initialization
      const interval = setInterval(() => {
        attempts++;
        if (attempts > 20 || hasReachedTarget) {
          clearInterval(interval);
        } else {
          attemptRestoration();
        }
      }, 200);

      // ULTIMATE FALLBACK: ResizeObserver
      // If the page height changes (async gallery images load, lazy components mount),
      // the observer will fire. If we haven't reached our target yet, we try again!
      const observer = new ResizeObserver(() => {
        if (!hasReachedTarget) {
           attemptRestoration();
        }
      });
      
      // Observe the body for height changes
      observer.observe(document.body);

      // Clean up after 10 seconds max to prevent memory leaks or infinite observation
      const cleanupTimer = setTimeout(() => {
        observer.disconnect();
        clearInterval(interval);
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(cleanupTimer);
        observer.disconnect();
      };
    } else {
      // New page or no saved position: go to top
      lenis.scrollTo(0, { immediate: true });
      const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, lenis]);

  // 2. Save scroll position on every scroll event
  useEffect(() => {
    if (!lenis) return;

    const saveScroll = (e: any) => {
      // Only save if we have scrolled significantly
      // This prevents Next.js auto-scroll-to-top from overwriting our saved position
      if (e.scroll > 20) {
        sessionStorage.setItem(`scroll-pos-${pathname}`, e.scroll.toString());
      }
    };

    lenis.on('scroll', saveScroll);
    return () => lenis.off('scroll', saveScroll);
  }, [lenis, pathname]);

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

