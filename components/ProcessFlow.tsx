"use client";

import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  ClipboardCheck,
  MessageCircle,
  SendHorizonal,
} from "lucide-react";
import React from "react";

interface ProcessStepProps {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}

function ProcessStep({
  title,
  description,
  icon: Icon,
  index,
}: ProcessStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="relative mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
        <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground">
          <Icon className="w-7 h-7" />
        </div>
        <div className="absolute z-10 -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
      </motion.div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </motion.div>
  );
}

export function ProcessFlow() {
  const steps = [
    {
      title: "Tanga Ikibazo",
      description: "Tanga ikibazo cyawe ku rubuga cyangwa kuri mobile",
      icon: MessageCircle,
    },
    {
      title: "Kohereza",
      description: "Uburyo bw&aposikoranabuhanga burabikurikirana",
      icon: SendHorizonal,
    },
    {
      title: "Gukurikirana",
      description: "Koresha nomero y&aposikiranga kureba aho bigeze",
      icon: ClipboardCheck,
    },
    {
      title: "Kubona Inyandiko",
      description: "Urwego ruguhaye igisubizo",
      icon: Bell,
    },
    {
      title: "Gukemura",
      description: "Ikibazo cyawe kirakemurwa",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            className="p-3 rounded-full bg-primary/10 mx-auto mb-4 inline-flex"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ClipboardCheck className="w-6 h-6 text-primary" />
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Uburyo Bikorwa
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-primary/30 rounded-full mt-4 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative">
            {steps.map((step, index) => (
              <ProcessStep
                key={index}
                index={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
