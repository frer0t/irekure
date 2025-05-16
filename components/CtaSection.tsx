"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CtaSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.section
      className="w-full py-20 my-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/80 via-primary to-primary/90 p-10 text-primary-foreground shadow-xl"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Background decoration elements */}
          <div className="absolute inset-0 opacity-15">
            <motion.div
              className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/80 blur-md"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/80 blur-md"
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1 text-left md:pr-6">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Gufasha Kuyobora Leta Igana ku Iterambere
              </motion.h2>

              <motion.p
                className="text-lg max-w-2xl mb-6 text-primary-foreground/90"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Gutanga ibitekerezo byawe birafasha mu iterambere ry'igihugu.
                Tanga igitekerezo cyawe ubu kugira ngo dufatanye kubaka u Rwanda
                rwiza.
              </motion.p>
            </div>

            <motion.div
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <span className="mr-2">Tanga Igitekerezo</span>
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
                <motion.div
                  className="absolute -z-10 inset-0 bg-white/20 rounded-xl blur-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isHovered ? 0.8 : 0,
                    scale: isHovered ? 1.05 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
