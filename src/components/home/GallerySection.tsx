"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight, Eye, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export function GallerySection({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-4 md:px-12 bg-transparent overflow-hidden">
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/home-page/gallery-section-bg.png"
          alt="Gallery Background"
          fill
          className="object-cover opacity-100"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-[#FFFBF5]/10 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <BlurFade delay={0.2}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-saffron/60" />
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-saffron font-bold">
                  Sacred Glimpses
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-sacred-brown leading-tight">
                Divine <span className="italic text-gradient-saffron font-bold">Gallery.</span>
              </h2>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <Link 
              href="/gallery"
              className="group flex items-center gap-3 px-6 py-3 border border-sacred-brown/20 text-sacred-brown rounded-none font-display text-[10px] tracking-[0.3em] uppercase hover:bg-sacred-brown hover:text-ivory transition-all duration-300"
            >
              Full Collection
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </BlurFade>
        </div>

        {/* Compact Justified Layout (Non-rounded) */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          {images.map((src, idx) => (
            <BlurFade key={src} delay={0.1 + idx * 0.05} inView className="flex-grow h-[150px] md:h-[220px] min-w-[150px]">
              <div 
                className="relative w-full h-full group cursor-pointer overflow-hidden border border-saffron/5 shadow-sm"
                onClick={() => setSelectedImage(src)}
              >
                <img 
                  src={`/gallery/${src}`} 
                  alt={`Sacred-${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with Eye Icon */}
                <div className="absolute inset-0 bg-sacred-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-3 bg-ivory/20 backdrop-blur-md rounded-full border border-white/20 text-ivory"
                  >
                    <Eye size={20} />
                  </motion.div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-sacred-brown/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-ivory/60 hover:text-ivory transition-colors z-[10000]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl max-h-full aspect-auto shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={`/gallery/${selectedImage}`} 
                alt="Enlarged view" 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-6 h-px bg-saffron" />
                <span className="font-display text-xs tracking-[0.3em] uppercase text-ivory/80">Divine Moment</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


