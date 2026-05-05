"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  User,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  Hand
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { handleEnquiry } from "@/lib/contact";

export default function VolunteerClient() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await handleEnquiry({
      name: formData.name,
      phone: formData.phone,
      subject: "Volunteer Enquiry",
      message: "Interested in volunteering at Maa Unique Dham.",
      source: "Volunteer Seva"
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden">

      {/* --- BACKGROUND IMAGE LAYER (Exactly like Home Page Hero) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-page/hero/banner 1.png"
          alt="Sacred Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Standard Light Overlay */}
        <div className="absolute inset-0 bg-ivory/30" />
        {/* Subtle Bottom Gradient like Home Page */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent z-[1]" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-saffron/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-vermillion/10 rounded-full blur-[150px]"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Inspiration */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 text-sacred-brown"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-saffron/10 backdrop-blur-md border border-saffron/20 rounded-full w-fit">
            <Sparkles size={16} className="text-saffron" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-saffron">Seva Opportunity</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl leading-[1.1] tracking-tight">
            Serve with <span className="text-gradient-saffron italic">Devotion</span>
          </h1>

          <p className="font-body text-sacred-brown text-lg leading-relaxed max-w-md font-bold">
            Join our divine mission and become a part of the Maa Unique Dham family. Your time and energy can help spread peace and spirituality.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {[
              { icon: Heart, text: "Share your skills and passion" },
              { icon: Hand, text: "Participate in sacred events" },
              { icon: CheckCircle2, text: "Grow within a spiritual community" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-4 text-sacred-brown/80"
              >
                <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center border border-saffron/10">
                  <item.icon size={18} className="text-saffron" />
                </div>
                <span className="font-bold tracking-wide">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="bg-ivory/95 backdrop-blur-2xl border border-saffron/10 p-8 md:p-10 rounded-2xl shadow-2xl"
              >
                <div className="mb-8">
                  <h2 className="font-display text-3xl text-sacred-brown mb-2">Volunteer Enquiry</h2>
                  <p className="text-warm-umber/60 text-sm font-medium">Just leave your details and we'll reach out.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-sacred-brown ml-1">
                      <User size={14} className="text-saffron" /> Your Full Name <span className="text-saffron">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-5 bg-white border-2 border-saffron/10 rounded-xl text-sacred-brown placeholder:text-sacred-brown/30 focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron/30 transition-all font-bold text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-sacred-brown ml-1">
                      <Phone size={14} className="text-saffron" /> Phone Number <span className="text-saffron">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-5 bg-white border-2 border-saffron/10 rounded-xl text-sacred-brown placeholder:text-sacred-brown/30 focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron/30 transition-all font-bold text-lg"
                    />
                  </div>

                  <div className="pt-4">
                    <ShimmerButton
                      type="submit"
                      disabled={isSubmitting}
                      background="#e95d24"
                      className="w-full py-5 rounded-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="font-display text-sm tracking-widest uppercase text-white">
                          {isSubmitting ? "Sending..." : "Submit Enquiry"}
                        </span>
                        {!isSubmitting && <Send size={18} className="text-white" />}
                      </div>
                    </ShimmerButton>
                  </div>

                  <p className="text-center text-[10px] text-black/40 uppercase tracking-[0.15em] leading-relaxed">
                    By submitting, you agree to let our temple coordinators contact you regarding volunteering opportunities.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-ivory border border-saffron/20 p-12 rounded-2xl shadow-2xl flex flex-col items-center text-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                  <CheckCircle2 size={40} />
                </div>
                <div>
                  <h3 className="font-display text-3xl text-sacred-brown mb-3">Thank You, {formData.name.split(' ')[0]}!</h3>
                  <p className="font-body text-warm-umber/70 leading-relaxed max-w-xs">
                    Your enquiry has been received. Our team will contact you on <span className="text-saffron font-bold">{formData.phone}</span> very soon.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-saffron font-display text-xs tracking-widest uppercase border-b border-saffron/30 pb-1 hover:border-saffron transition-all"
                >
                  Send Another Enquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

    </div>
  );
}
