import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SacredStoreSection, Product } from "@/components/store/SacredStoreSection";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every 60 seconds

async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data as Product[];
}

export default async function SacredStorePage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main>
        <SacredStoreSection
          products={products}
          backgroundImage="/images/home-page/intro/mountain-bg.png"
        />
      </main>
      <Footer />
    </>
  );
}