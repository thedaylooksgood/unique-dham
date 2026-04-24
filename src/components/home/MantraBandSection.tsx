"use client";

import { Marquee } from "@/components/ui/marquee";
import { Bell, Flower2, Heart, Sparkles } from "lucide-react";

const tickerItems = [
  { icon: <Bell className="w-4 h-4 text-saffron" />, text: "Aarti at 6:30 PM", highlight: true },
  { icon: <Flower2 className="w-4 h-4 text-vermillion" />, text: "Navratri Special Puja Open", highlight: false },
  { icon: <Heart className="w-4 h-4 text-saffron" />, text: "Jai Maa Durga", highlight: false },
  { icon: <Sparkles className="w-4 h-4 text-saffron" />, text: "Daily Darshan: 5:00 AM - 9:00 PM", highlight: true },
  { icon: <Bell className="w-4 h-4 text-saffron" />, text: "Evening Bhajan: 7:15 PM", highlight: false },
];

export function MantraBandSection() {
  return (
    <div className="relative w-full border-y border-saffron/15 bg-transparent overflow-hidden group">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-saffron/5 via-transparent to-saffron/5 opacity-50" />
      
      <Marquee pauseOnHover className="py-4 md:py-5 [--gap:3rem]">
        {tickerItems.map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 px-6 border-r border-saffron/10 last:border-r-0"
          >
            <div className="p-1.5 bg-saffron/10 rounded-full group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <span className={`font-body text-sm md:text-base tracking-wide whitespace-nowrap ${
              item.highlight ? "text-sacred-brown font-semibold" : "text-sacred-brown/70"
            }`}>
              {item.text}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-saffron/20" />
          </div>
        ))}
      </Marquee>

      {/* Modern Accents */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-ivory via-ivory/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-ivory via-ivory/80 to-transparent z-10 pointer-events-none" />
      
      {/* Subtle Glow Bar */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-saffron/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
    </div>
  );
}




