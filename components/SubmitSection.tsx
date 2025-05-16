"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, PlusCircle, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SubmitSection() {
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    { icon: PlusCircle, text: "Tanga igitekerezo cyawe ku mbuga" },
    { icon: Send, text: "Koresha uburyo bw'ikoranabuhanga" },
    { icon: CheckCircle, text: "Kubona nomero y'ibiranga bwite" },
  ];

  return (
    <motion.div
      className="w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center mb-6">
        <motion.div
          className="bg-primary/10 p-2 rounded-full mb-3"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Send className="w-6 h-6 text-primary" />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Gutanga Ikibazo Cyawe
        </h2>
      </div>

      <motion.div
        className="rounded-xl border border-primary/20 bg-gradient-to-br from-card to-card/90 p-8 shadow-lg hover:shadow-xl transition-all duration-300"
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
            Koresha iyi platform gutanga igitekerezo cyangwa ikibazo ku nzego za
            Leta. Uzahabwa nomero y&apos;ibiranga kugira ngo ukurikirane aho
            ikibazo cyawe kigeze.
          </p>

          <div className="space-y-4 mb-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              >
                <step.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-foreground/80">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Link href="/submit" passHref>
          <div className="relative">
            <Button
              className="w-full text-lg py-6 relative z-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md"
              aria-label="Gutanga Ikibazo Gishya"
            >
              <motion.span
                className="flex items-center gap-2"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                Gutanga Ikibazo Gishya
                <Send className="w-5 h-5" />
              </motion.span>
            </Button>
            <motion.div
              className="absolute -z-10 inset-0 bg-primary/20 rounded-lg blur-md"
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
