import CompareIntroduction from "@/components/home-redesign/CompareIntroduction";
import ConnectionFinder from "@/components/home-redesign/ConnectionFinder";
import FinalDiagnosisCta from "@/components/home-redesign/FinalDiagnosisCta";
import Header from "@/components/home-redesign/Header";
import Hero from "@/components/home-redesign/Hero";
import HomeFaqPreview from "@/components/home-redesign/HomeFaqPreview";
import MobileBenefitsStrip from "@/components/home-redesign/MobileBenefitsStrip";
import WhyJapanXTrip from "@/components/home-redesign/WhyJapanXTrip";
import "@/styles/home-redesign.css";

export default function HomeRedesign() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ConnectionFinder />
        <CompareIntroduction />
        <WhyJapanXTrip />
        <MobileBenefitsStrip />
        <HomeFaqPreview />
        <FinalDiagnosisCta />
      </main>
    </>
  );
}
