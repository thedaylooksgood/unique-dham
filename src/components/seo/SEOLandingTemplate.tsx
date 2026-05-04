import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAQSection } from "./FAQSection";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, BookOpen } from "lucide-react";
import { JsonLd } from "./JsonLd";

interface SEOLandingTemplateProps {
  keyword: string;
  title: string;
  description: string;
  content: string;
  faqs: { question: string; answer: string }[];
  schema: any;
}

export function SEOLandingTemplate({
  keyword,
  title,
  description,
  content,
  faqs,
  schema,
}: SEOLandingTemplateProps) {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="bg-ivory overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 flex flex-col items-center justify-center text-center px-6">
          <div className="absolute inset-0 z-0">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/home-page/hero/banner 1.png" 
              alt={title} 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-ivory" />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <BlurFade delay={0.1}>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-saffron" />
                <span className="font-body text-xs tracking-[0.4em] uppercase text-saffron font-bold">
                  Sacred Discovery
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display text-sacred-brown mb-8 leading-tight">
                {title.split("|")[0]}
              </h1>
              <p className="text-xl md:text-2xl font-body text-warm-umber/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/puja-booking">
                  <ShimmerButton className="px-10 py-4 shadow-xl">
                    <span className="font-display text-base tracking-widest uppercase">Book a Puja</span>
                  </ShimmerButton>
                </Link>
                <Link href="/" className="flex items-center gap-2 text-sacred-brown font-display tracking-widest uppercase text-sm hover:text-saffron transition-colors">
                  Explore The Dham <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Long Form Content Section */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <BlurFade delay={0.2}>
            <div className="prose prose-lg prose-sacred max-w-none">
              <div className="flex items-center gap-4 mb-8">
                <BookOpen className="w-8 h-8 text-saffron" />
                <h2 className="text-3xl md:text-4xl font-display text-sacred-brown m-0">The Spiritual Essence of {keyword}</h2>
              </div>
              <div 
                className="font-body text-warm-umber/90 leading-loose text-lg whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </BlurFade>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-white/50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-ivory rounded-2xl flex items-center justify-center text-saffron mb-6">
                  <MapPin size={32} />
                </div>
                <h3 className="text-2xl font-display text-sacred-brown mb-4">Prime Location</h3>
                <p className="font-body text-warm-umber/70">Situated in the heart of the Darjeeling hills, offering breathtaking views and spiritual serenity.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-ivory rounded-2xl flex items-center justify-center text-saffron mb-6">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-display text-sacred-brown mb-4">Divine Energy</h3>
                <p className="font-body text-warm-umber/70">A place where Maa's presence is felt in every breeze and every prayer spoken from the heart.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-ivory rounded-2xl flex items-center justify-center text-saffron mb-6">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-2xl font-display text-sacred-brown mb-4">Vedic Traditions</h3>
                <p className="font-body text-warm-umber/70">Authentic rituals conducted by experienced priests following ancient Himalayan traditions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection items={faqs} title={`Common Questions About ${keyword}`} />

        {/* Call to Action */}
        <section className="py-24 px-6 text-center bg-sacred-brown text-ivory">
          <BlurFade delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-display mb-8">Begin Your Spiritual Journey</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-2xl mx-auto">Experience the peace and power of Darjeeling's most sacred temple today.</p>
            <Link href="/puja-booking">
              <button className="bg-saffron text-white px-12 py-5 rounded-full font-display tracking-widest uppercase hover:bg-white hover:text-sacred-brown transition-all shadow-xl">
                Plan Your Visit
              </button>
            </Link>
          </BlurFade>
        </section>
      </main>
      <Footer />
    </>
  );
}
