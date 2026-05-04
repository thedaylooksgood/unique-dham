"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GuidanceCarousel } from "@/components/guidance/GuidanceSection"; 

export default function GuidancePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory">
        {/* We just drop in the new isolated component right here */}
        <GuidanceCarousel />
      </main>
      <Footer />
    </>
  );
}