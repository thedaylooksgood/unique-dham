"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Gem, Zap, Sparkles, MapPin, X, ShoppingBag, Info, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "rudraksha-1",
    name: "1 Mukhi Rudraksha",
    description: "The supreme Rudraksha. Represents the pure consciousness of Shiva and the summit of devotion.",
    category: "Rudraksha",
    icon: Gem,
    color: "text-saffron",
    bg: "bg-saffron/10"
  },
  {
    id: "rudraksha-5",
    name: "5 Mukhi Rudraksha",
    description: "The most powerful general purpose Rudraksha. Represents the five elements and Kalagni Shiva.",
    category: "Rudraksha",
    icon: Gem,
    color: "text-vermillion",
    bg: "bg-vermillion/10"
  },
  {
    id: "rudraksha-21",
    name: "21 Mukhi Rudraksha",
    description: "Extremely rare divine manifesting energy. Represents all the powers of the universe.",
    category: "Rudraksha",
    icon: Gem,
    color: "text-temple-red",
    bg: "bg-temple-red/10"
  },
  {
    id: "yantra-durga",
    name: "Durga Yantra",
    description: "Energized gold-polished yantra for protection, courage, and daily Shakti invocation.",
    category: "Yantra",
    icon: Zap,
    color: "text-saffron",
    bg: "bg-saffron/10"
  },
  {
    id: "yantra-lakshmi",
    name: "Lakshmi Yantra",
    description: "Vibrational currents of Maa Lakshmi designed to attract wealth, abundance, and prosperity.",
    category: "Yantra",
    icon: Zap,
    color: "text-vermillion",
    bg: "bg-vermillion/10"
  },
  {
    id: "sindoor",
    name: "Sacred Sindoor",
    description: "Vermillion energized with sankalp at the holy Dham. The vibrant color of Shakti presence.",
    category: "Puja Samagri",
    icon: Sparkles,
    color: "text-temple-red",
    bg: "bg-temple-red/10"
  },
  {
    id: "mala-crystal",
    name: "Crystal Mala",
    description: "108 pure quartz beads for mantra japa. Connects you to high-frequency spiritual states.",
    category: "Mala",
    icon: Heart,
    color: "text-saffron",
    bg: "bg-saffron/10"
  },
  {
    id: "mala-rudraksha",
    name: "Rudraksha Mala",
    description: "Authentic 108 Rudraksha beads for deep Himalayan sadhana and protection.",
    category: "Mala",
    icon: Heart,
    color: "text-vermillion",
    bg: "bg-vermillion/10"
  },
  {
    id: "dhoop-cones",
    name: "Dhoop Cones",
    description: "Sacred incense blend made from Himalayan herbs. Purifies space and invites divine calm.",
    category: "Puja Samagri",
    icon: Sparkles,
    color: "text-temple-red",
    bg: "bg-temple-red/10"
  },
];

export default function SacredStorePage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const activeProduct = products.find((p) => p.id === selectedProduct);

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
                  ◊ Energized Offerings ◊
                </span>
                <h1 className="font-display text-5xl md:text-6xl text-sacred-brown tracking-tight">
                  SACRED <span className="text-gradient-saffron italic">STORE</span>
                </h1>
                <p className="font-body text-lg text-warm-umber/60 mt-6 max-w-2xl mx-auto leading-relaxed">
                  Each item carries sankalp, not just substance. Energized at the Dham in the misty peaks 
                  of Darjeeling with specific intentions and pure Vedic current.
                </p>
              </BlurFade>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {products.map((product, index) => (
                <BlurFade key={product.id} delay={0.3 + index * 0.05}>
                  <div 
                    onClick={() => setSelectedProduct(product.id)}
                    className="h-full cursor-pointer"
                  >
                    <MagicCard 
                      className="h-full p-8 bg-background border-saffron/5 rounded-[2.5rem] shadow-sacred-warm flex flex-col justify-between group hover:shadow-2xl transition-all duration-500"
                    >
                    <div>
                      <div className={cn("p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110", product.bg)}>
                        <product.icon className={cn("w-7 h-7", product.color)} />
                      </div>
                      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-saffron font-bold">
                        {product.category}
                      </span>
                      <h3 className="font-display text-2xl text-sacred-brown mt-2 mb-3 group-hover:text-saffron transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-body text-sm text-warm-umber/60 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-saffron/60 group-hover:text-saffron transition-colors">
                      <span className="font-display text-xs tracking-widest uppercase">Select Item</span>
                      <ShoppingBag className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </MagicCard>
                </div>
              </BlurFade>
              ))}
            </div>

            {/* Mahant Quote Callout */}
            <BlurFade delay={0.8}>
               <div className="max-w-3xl mx-auto p-12 lg:p-16 bg-parchment rounded-[3rem] border border-saffron/10 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Info className="w-40 h-40 text-saffron rotate-12" />
                  </div>
                  <p className="font-body text-xl md:text-2xl text-sacred-brown italic leading-relaxed mb-8 relative z-10">
                    "These are not mere objects. Each carries the living presence of Maa. 
                    When you hold it, She is with you, guiding your every breath in the hills of your own heart."
                  </p>
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-10 h-1 bg-saffron/40 mb-2 rounded-full" />
                    <span className="font-display text-lg text-gradient-saffron uppercase tracking-widest">
                      — MAHANT YOGIRAJ
                    </span>
                  </div>
               </div>
            </BlurFade>

            {/* Product Inquiry Modal */}
            <AnimatePresence>
              {selectedProduct && activeProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProduct(null)}
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
                          <div className={cn("p-3 rounded-xl", activeProduct.bg)}>
                            <activeProduct.icon className={cn("w-6 h-6", activeProduct.color)} />
                          </div>
                          <div>
                            <h3 className="font-display text-2xl text-sacred-brown leading-none mb-1">
                              {activeProduct.name}
                            </h3>
                            <span className="font-body text-[10px] tracking-widest uppercase text-saffron">
                              {activeProduct.category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedProduct(null)}
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
                             <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Location</label>
                             <input
                               type="text"
                               placeholder="City, Country"
                               className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30"
                             />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="font-body text-xs tracking-widest uppercase text-warm-umber/60 ml-1">Intention / Sankalp</label>
                          <textarea
                            rows={3}
                            placeholder="How do you wish for this item to serve your path?"
                            className="w-full px-6 py-4 bg-background border border-saffron/10 rounded-2xl text-sacred-brown placeholder:text-warm-umber/30 resize-none"
                          />
                        </div>

                        <div className="pt-4">
                          <ShimmerButton className="w-full py-5 rounded-2xl shadow-xl">
                            <span className="font-display text-base tracking-widest uppercase">
                              Request Item
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