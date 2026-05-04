"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { X, ShoppingBag, Info, ChevronLeft, ChevronRight, Sparkles, Gem, Zap, Droplets, Flame, Heart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Mapping icons to string keys for serialization
const ICON_MAP: Record<string, React.ElementType> = {
    Gem,
    Zap,
    Sparkles,
    Droplets,
    Flame,
    Heart,
    ShoppingBag
};

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string; // Changed back to string for serialization
    color: string;
    bg: string;
}

interface SacredStoreSectionProps {
    products: Product[];
    backgroundImage: string;
}

export function SacredStoreSection({ products, backgroundImage }: SacredStoreSectionProps) {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const activeProduct = products.find((p) => p.id === selectedProduct);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    }, [products.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    }, [products.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedProduct) return;
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev, selectedProduct]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) {
            handlePrev();
        } else if (info.offset.x < -swipeThreshold) {
            handleNext();
        }
    };

    return (
        <section className="relative pt-24 pb-15 min-h-screen overflow-hidden flex flex-col justify-center bg-transparent z-0">

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
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent z-[1]" />
            </div>

            {/* Background Layer */}
            <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-[-1] mix-blend-multiply"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed"
                }}
            />
            <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#FDFBF7]/95 via-[#FDFBF7]/70 to-[#FDFBF7]" />

            <div className="w-full mx-auto px-6 max-w-[1400px]">
                {/* Header */}
                <div className="text-center mb-12">
                    <BlurFade delay={0.1}>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-saffron/60" />
                            <span className="font-body text-xs tracking-[0.4em] uppercase text-saffron font-bold drop-shadow-sm">
                                Energized Offerings
                            </span>
                            <Sparkles className="w-4 h-4 text-saffron/60" />
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl text-sacred-brown tracking-tight drop-shadow-sm">
                            SACRED <span className="text-gradient-saffron italic">STORE</span>
                        </h1>
                        <p className="font-body text-lg text-warm-umber/80 mt-6 max-w-2xl mx-auto leading-relaxed">
                            Each item carries sankalp, not just substance. Energized at the Dham in the misty peaks
                            of Darjeeling with specific intentions and pure Vedic current.
                        </p>
                    </BlurFade>
                </div>

                {/* 3D Curved Carousel */}
                <div className="relative w-full flex items-center justify-center perspective-[2000px] py-0 min-h-[400px]">
                    {products.map((product, index) => {
                        const offset = index - currentIndex;
                        const isCenter = offset === 0;
                        const absOffset = Math.abs(offset);

                        // Adjusted Math for better visibility and spacing
                        const x = offset * 220; // Spread them out slightly more so they are visible
                        const z = absOffset * -80; // Don't push them as far back
                        const rotateY = offset * -25; // Gentler curve
                        const scale = isCenter ? 1 : 0.85;
                        const zIndex = 50 - absOffset;

                        // Much softer opacity drop-off
                        const opacity = absOffset > 2 ? 0 : 1 - (absOffset * 0.15);

                        // MUCH softer blur so you can clearly see the side cards
                        const blurAmount = isCenter ? 0 : absOffset * 1.5;

                        return (
                            <motion.div
                                key={product.id}
                                initial={false}
                                animate={{
                                    x,
                                    z,
                                    rotateY,
                                    scale,
                                    zIndex,
                                    opacity,
                                    filter: `blur(${blurAmount}px)`,
                                    y: isCenter ? [0, -6, 0] : 0
                                }}
                                transition={{
                                    // Snappier, faster, smoother transitions
                                    x: { type: "spring", stiffness: 400, damping: 35 },
                                    z: { type: "spring", stiffness: 400, damping: 35 },
                                    rotateY: { type: "spring", stiffness: 400, damping: 35 },
                                    scale: { type: "spring", stiffness: 400, damping: 35 },
                                    opacity: { duration: 0.3 },
                                    filter: { duration: 0.3 },
                                    // Continuous float ONLY for center
                                    y: isCenter ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 400, damping: 35 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.1}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    "absolute w-full max-w-[360px] transition-shadow duration-300 rounded-[2.5rem]",
                                    isCenter
                                        ? "cursor-grab active:cursor-grabbing"
                                        : "cursor-pointer"
                                )}
                                onClick={() => {
                                    if (!isCenter) setCurrentIndex(index);
                                }}
                            >
                                <MagicCard
                                    className={cn(
                                        "h-auto min-h-[420px] p-8 md:p-10 bg-background/95 backdrop-blur-2xl border rounded-[2.5rem] flex flex-col justify-between group overflow-hidden transition-all duration-300",
                                        isCenter
                                            ? "border-saffron/40 shadow-[0_20px_50px_-10px_rgba(245,158,11,0.25)]"
                                            : "border-saffron/15 shadow-md hover:border-saffron/30"
                                    )}
                                    gradientColor="rgba(245, 158, 11, 0.15)"
                                    gradientSize={300}
                                    gradientOpacity={0.8}
                                >
                                    {/* Decorative background watermark */}
                                    <div className="absolute -right-8 -top-8 opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                                        {(() => {
                                            const Icon = ICON_MAP[product.icon] || ShoppingBag;
                                            return <Icon className="w-64 h-64" />;
                                        })()}
                                    </div>

                                    <div className="relative z-10">
                                        <div className={cn(
                                            "p-4 rounded-[1.25rem] w-fit mb-8 transition-transform duration-500",
                                            product.bg,
                                            isCenter && "shadow-lg shadow-current/20 scale-110"
                                        )}>
                                            {(() => {
                                                const Icon = ICON_MAP[product.icon] || ShoppingBag;
                                                return <Icon className={cn("w-8 h-8", product.color)} />;
                                            })()}
                                        </div>

                                        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-saffron font-bold flex items-center gap-2 mb-2">
                                            <span className="w-4 h-[1px] bg-saffron" />
                                            {product.category}
                                        </span>

                                        <h3 className="font-display text-3xl text-sacred-brown mb-4 leading-tight">
                                            {product.name}
                                        </h3>

                                        <p className="font-body text-sm text-warm-umber/80 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Button stays at the bottom */}
                                    <div className="mt-8 relative z-10">
                                        <AnimatePresence>
                                            {isCenter ? (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.2 }}
                                                    onClick={() => setSelectedProduct(product.id)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex items-center gap-3 text-background bg-gradient-to-r from-saffron to-amber-600 p-4 rounded-xl justify-center cursor-pointer shadow-lg shadow-saffron/30 hover:shadow-saffron/40 transition-all duration-200 w-full"
                                                >
                                                    <span className="font-display text-sm tracking-[0.2em] uppercase font-bold">Inquire Now</span>
                                                    <ShoppingBag className="w-4 h-4" />
                                                </motion.div>
                                            ) : (
                                                <div className="h-[56px] w-full" />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </MagicCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-center gap-8 mb-20 relative z-10 mt-4">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(245,158,11,0.1)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePrev}
                        className="p-4 rounded-full bg-background border border-saffron/30 text-sacred-brown transition-colors shadow-sm backdrop-blur-md"
                    >
                        <ChevronLeft size={24} />
                    </motion.button>
                    <div className="flex gap-3">
                        {products.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                                    idx === currentIndex
                                        ? "w-10 bg-gradient-to-r from-saffron to-amber-500 shadow-md"
                                        : "w-2 bg-saffron/20 hover:bg-saffron/40"
                                )}
                            />
                        ))}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(245,158,11,0.1)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNext}
                        className="p-4 rounded-full bg-background border border-saffron/30 text-sacred-brown transition-colors shadow-sm backdrop-blur-md"
                    >
                        <ChevronRight size={24} />
                    </motion.button>
                </div>



                {/* Product Inquiry Modal */}
                <AnimatePresence>
                    {selectedProduct && activeProduct && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProduct(null)}
                                className="absolute inset-0 bg-sacred-brown/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                className="relative w-full max-w-lg bg-[#FDFBF7] rounded-[2.5rem] shadow-2xl overflow-hidden border border-saffron/20"
                            >
                                <div className="p-8 md:p-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("p-4 rounded-2xl shadow-inner", activeProduct.bg)}>
                                                {(() => {
                                                    const Icon = ICON_MAP[activeProduct.icon] || ShoppingBag;
                                                    return <Icon className={cn("w-8 h-8", activeProduct.color)} />;
                                                })()}
                                            </div>
                                            <div>
                                                <h3 className="font-display text-2xl md:text-3xl text-sacred-brown leading-none mb-2">
                                                    {activeProduct.name}
                                                </h3>
                                                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-saffron font-bold">
                                                    {activeProduct.category}
                                                </span>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedProduct(null)}
                                            className="p-2 bg-saffron/10 hover:bg-saffron/20 rounded-full transition-colors"
                                        >
                                            <X size={24} className="text-sacred-brown" />
                                        </motion.button>
                                    </div>

                                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                        <div className="space-y-2">
                                            <label className="font-body text-[10px] tracking-widest uppercase text-warm-umber/80 ml-2 font-bold">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Type your name..."
                                                className="w-full px-6 py-4 bg-white border border-saffron/15 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-transparent transition-all shadow-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="font-body text-[10px] tracking-widest uppercase text-warm-umber/80 ml-2 font-bold">Email</label>
                                                <input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="w-full px-6 py-4 bg-white border border-saffron/15 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-transparent transition-all shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="font-body text-[10px] tracking-widest uppercase text-warm-umber/80 ml-2 font-bold">Location</label>
                                                <input
                                                    type="text"
                                                    placeholder="City, Country"
                                                    className="w-full px-6 py-4 bg-white border border-saffron/15 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-transparent transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-body text-[10px] tracking-widest uppercase text-warm-umber/80 ml-2 font-bold">Intention / Sankalp</label>
                                            <textarea
                                                rows={3}
                                                placeholder="How do you wish for this item to serve your path?"
                                                className="w-full px-6 py-4 bg-white border border-saffron/15 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 resize-none focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-transparent transition-all shadow-sm"
                                            />
                                        </div>

                                        <div className="pt-6">
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <ShimmerButton className="w-full py-5 rounded-2xl shadow-xl shadow-saffron/20">
                                                    <span className="font-display text-sm tracking-[0.2em] uppercase font-bold">
                                                        Submit Request
                                                    </span>
                                                </ShimmerButton>
                                            </motion.div>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}