import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        {/* Weitere Sektionen folgen Schritt für Schritt nach Freigabe. */}
      </main>
      <Footer />
    </>
  );
}
