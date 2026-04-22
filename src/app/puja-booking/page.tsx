"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Flame, Flower2, Users, Coins, Gem, Zap, X, Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const pujas = [
  {
    id: "durga-puja",
    name: "Durga Puja",
    description: "The most sacred worship of Maa Durga, performed over nine nights with complete Shodashopachar rituals and deep invocation.",
    duration: "9 days",
    price: "₹11,000 - ₹51,000",
    icon: Flower2,
    color: "text-saffron",
    bg: "bg-saffron/10"
  },
  {
    id: "kumari-puja",
    name: "Kumari Puja",
    description: "Worship of the divine virgin, invoking the pure Shakti within a young girl as the living deity of the hills.",
    duration: "1 day",
    price: "₹5,100 - ₹11,000",
    icon: Gem,
    color: "text-vermillion",
    bg: "bg-vermillion/10"
  },
  {
    id: "navratri",
    name: "Navratri Anusthan",
    description: "Nine nights of intense sadhana and Vedic chanting dedicated to the nine forms of Maa Durga.",
    duration: "9 days",
    price: "₹9,000 - ₹21,000",
    icon: Flame,
    color: "text-temple-red",
    bg: "bg-temple-red/10"
  },
  {
    id: "lakshmi-puja",
    name: "Lakshmi Puja",
    description: "Sacred invocation of Maa Lakshmi for wealth, prosperity, and spiritual abundance in your household.",
    duration: "1 day",
    price: "₹3,100 - ₹7,100",
    icon: Coins,
    color: "text-saffron",
    bg: "bg-saffron/10"
  },
  {
    id: "ganesh-puja",
    name: "Ganesh Puja",
    description: "Removing obstacles and invoking the Lord of New Beginnings with traditional Himalayan shamanic currents.",
    duration: "1 day",
    price: "₹2,100 - ₹5,100",
    icon: Zap,
    color: "text-vermillion",
    bg: "bg-vermillion/10"
  },
  {
    id: "shiva-puja",
    name: "Shiva Puja",
    description: "Worship of the supreme consciousness. Rudra Abhishek performed with pure mountain spring water and sacred offerings.",
    duration: "1 day",
    price: "₹5,100 - ₹11,000",
    icon: Users,
    color: "text-temple-red",
    bg: "bg-temple-red/10"
  },
];

export default function PujaBookingPage() {
  const [selectedPuja, setSelectedPuja] = useState<string | null>(null);

  const activePuja = pujas.find((p) => p.id === selectedPuja);

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
                  ◊ Sacred Rituals ◊
                </span>
                <h1 className="font-display text-5xl md:text-6xl text-sacred-brown tracking-tight">
                  BOOK YOUR <span className="text-gradient-saffron italic">PUJA</span>
                </h1>
                <p className="font-body text-lg text-warm-umber/60 mt-6 max-w-2xl mx-auto leading-relaxed">
                  Every puja at Maa Unique Dham is performed with pure intention and complete sankalp. 
                  Experience the divine vibration through our live sessions or receive the prasad at your doorstep.
                </p>
              </BlurFade>
            </div>

            {/* Puja Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pujas.map((puja, index) => (
                <BlurFade key={puja.id} delay={0.3 + index * 0.1}>
                  <MagicCard className="h-full p-8 bg-background border-saffron/5 rounded-[2rem] shadow-sacred-warm flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
                    <div>
                      <div className={cn("p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110", puja.bg)}>
                        <puja.icon className={cn("w-7 h-7", puja.color)} />
                      </div>
                      <h3 className="font-display text-2xl text-sacred-brown mb-3 group-hover:text-saffron transition-colors">
                        {puja.name}
                      </h3>
                      <p className="font-body text-sm text-warm-umber/60 leading-relaxed mb-6">
                        {puja.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between py-4 border-y border-saffron/5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-saffron/40" />
                          <span className="font-body text-xs uppercase tracking-widest text-warm-umber/60">
                            {puja.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-saffron/40" />
                          <span className="font-display text-sm text-sacred-brown/80">
                            {puja.price}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedPuja(puja.id)}
                        className="w-full py-4 bg-ivory border border-saffron/20 rounded-xl font-display text-xs tracking-[0.2em] uppercase text-sacred-brown hover:bg-saffron hover:text-ivory hover:border-saffron transition-all duration-300 active:scale-95"
                      >
                        Book Now
                      </button>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedPuja && activePuja && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPuja(null)}
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
                      <div className={cn("p-3 rounded-xl", activePuja.bg)}>
                        <activePuja.icon className={cn("w-6 h-6", activePuja.color)} />
                      </div>
                      <h3 className="font-display text-3xl text-sacred-brown">
                        {activePuja.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedPuja(null)}
                      className="p-2 hover:bg-saffron/5 rounded-full transition-colors"
                    >
                      <X size={24} className="text-sacred-brown/40" />
                    </button>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                       <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Type your name..."
                        className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Your Sankalp / Intention</label>
                      <textarea
                        rows={3}
                        placeholder="What do you wish to manifest?"
                        className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <ShimmerButton className="w-full py-5 rounded-2xl shadow-xl">
                        <span className="font-display text-base tracking-widest uppercase">
                          Confirm Booking
                        </span>
                      </ShimmerButton>
                    </div>
                  </form>
                </div>
                
                <div className="bg-saffron/5 p-6 text-center border-t border-saffron/10">
                  <p className="font-body text-xs text-warm-umber/40 italic">
                    "Every ritual contributes to the maintenance of the holy Dham."
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <div className="h-20 bg-ivory" />
      <Footer />
    </>
  );
}
