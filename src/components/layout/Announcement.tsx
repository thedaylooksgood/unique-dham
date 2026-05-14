'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Bell, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const ANNOUNCEMENT_STORAGE_KEY = 'mud_announcement_last_shown'
const SHOW_INTERVAL = 60 * 60 * 1000 // 60 minutes in milliseconds

export function Announcement() {
    const [isOpen, setIsOpen] = useState(false)
    const [showFloating, setShowFloating] = useState(false)
    const [isAutoOpened, setIsAutoOpened] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        const lastShown = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY)
        const now = Date.now()

        // If never shown or 60 mins have passed
        if (!lastShown || now - parseInt(lastShown) > SHOW_INTERVAL) {
            const timer = setTimeout(() => {
                setIsOpen(true)
                setIsAutoOpened(true)
                localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, now.toString())
            }, 1000) // popup 1 sec after load
            return () => clearTimeout(timer)
        } else {
            // Wait a second, then show minimized if not dismissed
            const timer = setTimeout(() => {
                if (!isDismissed) setShowFloating(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    // 5-second auto-close logic
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isOpen && isAutoOpened) {
            timer = setTimeout(() => {
                setIsOpen(false)
                setIsAutoOpened(false) // Reset so manual opens don't auto-close
            }, 5000)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [isOpen, isAutoOpened])

    // Handle floating button visibility
    useEffect(() => {
        if (isDismissed) {
            setShowFloating(false)
            return
        }

        if (isOpen) {
            setShowFloating(false)
        } else {
            const timer = setTimeout(() => {
                setShowFloating(true)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen, isDismissed])

    if (isDismissed && !isOpen) return null;

    return (
        <>
            {/* Pop-up (Bottom Left Floating) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }}
                        className="fixed bottom-6 left-6 z-[9999] w-[320px] bg-ivory rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(26,15,10,0.3)] border border-saffron/20 flex flex-col pointer-events-auto"
                        // Pause the 5s timer if they hover over it
                        onMouseEnter={() => setIsAutoOpened(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-10 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all backdrop-blur-md border border-white/20"
                        >
                            <X size={16} />
                        </button>

                        {/* Poster Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sacred-brown">
                            <Image
                                src="/announcements/may-16.jpeg"
                                alt="Special Announcement"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Bottom Info Bar */}
                            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="px-2 py-0.5 bg-saffron rounded-full flex items-center gap-1.5">
                                        <Calendar size={10} className="text-white" />
                                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">May 16</span>
                                    </div>
                                    <div className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-full flex items-center gap-1.5 border border-white/10">
                                        <Sparkles size={10} className="text-saffron" />
                                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">Mahapuja</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-display text-white tracking-tight leading-tight">Falharini Amavasya</h3>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 bg-ivory">
                            <p className="text-sacred-brown/70 text-[11px] leading-relaxed mb-4 font-medium">
                                Join us for the sacred Mahakali Puja. Experience divine vibrations and Vedic chanting in Darjeeling.
                            </p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-2.5 bg-saffron text-white rounded-xl font-bold tracking-[0.1em] text-[10px] uppercase hover:bg-saffron/90 transition-all shadow-md shadow-saffron/20 flex items-center justify-center gap-2 group"
                            >
                                View Later
                                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Banner (Bottom Left) */}
            <AnimatePresence>
                {showFloating && (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="fixed bottom-6 left-6 z-[9990] flex items-center gap-2"
                    >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="group relative flex items-center gap-3 bg-white/95 backdrop-blur-xl border border-saffron/20 p-2 pl-4 rounded-full shadow-2xl hover:shadow-saffron/10 transition-all hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col items-start pr-3 border-r border-sacred-brown/5">
                                <span className="text-[9px] font-bold text-saffron uppercase tracking-[0.2em] mb-0.5">Live Update</span>
                                <span className="text-xs font-bold text-sacred-brown tracking-tight">May 16 Mahapuja</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center text-white shadow-lg shadow-saffron/20 group-hover:scale-110 transition-transform">
                                <Bell size={18} className="animate-wiggle" />
                            </div>
                            
                            {/* Notification Dot */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-vermillion rounded-full border-2 border-white animate-bounce" />
                        </button>
                        
                        {/* Dismiss Floating Button */}
                        <button
                            onClick={() => setIsDismissed(true)}
                            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-sacred-brown/10 text-sacred-brown/50 hover:text-sacred-brown hover:bg-white shadow-sm flex items-center justify-center transition-all"
                            aria-label="Dismiss Announcement"
                        >
                            <X size={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
