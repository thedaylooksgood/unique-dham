"use client";

import { BlurFade } from "@/components/ui/blur-fade";

export function CultureSection() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <BlurFade delay={0.2}>
          <div className="relative w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-sacred-brown group">
            {/* Background Video Layer - High Quality Focus */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
                style={{ backgroundImage: 'url(https://i.ytimg.com/vi/90raA41jJHA/maxresdefault.jpg)' }}
              />
              <iframe
                width="1920"
                height="1080"
                src="https://www.youtube.com/embed/90raA41jJHA?autoplay=1&mute=1&loop=1&playlist=90raA41jJHA&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1&disablekb=1&fs=0&vq=hd1080&hd=1"
                title="Darjeeling Spiritual Culture"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ 
                  width: '130%', 
                  height: '130%',
                  minWidth: '100%',
                  minHeight: '100%',
                  objectFit: 'cover'
                }}
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>

            {/* Transparent Blocker Layer */}
            <div className="absolute inset-0 z-20 bg-transparent pointer-events-auto" />

            {/* Subtle Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-sacred-brown/60 via-transparent to-transparent pointer-events-none z-10" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 max-w-2xl gap-4 z-10">
              <h3 className="font-display text-4xl md:text-6xl text-ivory uppercase leading-tight drop-shadow-2xl">
                DARJEELING <br />
                <span className="text-ivory/90">SPIRITUAL CULTURE</span>
              </h3>
              <p className="font-body text-lg md:text-xl text-ivory/80 italic leading-relaxed max-w-xl drop-shadow-lg">
                "Where Buddhist serenity meets Hindu Shakti, in the eternal embrace of the mountains."
              </p>
            </div>

            {/* Subtle border */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-ivory/10 pointer-events-none" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
