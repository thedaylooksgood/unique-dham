"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { SacredDivider } from "@/components/ui/SacredDivider";
import { Sparkles, Heart } from "lucide-react";

export function IntroSection() {
  return (
    <section className="relative py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Column */}
          <BlurFade delay={0.2} direction="right">
            <div className="relative group">
              <ShineBorder
                className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-transparent md:shadow-2xl"
                shineColor={["#E8860C", "#C41E3A", "#D4443B"]}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582555172866-9137e24683fb?q=80&w=800&auto=format&fit=crop"
                    alt="Immortal presence of Maa"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent opacity-60" />
                </div>
              </ShineBorder>
              {/* Decorative behind-image border */}
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-saffron/10 rounded-3xl -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            </div>
          </BlurFade>

          {/* Content Column */}
          <div className="flex flex-col gap-8">
            <BlurFade delay={0.4} direction="left">
              <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold">
                ✧ Sacred Invocation ✧
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-sacred-brown leading-tight mt-4">
                "Not just a place. 
                <br />
                Not just a website. 
                <br />
                This is a <span className="italic text-gradient-saffron font-bold">living presence</span> of Maa."
              </h2>
            </BlurFade>

            <BlurFade delay={0.6} direction="left">
              <p className="font-body text-lg text-warm-umber/70 leading-relaxed max-w-lg mb-8">
                In the mystical air of Darjeeling, devotion transcends physical boundaries. 
                We invite you to experience the divine through a portal of pure intention.
              </p>
            </BlurFade>

            <div className="grid sm:grid-cols-2 gap-6">
              <BlurFade delay={0.7} direction="up">
                <MagicCard className="flex flex-col p-8 gap-4 bg-warm-glow/30 border-saffron/5 shadow-sacred-warm h-full">
                  <div className="p-3 bg-saffron/10 rounded-2xl w-fit">
                    <Sparkles className="w-6 h-6 text-saffron" />
                  </div>
                  <h3 className="font-display text-xl text-sacred-brown">Ritual Experience</h3>
                  <p className="font-body text-sm text-warm-umber/60">
                    Every ritual is not performed—it is experienced through ancient vibrational currents.
                  </p>
                </MagicCard>
              </BlurFade>
              <BlurFade delay={0.8} direction="up">
                <MagicCard className="flex flex-col p-8 gap-4 bg-warm-glow/30 border-saffron/5 shadow-sacred-warm h-full">
                  <div className="p-3 bg-vermillion/10 rounded-2xl w-fit">
                    <Heart className="w-6 h-6 text-vermillion" />
                  </div>
                  <h3 className="font-display text-xl text-sacred-brown">Divine Feeling</h3>
                  <p className="font-body text-sm text-warm-umber/60">
                    Every prayer is not spoken—it is felt deep within the sanctuary of the heart.
                  </p>
                </MagicCard>
              </BlurFade>
            </div>
          </div>
        </div>

        <BlurFade delay={1.0}>
          <SacredDivider />
        </BlurFade>
      </div>
    </section>
  );
}
