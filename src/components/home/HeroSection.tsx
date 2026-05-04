"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import { WordRotate } from "@/components/ui/word-rotate";
import { SparklesText } from "@/components/ui/sparkles-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowRight } from "lucide-react";
import { trackEvent, SEO_EVENTS } from "@/lib/analytics";

const mantras = [
  "ॐ नमो दुर्गायै नमः",
  "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
  "या देवी सर्वभूतेषु शक्ति रूपेण संस्थिता",
  "ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके",
];

const banners = [
  "/images/home-page/hero/banner 1.png",
  "/images/home-page/hero/banner 2.png",
  "/images/home-page/hero/banner 3.png",
  "/images/home-page/hero/banner 4.png",
  "/images/home-page/hero/banner 5.png",
];

const heroContent = [
  {
    heading1: "WHERE MAA IS",
    heading2: "NOT INVOKED.",
    sparkle: "SHE ARRIVES.",
    desc: "Born in the sacred hills of Darjeeling, this is not a temple on the map. It is a living presence that reaches wherever truth calls.",
  },
  {
    heading1: "SACRED GRACE OF",
    heading2: "DARJEELING.",
    sparkle: "DIVINE BLISS.",
    desc: "Experience the eternal energy of Sanatan Shakti, flowing through the ancient peaks to touch every soul that seeks the truth.",
  },
  {
    heading1: "THE ETERNAL LIGHT",
    heading2: "OF THE HILLS.",
    sparkle: "DIVINE PROTECTION.",
    desc: "Walking the path of devotion where every breath is a prayer and every step is a blessing from the Divine Mother.",
  },
  {
    heading1: "AWAKEN THE POWER",
    heading2: "WITHIN.",
    sparkle: "SACRED SHAKTI.",
    desc: "Feel the primal energy of nature merging with your consciousness, guided by the ancient wisdom of the Dham.",
  },
  {
    heading1: "A JOURNEY TO",
    heading2: "YOUR SOUL.",
    sparkle: "ETERNAL TRUTH.",
    desc: "Transcending the material world to find the silence that speaks, the light that guides, and the mother that loves unconditionally.",
  },
];

// Organic scribble path — zig-zags with slight curves to mimic hand-drawn strokes
// Covers a 1920x1080 viewBox so it maps to full screen
const scribblePath = `
  M -50 30
  Q 480 10, 960 50
  Q 1440 90, 1970 30
  L 1970 90
  Q 1440 130, 960 100
  Q 480 70, -50 120
  L -50 180
  Q 480 150, 960 190
  Q 1440 230, 1970 170
  L 1970 240
  Q 1440 280, 960 260
  Q 480 240, -50 300
  L -50 350
  Q 480 320, 960 370
  Q 1440 410, 1970 340
  L 1970 410
  Q 1440 450, 960 430
  Q 480 410, -50 470
  L -50 520
  Q 480 490, 960 540
  Q 1440 580, 1970 510
  L 1970 580
  Q 1440 620, 960 600
  Q 480 580, -50 640
  L -50 690
  Q 480 660, 960 710
  Q 1440 750, 1970 680
  L 1970 750
  Q 1440 790, 960 770
  Q 480 750, -50 810
  L -50 860
  Q 480 830, 960 880
  Q 1440 920, 1970 850
  L 1970 920
  Q 1440 960, 960 940
  Q 480 920, -50 980
  L -50 1030
  Q 480 1000, 960 1050
  Q 1440 1090, 1970 1020
  L 1970 1100
`;

function SketchRevealImage({
  imageUrl,
  maskId,
}: {
  imageUrl: string;
  maskId: string;
}) {
  return (
    <>
      {/* Full image behind — fades in after sketch completes to fill gaps */}
      <motion.img
        src={imageUrl}
        alt="Sacred Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
      />

      {/* SVG sketch mask reveal on top */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            {/* Black background = hide everything */}
            <rect width="1920" height="1080" fill="black" />
            {/* Animated white scribble = progressively reveal */}
            <motion.path
              d={scribblePath}
              fill="transparent"
              stroke="white"
              strokeWidth="90"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
            {/* Full reveal at the end to ensure no gaps remain in the SVG layer */}
            <motion.rect
              width="1920"
              height="1080"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
            />
          </mask>
        </defs>

        <image
          href={imageUrl}
          width="1920"
          height="1080"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${maskId})`}
        />
      </svg>
    </>
  );
}

export function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const uniqueId = useId();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden pt-16 bg-white">
      {/* SVG Sketch Reveal Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            className="absolute inset-0"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <SketchRevealImage
              imageUrl={banners[currentBanner]}
              maskId={`sketch-mask-${uniqueId}-${currentBanner}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <Particles
        className="absolute inset-0 z-[1]"
        quantity={60}
        ease={80}
        color="#E8860C"
        refresh
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Mantra Rotation */}
        <BlurFade delay={0.2}>
          <div className="mb-6 relative">
            {/* Mantra Cloud - Lighter sacred glow */}
            <div className="absolute inset-x-[-20%] inset-y-[-15%] bg-[#FFFBF5]/70 blur-[20px] rounded-[100%] z-[-1] pointer-events-none scale-x-110 opacity-75" />
            <WordRotate
              words={mantras}
              className="font-sacred text-xl md:text-2xl lg:text-3xl text-saffron italic drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-wide"
              duration={4000}
            />
          </div>
        </BlurFade>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative py-8 px-4">
              {/* Cloud Overlay - Lighter and more subtle sacred mist */}
              <div className="absolute inset-x-[-12%] inset-y-[-8%] pointer-events-none z-[-1]">
                {/* Thick core layer - lighter ivory and lower opacity */}
                <div className="absolute inset-0 bg-[#FFFBF5]/80 blur-[40px] rounded-[100%] opacity-80" />
                {/* Secondary bloom - lower opacity */}
                <div className="absolute inset-[-5%] bg-white/60 blur-[30px] rounded-[100%] opacity-60" />
              </div>

              {/* Main Heading */}
              <div className="space-y-4 mb-8">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] text-sacred-brown tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  {heroContent[currentBanner].heading1}
                  <br />
                  <span className="text-gradient-saffron italic pr-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {heroContent[currentBanner].heading2}
                  </span>
                </h1>

                <div className="flex items-center justify-center">
                  <SparklesText
                    className="font-display text-4xl md:text-6xl lg:text-7xl leading-none text-sacred-brown drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    sparklesCount={12}
                    colors={{ first: "#E8860C", second: "#C41E3A" }}
                  >
                    {heroContent[currentBanner].sparkle}
                  </SparklesText>
                </div>
              </div>

              {/* Subheading */}
              <p className="font-body text-sm md:text-base lg:text-lg text-warm-umber max-w-2xl mx-auto mb-2 leading-relaxed font-semibold tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {heroContent[currentBanner].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTAs */}
        <BlurFade delay={1.0}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/puja-booking" onClick={() => trackEvent(SEO_EVENTS.CTA_CLICK, { location: "hero", label: "Book a Sacred Puja" })}>
              <ShimmerButton className="px-10 py-4 shadow-2xl transition-all hover:scale-105 active:scale-95">
                <span className="font-display text-base tracking-widest uppercase">
                  Book a Sacred Puja
                </span>
              </ShimmerButton>
            </Link>
            <Link
              href="/#mahant"
              className="group flex items-center gap-2 font-display text-sm tracking-widest uppercase text-sacred-brown hover:text-saffron transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            >
              Meet Mahant Yogiraj
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-[2]" />
    </section>
  );
}
