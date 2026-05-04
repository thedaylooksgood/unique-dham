import { LucideIcon, Flame, Flower2, Users, Sparkles, Heart, Activity, Coins } from "lucide-react";

export interface Puja {
    id: string;
    name: string;
    deity: string;
    shortDescription: string;
    fullDescription: string;
    benefits: string[];
    duration: string;
    icon: LucideIcon;
    image: string;
    videoUrl: string;
    isBookable?: boolean;
}

export const pujasData: Puja[] = [
    {
        id: "grah-dosh",
        name: "Grah Dosh Nivaran",
        deity: "Navagraha",
        shortDescription: "Pacify malefic planetary influences and bring harmony to your astrological chart.",
        fullDescription: "Grah Dosh Nivaran is a powerful Vedic ritual designed to harmonize the cosmic energies of the nine planets (Navagraha). When planets are malefic or poorly placed in your birth chart, they can cause unexpected hurdles, mental stress, and physical ailments. This sacred puja pacifies these fierce planetary deities, transforming their negative aspects into positive vibrations.",
        benefits: ["Removes obstacles in career and personal life", "Brings mental peace and emotional stability", "Reduces the impact of unfavorable planetary transits"],
        duration: "1 day",
        icon: Sparkles,
        image: "/images/pujas/1.jpeg",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
        isBookable: true,
    },
    {
        id: "aayush",
        name: "Aayush Puja",
        deity: "Ayur Devata",
        shortDescription: "Special prayers for long life, vitality, and well-being, invoking divine blessings.",
        fullDescription: "The Aayush Puja is dedicated to Ayur Devata, the God of Life. It is performed to seek a long, healthy, and prosperous life. Traditionally done on birthdays or when recovering from severe illness, this ritual involves chanting sacred mantras that generate powerful vibrations, cleansing the aura and boosting the body's natural healing energies.",
        benefits: ["Enhances longevity and overall vitality", "Creates a protective shield against sudden illnesses", "Brings spiritual upliftment and inner joy"],
        duration: "1 day",
        icon: Heart,
        image: "/images/pujas/2.jpeg",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
        isBookable: true,
    },
    {
        id: "financial",
        name: "Financial Abundance",
        deity: "Maa Lakshmi & Lord Kuber",
        shortDescription: "Sacred invocation of Maa Lakshmi and Lord Kuber to remove debt and bring wealth.",
        fullDescription: "This profound puja invokes the supreme deities of wealth—Maa Lakshmi and Lord Kuber. It is specifically designed for individuals facing business losses, crushing debt, or stagnant career growth. Through ancient Vedic offerings (Ahutis) in the sacred fire, we clear energetic blockages related to finance and open the doors to cosmic abundance.",
        benefits: ["Clears pathways for new income streams", "Helps in resolving outstanding debts", "Attracts long-term prosperity and business growth"],
        duration: "3 days",
        icon: Coins,
        image: "/images/pujas/3.jpeg",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
        isBookable: true,
    },
    {
        id: "relationship",
        name: "Relationship Peace",
        deity: "Lord Shiva & Maa Parvati",
        shortDescription: "Harmonize relationships, resolve conflicts, and bring peace and love back into your home.",
        fullDescription: "Relationships form the core of our human experience. This specialized puja invokes the divine grace of Lord Shiva and Maa Parvati, the ultimate symbol of harmonious union. It is highly effective for couples facing discord, families dealing with internal disputes, or individuals seeking a compatible life partner.",
        benefits: ["Dissolves misunderstandings and ego clashes", "Promotes unconditional love and mutual respect", "Brings domestic harmony and peace"],
        duration: "1 day",
        icon: Users,
        image: "/images/pujas/4.jpeg",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
        isBookable: true,
    },
    {
        id: "health",
        name: "Health Recovery",
        deity: "Lord Shiva (Maha Mrityunjaya)",
        shortDescription: "Maha Mrityunjaya chants for quick recovery from severe health issues and physical ailments.",
        fullDescription: "Centered around the immensely powerful Maha Mrityunjaya Mantra, this ritual is a call to Lord Shiva as the conqueror of death and disease. It is performed to alleviate intense physical suffering, support medical treatments, and ward off untimely dangers. The sound frequencies of this puja rejuvenate the cells and fortify the spirit.",
        benefits: ["Accelerates recovery from chronic diseases", "Instills courage and removes the fear of death", "Purifies the mind and body at a cellular level"],
        duration: "5 days",
        icon: Activity,
        image: "/images/pujas/5.jpeg",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
        isBookable: true,
    },
    {
        id: "durga-special",
        name: "Durga Puja Special",
        deity: "Maa Durga",
        shortDescription: "The most sacred worship of Maa Durga, performed with deep invocation.",
        fullDescription: "A glorious celebration and intense sadhana of Maa Durga, the supreme protector. This puja invokes her fiery energy to destroy negativity, evil eyes, and hidden enemies. Performed with full Shodashopachar (16-step) rituals, it wraps the devotee in an impenetrable divine armor.",
        benefits: ["Destroys negative energies and black magic", "Grants immense courage and willpower", "Ensures victory over legal or personal enemies"],
        duration: "9 days",
        icon: Flower2,
        image: "/images/pujas/6.jpeg",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
        isBookable: false,
    },
    {
        id: "savan-month",
        name: "Savan Whole Month",
        deity: "Lord Shiva",
        shortDescription: "Continuous and highly auspicious worship of Lord Shiva throughout the holy month of Savan.",
        fullDescription: "The month of Savan is the most dearest to Lord Shiva. This extensive, month-long commitment involves daily Rudrabhishek, Bilva Patra offerings, and continuous chanting. It is the ultimate spiritual cleanse, washing away lifetimes of karma and fulfilling the deepest, purest desires of the soul.",
        benefits: ["Eradicates deep-rooted negative karmas", "Fulfills profound spiritual and material wishes", "Elevates consciousness to a higher dimension"],
        duration: "30 days",
        icon: Flame,
        image: "/images/pujas/7.jpeg",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
        isBookable: false,
    },

];