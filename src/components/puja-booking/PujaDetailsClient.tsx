"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Clock, CheckCircle2, Play, X, Mail } from "lucide-react";
import { pujasData } from "@/lib/data/pujas";
import { notFound } from "next/navigation";

// Define the shape of the props coming from the server
type PujaType = {
    id: string;
    name: string;
    fullDescription: string;
    benefits: string[];
    duration: string;
    icon: any;
    image: string;
    videoUrl: string;
};

export default function PujaDetailsClient({ id }: { id: string }) {
    const puja = pujasData.find((p) => p.id === id);

    if (!puja) {
        notFound();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const Icon = puja.icon;

    return (
        <div className="pb-24">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${puja.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ivory via-black/40 to-black/60" />

                <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 pb-16">
                    <BlurFade delay={0.1}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-saffron/20 backdrop-blur-md rounded-lg border border-saffron/30">
                                <Icon className="w-8 h-8 text-saffron" />
                            </div>
                            <span className="font-body text-sm tracking-[0.3em] uppercase text-saffron font-bold drop-shadow-md">
                                Sacred Ritual
                            </span>
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl text-sacred-brown drop-shadow-xl mb-4">
                            {puja.name}
                        </h1>
                        <div className="flex items-center gap-3 bg-white/10 w-fit px-5 py-2 rounded-full backdrop-blur-md border border-sacred-brown/10">
                            <Clock className="w-5 h-5 text-sacred-brown" />
                            <span className="font-body text-sm uppercase tracking-widest text-sacred-brown font-semibold">
                                Duration: {puja.duration}
                            </span>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left Column: Description & Benefits */}
                <div>
                    <BlurFade delay={0.2}>
                        <h2 className="font-display text-3xl text-sacred-brown mb-6 border-b border-saffron/20 pb-4">
                            About the Ritual
                        </h2>
                        <p className="font-body text-lg text-warm-umber/80 leading-loose mb-10 text-justify">
                            {puja.fullDescription}
                        </p>

                        <h3 className="font-display text-2xl text-sacred-brown mb-6">
                            Spiritual Benefits
                        </h3>
                        <ul className="space-y-4 mb-12">
                            {puja.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-saffron shrink-0 mt-1" />
                                    <span className="font-body text-warm-umber/80 text-lg leading-relaxed">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full md:w-auto px-10 py-5 bg-saffron text-white rounded-xl font-display text-sm tracking-[0.2em] uppercase hover:bg-sacred-brown transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
                        >
                            <Mail size={20} />
                            Enquire About This Puja
                        </button>
                    </BlurFade>
                </div>

                {/* Right Column: Video Embed */}
                <div className="lg:pl-10">
                    <BlurFade delay={0.3}>
                        <div className="bg-white p-4 rounded-[2rem] shadow-2xl border border-saffron/10">
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center group">
                                {/* Embed YouTube or Video Player Here */}
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={puja.videoUrl}
                                    title={`${puja.name} Video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>

                                {/* Fallback if no video URL is provided yet */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                                    <Play className="w-16 h-16 text-white/50 group-hover:text-saffron transition-colors duration-300" />
                                </div>
                            </div>
                            <p className="text-center font-body text-sm text-warm-umber/50 mt-4 italic">
                                Watch the glimpse of the {puja.name} ritual.
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Enquire Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#1a110a]/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-ivory rounded-[2rem] shadow-2xl overflow-hidden border border-saffron/20"
                        >
                            <div className="p-8 md:p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <span className="font-body text-xs tracking-[0.2em] uppercase text-saffron mb-2 block">
                                            Enquiry Form
                                        </span>
                                        <h3 className="font-display text-2xl text-sacred-brown">
                                            {puja.name}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-saffron/10 rounded-full transition-colors self-start"
                                    >
                                        <X size={24} className="text-sacred-brown/40" />
                                    </button>
                                </div>

                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-1.5">
                                        <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Type your name..."
                                            className="w-full px-5 py-3.5 bg-white border border-saffron/20 rounded-xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91..."
                                            className="w-full px-5 py-3.5 bg-white border border-saffron/20 rounded-xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Message / Current Situation</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Tell us what you are facing..."
                                            className="w-full px-5 py-3.5 bg-white border border-saffron/20 rounded-xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-all resize-none"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <ShimmerButton className="w-full py-4 rounded-xl shadow-lg">
                                            <span className="font-display text-sm tracking-widest uppercase">
                                                Submit Enquiry
                                            </span>
                                        </ShimmerButton>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}