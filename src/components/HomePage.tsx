"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LazySection } from "@/components/layout/LazySection";
import { HeroSection } from "@/components/sections/HeroSection";

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((m) => m.AboutSection),
  { ssr: false }
);
const MissionSection = dynamic(
  () => import("@/components/sections/MissionSection").then((m) => m.MissionSection),
  { ssr: false }
);
const JourneySection = dynamic(
  () => import("@/components/sections/JourneySection").then((m) => m.JourneySection),
  { ssr: false }
);
const LeadershipSection = dynamic(
  () =>
    import("@/components/sections/LeadershipSection").then(
      (m) => m.LeadershipSection
    ),
  { ssr: false }
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((m) => m.SkillsSection),
  { ssr: false }
);
const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/ProjectsSection").then((m) => m.ProjectsSection),
  { ssr: false }
);
const RoadmapSection = dynamic(
  () =>
    import("@/components/sections/RoadmapSection").then((m) => m.RoadmapSection),
  { ssr: false }
);
const ResumeSection = dynamic(
  () => import("@/components/sections/ResumeSection").then((m) => m.ResumeSection),
  { ssr: false }
);
const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then((m) => m.ContactSection),
  { ssr: false }
);

export function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LazySection minHeight="80vh">
        <AboutSection />
      </LazySection>
      <LazySection minHeight="60vh">
        <MissionSection />
      </LazySection>
      <LazySection minHeight="120vh">
        <JourneySection />
      </LazySection>
      <LazySection minHeight="80vh">
        <LeadershipSection />
      </LazySection>
      <LazySection minHeight="80vh">
        <SkillsSection />
      </LazySection>
      <LazySection minHeight="100vh">
        <ProjectsSection />
      </LazySection>
      <LazySection minHeight="80vh">
        <RoadmapSection />
      </LazySection>
      <LazySection minHeight="60vh">
        <ResumeSection />
      </LazySection>
      <LazySection minHeight="80vh">
        <ContactSection />
      </LazySection>
      <Footer />
    </>
  );
}
