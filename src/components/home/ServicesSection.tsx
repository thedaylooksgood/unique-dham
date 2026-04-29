"use client";

import React, { useState } from 'react';
import { Store, Leaf, Droplet, Shield, MapPin } from 'lucide-react';

// 1. We define all the data for our "Stack" outside the component
const featureItems = [
  {
    id: 'tulsi',
    listTitle: 'Tulsi Mala',
    listSubtitle: 'Pure and sacred',
    time: '4h ago',
    listIcon: <Leaf size={20} strokeWidth={1.5} />,
    iconColors: 'bg-green-50 text-green-600 border-green-100',
    // Data for the Left Card when this is clicked:
    mainTitle: 'TULSI MALA',
    mainDesc: 'Authentic Himalayan Tulsi beads. Wear this sacred mala to maintain purity, peace, and spiritual focus in your daily life.',
    btnText: 'RESERVE MALA',
    watermark: 'M',
    mainIcon: <Leaf size={28} strokeWidth={1.5} />,
  },
  {
    id: 'sindoor',
    listTitle: 'Prana-Pratishthit Sindoor',
    listSubtitle: 'Blessed by Maa',
    time: '1d ago',
    listIcon: <Droplet size={20} strokeWidth={1.5} />,
    iconColors: 'bg-red-50 text-red-500 border-red-100',
    // Data for the Left Card when this is clicked:
    mainTitle: 'SACRED SINDOOR',
    mainDesc: 'Consecrated sindoor blessed at the Dham, carrying the divine energy, grace, and protection of Maa for your household.',
    btnText: 'GET SINDOOR',
    watermark: 'S',
    mainIcon: <Droplet size={28} strokeWidth={1.5} />,
  },
  {
    id: 'yantra',
    listTitle: 'Siddha Yantra',
    listSubtitle: 'For divine protection',
    time: '2d ago',
    listIcon: <Shield size={20} strokeWidth={1.5} />,
    iconColors: 'bg-orange-50 text-orange-500 border-orange-100',
    // Data for the Left Card when this is clicked:
    mainTitle: 'SIDDHA YANTRA',
    mainDesc: 'A powerful geometric conduit energized with specific mantras at the Dham to shield your home and aura from negativity.',
    btnText: 'BOOK YANTRA',
    watermark: 'Y',
    mainIcon: <Shield size={28} strokeWidth={1.5} />,
  },
  {
    id: 'rudraksha',
    listTitle: 'Sacred Rudraksha',
    listSubtitle: 'Energized at the Dham',
    time: '4d ago',
    listIcon: <MapPin size={20} strokeWidth={1.5} />,
    iconColors: 'bg-stone-50 text-stone-600 border-stone-200',
    // Data for the Left Card when this is clicked:
    mainTitle: 'SACRED RUDRAKSHA',
    mainDesc: 'Authentic, high-mukhi Rudraksha seeds energized at the Dham to align your physical, mental, and spiritual well-being.',
    btnText: 'EXPLORE RUDRAKSHA',
    watermark: 'R',
    mainIcon: <MapPin size={28} strokeWidth={1.5} />,
  }
];

export default function InteractiveStoreSection() {
  // 2. State to track the active item. 
  // 'null' means nothing is clicked yet (shows the default Store overview).
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 3. Determine what data to show on the left based on the state
  const displayData = activeIndex === null
    ? {
      title: "SACRED STORE",
      desc: "Rudraksha, Yantra, and Sindoor energized with sankalp at the holy Dham of Darjeeling.",
      btn: "EXPLORE STORE",
      icon: <Store size={28} strokeWidth={1.5} />,
      watermark: "8"
    }
    : {
      title: featureItems[activeIndex].mainTitle,
      desc: featureItems[activeIndex].mainDesc,
      btn: featureItems[activeIndex].btnText,
      icon: featureItems[activeIndex].mainIcon,
      watermark: featureItems[activeIndex].watermark
    };

  return (
    <section className="max-w-6xl mx-auto w-full px-4 py-16 font-sans relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

        {/* =========================================
            LEFT COLUMN: Dynamic Display Card
            ========================================= */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 min-h-[380px] flex flex-col justify-center transition-all duration-300">

          <div className="absolute -bottom-16 -right-10 text-[18rem] font-bold text-[#f4d1c0]/40 select-none pointer-events-none leading-none z-0">
            {displayData.watermark}
          </div>

          {/* We use a key here so React re-animates the content when it changes */}
          <div key={displayData.title} className="relative z-10 animate-in fade-in duration-500">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 shadow-sm border border-orange-100/50">
              {displayData.icon}
            </div>

            <h3 className="text-3xl font-serif text-gray-900 mb-4 tracking-wide uppercase">
              {displayData.title}
            </h3>

            <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-sm md:text-base min-h-[3rem]">
              {displayData.desc}
            </p>

            <button className="inline-flex items-center text-orange-800 font-semibold text-sm group-hover:text-orange-950 transition-colors uppercase tracking-wider bg-orange-100/50 px-5 py-2.5 rounded-full hover:bg-orange-200">
              {displayData.btn}
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: The Interactive Navigation Stack
            ========================================= */}
        <div className="flex flex-col gap-4 justify-between h-full">
          {featureItems.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                // Dynamic styling: Highlight the card if it's the active one
                className={`rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 cursor-pointer flex-1 group ${isActive
                    ? 'bg-white/90 border border-orange-300 shadow-md ring-1 ring-orange-100 scale-[1.02]' // Active State
                    : 'bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md hover:bg-white/80' // Inactive State
                  }`}
              >
                <div className={`p-3 rounded-full border transition-transform group-hover:scale-110 ${item.iconColors}`}>
                  {item.listIcon}
                </div>
                <div>
                  <h4 className={`font-semibold text-sm flex items-center gap-2 ${isActive ? 'text-orange-900' : 'text-gray-900'}`}>
                    {item.listTitle}
                    <span className="text-[10px] text-gray-400 font-normal bg-gray-100 px-2 py-0.5 rounded-full">
                      {item.time}
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.listSubtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}