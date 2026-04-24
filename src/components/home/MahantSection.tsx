"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { TextAnimate } from "@/components/ui/text-animate";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Mountain, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const highlights = [
  { icon: Mountain, title: "Himalayan Shamanic Currents", color: "text-saffron" },
  { icon: Sparkles, title: "Dakshinacharya Shakta Upasak", color: "text-vermillion" },
  { icon: Heart, title: "Direct Grace of Maa", color: "text-temple-red" },
];

export function MahantSection() {
  return (
    <section id="mahant" className="relative py-32 bg-parchment/80 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L0 0l30 30 30-30L30 30z' fill='%236B4C3B' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <BlurFade delay={0.2}>
            <div className="flex items-center justify-center mb-6">
              <div className="group rounded-full border border-saffron/20 bg-saffron/5 px-4 py-1 transition-all ease-in hover:bg-saffron/10">
                <AnimatedShinyText className="inline-flex items-center justify-center font-body text-xs font-semibold tracking-[0.2em] uppercase text-saffron">
                  <span>◊ THE SPIRITUAL GUIDE ◊</span>
                </AnimatedShinyText>
              </div>
            </div>
            <TextAnimate animation="slideUp" duration={0.8} className="font-display text-4xl md:text-5xl text-sacred-brown">
              SHRI SHRI MAHANT YOGIRAJ
            </TextAnimate>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Large portrait image with BorderBeam replaced by Lottie */}
          <BlurFade delay={0.4} direction="right" className="lg:col-span-2">
            <div className="relative group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-transparent shadow-2xl flex items-center justify-center p-4">
                <DotLottieReact
                  src="/images/Indian Yogi.lottie"
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
                <BorderBeam size={250} duration={12} delay={9} colorFrom="#E8860C" colorTo="#C41E3A" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-saffron/20 rounded-2xl -z-10" />
            </div>
          </BlurFade>

          <div className="lg:col-span-3 space-y-10">
            <BlurFade delay={0.6} direction="left">
              <div className="space-y-6">
                <p className="font-body text-xl text-warm-umber leading-relaxed italic border-l-4 border-saffron/20 pl-6">
                  "A spiritual guide whose presence carries the ancient currents of the Himalayas. 
                  Trained in the traditions of Sanatan Shakta Sadhana, he bridges the gap between 
                  ancient wisdom and modern seekers."
                </p>
                <p className="font-body text-lg text-warm-umber/70 leading-relaxed">
                  For over decades, Mahant Yogiraj has served as a conduit for the divine Shakti, 
                  bringing the sanctity of Darjeeling's hills to hearts across the globe through 
                  rigorous sadhana and unwavering devotion.
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <BlurFade key={item.title} delay={0.7 + index * 0.1} direction="up">
                  <div className="flex items-center gap-6 p-6 bg-transparent rounded-2xl border border-saffron/5 shadow-sm transition-all hover:translate-x-2 hover:shadow-sacred-warm">
                    <div className={cn("p-4 rounded-xl bg-opacity-10", item.color === 'text-saffron' ? 'bg-saffron' : item.color === 'text-vermillion' ? 'bg-vermillion' : 'bg-temple-red')}>
                      <item.icon className={cn("w-6 h-6", item.color)} />
                    </div>
                    <span className="font-display text-lg text-sacred-brown">{item.title}</span>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
