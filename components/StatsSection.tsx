"use client";

import { motion } from "framer-motion";
import { BarChart3, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface StatsProps {
  initialCitizenReports?: number;
  initialResolved?: number;
  initialAvgResponseTime?: number;
}

export default function StatsSection({
  initialCitizenReports = 1234,
  initialResolved = 1087,
  initialAvgResponseTime = 72,
}: StatsProps) {
  // In a real application, you would fetch this data from an API
  const [stats] = useState({
    totalCitizenReports: initialCitizenReports,
    totalResolved: initialResolved,
    avgResponseTime: initialAvgResponseTime,
  });

  const statsItems = [
    {
      value: stats.totalCitizenReports.toLocaleString("rw-RW"),
      label: "Ibirego Byose",
      description: "Ibirego byatanzwe ku rubuga",
      icon: BarChart3,
      color: "from-blue-500 to-purple-600",
    },
    {
      value: stats.totalResolved.toLocaleString("rw-RW"),
      label: "Ibyakemutse",
      description: "Ibirego byakemuwe na Leta",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
    },
    {
      value: `${stats.avgResponseTime}h`,
      label: "Igihe cyo Gusubiza",
      description: "Impuzandengo y&aposigihe cyo gusubiza",
      icon: Clock,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <motion.section
      className="w-full py-14 bg-gradient-to-b from-background/60 to-background rounded-2xl border border-border/50 my-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            className="p-3 rounded-full bg-primary/10 mb-4"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BarChart3 className="w-6 h-6 text-primary" />
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Amageregefu
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-primary/30 rounded-full mt-4"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsItems.map((stat, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center p-8 rounded-xl bg-gradient-to-br from-card/80 to-card border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className={`absolute -z-10 inset-0 opacity-10 bg-gradient-to-br ${stat.color} rounded-xl blur-xl`}
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className={`p-3 rounded-full mb-4 bg-gradient-to-r ${stat.color} text-white`}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-6 h-6" />
              </motion.div>

              <motion.div
                className={`text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              >
                {stat.value}
              </motion.div>

              <div className="text-xl font-medium mb-2">{stat.label}</div>

              <div className="text-sm text-foreground/70 text-center">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
