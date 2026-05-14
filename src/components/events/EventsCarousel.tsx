"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  List,
  LayoutGrid,
  CalendarDays,
  ArrowRight,
  ExternalLink,
  X
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Types for our events
interface TempleEvent {
  id: number;
  day: string;
  dayName: string;
  month: string;
  monthIndex: number; // 0-11
  year: number;
  title: string;
  time: string;
  location: string;
  description?: string;
  tag?: string;
}

const events: TempleEvent[] = [
  {
    id: 7,
    day: "16",
    dayName: "Saturday",
    month: "MAY",
    monthIndex: 4,
    year: 2026,
    title: "Falharini Amavasya Mahakali Puja",
    time: "6:00 PM onwards",
    location: "Maa Unique Dham, Darjeeling",
    description: "Experience the divine grace of Maa Kali on this sacred Falharini Amavasya. Join us for a special Mahapuja, Vedic chanting, and spiritual energy invocation.",
    tag: "Mahapuja",
  },
  {
    id: 1,
    day: "08",
    dayName: "Monday",
    month: "JUNE",
    monthIndex: 5,
    year: 2026,
    title: "Maha Aarti & Divine Kirtan",
    time: "7:30 PM - 9:00 PM",
    location: "Main Shrine, Maa Unique Dham",
    tag: "Weekly",
  },
  {
    id: 2,
    day: "20",
    dayName: "Saturday",
    month: "JUNE",
    monthIndex: 5,
    year: 2026,
    title: "Satsang with Mahant Ji",
    time: "5:00 PM - 7:00 PM",
    location: "Satsang Hall",
    tag: "Special",
  },
  {
    id: 3,
    day: "26",
    dayName: "Friday",
    month: "JUNE",
    monthIndex: 5,
    year: 2026,
    title: "Yoga & Meditation Workshop",
    time: "6:00 AM - 8:00 AM",
    location: "Temple Gardens",
    tag: "Wellness",
  },
  {
    id: 4,
    day: "27",
    dayName: "Saturday",
    month: "JUNE",
    monthIndex: 5,
    year: 2026,
    title: "Bhandara - Community Feast",
    time: "12:00 PM - 3:00 PM",
    location: "Dining Hall",
    tag: "Seva",
  },
  {
    id: 5,
    day: "02",
    dayName: "Thursday",
    month: "JULY",
    monthIndex: 6,
    year: 2026,
    title: "Purnima Special Puja",
    time: "6:00 PM - 10:00 PM",
    location: "Main Shrine",
    tag: "Festival",
  },
  {
    id: 6,
    day: "14",
    dayName: "Tuesday",
    month: "JULY",
    monthIndex: 6,
    year: 2026,
    title: "Vedic Chanting Session",
    time: "10:00 AM - 11:30 AM",
    location: "Education Block",
    tag: "Learning",
  },
];

type ViewType = 'carousel' | 'list' | 'calendar';

export default function EventsCarousel() {
  const [view, setView] = useState<ViewType>('list');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(5); // June
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedEvents, setSelectedEvents] = useState<TempleEvent[] | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const filteredEvents = useMemo(() => {
    return events
      .filter(e => e.monthIndex === currentMonthIndex && e.year === currentYear)
      .sort((a, b) => parseInt(a.day) - parseInt(b.day));
  }, [currentMonthIndex, currentYear]);

  const changeMonth = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (currentMonthIndex === 11) {
        setCurrentMonthIndex(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonthIndex(prev => prev + 1);
      }
    } else {
      if (currentMonthIndex === 0) {
        setCurrentMonthIndex(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonthIndex(prev => prev - 1);
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 374;
      const scrollAmount = direction === 'left' ? -(cardWidth * 3) : (cardWidth * 3);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && view === 'carousel') {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [view]);

  return (
    <section className="relative w-full min-h-screen py-32 flex flex-col justify-center overflow-hidden">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-page/hero/banner 1.png"
          alt="Events Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-ivory/40 backdrop-blur-[2px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ivory via-ivory/80 to-transparent z-[1]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">
        
        {/* Header & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-saffron/10 backdrop-blur-md border border-saffron/20 rounded-full w-fit">
              <Sparkles size={16} className="text-saffron" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-saffron">Event Schedule</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-sacred-brown leading-tight">
              Join Our <span className="text-gradient-saffron italic">Sacred</span> Gatherings
            </h2>
            
            {/* View Tabs */}
            <div className="flex items-center gap-1 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-sacred-brown/5 w-fit shadow-sm">
              <button 
                onClick={() => setView('carousel')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all",
                  view === 'carousel' ? "bg-white text-saffron shadow-md" : "text-sacred-brown/40 hover:text-sacred-brown"
                )}
              >
                <LayoutGrid size={14} /> Carousel
              </button>
              <button 
                onClick={() => setView('list')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all",
                  view === 'list' ? "bg-white text-saffron shadow-md" : "text-sacred-brown/40 hover:text-sacred-brown"
                )}
              >
                <List size={14} /> List View
              </button>
              <button 
                onClick={() => setView('calendar')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all",
                  view === 'calendar' ? "bg-white text-saffron shadow-md" : "text-sacred-brown/40 hover:text-sacred-brown"
                )}
              >
                <CalendarDays size={14} /> Calendar
              </button>
            </div>
          </div>

          {/* Navigation Controls (Carousel View Only) */}
          {view === 'carousel' && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300",
                  canScrollLeft 
                    ? "border-saffron/30 text-saffron bg-white shadow-sm hover:bg-saffron hover:text-white cursor-pointer" 
                    : "border-sacred-brown/10 text-sacred-brown/20 cursor-not-allowed"
                )}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300",
                  canScrollRight 
                    ? "border-saffron/30 text-saffron bg-white shadow-sm hover:bg-saffron hover:text-white cursor-pointer" 
                    : "border-sacred-brown/10 text-sacred-brown/20 cursor-not-allowed"
                )}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {/* View Content */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {view === 'carousel' && (
              <motion.div
                key="carousel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 w-full 
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2"
              >
                {events.map((event, index) => (
                  <EventCard key={event.id} event={event} isHighlighted={index === 0} />
                ))}
              </motion.div>
            )}

            {view === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                {/* List View */}
                <div className="lg:col-span-8">
                  <div className="bg-white/90 backdrop-blur-xl border border-sacred-brown/5 shadow-2xl overflow-hidden">
                    {/* List Header */}
                    <div className="p-8 border-b border-sacred-brown/10 flex justify-between items-center bg-ivory/20">
                      <h3 className="font-display text-3xl text-sacred-brown">
                        {monthNames[currentMonthIndex]} {currentYear}
                      </h3>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => changeMonth('prev')}
                          className="p-3 rounded-xl border border-sacred-brown/10 hover:bg-white transition-all text-sacred-brown"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={() => changeMonth('next')}
                          className="p-3 rounded-xl border border-sacred-brown/10 hover:bg-white transition-all text-sacred-brown"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Flush List Items */}
                    <div className="flex flex-col">
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                          <EventListItem key={event.id} event={event} />
                        ))
                      ) : (
                        <div className="p-20 text-center text-sacred-brown/30 font-display text-xl">
                          No events scheduled for this month.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Calendar Sidebar */}
                <div className="hidden lg:block lg:col-span-4">
                  <div className="sticky top-32">
                    <CalendarView 
                      events={events} 
                      currentMonthIndex={currentMonthIndex} 
                      currentYear={currentYear}
                      onMonthChange={changeMonth}
                      onDayClick={setSelectedEvents}
                      compact 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <CalendarView 
                  events={events} 
                  currentMonthIndex={currentMonthIndex} 
                  currentYear={currentYear}
                  onMonthChange={changeMonth}
                  onDayClick={setSelectedEvents}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Detail Popup Modal */}
          <AnimatePresence>
            {selectedEvents && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedEvents(null)}
                  className="absolute inset-0 bg-sacred-brown/40 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-sacred-brown/40 text-xs font-bold tracking-[0.2em] uppercase mb-1">
                          {selectedEvents[0].day} {selectedEvents[0].month} {selectedEvents[0].year}
                        </div>
                        <h2 className="text-2xl font-display text-sacred-brown">Events on this day</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedEvents(null)}
                        className="p-2 rounded-full hover:bg-ivory transition-colors text-sacred-brown/40 hover:text-sacred-brown"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {selectedEvents.map((event: TempleEvent) => (
                        <div key={event.id} className="p-6 rounded-2xl border border-sacred-brown/10 bg-ivory/20 hover:border-saffron/30 transition-colors group">
                          <h3 className="text-xl font-bold text-sacred-brown mb-3 group-hover:text-saffron transition-colors">
                            {event.title}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sacred-brown/60 text-sm">
                              <Clock size={16} className="text-saffron" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-sacred-brown/60 text-sm">
                              <MapPin size={16} className="text-saffron" />
                              {event.location}
                            </div>
                          </div>
                          {event.description && (
                            <p className="mt-4 text-sacred-brown/70 text-sm leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setSelectedEvents(null)}
                      className="w-full mt-8 py-4 bg-sacred-brown text-white rounded-xl font-bold hover:bg-sacred-brown/90 transition-all active:scale-95"
                    >
                      Close Details
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- SUB-COMPONENTS ---

function EventCard({ event, isHighlighted }: { event: TempleEvent, isHighlighted: boolean }) {
  return (
    <motion.div
      className={cn(
        "flex-none w-[320px] md:w-[350px] snap-start rounded-2xl p-8 flex flex-col gap-8 transition-all duration-300 border",
        isHighlighted 
          ? "bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-600/20" 
          : "bg-white/80 backdrop-blur-sm text-sacred-brown border-sacred-brown/10 hover:border-saffron/30 hover:shadow-lg"
      )}
    >
      <div>
        <div className="text-6xl font-light leading-none mb-1">
          {event.day}
        </div>
        <div className={cn(
          "text-[10px] font-bold tracking-[0.3em] uppercase",
          isHighlighted ? "text-white/70" : "text-sacred-brown/40"
        )}>
          {event.month}
        </div>
      </div>

      <h3 className="text-2xl font-bold leading-tight min-h-[4rem]">
        {event.title}
      </h3>

      <div className="mt-auto space-y-3">
        <div className={cn(
          "flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest",
          isHighlighted ? "text-white/80" : "text-sacred-brown/60"
        )}>
          <Clock size={16} /> {event.time}
        </div>
        <div className={cn(
          "flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest",
          isHighlighted ? "text-white/80" : "text-sacred-brown/60"
        )}>
          <MapPin size={16} /> {event.location}
        </div>
      </div>
    </motion.div>
  );
}

function EventListItem({ event }: { event: TempleEvent }) {
  return (
    <button className="group relative flex flex-col md:flex-row items-stretch bg-white border-b border-sacred-brown/10 transition-all duration-300 overflow-hidden w-full text-left hover:bg-ivory/30">
      {/* Date Box (Left) */}
      <div className="flex flex-col items-center justify-center min-w-[120px] p-6 text-center border-b md:border-b-0 md:border-r border-sacred-brown/10 bg-ivory/10 group-hover:bg-white transition-colors">
        <span className="text-4xl font-display font-bold leading-none text-sacred-brown">{event.day}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-sacred-brown/40">{event.dayName}</span>
      </div>

      {/* Content (Right) */}
      <div className="flex-1 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-saffron">
            <span className="bg-saffron/10 px-3 py-1 rounded-full">{event.tag}</span>
            <span className="opacity-40">•</span>
            <span className="text-sacred-brown/60">{event.time}</span>
          </div>
          <h4 className="font-display text-2xl text-sacred-brown leading-tight group-hover:text-saffron transition-colors">
            {event.title}
          </h4>
          <p className="flex items-center gap-2 text-sacred-brown/60 text-xs">
            <MapPin size={14} className="text-saffron/60" /> {event.location}
          </p>
        </div>

        <div className="flex items-center gap-2 text-saffron opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
          <span className="text-[10px] font-bold uppercase tracking-widest">View Details</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </button>
  );
}

interface CalendarProps {
  events: TempleEvent[];
  currentMonthIndex: number;
  currentYear: number;
  onMonthChange: (dir: 'next' | 'prev') => void;
  onDayClick: (events: TempleEvent[]) => void;
  compact?: boolean;
}

function CalendarView({ events, currentMonthIndex, currentYear, onMonthChange, onDayClick, compact = false }: CalendarProps) {
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 (Sun) to 6 (Sat)
  
  // Adjust first day to start from Monday (0 for Mon, 6 for Sun)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <div className={cn(
      "bg-white/90 backdrop-blur-xl border border-sacred-brown/10 shadow-2xl overflow-hidden",
      compact ? "p-6 rounded-3xl" : "p-10 rounded-[2.5rem]"
    )}>
      <div className="flex justify-between items-center mb-8">
        <h3 className={cn("font-display text-sacred-brown", compact ? "text-xl" : "text-3xl")}>
          {monthNames[currentMonthIndex]} {currentYear}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => onMonthChange('prev')}
            className="p-2 rounded-xl border border-sacred-brown/5 hover:bg-ivory transition-colors text-sacred-brown"
          >
            <ChevronLeft size={compact ? 16 : 20} />
          </button>
          <button 
            onClick={() => onMonthChange('next')}
            className="p-2 rounded-xl border border-sacred-brown/5 hover:bg-ivory transition-colors text-sacred-brown"
          >
            <ChevronRight size={compact ? 16 : 20} />
          </button>
        </div>
      </div>

      <div className={cn(
        "grid grid-cols-7 gap-px bg-sacred-brown/5 border border-sacred-brown/10 rounded-2xl overflow-hidden shadow-inner",
        compact ? "text-[10px]" : "text-xs"
      )}>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
          <div key={day} className="bg-ivory/50 py-4 text-center font-bold tracking-widest text-sacred-brown/30">
            {day}
          </div>
        ))}
        
        {/* Empty cells for previous month */}
        {Array.from({ length: adjustedFirstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white/40" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
          const dayEvents = events.filter(e => e.day === dayStr && e.monthIndex === currentMonthIndex && e.year === currentYear);
          const hasEvents = dayEvents.length > 0;
          
          return (
            <div 
              key={i} 
              onClick={() => hasEvents && onDayClick(dayEvents)}
              className={cn(
                "bg-white relative transition-all duration-300 group overflow-hidden",
                hasEvents ? "cursor-pointer hover:bg-saffron/5" : "cursor-default",
                compact ? "h-16" : "h-16 md:min-h-[130px] md:p-4 flex flex-col items-center justify-center md:items-stretch md:justify-start gap-2"
              )}
            >
              <div className={cn(
                "flex items-center justify-center transition-all",
                hasEvents && !compact ? "w-8 h-8 md:w-9 md:h-9 rounded-full bg-saffron text-white shadow-lg shadow-saffron/20" : "text-sacred-brown/40 group-hover:text-sacred-brown",
                hasEvents && compact ? "w-7 h-7 rounded-full bg-saffron text-white mx-auto mt-2" : "",
                !hasEvents && compact ? "mt-4 text-center" : "",
                !hasEvents && !compact ? "text-center md:text-left md:ml-4" : ""
              )}>
                <span className={cn("font-bold", compact ? "text-xs" : "text-sm md:text-base")}>{dayNum}</span>
              </div>

              {!compact && hasEvents && (
                <div className="hidden md:block space-y-1.5">
                  {dayEvents.map(e => (
                    <div key={e.id} className="text-[11px] p-2 bg-saffron/5 text-saffron rounded-lg font-bold leading-tight border border-saffron/10 line-clamp-2">
                      {e.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Dot indicator for mobile (non-compact) or compact view */}
              {hasEvents && (
                <div className={cn(
                  "absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-saffron rounded-full",
                  !compact && "md:hidden"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}