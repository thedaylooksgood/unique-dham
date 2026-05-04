"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";

import Link from "next/link";
import { ArrowLeft, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getGalleryImages } from "@/app/actions/getGalleryImages";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      const imgs = await getGalleryImages();
      setImages(imgs);
    }
    fetchImages();
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24">
        {/* Sticky background — fixed so it never scrolls */}
        <div className="fixed inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home-page/hero/banner 1.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          {/* Light warm overlay so text stays readable */}
          <div className="absolute inset-0 bg-[#FDFBF7]/30" />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFBF7] to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          
          <BlurFade delay={0.1}>
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-sacred-brown/60 hover:text-saffron transition-colors mb-8 w-fit"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-display text-sm tracking-widest uppercase">Back to Home</span>
            </Link>
          </BlurFade>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <BlurFade delay={0.2}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-saffron/60" />
                  <span className="font-body text-[10px] tracking-[0.4em] uppercase text-saffron font-bold">
                    Divine Collection
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-sacred-brown leading-tight">
                  Sacred <span className="italic text-gradient-saffron font-bold">Gallery.</span>
                </h1>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="font-body text-sacred-brown/60 max-w-md md:text-right leading-relaxed">
                A visual journey through the sacred traditions, vibrant festivals, and divine moments at Maa Unique Dham, Darjeeling.
              </p>
            </BlurFade>
          </div>

          {/* Compact Justified Layout (Non-rounded) */}
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {images.map((img, idx) => (
              <BlurFade key={img} delay={0.1 + idx * 0.02} inView className="flex-grow h-[120px] md:h-[180px] min-w-[120px]">
                <div 
                  className="relative w-full h-full group cursor-pointer overflow-hidden border border-saffron/10 shadow-sm transition-all duration-500"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={`/gallery/${img}`}
                    alt={`Sacred Moment ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-sacred-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-2 bg-ivory/20 backdrop-blur-md rounded-full border border-white/20 text-ivory">
                      <Eye size={18} />
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-sacred-brown/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-ivory/60 hover:text-ivory transition-colors z-[10000]">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={`/gallery/${selectedImage}`} 
                alt="Enlarged" 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

