import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PujaDetailsClient from "@/components/puja-booking/PujaDetailsClient";
import { pujasData } from "@/lib/data/pujas";

export default async function PujaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const puja = pujasData.find((p) => p.id === id);

  if (!puja) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory">
        <PujaDetailsClient id={id} />
      </main>
      <Footer />
    </>
  );
}
