import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import ProfileCards from "@/components/ProfileCards";
import CaseStudyCalculator from "@/components/CaseStudyCalculator";
import PacketSimulator from "@/components/PacketSimulator";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import ArchitectureArena from "@/components/ArchitectureArena";
import VideoAudioTheater from "@/components/VideoAudioTheater";
import ReferencesSection from "@/components/ReferencesSection";
import ChipBotMascot from "@/components/ChipBotMascot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Top Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Section with Mascot & Assignment Map */}
      <Hero />

      {/* Requirement 1: 14 Comparative Criteria Matrix */}
      <ComparisonMatrix />

      {/* Deep Dive 5 Profiles & Live Request Simulator */}
      <ProfileCards />

      {/* Requirement 2: Case Study & Interactive Weighted Decision Calculator */}
      <CaseStudyCalculator />

      {/* Requirement 3: 4-Step Animated Pipeline Packet Simulator */}
      <PacketSimulator />

      {/* Requirement 4: Full SMS Layered Architecture Flow Diagram */}
      <ArchitectureFlow />

      {/* Architecture Arena: Radar Spider Chart Showdown */}
      <ArchitectureArena />

      {/* Video & Audio Theater: 13 Chapters & Voiceover Captions */}
      <VideoAudioTheater />

      {/* Requirement 5: 16 Official & Academic References */}
      <ReferencesSection />

      {/* Interactive Mascot Chip Bot */}
      <ChipBotMascot />

      {/* Footer */}
      <Footer />
    </main>
  );
}
