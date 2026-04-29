import React from 'react';
import { Store, Leaf, Droplet, Shield, MapPin } from 'lucide-react';
import { SacredFeatureItem } from '../ui/SacredFeatureItem';

export function SacredStoreSection() {
  return (
    <section className="max-w-6xl mx-auto w-full px-4 py-16 font-sans relative">
      
      {/* CSS Grid: 1 column on mobile, 3 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* =========================================
            LEFT COLUMN: Main Glassmorphism Card (Spans 2 columns)
            ========================================= */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] flex flex-col justify-center min-h-[380px]">
          
          {/* Background '8' Graphic */}
          <div className="absolute -bottom-16 -right-10 text-[18rem] font-bold text-[#f4d1c0]/40 select-none pointer-events-none leading-none z-0">
            8
          </div>

          {/* Main Card Content */}
          <div className="relative z-10">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 shadow-sm border border-orange-100/50">
              <Store size={28} strokeWidth={1.5} />
            </div>
            
            <h3 className="text-3xl font-serif text-gray-900 mb-4 tracking-wide">SACRED STORE</h3>
            
            <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-sm md:text-base">
              Rudraksha, Yantra, and Sindoor energized with sankalp at the holy Dham of Darjeeling.
            </p>
            
            <button className="inline-flex items-center text-orange-800 font-semibold text-sm group-hover:text-orange-950 transition-colors uppercase tracking-wider bg-orange-100/50 px-5 py-2.5 rounded-full hover:bg-orange-100">
              Explore Store
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: The Feature List
            ========================================= */}
        <div className="flex flex-col gap-4 justify-between h-full">
          
          <SacredFeatureItem 
            icon={<Leaf size={20} strokeWidth={1.5} />}
            title="Tulsi Mala"
            description="Pure and sacred"
            time="4h ago"
            iconBgColor="bg-green-50 border-green-100"
            iconTextColor="text-green-600"
          />

          <SacredFeatureItem 
            icon={<Droplet size={20} strokeWidth={1.5} />}
            title="Prana-Pratishthit Sindoor"
            description="Blessed by Maa"
            time="1d ago"
            iconBgColor="bg-red-50 border-red-100"
            iconTextColor="text-red-500"
          />

          <SacredFeatureItem 
            icon={<Shield size={20} strokeWidth={1.5} />}
            title="Siddha Yantra"
            description="For divine protection"
            time="2d ago"
            iconBgColor="bg-orange-50 border-orange-100"
            iconTextColor="text-orange-500"
          />

          <SacredFeatureItem 
            icon={<MapPin size={20} strokeWidth={1.5} />}
            title="Sacred Rudraksha"
            description="Energized at the Dham"
            time="4d ago"
            iconBgColor="bg-stone-50 border-stone-200"
            iconTextColor="text-stone-600"
          />

        </div>
      </div>
    </section>
  );
}
