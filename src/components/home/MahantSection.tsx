"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Mountain, Sun, Heart } from "lucide-react";

const highlights = [
  { icon: Mountain, title: "Himalayan", subtitle: "Shamanic Currents" },
  { icon: Sun, title: "Dakshinaacharya", subtitle: "Shakta Upassak" },
  { icon: Heart, title: "Direct Grace", subtitle: "of Maa" },
];

export function MahantSection() {
  return (
    <section id="mahant" className="relative py-8 px-6 md:px-16 bg-[#f7efe5] overflow-hidden scroll-mt-24">
      {/* Background is now clean, chakra/mandala removed as requested */}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text Content */}
          <div className="flex flex-col space-y-4">
            <BlurFade delay={0.2} direction="right">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-saffron/60" />
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-saffron font-bold">
                  The Spiritual Guide
                </span>
              </div>

              <div className="space-y-2 mt-2">
                <h2 className="font-display text-4xl md:text-5xl text-sacred-brown leading-[1.1]">
                  Shri Shri <br />
                  <span className="italic text-gradient-saffron font-bold">Mahant Yogiraj</span>
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.4} direction="right">
              <div className="space-y-2 max-w-lg">
                <p className="font-display text-xl md:text-2xl text-[#6b6b6b] leading-relaxed">
                  A spiritual guide whose presence carries the ancient currents of the Himalayas.
                  Trained in the traditions of <span className="text-[#2c2c2c] font-medium">Sanatan Shakta Sadhana.</span>
                </p>
              </div>
            </BlurFade>

            {/* Decorative Divider */}
            <BlurFade delay={0.5} direction="right">
              <div className="flex items-center gap-4 w-full max-w-md">
                <div className="h-px flex-1 bg-[#f1e4d7]" />
                <div className="w-2 h-2 rotate-45 border border-[#e76f51]" />
                <div className="h-px flex-1 bg-[#f1e4d7]" />
              </div>
            </BlurFade>

            {/* Horizontal Icons (Bottom Row) - Allowed to bleed into right column */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-10 pt-2 relative z-20 w-full lg:w-[120%]">
              {highlights.map((item, index) => (
                <BlurFade key={item.title} delay={0.6 + index * 0.1} direction="up">
                  <div className="flex items-center gap-4 group whitespace-nowrap">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-white/70 border border-[#f1e4d7] group-hover:border-[#e76f51]/40 shadow-sm transition-all duration-300">
                      <item.icon className="w-8 h-8 text-[#e76f51]" />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                      <h4 className="font-body text-[13px] font-bold text-[#2c2c2c] uppercase tracking-wider leading-tight">{item.title}</h4>
                      <p className="font-body text-[11px] text-[#6b6b6b] leading-tight mt-1">{item.subtitle}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>

          {/* RIGHT: Image Block (CSS Blended to replicate design style) */}
          <BlurFade delay={0.4} direction="left" className="relative h-full min-h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Heavy CSS Masking for seamless edge blending */}
              <div
                className="relative w-full h-full scale-110"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 5%, black 40%), linear-gradient(to top, transparent 5%, black 20%, black 80%, transparent 95%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 40%), linear-gradient(to top, transparent 5%, black 20%, black 80%, transparent 95%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              >
                <Image
                  src="/images/home-page/yogiraj.png"
                  alt="Mahant Yogiraj in meditation"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-right select-none pointer-events-none drop-shadow-sm transition-opacity duration-500"
                  priority
                />
              </div>

              {/* Edge Overlays to finalize the blend into the #f7efe5 background */}
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#f7efe5] to-transparent pointer-events-none opacity-80" />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#f7efe5] to-transparent pointer-events-none opacity-80" />
              <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#f7efe5] to-transparent pointer-events-none opacity-80" />
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
