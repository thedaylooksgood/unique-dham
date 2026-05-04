import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SacredStoreSection, Product } from "@/components/store/SacredStoreSection";
import { Gem, Zap, Sparkles, ShoppingBag, Droplets, Flame } from "lucide-react";

// Data is completely abstracted from the logic
const sacredProducts: Product[] = [
  {
    id: "kamya-sindur",
    name: "Kamya Sindur",
    description: "Sacred vermillion directly from the Kamakhya temple, carrying immense Devi energy and potent Shakti presence.",
    category: "From Kamakhya",
    icon: "Sparkles",
    color: "text-temple-red",
    bg: "bg-temple-red/10"
  },
  {
    id: "kamakhya-vastra",
    name: "Kamakhya Vastra",
    description: "Auspicious red cloth blessed at the Kamakhya Peeth. Used to wrap sacred geometry and attract divine protection.",
    category: "From Kamakhya",
    icon: "Flame",
    color: "text-vermillion",
    bg: "bg-vermillion/10"
  },
  {
    id: "sacred-waters",
    name: "Sacred Waters",
    description: "Holy water collected from highly potent tirthas. Essential for purification and taking profound sankalp.",
    category: "Puja Samagri",
    icon: "Droplets",
    color: "text-sky-500",
    bg: "bg-sky-500/10"
  },
  {
    id: "generated-yantras",
    name: "Generated Yantras",
    description: "Precision-crafted and heavily energized sacred geometry to align your physical space with cosmic frequencies.",
    category: "Yantra",
    icon: "Zap",
    color: "text-saffron",
    bg: "bg-saffron/10"
  },
  {
    id: "generated-malas",
    name: "Generated Malas",
    description: "Consecrated bead strings for mantra japa. Holding the living charge of continuous Himalayan sadhana.",
    category: "Mala",
    icon: "ShoppingBag",
    color: "text-warm-umber",
    bg: "bg-warm-umber/10"
  },
  {
    id: "stones-pyrites",
    name: "Stones - Pyrites",
    description: "Energized raw Pyrite clusters for grounding, manifesting abundant wealth, and shielding against negativity.",
    category: "Stones",
    icon: "Gem",
    color: "text-yellow-600",
    bg: "bg-yellow-600/10"
  },
];

export default function SacredStorePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Pass the data and the background image URL as props */}
        <SacredStoreSection
          products={sacredProducts}
          backgroundImage="/images/home-page/intro/mountain-bg.png"
        />
      </main>
      <Footer />
    </>
  );
}