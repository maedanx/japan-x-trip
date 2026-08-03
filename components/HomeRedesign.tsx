import CompareIntroduction from "@/components/home-redesign/CompareIntroduction";
import ConnectionFinder from "@/components/home-redesign/ConnectionFinder";
import FinalDiagnosisCta from "@/components/home-redesign/FinalDiagnosisCta";
import Header from "@/components/home-redesign/Header";
import Hero from "@/components/home-redesign/Hero";
import HomeFaqPreview from "@/components/home-redesign/HomeFaqPreview";
import WhyJapanXTrip from "@/components/home-redesign/WhyJapanXTrip";
import FeaturedGuide from "@/components/home/FeaturedGuide";
import "@/styles/home-redesign.css";

export default function HomeRedesign() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <FeaturedGuide />
        <ConnectionFinder />
        <CompareIntroduction />
        <WhyJapanXTrip />
        <HomeFaqPreview />
        <FinalDiagnosisCta />
      </main>
    </>
  );
}
