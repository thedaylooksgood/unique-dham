"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { X, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, Gem, Zap, Droplets, Flame, Heart, User, Phone, MessageSquare, Send, CheckCircle2, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

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
    icon: string;
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", productId: "", message: "" });
    const lenis = useLenis();

    const activeProduct = products.find((p) => p.id === selectedProduct);

    // Auto-select current product when modal opens
    useEffect(() => {
        if (selectedProduct) {
            setFormData(prev => ({ ...prev, productId: selectedProduct }));
        }
    }, [selectedProduct]);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            lenis?.stop();
        } else {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
            lenis?.start();
        };
    }, [selectedProduct, lenis]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

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
        <>
            <section className="relative pt-24 pb-15 min-h-screen overflow-hidden flex flex-col justify-center bg-transparent z-0">
                {/* Background Image Setup */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home-page/hero/banner 1.png"
                        alt="Sacred Hero Background"
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
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

                            const x = offset * 220;
                            const z = absOffset * -80;
                            const rotateY = offset * -25;
                            const scale = isCenter ? 1 : 0.85;
                            const zIndex = 50 - absOffset;
                            const opacity = absOffset > 2 ? 0 : 1 - (absOffset * 0.15);
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
                                        x: { type: "spring", stiffness: 400, damping: 35 },
                                        z: { type: "spring", stiffness: 400, damping: 35 },
                                        rotateY: { type: "spring", stiffness: 400, damping: 35 },
                                        scale: { type: "spring", stiffness: 400, damping: 35 },
                                        opacity: { duration: 0.3 },
                                        filter: { duration: 0.3 },
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
                </div>
            </section>

            {/* Modal - OUTSIDE the section with overflow-hidden */}
            <AnimatePresence>
                {selectedProduct && activeProduct && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-sacred-brown/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="fixed inset-0 pointer-events-auto"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-xl bg-ivory/95 backdrop-blur-3xl border border-saffron/20 rounded-3xl shadow-2xl overflow-hidden my-auto pointer-events-auto max-h-[95vh] flex flex-col mx-4"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-saffron/10 rounded-full transition-colors z-[110]"
                            >
                                <X size={20} className="text-sacred-brown/60" />
                            </button>

                            <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar">
                                <AnimatePresence mode="wait">
                                    {!isSubmitted ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <div className="mb-8">
                                                <span className="font-bold text-[10px] tracking-[0.3em] uppercase text-saffron mb-2 block">
                                                    Secure Product Enquiry
                                                </span>
                                                <h3 className="font-display text-3xl sm:text-4xl text-sacred-brown mb-2 leading-tight">
                                                    {activeProduct?.name}
                                                </h3>
                                                <p className="text-warm-umber/60 text-sm font-medium">Leave your details to receive acquisition info.</p>
                                            </div>

                                            <form className="space-y-6" onSubmit={handleSubmit}>
                                                <div className="space-y-2.5">
                                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-[0.1em] uppercase text-sacred-brown ml-1">
                                                        <Sparkles size={14} className="text-saffron" /> Select Item <span className="text-saffron">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                            className="w-full px-5 py-4 bg-white border border-saffron/10 rounded-xl text-sacred-brown focus:outline-none focus:ring-4 focus:ring-saffron/5 focus:border-saffron/20 transition-all font-bold text-base flex items-center justify-between group hover:border-saffron/30"
                                                        >
                                                            <span className="truncate">
                                                                {products.find(p => p.id === formData.productId)?.name || "Select Item"}
                                                            </span>
                                                            <ChevronDown 
                                                                size={20} 
                                                                className={cn("text-saffron/50 group-hover:text-saffron transition-all duration-300", isDropdownOpen ? "rotate-180" : "rotate-0")} 
                                                            />
                                                        </button>

                                                        <AnimatePresence>
                                                            {isDropdownOpen && (
                                                                <>
                                                                    <div 
                                                                        className="fixed inset-0 z-[120]" 
                                                                        onClick={() => setIsDropdownOpen(false)} 
                                                                    />
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                                        className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-saffron/20 rounded-2xl shadow-2xl z-[130] overflow-hidden py-2"
                                                                    >
                                                                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                                                            {products.map(p => (
                                                                                <button
                                                                                    key={p.id}
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, productId: p.id });
                                                                                        setIsDropdownOpen(false);
                                                                                    }}
                                                                                    className={cn(
                                                                                        "w-full px-5 py-3 text-left transition-all flex items-center justify-between group",
                                                                                        formData.productId === p.id 
                                                                                            ? "bg-saffron/10 text-saffron font-bold" 
                                                                                            : "text-sacred-brown hover:bg-saffron/5 hover:text-saffron"
                                                                                    )}
                                                                                >
                                                                                    <span className="text-sm sm:text-base">{p.name}</span>
                                                                                    {formData.productId === p.id && (
                                                                                        <div className="w-2 h-2 rounded-full bg-saffron shadow-[0_0_8px_rgba(233,93,36,0.5)]" />
                                                                                    )}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </motion.div>
                                                                </>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                    <div className="space-y-2.5">
                                                        <label className="flex items-center gap-2 text-[10px] font-bold tracking-[0.1em] uppercase text-sacred-brown ml-1">
                                                            <User size={14} className="text-saffron" /> Full Name <span className="text-saffron">*</span>
                                                        </label>
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Enter your name"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            className="w-full px-5 py-4 bg-white border border-saffron/10 rounded-xl text-sacred-brown placeholder:text-sacred-brown/20 focus:outline-none focus:ring-4 focus:ring-saffron/5 focus:border-saffron/20 transition-all font-bold text-base"
                                                        />
                                                    </div>

                                                    <div className="space-y-2.5">
                                                        <label className="flex items-center gap-2 text-[10px] font-bold tracking-[0.1em] uppercase text-sacred-brown ml-1">
                                                            <Phone size={14} className="text-saffron" /> Phone <span className="text-saffron">*</span>
                                                        </label>
                                                        <input
                                                            required
                                                            type="tel"
                                                            placeholder="Phone number"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full px-5 py-4 bg-white border border-saffron/10 rounded-xl text-sacred-brown placeholder:text-sacred-brown/20 focus:outline-none focus:ring-4 focus:ring-saffron/5 focus:border-saffron/20 transition-all font-bold text-base"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2.5">
                                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-[0.1em] uppercase text-sacred-brown ml-1">
                                                        <MessageSquare size={14} className="text-saffron" /> Special Intentions
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        placeholder="Tell us about the specific intention for this item..."
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        className="w-full px-5 py-4 bg-white border border-saffron/10 rounded-xl text-sacred-brown placeholder:text-sacred-brown/20 focus:outline-none focus:ring-4 focus:ring-saffron/5 focus:border-saffron/20 transition-all font-bold text-base resize-none"
                                                    />
                                                </div>

                                                <div className="pt-2">
                                                    <ShimmerButton
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        background="#e95d24"
                                                        className="w-full py-4.5 rounded-xl shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-70"
                                                    >
                                                        <div className="flex items-center justify-center gap-3">
                                                            <span className="font-display text-sm tracking-widest uppercase text-white">
                                                                {isSubmitting ? "Sending..." : "Request Item"}
                                                            </span>
                                                            {!isSubmitting && <Send size={18} className="text-white" />}
                                                        </div>
                                                    </ShimmerButton>
                                                </div>
                                                <p className="text-center text-[9px] text-black/40 uppercase tracking-[0.15em] leading-relaxed">
                                                    Our store coordinator will contact you within 24 hours to discuss the acquisition.
                                                </p>
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center text-center gap-6 py-4"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                                                <CheckCircle2 size={40} />
                                            </div>
                                            <div>
                                                <h3 className="font-display text-3xl text-sacred-brown mb-3">Thank You, {formData.name.split(' ')[0]}!</h3>
                                                <p className="font-body text-warm-umber/70 leading-relaxed max-w-xs font-bold">
                                                    Your enquiry has been received. Our team will contact you on <span className="text-saffron">{formData.phone}</span> very soon.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setIsSubmitted(false);
                                                    setSelectedProduct(null);
                                                    setFormData({ name: "", phone: "", productId: "", message: "" });
                                                }}
                                                className="text-saffron font-display text-xs tracking-widest uppercase border-b border-saffron/30 pb-1 hover:border-saffron transition-all"
                                            >
                                                Back to Store
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}