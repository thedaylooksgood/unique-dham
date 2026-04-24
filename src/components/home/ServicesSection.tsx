"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShineBorder } from "@/components/ui/shine-border";
import { Flame, Users, ShoppingBag, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { 
    icon: Flame, 
    title: "ONLINE PUJA & SEVA BOOKING", 
    description: "Book sacred rituals performed at the Dham, streamed live to your presence anywhere in the world. Experience the authentic Himalayan vibration from your home.",
    colSpan: "lg:col-span-3 lg:row-span-2",
    href: "/puja-booking",
    color: "text-saffron",
    bg: "bg-saffron/5",
    isFeatured: true
  },
  { 
    icon: Users, 
    title: "1-ON-1 SPIRITUAL GUIDANCE", 
    description: "Personal sessions with Mahant Yogiraj to align your path with divine purpose and ancient wisdom.",
    colSpan: "lg:col-span-2",
    href: "/guidance",
    color: "text-vermillion",
    bg: "bg-vermillion/5"
  },
  { 
    icon: ShoppingBag, 
    title: "SACRED STORE", 
    description: "Rudraksha, Yantra, and Sindoor energized with sankalp at the holy Dham of Darjeeling.",
    colSpan: "lg:col-span-2",
    href: "/sacred-store",
    color: "text-temple-red",
    bg: "bg-temple-red/5"
  },
  { 
    icon: Sparkles, 
    title: "PERSONALIZED EXPERIENCE", 
    description: "Custom rituals designed specifically for your intentions and unique life circumstances.",
    colSpan: "lg:col-span-4",
    href: "/puja-booking",
    color: "text-saffron",
    bg: "bg-saffron/5"
  },
];

const metrics = [
  { value: 500, label: "Pujas Performed", suffix: "+" },
  { value: 9, label: "Divine Forms", suffix: "" },
  { value: 3, label: "Spiritual Traditions", suffix: "" },
];

export function ServicesSection() {
  return (
    <section className="relative py-32 bg-sacred-pink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <BlurFade delay={0.2}>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold mb-4 block">
              ◊ Sacred Offerings ◊
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-sacred-brown">
              WHAT WE OFFER
            </h2>
            <p className="font-body text-lg text-warm-umber/60 mt-6 max-w-2xl mx-auto">
              Connect with the divine through our range of sacred services. Each ritual is a portal to the eternal presence of Maa.
            </p>
          </BlurFade>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-24">
          {services.map((service, idx) => (
            <BlurFade 
              key={service.title} 
              delay={0.3 + idx * 0.1} 
              className={cn("h-full", service.colSpan)}
            >
              <Link href={service.href} className="group h-full block">
                {service.isFeatured ? (
                  <ShineBorder
                    className="relative h-full w-full overflow-hidden rounded-3xl bg-transparent shadow-xl p-0"
                    shineColor={["#E8860C", "#C41E3A", "#D4443B"]}
                  >
                    <CardContent service={service} />
                  </ShineBorder>
                ) : (
                  <MagicCard className="h-full rounded-3xl border-saffron/5 bg-transparent shadow-sacred-warm hover:shadow-2xl transition-all duration-500">
                    <CardContent service={service} />
                  </MagicCard>
                )}
              </Link>
            </BlurFade>
          ))}
        </div>

        {/* Dynamic Metrics */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
          {metrics.map((metric, idx) => (
            <BlurFade key={metric.label} delay={0.7 + idx * 0.1}>
              <div className="text-center group">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <NumberTicker 
                    value={metric.value} 
                    className="font-display text-5xl md:text-6xl text-saffron"
                  />
                  <span className="font-display text-3xl text-saffron/60">{metric.suffix}</span>
                </div>
                <span className="font-body text-xs tracking-[0.3em] uppercase text-warm-umber/40 font-bold transition-colors group-hover:text-saffron/60">
                  {metric.label}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardContent({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;
  return (
    <div className="flex flex-col h-full p-8 lg:p-10 justify-between">
      <div>
        <div className={cn("p-4 rounded-2xl w-fit mb-8 transition-transform group-hover:scale-110 duration-500", service.bg)}>
          <Icon className={cn("w-8 h-8", service.color)} />
        </div>
        <h3 className="font-display text-2xl text-sacred-brown mb-4 tracking-tight">
          {service.title}
        </h3>
        <p className="font-body text-base text-warm-umber/60 leading-relaxed max-w-sm">
          {service.description}
        </p>
      </div>
      
      <div className="flex items-center gap-2 mt-12 text-saffron/60 group-hover:text-saffron transition-colors">
        <span className="font-display text-xs tracking-widest uppercase">Explore More</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </div>
  );
}
