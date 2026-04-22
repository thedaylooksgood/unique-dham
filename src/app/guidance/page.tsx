"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Mountain, Sparkles, Heart, Compass, Moon, Sun, X, Calendar, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const guidanceTypes = [
  {
    id: "life-obstacles",
    title: "Life Obstacles",
    description: "Navigate karmic challenges and find clarity in difficult times through traditional spiritual foresight.",
    duration: "45 min",
    icon: Compass,
    color: "text-saffron",
    bg: "bg-saffron/10"
  },
  {
    id: "shakti-sadhana",
    title: "Shakti Sadhana",
    description: "Deep spiritual practices to awaken and channel divine feminine energy rooted in Himalayan traditions.",
    duration: "60 min",
    icon: Moon,
    color: "text-vermillion",
    bg: "bg-vermillion/10"
  },
  {
    id: "energy-alignment",
    title: "Energy Alignment",
    description: "Balance your chakras and align with your highest purpose through vibrational currents of Maa.",
    duration: "45 min",
    icon: Sun,
    color: "text-temple-red",
    bg: "bg-temple-red/10"
  },
];

export default function GuidancePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const activeType = guidanceTypes.find((t) => t.id === selectedType);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 bg-ivory">
        {/* Header Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <BlurFade delay={0.2}>
                <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold mb-4 block">
                  ◊ Direct Connection ◊
                </span>
                <h1 className="font-display text-5xl md:text-6xl text-sacred-brown tracking-tight">
                  SESSIONS WITH <span className="text-gradient-saffron italic">MAHANT YOGIRAJ</span>
                </h1>
                <p className="font-body text-lg text-warm-umber/60 mt-6 max-w-2xl mx-auto leading-relaxed">
                  Receive personalized guidance rooted in ancient Himalayan wisdom. 
                  Video call or voice—the energy flows regardless of physical distance.
                </p>
              </BlurFade>
            </div>

            {/* Selection Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
              {guidanceTypes.map((type, index) => (
                <BlurFade key={type.id} delay={0.3 + index * 0.1}>
                  <div 
                    onClick={() => setSelectedType(type.id)}
                    className="h-full cursor-pointer"
                  >
                    <MagicCard 
                      className="h-full p-10 bg-background border-saffron/5 rounded-[2.5rem] shadow-sacred-warm flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500"
                    >
                    <div className={cn("p-5 rounded-[1.5rem] mb-8 transition-transform group-hover:scale-110", type.bg)}>
                      <type.icon className={cn("w-8 h-8", type.color)} />
                    </div>
                    <h3 className="font-display text-2xl text-sacred-brown mb-4 group-hover:text-saffron transition-colors">
                      {type.title}
                    </h3>
                    <p className="font-body text-base text-warm-umber/60 leading-relaxed mb-6">
                      {type.description}
                    </p>
                    <div className="flex items-center gap-2 px-4 py-2 bg-saffron/5 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-saffron" />
                      <span className="font-body text-xs uppercase tracking-widest text-saffron font-bold">
                        {type.duration} Session
                      </span>
                    </div>
                  </MagicCard>
                </div>
              </BlurFade>
              ))}
            </div>

            {/* About the Sessions */}
            <BlurFade delay={0.6}>
              <div className="relative grid lg:grid-cols-2 gap-16 items-center p-12 lg:p-20 bg-parchment rounded-[3rem] overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <h2 className="font-display text-3xl md:text-4xl text-sacred-brown">
                    THE SACRED ENCOUNTER
                  </h2>
                  <p className="font-body text-lg text-warm-umber/70 leading-relaxed">
                    Each session is more than a conversation; it is a sacred encounter. 
                    Mahant Yogiraj does not merely advise—he channels the energy and foresight 
                    needed for your specific transformation.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Receive sankalp-specific guidance",
                      "Clear Karmic obstacles & blockages",
                      "Connect with your Ishta Devata",
                      "Transform your personal sadhana path"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-4 group">
                        <div className="w-2 h-2 rounded-full bg-saffron transition-all group-hover:scale-150" />
                        <span className="font-body text-sacred-brown/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative group perspective-1000 lg:h-[400px]">
                  <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-saffron/20 via-transparent to-vermillion/10" />
                    <div className="h-full w-full flex items-center justify-center bg-ivory">
                       <Mountain className="w-40 h-40 text-saffron/10 animate-pulse" />
                    </div>
                    <BorderBeam size={300} duration={15} colorFrom="#E8860C" colorTo="#C41E3A" />
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Booking Modal */}
            <AnimatePresence>
              {selectedType && activeType && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedType(null)}
                    className="absolute inset-0 bg-sacred-brown/40 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-ivory rounded-[2.5rem] shadow-2xl overflow-hidden"
                  >
                    <div className="p-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className={cn("p-3 rounded-xl", activeType.bg)}>
                            <activeType.icon className={cn("w-6 h-6", activeType.color)} />
                          </div>
                          <h3 className="font-display text-3xl text-sacred-brown">
                            {activeType.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedType(null)}
                          className="p-2 hover:bg-saffron/5 rounded-full transition-colors"
                        >
                          <X size={24} className="text-sacred-brown/40" />
                        </button>
                      </div>

                      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                           <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Your Full Name</label>
                          <input
                            type="text"
                            placeholder="Type your name..."
                            className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Email</label>
                             <input
                               type="email"
                               placeholder="your@email.com"
                               className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">WhatsApp</label>
                             <input
                               type="tel"
                               placeholder="+91..."
                               className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30"
                             />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Divine Inquiry</label>
                          <textarea
                            rows={3}
                            placeholder="What do you wish to clarify with the Mahant?"
                            className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 resize-none"
                          />
                        </div>

                        <div className="pt-4">
                          <ShimmerButton className="w-full py-5 rounded-2xl shadow-xl">
                            <span className="font-display text-base tracking-widest uppercase">
                              Request Session
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
        </section>
      </main>
      <div className="h-20 bg-ivory" />
      <Footer />
    </>
  );
}
