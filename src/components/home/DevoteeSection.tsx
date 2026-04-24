"use client";

import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "R. Kumar",
    location: "Delhi",
    text: "The energy during the online puja was palpable. It felt as if I was standing right at the Dham in Darjeeling."
  },
  {
    name: "S. Sharma",
    location: "Mumbai",
    text: "Mahant Yogiraj's guidance helped me find clarity during my darkest times. A truly divine presence."
  },
  {
    name: "A. Mukherjee",
    location: "Kolkata",
    text: "Maa Unique Dham is more than a temple; it's a sanctuary for the soul. The rituals are performed with such purity."
  },
  {
    name: "P. Singh",
    location: "London",
    text: "Even miles away, the connection I feel to Maa through this platform is incredible. Jai Maa Durga!"
  },
  {
    name: "M. Das",
    location: "Guwahati",
    text: "The sacred store items carry a powerful vibration. My home feels peaceful and energized."
  },
  {
    name: "D. Kapoor",
    location: "Bangalore",
    text: "A blessing to have found this spiritual path. The traditions are upheld with immense integrity."
  }
];

export function DevoteeSection() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <BlurFade delay={0.2}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron font-bold mb-4 block">
            ◊ Devotee Experiences ◊
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-sacred-brown">
            VOICES OF THE FAITHFUL
          </h2>
        </BlurFade>
      </div>

      <div className="flex flex-col gap-6">
        {/* Row 1 */}
        <Marquee pauseOnHover className="[--duration:60s] py-4">
          {testimonials.concat(testimonials).map((t, idx) => (
            <TestimonialCard key={idx} testimonial={t} />
          ))}
        </Marquee>

        {/* Row 2 - Reverse */}
        <Marquee reverse pauseOnHover className="[--duration:70s] py-4">
          {testimonials.concat(testimonials).map((t, idx) => (
            <TestimonialCard key={idx} testimonial={t} />
          ))}
        </Marquee>
      </div>

      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-sacred-orange to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-sacred-orange to-transparent pointer-events-none" />
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="px-4">
      <MagicCard className="w-[350px] md:w-[450px] p-8 bg-warm-glow/5 border-saffron/5 rounded-3xl shadow-sacred-warm flex flex-col gap-6 group hover:translate-y-[-5px] transition-all duration-500">
        <div className="p-3 bg-saffron/10 rounded-full w-fit">
          <Quote className="w-4 h-4 text-saffron" />
        </div>
        <p className="font-body text-lg text-warm-umber/80 leading-relaxed italic">
          "{testimonial.text}"
        </p>
        <div className="flex flex-col">
          <span className="font-display text-base text-sacred-brown">
            — {testimonial.name}
          </span>
          <span className="font-body text-xs uppercase tracking-widest text-saffron/60">
            {testimonial.location}
          </span>
        </div>
      </MagicCard>
    </div>
  );
}
