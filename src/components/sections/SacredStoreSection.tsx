"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Leaf,
  Droplet,
  Shield,
  MapPin,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data Models ---
const SACRED_OFFERS = [
  {
    id: 1,
    title: "SACRED STORE",
    description: "Invoke sacred life changing performance at the Dham, custom-designed to invite grace and bless life transitions.",
    watermark: "01",
    icon: <Store size={26} />,
    image: "/images/home/sacred_items_silk_1777441864950.png",
    offerings: [
      { id: 101, title: "Tulsi Mala", subtitle: "Pure and Blessed", time: "Just Now", icon: <Leaf size={18} className="text-emerald-600" />, bgColor: "bg-emerald-50 border-emerald-100" },
      { id: 102, title: "Siddha Yantra", subtitle: "Divine Protection", time: "2h ago", icon: <Shield size={18} className="text-amber-600" />, bgColor: "bg-amber-50 border-amber-100" },
      { id: 103, title: "Sacred Rudraksha", subtitle: "Energized at Dham", time: "5h ago", icon: <MapPin size={18} className="text-[#8b5a47]" />, bgColor: "bg-[#f4e8e1] border-[#eaccc0]" },
      { id: 104, title: "Sindoor", subtitle: "Blessed By Maa", time: "1d ago", icon: <Droplet size={18} className="text-rose-600" />, bgColor: "bg-rose-50 border-rose-100" },
    ]
  },
  {
    id: 2,
    title: "PUJA SERVICES",
    description: "Book authentic Vedic rituals and personalized homams conducted by experienced purohits for peace and prosperity.",
    watermark: "02",
    icon: <Sparkles size={26} />,
    image: "/images/home/sacred_ritual_himalayas_1777441843013.png",
    offerings: [
      { id: 201, title: "Navgraha Shanti", subtitle: "Special Sankalp", time: "Active", icon: <Sparkles size={18} className="text-indigo-600" />, bgColor: "bg-indigo-50 border-indigo-100" },
      { id: 202, title: "Ganesha Puja", subtitle: "Obstacle Removal", time: "3h ago", icon: <Sparkles size={18} className="text-orange-600" />, bgColor: "bg-orange-50 border-orange-100" },
      { id: 203, title: "Maa Durga Aarti", subtitle: "Daily Blessing", time: "6h ago", icon: <Sparkles size={18} className="text-rose-600" />, bgColor: "bg-rose-50 border-rose-100" },
      { id: 204, title: "Havan Ritual", subtitle: "Purification Fire", time: "1d ago", icon: <Sparkles size={18} className="text-amber-700" />, bgColor: "bg-amber-50 border-amber-200" },
    ]
  },
  {
    id: 3,
    title: "DIVINE GUIDANCE",
    description: "Connect with spiritual masters for personal astrology readings and sacred counseling tailored to your path.",
    watermark: "03",
    icon: <MapPin size={26} />,
    image: "/images/home/spiritual_guidance_guru_1777441889943.png",
    offerings: [
      { id: 301, title: "Kundali Reading", subtitle: "Fate Analysis", time: "Ongoing", icon: <MapPin size={18} className="text-blue-600" />, bgColor: "bg-blue-50 border-blue-100" },
      { id: 302, title: "Vastu Consult", subtitle: "Sacred Geometry", time: "4h ago", icon: <MapPin size={18} className="text-emerald-600" />, bgColor: "bg-emerald-50 border-emerald-100" },
      { id: 303, title: "Mantra Diksha", subtitle: "Spiritual Initiation", time: "8h ago", icon: <MapPin size={18} className="text-purple-600" />, bgColor: "bg-purple-50 border-purple-100" },
      { id: 304, title: "Soul Counseling", subtitle: "Inner Peace", time: "2d ago", icon: <MapPin size={18} className="text-teal-600" />, bgColor: "bg-teal-50 border-teal-100" },
    ]
  }
];

export function SacredStoreSection() {
  // We use array rotation for the stack. It's the most stable, zero-flicker method.
  const [cards, setCards] = useState(SACRED_OFFERS);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-play interval - guaranteed autoscroll
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [cards[0].id]); // Stable dependency size, re-triggers when cards rotate

  const handleNext = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const first = newCards.shift();
      if (first) newCards.push(first);
      return newCards;
    });
  };

  const handlePrev = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const last = newCards.pop();
      if (last) newCards.unshift(last);
      return newCards;
    });
  };

  const jumpToCard = (targetId: number) => {
    const targetIndex = cards.findIndex(c => c.id === targetId);
    if (targetIndex === 0) return;
    setCards((prev) => {
      const newArr = [...prev];
      const spliced = newArr.splice(0, targetIndex);
      return [...newArr, ...spliced];
    });
  };

  const activeCard = cards[0];

  return (
    <section className="relative w-full min-h-screen bg-transparent py-24 overflow-hidden font-sans">
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/home-page/store-section-bg.png"
          alt="Sacred Store Background"
          fill
          className="object-cover opacity-100"
          priority
          unoptimized
        />
        {/* Subtly darkened bottom to blend with next section if needed */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFFBF5]/20" />
      </div>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-5 md:mb-5 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-saffron/60" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-saffron font-bold">
              Sacred Services
            </span>
            <div className="w-8 h-px bg-saffron/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-sacred-brown mb-6 tracking-tight leading-[1.1]"
          >
            Divine <span className="italic text-gradient-saffron font-bold">Offerings.</span>
          </motion.h2>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* =========================================
              LEFT COLUMN: Stable High-End Stack
              ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-center justify-center w-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* CRITICAL FIX: Explicit width and height on the wrapper ensures 
              the absolute cards NEVER disappear.
            */}
            <div className="relative w-full max-w-[500px] h-[450px] flex items-center justify-between">

              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute -left-4 md:-left-12 z-40 w-12 h-12 rounded-full bg-white border border-[#eaccc0]/60 shadow-xl flex items-center justify-center text-[#8b5a47] hover:bg-[#8b5a47] hover:text-white hover:scale-110 active:scale-95 transition-all group"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Stack Container */}
              <div className="relative w-full h-full mx-8">
                {cards.map((card, index) => {
                  const isFront = index === 0;
                  return (
                    <motion.div
                      key={card.id}
                      animate={{
                        x: index * 24, // Shift towards bottom right
                        y: index * 24,
                        scale: 1 - index * 0.06,
                        zIndex: cards.length - index,
                        opacity: 1 - index * 0.15,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.32, 0.72, 0, 1] // Custom butter-smooth easing
                      }}
                      className={cn(
                        "absolute top-0 left-0 w-[90%] h-[90%] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(74,59,50,0.15)] transition-shadow",
                        // CRITICAL FIX: Rich warm espresso color, NOT harsh black.
                        "bg-[#4a3b32] border border-white/10",
                        isFront ? "cursor-default" : "cursor-pointer hover:shadow-[0_20px_40px_rgba(74,59,50,0.25)]"
                      )}
                      onClick={!isFront ? () => jumpToCard(card.id) : undefined}
                    >
                      {/* Faded Background Image */}
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                      />

                      {/* Warm Gradient Overlay to blend text beautifully */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3a2e2b] via-[#3a2e2b]/60 to-transparent" />

                      {/* Card Content */}
                      <div className="absolute inset-x-0 bottom-0 z-10 p-8 flex flex-col justify-end">
                        <motion.div
                          initial={false}
                          animate={{ y: isFront ? 0 : 15, opacity: isFront ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col gap-2"
                        >
                          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-3 text-[#f4e8e1]">
                            {card.icon}
                          </div>
                          <h3 className="text-3xl font-serif text-white tracking-widest uppercase mb-2 drop-shadow-md">
                            {card.title}
                          </h3>
                          <p className="text-white/80 leading-relaxed text-sm mb-6 pr-4">
                            {card.description}
                          </p>

                          {isFront && (
                            <button className="flex items-center gap-3 text-[#f4e8e1] font-bold tracking-[0.2em] text-xs uppercase group/btn w-fit">
                              <span className="border-b border-[#f4e8e1]/30 pb-1 group-hover/btn:border-[#f4e8e1] transition-colors">Explore Menu</span>
                              <ArrowRight size={16} className="transform transition-transform group-hover/btn:translate-x-2" />
                            </button>
                          )}
                        </motion.div>
                      </div>

                      {/* Soft Watermark */}
                      <div className="absolute top-4 right-6 text-[100px] leading-none font-serif font-black text-white/5 select-none pointer-events-none">
                        {card.watermark}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute -right-4 md:-right-12 z-40 w-12 h-12 rounded-full bg-white border border-[#eaccc0]/60 shadow-xl flex items-center justify-center text-[#8b5a47] hover:bg-[#8b5a47] hover:text-white hover:scale-110 active:scale-95 transition-all group"
              >
                <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Pagination Dots (Properly Below Stack) */}
            <div className="flex gap-2 mt-10 z-20">
              {SACRED_OFFERS.map((offer) => (
                <button
                  key={offer.id}
                  onClick={() => jumpToCard(offer.id)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    activeCard.id === offer.id ? "w-10 bg-[#8b5a47]" : "w-2 bg-[#8b5a47]/20 hover:bg-[#8b5a47]/50"
                  )}
                  aria-label={`View ${offer.title}`}
                />
              ))}
            </div>
          </motion.div>

          {/* =========================================
              RIGHT COLUMN: Elegant Proper List
              ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-5 flex flex-col h-[550px]"
          >
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_15px_40px_rgba(58,46,43,0.04)] h-full overflow-hidden flex flex-col relative border border-white">

              <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#f0e4df]">
                <div className="space-y-1">
                  <h4 className="font-serif text-[#3a2e2b] text-2xl tracking-widest uppercase font-bold">
                    Sacred List
                  </h4>
                  <p className="text-xs text-[#8b5a47] font-bold tracking-[0.1em] uppercase">
                    {activeCard.title}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative">
                <div className="flex flex-col gap-3 absolute w-full">
                  {/* Wait mode ensures one list fully exits before the next enters */}
                  <AnimatePresence mode="wait">
                    <motion.div key={activeCard.id} className="flex flex-col gap-3">
                      {activeCard.offerings.map((item, index) => (
                        <motion.div
                          key={item.id}
                          // Smooth, universally supported reveal (No flicker-prone clipPaths)
                          initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            filter: "blur(0px)",
                            transition: {
                              duration: 0.4,
                              ease: "easeOut",
                              delay: index * 0.08 // Elegant stagger
                            }
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.2 }
                          }}
                          whileHover={{ scale: 1.01, backgroundColor: "#faf6f3" }}
                          className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#f4e8e1] group cursor-pointer transition-colors"
                        >
                          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105", item.bgColor)}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="text-[#3a2e2b] font-bold text-sm md:text-base truncate pr-2">
                                {item.title}
                              </h4>
                              <ChevronRight size={14} className="text-[#8b5a47] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-[#8b7974] text-xs font-medium">{item.subtitle}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Fade out bottom gradient */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>

              {/* Visit Store Button */}
              <div className="mt-6 pt-6 border-t border-[#f0e4df]">
                <Link
                  href="/store"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#faf6f3] text-[#8b5a47] font-bold tracking-widest uppercase text-xs hover:bg-[#8b5a47] hover:text-white transition-all group/store"
                >
                  Visit Sacred Store
                  <ArrowRight size={16} className="transition-transform group-hover/store:translate-x-1" />
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}