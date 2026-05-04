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

    // Set browser scroll restoration to manual to prevent jumps
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Update ScrollTrigger on Lenis scroll
    const updateST = () => {
      ScrollTrigger.update();
    };
    
    lenis.on('scroll', updateST);

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', updateST);
    };
  }, [lenis]);

  // Handle manual scroll restoration on route changes
  useEffect(() => {
    if (!lenis) return;

    // Save scroll position before navigating away
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-${pathname}`, lenis.scroll.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Restore scroll position
    const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
    
    // We use a slightly longer delay to ensure GSAP pinned sections 
    // (which expand page height) have initialized.
    const timer = setTimeout(() => {
      if (savedScroll) {
        lenis.scrollTo(parseInt(savedScroll), { immediate: true });
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
      // Critical: refresh GSAP after restoration/content load
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(timer);
      // Save current scroll when pathname changes (internal navigation)
      sessionStorage.setItem(`scroll-${pathname}`, lenis.scroll.toString());
    };
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

