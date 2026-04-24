"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";

const traditions = [
  {
    title: "HIMALAYAN SHAMANIC TRADITIONS",
    description: "Centuries-old healing arts and spiritual currents from the sacred peaks. Where Jhankri, Kul Devata, and the spirits of the hills find their voice.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    alignment: "left"
  },
  {
    title: "SANATAN SHAKTA SADHANA",
    description: "The path of power and grace. From Kumari Puja to the intricate Navpatrika rituals, we uphold the nine forms of divine feminine energy.",
    image: "https://images.unsplash.com/photo-1620023640954-20164923e32e?q=80&w=800&auto=format&fit=crop",
    alignment: "right"
  },
];

export function TraditionSection() {
  return (
    <section className="relative py-32 bg-sacred-premium-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <BlurFade delay={0.2}>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold mb-4 block">
              ◊ Our Heritage ◊
            </span>
            <TextAnimate animation="slideUp" duration={0.8} className="font-display text-4xl md:text-5xl text-sacred-brown">
              WHERE TRADITION BREATHES
            </TextAnimate>
          </BlurFade>
        </div>

        <div className="space-y-32">
          {traditions.map((trad, idx) => (
            <div key={idx} className={cn(
              "flex flex-col gap-12 items-center",
              trad.alignment === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
            )}>
              {/* Image Card with spotlight */}
              <BlurFade delay={0.4} direction={trad.alignment === "left" ? "right" : "left"} className="w-full lg:w-3/5">
                <MagicCard className="relative aspect-[16/9] overflow-hidden rounded-3xl border-saffron/10 shadow-2xl">
                  <Image
                    src={trad.image}
                    alt={trad.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sacred-brown/60 via-transparent to-transparent" />
                </MagicCard>
              </BlurFade>

              {/* Text content */}
              <BlurFade delay={0.6} direction={trad.alignment === "left" ? "left" : "right"} className="w-full lg:w-2/5 space-y-6">
                <h3 className="font-display text-3xl text-sacred-brown leading-tight">
                  {trad.title}
                </h3>
                <div className="w-12 h-1 bg-saffron/30 rounded-full" />
                <p className="font-body text-lg text-warm-umber/70 leading-relaxed">
                  {trad.description}
                </p>
              </BlurFade>
            </div>
          ))}

          {/* Full-width final tradition */}
          <BlurFade delay={0.8} direction="up">
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1549216068-d6211028f30b?q=80&w=1200&auto=format&fit=crop"
                alt="Darjeeling Spiritual Culture"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sacred-brown/80 via-sacred-brown/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 max-w-2xl gap-4">
                <h3 className="font-display text-3xl md:text-5xl text-ivory">
                  DARJEELING SPIRITUAL CULTURE
                </h3>
                <p className="font-body text-lg md:text-xl text-ivory/80 italic">
                  "Where Buddhist serenity meets Hindu Shakti, in the eternal embrace of the mountains."
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
