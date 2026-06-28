import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sparten from "@/components/Sparten";
import Ablauf from "@/components/Ablauf";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Sparten />
        <Ablauf />
        {/* Weitere Sektionen folgen Schritt für Schritt nach Freigabe. */}
      </main>
      <Footer />
    </>
  );
}
