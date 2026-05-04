"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Sparkles, Compass, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/ui/magic-card";

// 1. Define your specific data exactly as in your original structure
const guidanceTypes = [
    {
        id: "spiritual-career",
        title: "Spiritual Career Guidance",
        description: "Navigate your soul's purpose and professional path through traditional Vedic analysis of work-life (Artha) and spiritual duty (Dharma). Discover how to align your career with your highest spiritual calling and find fulfillment, clarity, and success.",
        iconSrc: "/images/guidance-icons/1.png",
        glowColor: "#D35D31",
        textColor: "text-[#D35D31]",
    },
    {
        id: "personal-guidance",
        title: "Personal Guidance",
        description: "Receive deep spiritual direction tailored to your individual journey (Atma-Jnana). Explore karmic pattern resolution, inner peace, relationship harmony, and personal sadhana path transformation. Gain clarity and spiritual fortitude through Maa's direct energetic connection.",
        iconSrc: "/images/guidance-icons/3.png",
        glowColor: "#E63971",
        textColor: "text-[#E63971]",
    },
    {
        id: "personal-readings",
        title: "Personal Readings",
        description: "Access foresight and ancient traditional wisdom through detailed personal readings. Uncover insights into health, family, spiritual development, and future possibilities. Direct and intuitive readings providing clarity and guidance for your personal life path.",
        iconSrc: "/images/guidance-icons/2.png",
        glowColor: "#D88C2A",
        textColor: "text-[#D88C2A]",
    },
];

export function GuidanceCarousel() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scrolling logic (paused on hover)
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            handleNext();
        }, 8000);
        return () => clearInterval(interval);
    }, [isHovered]);

    const handlePrevious = () => {
        setActiveIndex((current) => (current === 0 ? guidanceTypes.length - 1 : current - 1));
    };

    const handleNext = () => {
        setActiveIndex((current) => (current + 1) % guidanceTypes.length);
    };

    return (
        <section className="relative min-h-screen pt-20 md:pt-25 pb-5 md:pb-10 w-full flex flex-col items-center justify-center overflow-hidden bg-transparent font-sans">
            {/* Background Image Setup (Exactly like Home Page Hero) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home-page/hero/banner 1.png"
                    alt="Sacred Hero Background"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                {/* Subtle Bottom Gradient like Home Page */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#Fdfbf7] to-transparent z-[1]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">

                {/* Header Content */}
                <div className="text-center mb-12 md:mb-16 shrink-0">
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#2B2118] font-bold mb-4 flex items-center justify-center gap-3 md:gap-4">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rotate-45 border border-[#2B2118]" />
                            Direct Connection
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rotate-45 border border-[#2B2118]" />
                        </span>

                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2B2118] tracking-tight mb-4 md:mb-6 leading-tight">
                            Sessions with <br className="md:hidden" />
                            <span className="italic font-medium text-[#D35D31] md:ml-4">Mahant Yogiraj</span>
                        </h1>

                        <p className="font-sans text-sm md:text-base lg:text-lg text-[#2B2118]/80 max-w-2xl mx-auto leading-relaxed font-medium">
                            Receive personalized guidance rooted in ancient Himalayan wisdom.<br className="hidden md:block" />
                            Video call or voice—the energy flows regardless of physical distance.
                        </p>
                    </motion.div>
                </div>

                {/* Carousel / Cards Container */}
                <div
                    className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Navigation Arrows (Desktop) */}
                    {/* Navigation Arrows (Desktop) */}
                    <button
                        onClick={handlePrevious}
                        className="hidden xl:flex absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-40 w-16 h-16 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-xl items-center justify-center text-[#2B2118]/60 hover:text-saffron hover:border-saffron hover:scale-110 transition-all duration-500 group/btn"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={32} strokeWidth={1.5} className="group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="hidden xl:flex absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-40 w-16 h-16 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-xl items-center justify-center text-[#2B2118]/60 hover:text-saffron hover:border-saffron hover:scale-110 transition-all duration-500 group/btn"
                        aria-label="Next"
                    >
                        <ChevronRight size={32} strokeWidth={1.5} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {/* Cards Container */}
                    <div className="relative w-full h-[520px] sm:h-[480px] md:h-[320px] lg:h-[350px] flex items-center justify-center perspective-2000">
                        <AnimatePresence initial={false} mode="wait">
                            {guidanceTypes.map((type, index) => {
                                const isActive = index === activeIndex;
                                const isPrev = index === (activeIndex - 1 + guidanceTypes.length) % guidanceTypes.length;
                                const isNext = index === (activeIndex + 1) % guidanceTypes.length;

                                if (!isActive && !isPrev && !isNext) return null;

                                return (
                                    <motion.div
                                        key={type.id}
                                        initial={{ opacity: 0, scale: 0.85, x: isNext ? "110%" : "-110%" }}
                                        animate={{
                                            opacity: isActive ? 1 : 0.2,
                                            scale: isActive ? 1 : 0.8,
                                            x: isActive ? "0%" : isPrev ? "-110%" : "110%",
                                            y: isActive ? 0 : 20,
                                            rotateY: isActive ? 0 : isPrev ? 10 : -10,
                                            zIndex: isActive ? 30 : 10,
                                        }}
                                        whileHover={isActive ? {
                                            y: -8,
                                            scale: 1.02,
                                            transition: { duration: 0.4, ease: "easeOut" }
                                        } : {}}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.32, 0.72, 0, 1]
                                        }}
                                        onClick={() => setActiveIndex(index)}
                                        className={cn(
                                            "absolute w-[90vw] sm:w-[500px] md:w-[650px] lg:w-[850px] h-full cursor-pointer",
                                            !isActive && "pointer-events-none md:pointer-events-auto"
                                        )}
                                    >
                                        <div className="w-full h-full p-2">
                                            <MagicCard
                                                mode="gradient"
                                                gradientSize={0}
                                                className={cn(
                                                    "w-full h-full p-6 md:p-8 border-2 transition-all duration-500 overflow-hidden",
                                                    isActive
                                                        ? "bg-white/95 border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]"
                                                        : "bg-white/40 border-white/20 hover:bg-white/60",
                                                    "backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem]"
                                                )}
                                            >
                                                {/* Clean layout without continuous float to avoid choppiness */}
                                                <div className="flex flex-col md:flex-row h-full w-full relative z-10 gap-6 md:gap-10 items-center">

                                                    {/* Left Side: Icon Container */}
                                                    <div className="w-28 h-28 md:w-56 md:h-56 relative flex items-center justify-center shrink-0">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                                            className={cn("absolute inset-0 rounded-full border border-dashed opacity-10", type.textColor)}
                                                        />

                                                        <motion.div
                                                            whileHover={{ scale: 1.05, rotate: 5 }}
                                                            className="relative w-24 h-24 md:w-48 md:h-48 z-10 flex items-center justify-center transition-transform"
                                                        >
                                                            <Image
                                                                src={type.iconSrc}
                                                                alt={type.title}
                                                                fill
                                                                className="object-contain"
                                                                priority
                                                            />
                                                        </motion.div>
                                                    </div>

                                                    {/* Right Side: Text & Info */}
                                                    <div className="flex-1 flex flex-col justify-center text-center md:text-left h-full">
                                                        <div className="mb-2">
                                                            <h3 className={cn(
                                                                "font-serif text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 font-bold tracking-tight transition-colors leading-tight",
                                                                isActive ? "text-[#2B2118]" : "text-[#2B2118]/30"
                                                            )}>
                                                                {type.title}
                                                            </h3>
                                                            <p className={cn(
                                                                "font-sans text-sm md:text-base lg:text-lg leading-relaxed transition-opacity",
                                                                isActive ? "text-[#2B2118]/60 font-medium" : "text-[#2B2118]/20"
                                                            )}>
                                                                {type.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </MagicCard>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Controls & Pagination */}
                <div className="flex flex-col items-center mt-12 md:mt-20 shrink-0 z-20">
                    <div className="flex justify-center gap-4">
                        {guidanceTypes.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-300",
                                    activeIndex === idx ? "bg-[#2B2118] scale-125" : "bg-[#2B2118]/10 hover:bg-[#2B2118]/20"
                                )}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    {/* Mobile Only Arrows */}
                    {/* Mobile Only Arrows */}
                    <div className="flex gap-10 mt-8 xl:hidden">
                        <button
                            onClick={handlePrevious}
                            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm border border-[#2B2118]/10 shadow-lg flex items-center justify-center text-[#2B2118]/60 active:scale-90 transition-all"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={28} strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm border border-[#2B2118]/10 shadow-lg flex items-center justify-center text-[#2B2118]/60 active:scale-90 transition-all"
                            aria-label="Next"
                        >
                            <ChevronRight size={28} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}