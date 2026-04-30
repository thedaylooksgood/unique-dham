"use client";

import { useEffect, useState, useRef } from "react";

export function Preloader() {
  const [phase, setPhase] = useState<"loading" | "reversing" | "complete">("loading");
  const [pageLoaded, setPageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track page load status with a safety timeout
  useEffect(() => {
    let safetyTimeout: NodeJS.Timeout;

    const handleLoad = () => {
      setPageLoaded(true);
      if (safetyTimeout) clearTimeout(safetyTimeout);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Force pageLoaded to true after 5 seconds if load event hasn't fired
      safetyTimeout = setTimeout(() => {
        console.warn("Preloader: Load event timed out, forcing progress");
        handleLoad();
      }, 5000);

      return () => {
        window.removeEventListener("load", handleLoad);
        if (safetyTimeout) clearTimeout(safetyTimeout);
      };
    }
  }, []);

  // Global safety timeout to ensure preloader ALWAYS disappears
  useEffect(() => {
    const totalSafetyTimeout = setTimeout(() => {
      if (phase !== "complete") {
        console.warn("Preloader: Emergency timeout triggered");
        setPhase("complete");
      }
    }, 10000); // 10 seconds absolute limit

    return () => clearTimeout(totalSafetyTimeout);
  }, [phase]);

  // Handle Video Playback Speed and Direction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (phase === "loading") {
      video.playbackRate = 0.5; // Play slower (0.5x)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn("Video autoplay blocked or failed", e);
          // If video fails, and page is loaded, just move on
          if (pageLoaded) {
            setPhase("reversing");
          }
        });
      }
    } else if (phase === "reversing") {
      video.pause();
      
      let lastTime = Date.now();
      let reqId: number;
      
      const reverseStep = () => {
        const now = Date.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;
        
        // Reverse at 0.5x speed
        const newTime = video.currentTime - (delta * 0.5);
        if (newTime <= 0) {
          video.currentTime = 0;
          setPhase("complete");
        } else {
          video.currentTime = newTime;
          reqId = requestAnimationFrame(reverseStep);
        }
      };
      
      reqId = requestAnimationFrame(reverseStep);
      return () => cancelAnimationFrame(reqId);
    }
  }, [phase, pageLoaded]);

  // Lock scrolling
  useEffect(() => {
    if (phase !== "complete") {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("js-loading");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("js-loading");
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("js-loading");
    };
  }, [phase]);

  // Handle forward animation finishing
  const handleVideoEnded = () => {
    // Only reverse if the page is completely loaded
    if (pageLoaded) {
      setPhase("reversing");
    } else {
      // Otherwise, loop the animation again from the start
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((e) => console.warn(e));
      }
    }
  };

  if (phase === "complete") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white preloader-root">
      <div className="relative w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] md:w-[40vw] md:h-[40vw] md:max-w-[500px] md:max-h-[500px]">
        <video
          ref={videoRef}
          src="/pre-loader-animation.mp4"
          className="w-full h-full object-contain"
          playsInline
          muted
          onEnded={handleVideoEnded}
          onError={() => {
            console.error("Preloader video failed to load");
            if (pageLoaded) setPhase("complete");
          }}
          // Intentionally omitting loop=true so onEnded reliably fires
        />
      </div>
      
      <div className="absolute bottom-10 md:bottom-20 flex flex-col items-center gap-4">
         <span className="font-sacred text-2xl md:text-3xl text-saffron animate-pulse tracking-[0.3em] uppercase">
           ॐ नमो दुर्गायै नमः
         </span>
      </div>
    </div>
  );
}

