"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [phase, setPhase] = useState<"initial" | "loading" | "reversing" | "complete">("initial");

  useEffect(() => {
    setPhase("loading");
    const startTime = Date.now();
    const minForwardDuration = 8000; // 8 seconds for a very slow, cinematic feel

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minForwardDuration - elapsedTime);

      setTimeout(() => {
        setPhase("reversing");
        // Reversing transition takes 4 seconds (even slower)
        setTimeout(() => {
          setPhase("complete");
        }, 4000);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (phase === "complete") {
      document.documentElement.classList.remove("js-loading");
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-ivory preloader-root"
        >
          <motion.div 
            className="relative w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] md:w-[40vw] md:h-[40vw] md:max-w-[500px] md:max-h-[500px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={phase === "reversing" ? { scale: 0.4, opacity: 0 } : { scale: 1.05, opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            <Image
              src="/pre-loader-animation.gif"
              alt="Maa Unique Dham Loading"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 md:bottom-20 flex flex-col items-center gap-4"
            animate={phase === "reversing" ? { y: 40, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
             <span className="font-sacred text-2xl md:text-3xl text-saffron animate-pulse tracking-[0.3em] uppercase">
               ॐ नमो दुर्गायै नमः
             </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
