"use client";
import CtaSection from "@/components/CtaSection";
import Header from "@/components/Header";
import InstitutionsSection from "@/components/InstitutionsSection";
import { ProcessFlow } from "@/components/ProcessFlow";
import StatsSection from "@/components/StatsSection";
import SubmitSection from "@/components/SubmitSection";
import TrackSection from "@/components/TrackSection";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main
      id="main-content"
      className="flex w-full flex-1 flex-col items-center overflow-hidden"
    >
      {/* Header section with background gradient effect */}
      <section className="w-full pb-8 md:pb-16 relative">
        <div className="container mx-auto px-4 lg:px-8 pt-8 lg:pt-12 max-w-7xl">
          <Header />
        </div>
      </section>

      {/* Process Flow section */}
      <section className="w-full py-8 md:py-12 relative bg-muted/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <ProcessFlow />
        </div>
      </section>

      {/* Main actions section (Submit & Track) */}
      <motion.section
        className="w-full py-8 md:py-16 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="container mx-auto px-4 lg:px-8 max-w-7xl"
          id="submit-section"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full">
            <SubmitSection />
            <TrackSection />
          </div>
        </div>
      </motion.section>

      {/* Stats section with subtle background */}
      <section className="w-full py-6 md:py-12 relative">
        <div className="absolute inset-0 bg-muted/20 skew-y-3 -z-10 transform origin-top-left"></div>
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl relative z-10">
          <StatsSection />
        </div>
      </section>

      {/* CTA section */}
      <section className="w-full py-8 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <CtaSection />
        </div>
      </section>

      {/* Institutions section */}
      <section className="w-full mt-4 md:mt-8">
        <InstitutionsSection />
      </section>
    </main>
  );
}
