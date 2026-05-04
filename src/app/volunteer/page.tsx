import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import VolunteerClient from "@/components/volunteer/VolunteerClient";

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory overflow-x-hidden">
        <VolunteerClient />
      </main>
      <Footer />
    </>
  );
}
