"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, ClipboardCheck, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TrackSection() {
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      icon: Search,
      text: "Shakisha ikibazo cyawe ukoresheje nomero y'ibiranga",
    },
    { icon: Clock, text: "Kurikirana aho igikemuro kigeze" },
    { icon: Bell, text: "Kubona inyandiko z'ibisubizo" },
  ];

  return (
    <motion.div
      className="w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col items-center mb-6">
        <motion.div
          className="bg-muted p-2 rounded-full mb-3"
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ClipboardCheck className="w-6 h-6 text-primary" />
        </motion.div>

        <h2
          className="text-2xl md:text-3xl font-bold text-center"
          id="track-section"
        >
          Gukurikirana Ikibazo Cyawe
        </h2>
      </div>

      <motion.div
        className="rounded-xl border border-muted bg-gradient-to-br from-card to-background p-8 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          backgroundSize: "400% 400%",
          backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-8">
          <p className="text-center text-lg mb-6">
            Waba waratanze ikibazo? Injiza nomero yawe y&apos;ibiranga kugira
            ngo urebe aho ikibazo cyawe kigeze n&apos;ibisubizo byatanzwe
            n&apos;inzego za Leta.
          </p>

          <div className="space-y-4 mb-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              >
                <step.icon className="w-5 h-5 text-primary/70 flex-shrink-0" />
                <p className="text-sm text-foreground/80">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Link href="/track" passHref>
          <div className="relative">
            <Button
              variant="outline"
              className="w-full text-lg py-6 relative z-10 border-primary/30 text-foreground hover:text-primary hover:border-primary transition-colors duration-300"
              aria-label="Gukurikirana Ikibazo Gisanzwe"
            >
              <motion.span
                className="flex items-center gap-2"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                Gukurikirana Ikibazo Gisanzwe
                <Search className="w-5 h-5" />
              </motion.span>
            </Button>
            <motion.div
              className="absolute -z-10 inset-0 bg-foreground/5 rounded-lg blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 0.8 : 0,
                scale: isHovered ? 1.05 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
