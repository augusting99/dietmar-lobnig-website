import Header from "./components/Header";
import HeroSection from "./components/sections/HeroSection";
import IntroSection from "./components/sections/IntroSection";
import ScrollQuote from "./components/sections/ScrollQuote";
import StatementBreak from "./components/sections/StatementBreak";
import ProductsSection from "./components/sections/ProductsSection";
import HighlightsGrid from "./components/sections/HighlightsGrid";
import ServicesSection from "./components/sections/ServicesSection";
import VideoCTA from "./components/sections/VideoCTA";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";
import ScrollGradient from "./components/ScrollGradient";
import { VehicleListJsonLd } from "./components/JsonLd";


export default function Home() {
  return (
    <div className="bg-bg-primary relative">
      <VehicleListJsonLd />
      <ScrollGradient />
      <div className="relative z-[1]">
      <Header />
      <HeroSection />
      <ScrollQuote
        text="Ein Handschlag zählt mehr als jeder Vertrag. Seit 1996 steht unser Team für das, was im Autohandel selten geworden ist — Ehrlichkeit, Qualität und persönliche Beratung."
        cite="Dietmar Lobnig"
      />
      <ProductsSection />
      <HighlightsGrid />
      <StatementBreak
        lines={["Persönlich ausgewählt.", "Technisch geprüft.", "Ohne Kompromisse."]}
        image="/images/behind.jpeg"
      />
      <div className="max-w-[1280px] mx-auto px-10 max-tablet:px-5">
        <ServicesSection />
      </div>
      <VideoCTA />
      <ContactSection />
      <Footer />
      </div>
    </div>
  );
}
