import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectCarousel } from "@/components/sections/ProjectCarousel";
import { ProjectArchive } from "@/components/sections/ProjectArchive";
import { EngineeringActivitySection } from "@/components/sections/EngineeringActivitySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <ProjectCarousel />
        <ProjectArchive />
        <EngineeringActivitySection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
