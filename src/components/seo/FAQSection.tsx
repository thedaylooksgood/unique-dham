"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonLd } from "./JsonLd";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQSection({ items, title = "Frequently Asked Questions", className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section className={cn("py-20 bg-ivory/50", className)}>
      <JsonLd data={faqSchema} />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-saffron" />
            <span className="font-body text-xs tracking-[0.4em] uppercase text-saffron font-bold">
              Clarifying the Path
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-sacred-brown tracking-tight">
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-saffron/10 rounded-3xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
              >
                <span className="font-display text-lg md:text-xl text-sacred-brown pr-8">
                  {item.question}
                </span>
                <div className="shrink-0 w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-saffron transition-transform">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-10">
                      <div className="w-full h-px bg-saffron/5 mb-6" />
                      <p className="font-body text-warm-umber/80 leading-relaxed text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
