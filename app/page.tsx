import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sparten from "@/components/Sparten";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Sparten />
        {/* Weitere Sektionen folgen Schritt für Schritt nach Freigabe. */}
      </main>
      <Footer />
    </>
  );
}
